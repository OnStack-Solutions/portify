import Image from 'next/image';
import photo from '@/assets/salman-photo.jpg';
import { experience, experienceText, experienceTextCapitalized, person } from '@/content/profile';
import { whatsappHref } from '@/lib/site';
import { ArrowRight, Download, LinkedIn, Mail, MapPin, WhatsApp } from './icons';

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero__grid">
          <div>
            <h1 id="hero-title">
              <span className="hero__kicker">{person.name} | {person.titles[0]}</span>
              <span className="hero__title">
                <span>Full-stack products,</span>
                <span className="hero__accent">with AI built in.</span>
              </span>
            </h1>

            <p className="hero__lead">
              I&apos;m a full stack developer with <strong>{experienceText()}</strong> of shipping production web apps
              with React, Next.js and Node.js, and integrating LLMs into them: natural-language-to-SQL,
              retrieval-augmented generation and AI assistants.
            </p>

            <div className="hero__actions">
              <a className="btn btn--accent" href="#work">
                See selected work <ArrowRight className="icon-shift" />
              </a>
              <a className="btn btn--outline-ink" href={person.resumePath} download>
                <Download /> Download resume
              </a>
            </div>

            <ul className="hero__links" role="list" aria-label="Contact details">
              <li><a href={`mailto:${person.email}`}><Mail /> {person.email}</a></li>
              <li><a href={person.linkedin} target="_blank" rel="noopener noreferrer"><LinkedIn /> LinkedIn</a></li>
              <li><a href={whatsappHref()} target="_blank" rel="noopener noreferrer"><WhatsApp /> WhatsApp</a></li>
            </ul>
          </div>

          <figure className="portrait">
            <div className="portrait__img">
              <Image
                src={photo}
                alt={`Portrait of ${person.name}`}
                fill
                priority
                placeholder="blur"
                sizes="(max-width: 900px) 96px, 320px"
              />
            </div>
            <figcaption className="portrait__cap">
              <span><b>{person.name}</b></span>
              <span><MapPin style={{ display: 'inline', width: 12, height: 12, verticalAlign: '-1px' }} /> Lahore, PK</span>
            </figcaption>
          </figure>
        </div>

        <dl className="hero__facts">
          <div className="hero__fact"><dt>Experience</dt><dd>{experienceTextCapitalized()} · {experience.roles[0].title} at {experience.company}</dd></div>
          <div className="hero__fact"><dt>Frontend</dt><dd>React, Next.js, Redux, Tailwind CSS</dd></div>
          <div className="hero__fact"><dt>Backend &amp; data</dt><dd>Node.js, NestJS, Express.js · MySQL, PostgreSQL, MongoDB</dd></div>
          <div className="hero__fact"><dt>AI &amp; integrations</dt><dd>OpenAI, Anthropic, Ollama · RAG, NL-to-SQL · POS/PMS, Xero</dd></div>
        </dl>
      </div>
    </section>
  );
}
