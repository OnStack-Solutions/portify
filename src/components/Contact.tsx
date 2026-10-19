import { person } from '@/content/profile';
import { telHref, whatsappHref } from '@/lib/site';
import { ContactForm } from './ContactForm';
import { ArrowUpRight, Download, LinkedIn, Phone, WhatsApp } from './icons';

export function Contact() {
  const channels = [
    { icon: <WhatsApp />, label: 'WhatsApp', value: person.phoneDisplay, href: whatsappHref(), external: true },
    { icon: <LinkedIn />, label: 'LinkedIn', value: `in/${person.linkedinHandle}`, href: person.linkedin, external: true },
    { icon: <Phone />, label: 'Phone', value: person.phoneDisplay, href: telHref },
    { icon: <Download />, label: 'Résumé', value: 'Download PDF', href: person.resumePath, download: true },
  ];
  return (
    <section className="section section--ink" id="contact" aria-labelledby="contact-title">
      <div className="container contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="contact__title">
            Have a role or project in mind? <span>Let&apos;s talk.</span>
          </h2>
          <p className="contact__lead">
            The quickest way to reach me is WhatsApp or email, and my résumé is one click away.
          </p>
          <a className="contact__email" href={`mailto:${person.email}`}>
            {person.email} <ArrowUpRight />
          </a>
          <ul className="channels" role="list">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  className="channel"
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  {...(c.download ? { download: true } : {})}
                >
                  <span className="channel__icon" aria-hidden>{c.icon}</span>
                  <span>
                    <span className="channel__label">{c.label}</span>
                    <span className="channel__value" style={{ display: 'block' }}>{c.value}</span>
                  </span>
                  <ArrowUpRight />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
