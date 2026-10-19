import { Fragment } from 'react';
import Link from 'next/link';
import { getProject, services } from '@/content/profile';
import { Section } from './Section';

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="How I can help your team."
      note="Work I take on for teams and clients. Every service is backed by delivered projects."
    >
      <ul className="services" role="list">
        {services.map((s, i) => (
          <li className="service reveal" key={s.title}>
            <p className="service__n">{String(i + 1).padStart(2, '0')}</p>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <p className="service__proof">
              See{' '}
              {s.evidence.map((slug, j) => (
                <Fragment key={slug}>
                  {j > 0 && (j === s.evidence.length - 1 ? ' and ' : ', ')}
                  <Link className="text-link" href={`/projects/${slug}`}>{getProject(slug)!.name}</Link>
                </Fragment>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
