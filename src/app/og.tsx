import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const ogSize = { width: 1200, height: 630 };

const read = (...p: string[]) => readFile(path.join(process.cwd(), ...p));

const ACCENT = '#7c7aff';
const ACCENT_DIM = 'rgba(124,122,255,0.12)';
const BG = '#0d0d0f';
const SURFACE = '#161618';
const BORDER = '#2c2c30';
const TEXT = '#ebebeb';
const MUTED = '#8a8a8a';

/** Share card for case studies: project name and summary, with Salman's photo and titles. */
export async function renderProjectOg({ name, tagline, role }: { name: string; tagline: string; role: string }) {
  const [regular, bold, avatar] = await Promise.all([
    read('node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf'),
    read('node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf'),
    read('src/assets/salman-avatar.jpg'),
  ]);
  const avatarSrc = `data:image/jpeg;base64,${avatar.toString('base64')}`;
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', background: BG, padding: '56px 72px',
        color: TEXT, fontFamily: 'Geist', position: 'relative',
      }}>
        {/* ambient glow */}
        <div style={{ position: 'absolute', bottom: -80, right: -80, width: 500, height: 500, borderRadius: 999, background: 'radial-gradient(circle, rgba(124,122,255,0.18) 0%, transparent 70%)', display: 'flex' }} />

        {/* author row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatarSrc} width={52} height={52} style={{ borderRadius: 999, border: `2px solid ${BORDER}` }} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 24, fontWeight: 700, color: TEXT }}>Salman Bashir</div>
            <div style={{ display: 'flex', fontSize: 17, color: MUTED, marginTop: 2 }}>Senior Software Engineer · Full Stack · AI</div>
          </div>
        </div>

        {/* project info */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ display: 'flex', fontSize: 13, fontWeight: 700, color: ACCENT, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Case Study</div>
            <div style={{ display: 'flex', width: 32, height: 1.5, background: ACCENT }} />
            <div style={{ display: 'flex', fontSize: 13, color: MUTED, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{role}</div>
          </div>
          <div style={{ display: 'flex', fontSize: 80, fontWeight: 700, lineHeight: 1.04, letterSpacing: -3, color: TEXT }}>{name}</div>
          <div style={{ display: 'flex', fontSize: 30, lineHeight: 1.35, color: MUTED, marginTop: 18, maxWidth: 900 }}>{tagline}</div>
        </div>

        {/* bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', height: 1, flex: 1, background: BORDER }} />
          <div style={{ display: 'flex', marginLeft: 20, padding: '7px 16px', borderRadius: 8, background: SURFACE, border: `1px solid ${BORDER}`, fontSize: 14, color: MUTED }}>
            salmanbashir.dev
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Geist', data: regular, style: 'normal', weight: 400 },
        { name: 'Geist', data: bold, style: 'normal', weight: 700 },
      ],
    },
  );
}

/** Share card for the homepage / profile. */
export async function renderHomeOg() {
  const [regular, bold, avatar] = await Promise.all([
    read('node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf'),
    read('node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf'),
    read('src/assets/salman-avatar.jpg'),
  ]);
  const avatarSrc = `data:image/jpeg;base64,${avatar.toString('base64')}`;
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', background: BG, padding: '56px 72px',
        color: TEXT, fontFamily: 'Geist', position: 'relative',
      }}>
        {/* ambient glow */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, borderRadius: 999, background: 'radial-gradient(circle, rgba(124,122,255,0.14) 0%, transparent 65%)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: -60, left: 300, width: 400, height: 400, borderRadius: 999, background: 'radial-gradient(circle, rgba(124,122,255,0.08) 0%, transparent 65%)', display: 'flex' }} />

        {/* top row: eyebrow label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', fontSize: 13, fontWeight: 700, color: ACCENT, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Portfolio</div>
          <div style={{ display: 'flex', width: 32, height: 1.5, background: ACCENT }} />
          <div style={{ display: 'flex', fontSize: 13, color: MUTED, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Full Stack · AI Integration</div>
        </div>

        {/* main: name + avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginBottom: 28 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatarSrc} width={84} height={84} style={{ borderRadius: 999, border: `2px solid ${BORDER}`, boxShadow: `0 0 0 4px ${ACCENT_DIM}` }} alt="" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', fontSize: 28, fontWeight: 700, color: TEXT, letterSpacing: -0.5 }}>Salman Bashir</div>
              <div style={{ display: 'flex', gap: 12 }}>
                {['Senior Software Engineer', 'Full Stack Developer', 'AI Integration'].map((t, i) => (
                  <div key={t} style={{ display: 'flex', fontSize: 14, color: i === 0 ? ACCENT : MUTED, fontWeight: i === 0 ? 700 : 400 }}>{t}{i < 2 ? <span style={{ marginLeft: 12, color: BORDER }}>·</span> : null}</div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: 68, fontWeight: 700, lineHeight: 1.06, letterSpacing: -3, color: TEXT, maxWidth: 950 }}>
            Building software that ships.
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: MUTED, marginTop: 20, lineHeight: 1.4, maxWidth: 780 }}>
            5+ years of full-stack and AI integration experience, based in Lahore.
          </div>
        </div>

        {/* bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Next.js', 'React', 'Node.js', 'Python', 'LLM / RAG'].map((t) => (
              <div key={t} style={{ display: 'flex', padding: '6px 14px', borderRadius: 7, background: SURFACE, border: `1px solid ${BORDER}`, fontSize: 14, color: MUTED }}>{t}</div>
            ))}
          </div>
          <div style={{ display: 'flex', padding: '7px 16px', borderRadius: 8, background: SURFACE, border: `1px solid ${BORDER}`, fontSize: 14, color: MUTED }}>
            salmanbashir.dev
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Geist', data: regular, style: 'normal', weight: 400 },
        { name: 'Geist', data: bold, style: 'normal', weight: 700 },
      ],
    },
  );
}
