import { NextResponse, type NextRequest } from 'next/server';
import { answer, type ChatContext } from '@/lib/chat/engine';
import { rateLimit } from '@/lib/chat/rate-limit';
import { projects } from '@/content/profile';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 4_096;
const MAX_MESSAGE_CHARS = 500;
const SLUGS = new Set(projects.map((p) => p.slug));

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });

function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true; // non-browser clients; still rate-limited
  try {
    return new URL(origin).host === req.headers.get('host');
  } catch {
    return false;
  }
}

function parseContext(value: unknown): ChatContext {
  if (!value || typeof value !== 'object') return {};
  const { project } = value as { project?: unknown };
  return typeof project === 'string' && SLUGS.has(project) ? { project } : {};
}

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return json({ error: 'Forbidden' }, 403);
  if (!req.headers.get('content-type')?.includes('application/json')) return json({ error: 'Expected JSON' }, 415);

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return json({ error: 'Too many messages. Please wait a moment and try again.' }, 429, { 'Retry-After': String(limit.retryAfter) });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return json({ error: 'Message too large' }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }
  const { message, context } = (body ?? {}) as { message?: unknown; context?: unknown };
  if (typeof message !== 'string' || !message.trim()) return json({ error: 'Message is required' }, 400);
  if (message.length > MAX_MESSAGE_CHARS) return json({ error: `Please keep messages under ${MAX_MESSAGE_CHARS} characters.` }, 400);

  const reply = answer(message.trim(), parseContext(context));
  return json({ reply: { text: reply.text, suggestions: reply.suggestions, links: reply.links, context: reply.context } });
}

export function GET() {
  return json({ error: 'Method not allowed' }, 405, { Allow: 'POST' });
}
