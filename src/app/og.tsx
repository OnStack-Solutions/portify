import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { person } from '@/content/profile';

export const ogSize = { width: 1200, height: 630 };

const INK = '#0e1217';
const INK_3 = '#1f2630';
const LINE = 'rgba(255,255,255,0.14)';
const TEXT = '#eef0f3';
const TEXT_2 = '#a9b1bd';
const ACCENT = '#ff6a2b';

async function assets() {
  const fonts = path.join(process.cwd(), 'node_modules', 'geist', 'dist', 'fonts');
  const [regular, semibold, mono, photo] = await Promise.all([
    readFile(path.join(fonts, 'geist-sans', 'Geist-Regular.ttf')),
    readFile(path.join(fonts, 'geist-sans', 'Geist-SemiBold.ttf')),
    readFile(path.join(fonts, 'geist-mono', 'GeistMono-Medium.ttf')),
    readFile(path.join(process.cwd(), 'src', 'assets', 'salman-photo.jpg')),
  ]);
  return {
    photo: `data:image/jpeg;base64,${photo.toString('base64')}`,
    fonts: [
      { name: 'Geist', data: regular, style: 'normal' as const, weight: 400 as const },
      { name: 'Geist', data: semibold, style: 'normal' as const, weight: 600 as const },
      { name: 'Mono', data: mono, style: 'normal' as const, weight: 500 as const },
    ],
  };
}

function Kicker({ children }: { children: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'Mono', fontSize: 20, letterSpacing: 1.5, color: TEXT_2, textTransform: 'uppercase' }}>
      <div style={{ width: 12, height: 12, borderRadius: 3, background: ACCENT }} />
      {children}
    </div>
  );
}

/** Homepage / profile share card. */
export async function renderHomeOg() {
  const { photo, fonts } = await assets();
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: INK, color: TEXT, fontFamily: 'Geist', padding: 64 }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, paddingRight: 56 }}>
          <Kicker>{`${person.name} — ${person.titles[0]}`}</Kicker>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 76, fontWeight: 600, lineHeight: 1.02, letterSpacing: -3.5 }}>
            <div style={{ display: 'flex' }}>Full-stack products,</div>
            <div style={{ display: 'flex', color: ACCENT }}>with AI built in.</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {['React', 'Next.js', 'Node.js', 'TypeScript', 'LLMs · RAG'].map((t) => (
              <div key={t} style={{ display: 'flex', padding: '10px 16px', borderRadius: 8, border: `1px solid ${LINE}`, background: INK_3, fontFamily: 'Mono', fontSize: 19, color: TEXT_2 }}>{t}</div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: 360, borderRadius: 22, overflow: 'hidden', border: `1px solid ${LINE}` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} width={360} height={430} style={{ objectFit: 'cover', objectPosition: '50% 15%' }} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, padding: '0 22px', background: INK_3, gap: 4 }}>
            <div style={{ display: 'flex', fontSize: 28, fontWeight: 600, letterSpacing: -0.8 }}>{person.name}</div>
            <div style={{ display: 'flex', fontFamily: 'Mono', fontSize: 16, color: TEXT_2, letterSpacing: 1, textTransform: 'uppercase' }}>{person.location}</div>
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}

/** Case-study share card. */
export async function renderProjectOg({ name, tagline, industry }: { name: string; tagline: string; industry: string }) {
  const { photo, fonts } = await assets();
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: INK, color: TEXT, fontFamily: 'Geist', padding: 64 }}>
        <Kicker>{`Case study — ${industry}`}</Kicker>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 104, fontWeight: 600, lineHeight: 1, letterSpacing: -5 }}>{name}</div>
          <div style={{ display: 'flex', marginTop: 22, fontSize: 38, lineHeight: 1.25, color: TEXT_2, maxWidth: 980, letterSpacing: -0.8 }}>{tagline}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, paddingTop: 28, borderTop: `1px solid ${LINE}` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} width={56} height={56} style={{ borderRadius: 999, objectFit: 'cover', objectPosition: '50% 15%' }} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 26, fontWeight: 600 }}>{person.name}</div>
            <div style={{ display: 'flex', fontSize: 20, color: TEXT_2 }}>{person.titles.join(' · ')}</div>
          </div>
          <div style={{ display: 'flex', marginLeft: 'auto', width: 14, height: 14, borderRadius: 999, background: ACCENT }} />
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}
