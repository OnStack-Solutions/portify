import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject, person, visibleProjects } from '@/content/profile';
import { getSiteUrl, whatsappHref } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { Diagram } from '@/components/Diagram';
import { ArrowLeft, Download, WhatsApp } from '@/components/icons';
import { ProjectScreens, ProjectShowcase } from '@/components/ProjectShowcase';
import { showcases } from '@/content/showcase';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return visibleProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = `${p.name} case study`;
  const description = `${p.summary} Built with ${p.tech.slice(0, 5).join(', ')}.`.slice(0, 300);
  return {
    title,
    description,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { type: 'article', url: `/projects/${p.slug}`, title: `${p.name}: ${p.tagline} | ${person.name}`, description, siteName: person.name, locale: 'en_US' },
    twitter: { card: 'summary_large_image', title: `${p.name}: ${p.tagline}`, description },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p || p.hidden) notFound();
  const i = visibleProjects.indexOf(p);
  const prev = visibleProjects[(i - 1 + visibleProjects.length) % visibleProjects.length];
  const next = visibleProjects[(i + 1) % visibleProjects.length];
  const url = getSiteUrl();
  const show = showcases[p.slug];

  return (
    <article>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: url },
            { '@type': 'ListItem', position: 2, name: 'Work', item: `${url}/#work` },
            { '@type': 'ListItem', position: 3, name: p.name, item: `${url}/projects/${p.slug}` },
          ],
        }}
      />
      <header className={`case-hero${show ? ' case-hero--shot' : ''}`}>
        <div className="container">
          <div className="case-topbar">
            <Link href="/#work" className="back-link">
              <ArrowLeft /> Back to all projects
            </Link>
          </div>
          <nav aria-label="Breadcrumb">
            <ol className="crumbs" role="list">
              <li><Link href="/">Home</Link> /</li>
              <li><Link href="/#work">Work</Link> /</li>
              <li aria-current="page">{p.name}</li>
            </ol>
          </nav>

          <div className="case__head">
            <p className="eyebrow">Case study · {p.industry}</p>
            <h1>{p.name}</h1>
            <p className="case__tagline">{p.tagline}</p>
          </div>

          <dl className="case__meta">
            <div><dt>My role</dt><dd>{p.role}</dd></div>
            <div><dt>Domain</dt><dd>{p.industry}</dd></div>
          </dl>
        </div>
      </header>

      <div className="case">
        <div className="container">
          {show && <ProjectShowcase data={show} name={p.name} />}

          {p.diagram && (
            <div className="case__diagram">
              <Diagram data={p.diagram} label={p.name} large />
            </div>
          )}

          <div className="case__body">
            <div>
              <section className="case__section">
                <h2>Overview</h2>
                <p>{p.overview}</p>
              </section>
              <section className="case__section">
                <h2>What I did</h2>
                <ul className="bullets" role="list">
                  {p.contributions.map((c) => <li key={c}><span>{c}</span></li>)}
                </ul>
              </section>
              <section className="case__section">
                <h2>Key features</h2>
                <ul className="bullets" role="list">
                  {p.features.map((f) => <li key={f}><span>{f}</span></li>)}
                </ul>
              </section>
            </div>
            <aside className="case__aside" aria-label="Project details">
              <div>
                <h2>Tech stack</h2>
                <ul className="chips" role="list">
                  {p.tech.map((t) => <li key={t} className="chip">{t}</li>)}
                </ul>
              </div>
              <div className="case__cta">
                <p>Working on something similar? I&apos;m happy to talk it through.</p>
                <a
                  className="btn btn--accent"
                  href={whatsappHref(`Hi Salman, I read your ${p.name} case study and would like to discuss a similar project.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsApp /> Message on WhatsApp
                </a>
                <a className="btn btn--outline-ink" href={person.resumePath} download>
                  <Download /> Download resume
                </a>
              </div>
            </aside>
          </div>

          {(show?.more || show?.apps) && <ProjectScreens shots={show.more ?? []} apps={show.apps ?? []} name={p.name} />}

          <div className="case-back">
            <Link href="/#work" className="btn btn--outline"><ArrowLeft /> Back to all projects</Link>
          </div>
          <nav className="pager" aria-label="More projects">
            <Link href={`/projects/${prev.slug}`}>
              <span>← Previous project</span>
              <b>{prev.name}</b>
            </Link>
            <Link href={`/projects/${next.slug}`}>
              <span>Next project →</span>
              <b>{next.name}</b>
            </Link>
          </nav>
        </div>
      </div>
    </article>
  );
}
