'use client';

import Link from 'next/link';
import { useState } from 'react';
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
