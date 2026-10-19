import Link from 'next/link';
import { featuredProjects, otherProjects } from '@/content/profile';
import { Diagram } from './Diagram';
import { Section } from './Section';
import { ArrowRight } from './icons';

export function Work() {
  return (
    <Section id="work" num="01" title="Selected work" note="Client platforms I have built and worked on.">
      <ul className="work" role="list">
        {featuredProjects.map((p) => (
          <li key={p.slug} className="card">
            <div className="card__body">
              <p className="card__meta">{p.industry}{'\u00a0· '}{p.role}</p>
              <h3 className="card__title">
                <Link href={`/projects/${p.slug}`}>{p.name}</Link>
              </h3>
              <p className="card__tagline">{p.tagline}</p>
              <p className="card__summary">{p.summary}</p>
              <p className="card__tech">{p.tech.slice(0, 6).join(', ')}{p.tech.length > 6 ? ' and more' : ''}</p>
              <span className="card__more" aria-hidden>Read case study <ArrowRight /></span>
            </div>
            {p.diagram && <Diagram data={p.diagram} label={p.name} />}
          </li>
        ))}
      </ul>

      <h3 className="sub-heading">Other projects</h3>
      <ul className="rows" role="list">
        {otherProjects.map((p) => (
          <li key={p.slug}>
            <Link href={`/projects/${p.slug}`} className="row">
              <span className="row__name">{p.name}</span>
              <span className="row__desc">{p.tagline}</span>
              <span className="row__role">{p.role}</span>
              <ArrowRight />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
