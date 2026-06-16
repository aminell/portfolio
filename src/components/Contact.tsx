import type { CSSProperties } from 'react';
import { Code, Mail } from 'lucide-react';

export default function Contact() {
  const contactLinks = [
    {
      label: 'Email',
      value: 'contact@aminelarbi.com',
      url: 'mailto:contact@aminelarbi.com',
      Icon: Mail,
    },
    {
      label: 'GitHub',
      value: 'github.com/aminell',
      url: 'https://github.com/aminell',
      Icon: Code,
    },
  ];

  return (
    <section id="contact" className="section contact-section">
      <div className="section-heading" data-reveal>
        <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" /> Contact</p>
        <h2>Disponible pour échanger sur un stage ou une alternance.</h2>
      </div>

      <div className="contact-intro" data-reveal>
        <p>
          Je recherche des opportunités en cybersécurité, réseaux, systèmes et DevSecOps, dans un cadre
          où je peux apprendre vite et documenter sérieusement ce que je fais. N'hésitez pas à me contacter.
        </p>
      </div>

      <div className="contact-grid">
        {contactLinks.map((link, index) => {
          const Icon = link.Icon;

          return (
            <a
              className="contact-card"
              href={link.url}
              target={link.url.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer"
              key={link.label}
              data-reveal
              style={{ '--reveal-delay': `${index * 110}ms` } as CSSProperties}
            >
              <div className="contact-card-head">
                <Icon size={22} className="contact-icon" />
                <span>{link.label}</span>
              </div>
              <strong>{link.value}</strong>
            </a>
          );
        })}
      </div>
    </section>
  );
}
