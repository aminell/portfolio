import type { CSSProperties } from 'react';

export default function Trajectory() {
  const steps = [
    {
      time: '2025',
      title: 'Bac STI2D SIN',
      desc: 'Base technique : systèmes numériques, logique de projet, programmation et architectures connectées.',
    },
    {
      time: '2025 — 2026',
      title: 'BUT Informatique',
      desc: 'Université Sorbonne Paris Nord. Première approche du développement, des bases de données et de l\'algorithmique.',
    },
    {
      time: '2026',
      title: 'Réorientation',
      desc: 'Choix assumé de recentrer mon parcours sur les réseaux, les systèmes et la cybersécurité.',
    },
    {
      time: '2026 — 2028',
      title: 'BTS CIEL IR',
      desc: 'Lycée Langevin Wallon. Informatique et réseaux : conception, exploitation, sécurité et terrain.',
    },
  ];

  return (
    <section id="trajectoire" className="section section-alt">
      <div>
        <div className="section-heading" data-reveal>
          <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" /> Parcours</p>
          <h2>Une trajectoire lisible vers la cybersécurité.</h2>
        </div>

        <ol className="timeline" data-reveal>
          {steps.map((step, index) => (
            <li key={index} data-reveal style={{ '--reveal-delay': `${index * 120}ms` } as CSSProperties}>
              <span className="timeline-marker" aria-hidden="true" />
              <time>{step.time}</time>
              <div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
