'use client';

import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { useState, type CSSProperties } from 'react';
import { ArrowRight } from './icons';

export type ProjectCardData = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  industry: string;
  role: string;
  tech: string[];
  ai?: boolean;
  solo?: boolean;
  /** Main product screenshot, when one exists. */
  cover?: StaticImageData;
  /** Mobile-only products: phone screens used as the card cover instead. */
  coverPhones?: StaticImageData[];
  brand?: string;
};

const FILTERS: { key: string; label: string; test: (p: ProjectCardData) => boolean }[] = [
  { key: 'all', label: 'All', test: () => true },
  { key: 'ai', label: 'AI-powered', test: (p) => Boolean(p.ai) },
  { key: 'realestate', label: 'Real estate', test: (p) => /real estate/i.test(p.industry) },
  { key: 'hospitality', label: 'Hospitality', test: (p) => /hospitality/i.test(p.industry) },
  { key: 'business', label: 'Business apps', test: (p) => /crm|billing|recruit|social/i.test(p.industry) },
];

export function ProjectGrid({ projects }: { projects: ProjectCardData[] }) {
  const [active, setActive] = useState('all');
  const filter = FILTERS.find((f) => f.key === active)!;

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className="filter"
            aria-pressed={active === f.key}
            onClick={() => setActive(f.key)}
          >
            {f.label} <span>{projects.filter(f.test).length}</span>
          </button>
        ))}
      </div>

      <ul className="pgrid" role="list">
        {projects.map((p, i) => (
          <li key={p.slug} className="pcard" hidden={!filter.test(p)}>
            {/* Decorative duplicate of the title link, so it is hidden from assistive tech and the tab order. */}
            <Link
              href={`/projects/${p.slug}`}
              className={`pcard__media${p.cover || p.coverPhones ? '' : ' pcard__media--type'}`}
              style={p.brand ? ({ '--brand': p.brand } as CSSProperties) : undefined}
              aria-hidden="true"
              tabIndex={-1}
            >
              {p.cover ? (
                <span className="pcard__window">
                  <span className="pcard__bar"><i /><i /><i /></span>
                  <Image src={p.cover} alt="" placeholder="blur" sizes="(max-width: 680px) 90vw, (max-width: 1060px) 45vw, 380px" className="pcard__img" />
                </span>
              ) : p.coverPhones ? (
                <span className="pcard__phones">
                  {p.coverPhones.slice(0, 3).map((src) => (
                    <span key={src.src} className="pcard__phone">
                      <Image src={src} alt="" placeholder="blur" sizes="120px" className="phone__img" />
                    </span>
                  ))}
                </span>
              ) : (
                <span className="pcard__type">
                  <b>{p.name.split(/\s+/).map((w) => w[0]).join('')}</b>
                  <span>{p.industry}</span>
                </span>
              )}
            </Link>
            <div className="pcard__top">
              <span className="pcard__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="pcard__industry">{p.industry}</span>
              {p.ai && <span className="badge badge--ai">AI</span>}
            </div>

            <h3 className="pcard__title"><Link href={`/projects/${p.slug}`}>{p.name}</Link></h3>
            <p className="pcard__tagline">{p.tagline}</p>
            <p className="pcard__summary">{p.summary}</p>

            <dl className="pcard__facts">
              <div><dt>Role</dt><dd>{p.role}{p.solo && ' · sole developer'}</dd></div>
              <div>
                <dt>Stack</dt>
                <dd>
                  <ul className="chips" role="list">
                    {p.tech.slice(0, 7).map((t) => <li key={t} className="chip">{t}</li>)}
                    {p.tech.length > 7 && <li className="chip chip--more">+{p.tech.length - 7} more</li>}
                  </ul>
                </dd>
              </div>
            </dl>

            <div className="pcard__actions">
              <Link className="pcard__cta" href={`/projects/${p.slug}`}>
                Read case study <ArrowRight />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
