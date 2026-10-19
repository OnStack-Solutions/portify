'use client';

import { useId, useState } from 'react';
import { mailtoHref, whatsappHref } from '@/lib/site';
import { Mail, WhatsApp } from './icons';

type Errors = Partial<Record<'name' | 'message' | 'email', string>>;
const TOPICS = ['A full-time role', 'A freelance or contract project', 'AI / LLM integration', 'Something else'];

/**
 * No backend and no data stored: the form composes a message and opens WhatsApp or the
 * visitor's email app with it, so it works on a static Vercel deployment.
 */
export function ContactForm() {
  const id = useId();
  const [values, setValues] = useState({ name: '', email: '', topic: TOPICS[0], message: '' });
  const [errors, setErrors] = useState<Errors>({});

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const validate = (): Errors => {
    const e: Errors = {};
    if (values.name.trim().length < 2) e.name = 'Please enter your name.';
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = 'That email doesn’t look right.';
    if (values.message.trim().length < 10) e.message = 'Please add a short message (10+ characters).';
    return e;
  };

  const compose = () =>
    `Hi Salman, I'm ${values.name.trim()}${values.email ? ` (${values.email.trim()})` : ''}.\nTopic: ${values.topic}\n\n${values.message.trim()}`;

  const send = (channel: 'whatsapp' | 'email') => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`${id}-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    const url = channel === 'whatsapp' ? whatsappHref(compose()) : mailtoHref(`${values.topic}: ${values.name.trim()}`, compose());
    if (channel === 'whatsapp') window.open(url, '_blank', 'noopener,noreferrer');
    else window.location.href = url;
  };

  const field = (k: 'name' | 'email' | 'message') => ({
    id: `${id}-${k}`,
    'aria-invalid': Boolean(errors[k]) || undefined,
    'aria-describedby': errors[k] ? `${id}-${k}-error` : undefined,
  });

  return (
    <form className="form reveal" noValidate onSubmit={(e) => { e.preventDefault(); send('whatsapp'); }} aria-labelledby={`${id}-title`}>
      <h3 id={`${id}-title`}>Send a message</h3>
      <p>This opens WhatsApp or your email app with the message filled in.</p>
      <div className="form__row">
        <div className="field" data-invalid={Boolean(errors.name)}>
          <label htmlFor={`${id}-name`}>Your name</label>
          <input {...field('name')} value={values.name} onChange={set('name')} autoComplete="name" required />
          {errors.name && <span className="field__error" id={`${id}-name-error`}>{errors.name}</span>}
        </div>
        <div className="field" data-invalid={Boolean(errors.email)}>
          <label htmlFor={`${id}-email`}>Email <small>(optional)</small></label>
          <input {...field('email')} type="email" value={values.email} onChange={set('email')} autoComplete="email" inputMode="email" />
          {errors.email && <span className="field__error" id={`${id}-email-error`}>{errors.email}</span>}
        </div>
      </div>
      <div className="field">
        <label htmlFor={`${id}-topic`}>What’s it about?</label>
        <select id={`${id}-topic`} value={values.topic} onChange={set('topic')}>
          {TOPICS.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="field" data-invalid={Boolean(errors.message)}>
        <label htmlFor={`${id}-message`}>Message</label>
        <textarea {...field('message')} value={values.message} onChange={set('message')} maxLength={1500} required />
        {errors.message && <span className="field__error" id={`${id}-message-error`}>{errors.message}</span>}
      </div>
      <div className="form__actions">
        <button type="submit" className="btn btn--primary"><WhatsApp /> Send on WhatsApp</button>
        <button type="button" className="btn btn--secondary" onClick={() => send('email')}><Mail /> Send by email</button>
      </div>
      <p className="form__note">Nothing you type here is stored on this site.</p>
    </form>
  );
}
