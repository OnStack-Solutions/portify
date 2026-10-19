export function Section({ id, title, note, num, children }: { id: string; title: string; note?: string; num: string; children: React.ReactNode }) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <div className="container">
        <header className="sec-head">
          <div className="sec-eyebrow" aria-hidden><span className="sec-num">{num}</span></div>
          <h2 id={`${id}-title`} className="sec-title">{title}</h2>
          {note && <p className="sec-note">{note}</p>}
        </header>
        <div className="sec-body">{children}</div>
      </div>
    </section>
  );
}
