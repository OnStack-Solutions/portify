import type { CSSProperties } from 'react';
import Image from 'next/image';
import type { Shot, Showcase } from '@/content/showcase';

function Browser({ shot, label, priority, sizes }: { shot: Shot; label: string; priority?: boolean; sizes: string }) {
  return (
    <div className="browser">
      <div className="browser__bar" aria-hidden="true">
        <span className="browser__dots"><i /><i /><i /></span>
        <span className="browser__addr">{label}</span>
      </div>
      <Image src={shot.src} alt={shot.alt} placeholder="blur" priority={priority} sizes={sizes} className="browser__img" />
    </div>
  );
}

function Phone({ shot, className = 'phone' }: { shot: Shot; className?: string }) {
  return (
    <div className={className}>
      <Image src={shot.src} alt={shot.alt} placeholder="blur" sizes="(max-width: 640px) 34vw, 240px" className="phone__img" />
    </div>
  );
}

/** Hero stage: the main screen in a browser frame, with an optional phone screen beside it. */
export function ProjectShowcase({ data, name }: { data: Showcase; name: string }) {
  const style = { '--brand': data.brand } as CSSProperties;
  if (!data.main) {
    const phones = data.phones ?? [];
    return (
      <figure className="showcase" style={style}>
        <div className="stage stage--mobile">
          {phones.map((s, i) => (
            <div key={s.caption} className="phone phone--stage">
              <Image src={s.src} alt={s.alt} placeholder="blur" priority={i === 1} sizes="(max-width: 640px) 30vw, 280px" className="phone__img" />
            </div>
          ))}
        </div>
        <figcaption className="showcase__cap">
          {phones.map((s) => <span key={s.caption}>{s.caption}</span>)}
        </figcaption>
      </figure>
    );
  }
  return (
    <figure className="showcase" style={style}>
      <div className={`stage${data.phone ? ' stage--phone' : ''}`}>
        <Browser shot={data.main} label={name} priority sizes="(max-width: 1240px) 92vw, 1120px" />
        {data.phone && <Phone shot={data.phone} />}
      </div>
      <figcaption className="showcase__cap">
        <span>{data.main.caption}</span>
        {data.phone && <span>{data.phone.caption}</span>}
      </figcaption>
    </figure>
  );
}

/** Additional screens, shown after the write-up. */
export function ProjectScreens({ shots, apps, name }: { shots: Shot[]; apps: Shot[]; name: string }) {
  return (
    <section className="screens" aria-labelledby="screens-title">
      <h2 id="screens-title">More from {name}</h2>
      {shots.length > 0 && (
        <div className="screens__grid" data-count={shots.length}>
          {shots.map((s) => (
            <figure key={s.caption} className="screen">
              <Browser shot={s} label={name} sizes="(max-width: 900px) 92vw, 1120px" />
              <figcaption>{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      )}
      {apps.length > 0 && (
        <div className="apps">
          {apps.map((s) => (
            <figure key={s.caption} className="screen">
              <Phone shot={s} className="phone phone--flat" />
              <figcaption>{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
