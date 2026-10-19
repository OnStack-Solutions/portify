type Tone = 'paper' | 'tint' | 'ink';

export function Section({
  id,
  eyebrow,
  title,
  note,
  tone = 'paper',
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  note?: React.ReactNode;
  tone?: Tone;
  children: React.ReactNode;
}) {
  return (
    <section className={`section section--${tone}`} id={id} aria-labelledby={`${id}-title`}>
      <div className="container">
        <header className="sec-head">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 id={`${id}-title`} className="sec-title">{title}</h2>
          </div>
          {note && <p className="sec-note">{note}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
