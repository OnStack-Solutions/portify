import { skills } from '@/content/profile';
import { Section } from './Section';

export function Skills() {
  return (
    <Section id="skills" title="Skills" note="Grouped by area. Each case study lists the stack used on that project.">
      <dl className="skills">
        {skills.map((g) => (
          <div key={g.name}>
            <dt>{g.name}</dt>
            <dd>{g.items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
