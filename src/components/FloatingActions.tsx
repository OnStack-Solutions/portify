'use client';

import dynamic from 'next/dynamic';
import { useCallback, useRef, useState } from 'react';
import { whatsappHref } from '@/lib/site';
import { Chat, WhatsApp } from './icons';

// The chat UI is only downloaded when someone opens it (or hovers the launcher).
const loadPanel = () => import('./ChatPanel');
const ChatPanel = dynamic(loadPanel, { ssr: false });

export function FloatingActions() {
  const [open, setOpen] = useState(false);
  const launcher = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => launcher.current?.focus());
  }, []);

  return (
    <>
      <div className="fab-stack">
        <a
          className="fab fab--wa"
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Salman on WhatsApp (opens in a new tab)"
        >
          <WhatsApp />
          <span className="fab__tip" aria-hidden>WhatsApp</span>
        </a>
        <button
          ref={launcher}
          type="button"
          className="fab fab--chat"
          aria-expanded={open}
          aria-controls="portfolio-assistant"
          onClick={() => setOpen(true)}
          onPointerEnter={loadPanel}
          onFocus={loadPanel}
        >
          <Chat />
          <span className="sr-only">Ask about Salman</span>
          <span className="fab__tip" aria-hidden>Ask about my work</span>
        </button>
      </div>
      {open && <ChatPanel onClose={close} />}
    </>
  );
}
