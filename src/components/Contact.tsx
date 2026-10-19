import { person } from '@/content/profile';
import { telHref, whatsappHref } from '@/lib/site';
import { ContactForm } from './ContactForm';
import { Section } from './Section';
import { Download, LinkedIn, Mail, Phone, WhatsApp } from './icons';

export function Contact() {
  const items = [
    { icon: <Mail />, label: 'Email', value: person.email, href: `mailto:${person.email}` },
    { icon: <WhatsApp />, label: 'WhatsApp', value: person.phoneDisplay, href: whatsappHref(), external: true },
    { icon: <LinkedIn />, label: 'LinkedIn', value: `in/${person.linkedinHandle}`, href: person.linkedin, external: true },
    { icon: <Phone />, label: 'Phone', value: person.phoneDisplay, href: telHref },
    { icon: <Download />, label: 'Resume', value: 'Download PDF', href: person.resumePath, download: true },
  ];
  return (
    <Section id="contact" title="Contact">
      <p className="lead">
        Have a role or a project in mind? The quickest way to reach me is WhatsApp or email, and my resume is one click away.
      </p>
      <div className="contact__grid">
        <ul className="contact-list" role="list">
          {items.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                {...(c.download ? { download: true } : {})}
              >
                {c.icon}
                <span className="contact-list__label">{c.label}</span>
                <span className="contact-list__value">{c.value}</span>
              </a>
            </li>
          ))}
        </ul>
        <ContactForm />
      </div>
    </Section>
  );
}
