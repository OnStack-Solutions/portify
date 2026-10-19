import Image from 'next/image';
import Link from 'next/link';
import avatar from '@/assets/salman-avatar.jpg';
import { person } from '@/content/profile';
import { whatsappHref } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <span className="avatar" style={{ width: 24, height: 24 }}>
            <Image src={avatar} alt="" width={24} height={24} sizes="24px" />
          </span>
          <span>{person.name}</span>
          <span style={{ color: 'var(--border-2)' }}>·</span>
          <span>{person.location}</span>
          <span style={{ color: 'var(--border-2)' }}>·</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <ul role="list" aria-label="Footer links">
          <li><a href={`mailto:${person.email}`}>{person.email}</a></li>
          <li><a href={person.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href={whatsappHref()} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
          <li><Link href="/#contact">Contact</Link></li>
          <li><a href={person.resumePath} download>Resume (PDF)</a></li>
        </ul>
      </div>
    </footer>
  );
}
