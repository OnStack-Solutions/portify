import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject, person, projects } from '@/content/profile';
import { getSiteUrl, whatsappHref } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { Diagram } from '@/components/Diagram';
import { Download, WhatsApp } from '@/components/icons';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
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
  if (!p) notFound();
  const i = projects.indexOf(p);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const url = getSiteUrl();

  return (
    <article className="case">
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
      <div className="container">
        <nav aria-label="Breadcrumb">
          <ol className="crumbs" role="list">
            <li><Link href="/">Home</Link> /</li>
            <li><Link href="/#work">Work</Link> /</li>
            <li aria-current="page">{p.name}</li>
          </ol>
        </nav>

        <header className="case__head">
          <h1>{p.name}</h1>
          <p className="case__tagline">{p.tagline}</p>
        </header>

        <dl className="case__meta">
          <div><dt>My role</dt><dd>{p.role}</dd></div>
          <div><dt>Domain</dt><dd>{p.industry}</dd></div>
          <div><dt>Delivered at</dt><dd>Nextbridge Limited</dd></div>
          <div>
            <dt>Website</dt>
            <dd>
              {p.url ? (
                <a href={p.url} target="_blank" rel="noopener noreferrer">{new URL(p.url).hostname.replace(/^www\./, '')}</a>
              ) : 'Private'}
            </dd>
          </div>
        </dl>

        {p.diagram && (
          <div className="case__diagram">
            <Diagram data={p.diagram} label={p.name} large />
          </div>
        )}

        <div className="case__body">
          <div>
            <h2>Overview</h2>
            <p>{p.overview}</p>
            <h2>What I did</h2>
            <ul className="bullets">
              {p.contributions.map((c) => <li key={c}>{c}</li>)}
            </ul>
            <h2>Key features</h2>
            <ul className="bullets">
              {p.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>
          <aside className="case__aside" aria-label="Project details">
            <div>
              <h2>Tech stack</h2>
              <ul role="list">
                {p.tech.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
            <div className="case__cta">
              <p>Working on something similar? I’m happy to talk it through.</p>
              <a
                className="btn btn--primary"
                href={whatsappHref(`Hi Salman, I read your ${p.name} case study and would like to discuss a similar project.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsApp /> Message on WhatsApp
              </a>
              <a className="btn btn--secondary" href={person.resumePath} download>
                <Download /> Resume (PDF)
              </a>
            </div>
          </aside>
        </div>

        <nav className="pager" aria-label="More projects">
          <Link href={`/projects/${prev.slug}`}>
            <span>Previous project</span>
            <b>{prev.name}</b>
          </Link>
          <Link href={`/projects/${next.slug}`}>
            <span>Next project</span>
            <b>{next.name}</b>
          </Link>
        </nav>
      </div>
    </article>
  );
}
