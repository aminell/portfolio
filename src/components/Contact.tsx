import { BriefcaseBusiness, Code, Mail } from 'lucide-react';

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
    {
      label: 'LinkedIn',
      value: 'Amine Larbi',
      url: 'https://www.linkedin.com/in/amine-larbi-7a6b80328',
      Icon: BriefcaseBusiness,
    },
  ];

  return (
    <section id="contact" className="section contact-section">
      <div className="section-heading">
        <p className="eyebrow">Contact</p>
        <h2>Disponible pour échanger sur un stage ou une alternance.</h2>
      </div>

      <div className="contact-intro">
        <p>
          Je recherche des opportunités en support informatique, systèmes,
          réseaux, exploitation ou cybersécurité débutante, avec un cadre où je
          peux apprendre vite et documenter sérieusement ce que je fais.
        </p>
      </div>

      <div className="contact-grid">
        {contactLinks.map((link) => {
          const Icon = link.Icon;

          return (
          <a
            className="contact-card"
            href={link.url}
            target={link.url.startsWith('mailto:') ? undefined : '_blank'}
            rel="noreferrer"
            key={link.label}
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
