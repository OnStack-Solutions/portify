import { education, experience, experienceTextCapitalized, formatMonth } from '@/content/profile';
import { Section } from './Section';

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="From trainee to senior engineer."
      note={`${experienceTextCapitalized()} building production web applications for clients.`}
    >
      <div className="xp">
        <div className="xp__company">
          <h3>{experience.company}</h3>
          <p className="xp__meta">{experience.location} · {formatMonth(experience.start)} - present</p>
          <p className="xp__note">{experience.companyNote}</p>
        </div>

        <div>
          {experience.roles.map((r, i) => (
            <div key={r.title} className="xp__role" data-current={i === 0 || undefined}>
              <div className="xp__role-header">
                {i === 0 && <span className="tl-item__tag">Current role</span>}
                <h4 className="xp__role-title">{r.title}</h4>
                {r.promotedFrom && (
                  <p className="xp__promoted">Promoted from {r.promotedFrom}</p>
                )}
                <span className="xp__role-date">
                  {formatMonth(r.start)} - {r.end ? formatMonth(r.end) : 'Present'}
                </span>
              </div>
              <ul className="xp__duties" role="list">
                {r.highlights.map((h) => <li key={h}><span>{h}</span></li>)}
              </ul>
            </div>
          ))}

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
