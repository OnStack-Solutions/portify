import { person } from '@/content/profile';

/**
 * Canonical site URL. Set NEXT_PUBLIC_SITE_URL to your custom domain; on Vercel the
 * production URL is used automatically when it is not set. Never hard-code a domain here.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, '');
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return 'http://localhost:3000';
}

export function whatsappHref(message: string = person.whatsappGreeting): string {
  return `https://wa.me/${person.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const mailtoHref = (subject = 'Project inquiry', body = '') =>
  `mailto:${person.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;

export const telHref = `tel:${person.phoneE164}`;

export const seo = {
  title: `${person.name} | Full Stack Developer and AI Integration Engineer`,
  description:
    'Full Stack Developer in Lahore with 5+ years building React, Next.js and Node.js products, specialising in AI integration: RAG, natural-language-to-SQL and AI assistants.',
  keywords: [
    'Salman Bashir',
    'Full Stack Developer',
    'Senior Software Engineer',
    'AI Integration',
    'Next.js Developer',
    'React Developer',
    'Node.js Developer',
    'Express.js',
    'NestJS',
    'LLM integration',
    'RAG',
    'Full Stack Developer Lahore',
    'Full Stack Developer Pakistan',
    'POS integration developer',
    'Oracle OHIP integration',
    'Xero integration',
  ],
};
