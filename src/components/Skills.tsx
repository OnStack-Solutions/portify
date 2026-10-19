import { skills } from '@/content/profile';
import { Section } from './Section';

export function Skills() {
  return (
    <Section id="skills" num="04" title="Skills" note="Grouped by area. Each case study lists the stack used on that project.">
      <dl className="skills">
        {skills.map((g) => (
          <div className="skill-group" key={g.name}>
            <dt>{g.name}</dt>
            <dd>
              <span className="skill-tags">
                {g.items.map((item) => <span key={item} className="skill-tag">{item}</span>)}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
