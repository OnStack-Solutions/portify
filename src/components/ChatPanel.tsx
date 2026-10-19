'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import avatar from '@/assets/salman-avatar.jpg';
import { whatsappHref } from '@/lib/site';
import { RichText } from './RichText';
import { ArrowUpRight, Close, Reset, Send } from './icons';

type Link = { label: string; href: string; external?: boolean };
type Message = { id: string; role: 'user' | 'bot'; text: string; links?: Link[]; error?: boolean; retry?: string };
type Ctx = { project?: string };

const STORAGE_KEY = 'sb-assistant-v1';
const STARTERS = ['Who is Salman?', 'What AI work has he done?', 'Show me his projects', 'How can I contact him?'];
const MAX_CHARS = 500;
const uid = () => Math.random().toString(36).slice(2, 10);

function load(): { messages: Message[]; context: Ctx; suggestions: string[] } | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function ChatPanel({ onClose }: { onClose: () => void }) {
  // This panel only renders in the browser (loaded with ssr: false), so the saved
  // conversation can be read during the first render without a hydration mismatch.
  const [saved] = useState(load);
  const [messages, setMessages] = useState<Message[]>(saved?.messages ?? []);
  const [context, setContext] = useState<Ctx>(saved?.context ?? {});
  const [suggestions, setSuggestions] = useState<string[]>(saved?.suggestions ?? STARTERS);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ messages: messages.slice(-40), context, suggestions }));
    } catch {
      /* storage unavailable — conversation simply won't persist */
    }
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, context, suggestions, loading]);

  // Escape closes; on phones the panel is full-screen, so lock page scroll behind it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const small = window.matchMedia('(max-width: 640px)').matches;
    const prev = document.documentElement.style.overflow;
    if (small) document.documentElement.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [onClose]);

  const ask = useCallback(
    async (question: string) => {
      const q = question.trim().slice(0, MAX_CHARS);
      if (!q || loading) return;
      setMessages((m) => [...m.filter((x) => !x.error), { id: uid(), role: 'user', text: q }]);
      setInput('');
      setSuggestions([]);
      setLoading(true);
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 10_000);
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: q, context }),
          signal: ctrl.signal,
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.reply) throw new Error(data.error || 'The assistant is unavailable right now.');
        setMessages((m) => [...m, { id: uid(), role: 'bot', text: data.reply.text, links: data.reply.links }]);
        setContext(data.reply.context ?? {});
        setSuggestions(data.reply.suggestions ?? []);
      } catch (err) {
        const message =
          err instanceof DOMException && err.name === 'AbortError'
            ? 'That took too long to answer.'
            : err instanceof Error ? err.message : 'Something went wrong.';
        setMessages((m) => [
          ...m,
          {
            id: uid(),
            role: 'bot',
            error: true,
            retry: q,
            text: `${message} You can try again, or message Salman directly on WhatsApp.`,
            links: [{ label: 'WhatsApp Salman', href: whatsappHref(), external: true }],
          },
        ]);
      } finally {
        clearTimeout(timer);
        setLoading(false);
        inputRef.current?.focus();
      }
    },
    [context, loading],
  );

  const reset = () => {
    setMessages([]);
    setContext({});
    setSuggestions(STARTERS);
    setInput('');
    inputRef.current?.focus();
  };

  return (
    <section id="portfolio-assistant" className="chat" role="dialog" aria-modal="false" aria-labelledby="assistant-title">
      <header className="chat__head">
        <div className="chat__avatar">
          <Image src={avatar} alt="" width={32} height={32} sizes="32px" />
        </div>
        <div className="chat__title">
          <b id="assistant-title">Ask about Salman</b>
          <span>Answers from his portfolio and resume</span>
        </div>
        <button type="button" className="icon-btn" onClick={reset} aria-label="Start a new conversation" title="New conversation" disabled={loading}>
          <Reset />
        </button>
        <button type="button" className="icon-btn" onClick={onClose} aria-label="Close assistant" title="Close">
          <Close />
        </button>
      </header>

      <div className="chat__log" ref={logRef} aria-live="polite" aria-busy={loading}>
        {messages.length === 0 && (
          <div className="chat__empty">
            <h3>Questions about Salman&apos;s work?</h3>
            <p>Ask about his experience, skills, projects or how to reach him. Answers come from his portfolio and resume. If something isn&apos;t covered, I&apos;ll say so.</p>
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`msg msg--${m.role}${m.error ? ' msg--error' : ''}`}>
            {m.role === 'bot' ? <RichText text={m.text} /> : m.text}
            {(m.links?.length || m.retry) && (
              <div className="msg__links">
                {m.retry && (
                  <button type="button" onClick={() => ask(m.retry!)}>Try again</button>
                )}
                {m.links?.map((l) => (
                  <a
                    key={l.href + l.label}
                    href={l.href}
                    {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    {...(l.href.endsWith('.pdf') ? { download: true } : {})}
                    onClick={!l.external ? onClose : undefined}
                  >
                    {l.label} <ArrowUpRight />
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="msg msg--bot typing" role="status" aria-label="Assistant is typing">
            <i /><i /><i />
          </div>
        )}
      </div>

      {suggestions.length > 0 && !loading && (
        <div className="suggestions" aria-label="Suggested questions">
          {suggestions.slice(0, 4).map((s) => (
            <button key={s} type="button" onClick={() => ask(s)}>{s}</button>
          ))}
        </div>
      )}

      <form
        className="chat__form"
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
      >
        <label htmlFor="assistant-input" className="sr-only">Your question</label>
        <input
          id="assistant-input"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about skills, projects, AI..."
          maxLength={MAX_CHARS}
          autoComplete="off"
          enterKeyHint="send"
        />
        <button className="chat__send" type="submit" disabled={!input.trim() || loading} aria-label="Send question">
          <Send />
        </button>
      </form>
      <p className="chat__foot">Searches Salman&apos;s portfolio. It does not generate or guess answers.</p>
    </section>
  );
}
