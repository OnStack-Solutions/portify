import { Fragment } from 'react';
import Link from 'next/link';
import { getProject, services } from '@/content/profile';
import { Section } from './Section';

export function Services() {
  return (
    <Section id="services" num="05" title="Services" note="Work I take on for teams and clients.">
      <div className="services">
        {services.map((s, i) => (
          <div className="service" key={s.title}>
            <p className="service__num">{String(i + 1).padStart(2, '0')}</p>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <small>
              For example:{' '}
              {s.evidence.map((slug, i) => (
                <Fragment key={slug}>
                  {i > 0 && ', '}
                  <Link className="text-link" href={`/projects/${slug}`}>{getProject(slug)!.name}</Link>
                </Fragment>
              ))}
            </small>
          </div>
        ))}
      </div>
    </Section>
  );
}
