import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container notfound">
      <p className="muted">404</p>
      <h1>This page doesn’t exist</h1>
      <p className="muted">The page you’re looking for doesn’t exist or has moved.</p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link className="btn btn--primary" href="/">Go to the homepage</Link>
        <Link className="btn btn--secondary" href="/#work">See projects</Link>
      </div>
    </section>
  );
}
