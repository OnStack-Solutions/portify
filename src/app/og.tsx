import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const ogSize = { width: 1200, height: 630 };

const read = (...p: string[]) => readFile(path.join(process.cwd(), ...p));

/** Share card for case studies: project name and summary, with Salman's photo and titles. */
export async function renderProjectOg({ name, tagline, role }: { name: string; tagline: string; role: string }) {
  const [regular, semibold, avatar] = await Promise.all([
    read('node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf'),
    read('node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.ttf'),
    read('src/assets/salman-avatar.jpg'),
  ]);
  const avatarSrc = `data:image/jpeg;base64,${avatar.toString('base64')}`;
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#fbfbfa', padding: '64px 72px', color: '#171717', fontFamily: 'Geist' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatarSrc} width={64} height={64} style={{ borderRadius: 999 }} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 28, fontWeight: 600 }}>Salman Bashir</div>
            <div style={{ display: 'flex', fontSize: 20, color: '#6b6b6b' }}>Senior Software Engineer · Full Stack Developer · AI Integration</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 22, color: '#6b6b6b', marginBottom: 14 }}>Case study · {role}</div>
          <div style={{ display: 'flex', fontSize: 84, fontWeight: 600, lineHeight: 1.05, letterSpacing: -3 }}>{name}</div>
          <div style={{ display: 'flex', fontSize: 38, lineHeight: 1.25, color: '#454545', marginTop: 16, maxWidth: 1000 }}>{tagline}</div>
        </div>
        <div style={{ display: 'flex', height: 2, background: '#e7e7e4' }} />
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Geist', data: regular, style: 'normal', weight: 400 },
        { name: 'Geist', data: semibold, style: 'normal', weight: 600 },
      ],
    },
  );
}
