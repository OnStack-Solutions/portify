import { education, experience, experienceTextCapitalized, formatMonth } from '@/content/profile';
import { Section } from './Section';

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="From associate to senior engineer."
      note={`${experienceTextCapitalized()} building production web applications for clients.`}
    >
      <div className="xp">
        <div className="xp__company">
          <h3>{experience.company}</h3>
          <p className="xp__meta">{experience.location} · {formatMonth(experience.start)} - present</p>
          <p className="xp__note">{experience.companyNote}</p>
        </div>

        <div>
          <ol className="timeline" role="list" aria-label={`Roles at ${experience.company}`}>
            {experience.roles.map((r, i) => (
              <li key={r.title} className="tl-item" data-current={i === 0}>
                {i === 0 && <span className="tl-item__tag">Current role</span>}
                <span className="tl-item__title">{r.title}</span>
                <span className="tl-item__date">
                  {formatMonth(r.start)} - {r.end ? formatMonth(r.end) : 'Present'}
                </span>
              </li>
            ))}
          </ol>

          <ul className="xp__duties" role="list">
            {experience.highlights.map((h) => <li key={h}><span>{h}</span></li>)}
          </ul>

          <div className="edu">
            <span className="edu__badge" aria-hidden>BSCS</span>
            <span className="edu__label">Education</span>
            <span className="edu__degree">{education.degree}</span>
            <span className="edu__school">{education.school}</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
