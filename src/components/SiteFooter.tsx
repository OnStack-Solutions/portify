import { person } from '@/content/profile';
import { whatsappHref } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>© {new Date().getFullYear()} {person.name} · {person.location}</p>
        <ul role="list" aria-label="Contact links">
          <li><a href={`mailto:${person.email}`}>{person.email}</a></li>
          <li><a href={person.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href={whatsappHref()} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
          <li><a href={person.resumePath} download>Resume (PDF)</a></li>
        </ul>
      </div>
    </footer>
  );
}
