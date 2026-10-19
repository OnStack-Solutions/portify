import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container notfound">
      <p className="eyebrow">Error 404</p>
      <h1>This page doesn&apos;t exist.</h1>
      <p className="muted">The page you&apos;re looking for has moved or never existed.</p>
      <div className="actions">
        <Link className="btn btn--ink" href="/">Back to the homepage</Link>
        <Link className="btn btn--outline" href="/#work">See projects</Link>
      </div>
    </section>
  );
}
