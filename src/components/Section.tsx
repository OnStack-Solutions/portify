/** Two-column section: a short label on the left, content on the right (stacks on small screens). */
export function Section({ id, title, note, children }: { id: string; title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <div className="container section__grid">
        <header className="section__aside">
          <h2 id={`${id}-title`}>{title}</h2>
          {note && <p>{note}</p>}
        </header>
        <div>{children}</div>
      </div>
    </section>
  );
}
