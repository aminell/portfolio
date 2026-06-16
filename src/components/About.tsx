import type { CSSProperties } from 'react';
import ScrambleText from './ScrambleText';
import { useCountUp } from '../hooks/useCountUp';

function Stat({ value, suffix, label, delay }: { value: number; suffix?: string; label: string; delay: number }) {
  const [ref, current] = useCountUp<HTMLDivElement>(value);
  return (
    <div className="stat" ref={ref} data-reveal style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>
      <strong>
        {current}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}

export default function About() {
  const pillars = [
    'Cartographier et sécuriser un réseau : OSI, TCP/IP, TLS et segmentation.',
    'Mener un lab offensif propre : reconnaissance, exploitation, rapport.',
    'Intégrer la sécurité dans la chaîne : Docker, Git, automatisation.',
    'Documenter chaque essai et transformer un test en procédure claire.',
  ];

  return (
    <section id="a-propos" className="section">
      <div className="section-heading" data-reveal>
        <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" /> À propos</p>
        <ScrambleText text="Du bac STI2D SIN vers le pentesting & le DevSecOps." />
      </div>

      <div className="two-columns">
        <div className="text-block" data-reveal="left">
          <p>
            Basé à <strong>Vitry-sur-Seine</strong>, titulaire d'un <strong>bac STI2D SIN 2025</strong>,
            je me dirige vers le <strong>pentesting</strong> et le <strong>DevSecOps</strong>. Après une
            première année de BUT Informatique, je me réoriente vers le <strong>BTS CIEL IR</strong> pour
            coller au plus près des réseaux, des systèmes et de la cybersécurité.
          </p>
          <p>
            Ma méthode reste très terrain : installer, casser proprement, documenter, recommencer, puis
            transformer l'essai en procédure claire. Ce site présente cette progression avec des labs
            concrets plutôt qu'une simple liste de mots-clés.
          </p>
        </div>

        <div className="note-card" data-reveal="right">
          <span className="card-kicker">Ce que je vise</span>
          <h3>Un profil offensif &amp; rigoureux</h3>
          <ul className="mission-list">
            {pillars.map((pillar, index) => (
              <li key={pillar} data-reveal style={{ '--reveal-delay': `${180 + index * 90}ms` } as CSSProperties}>
                {pillar}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="stat-strip" aria-label="Quelques chiffres">
        <Stat value={7} label="Compétences clés" delay={0} />
        <Stat value={3} label="Labs publiés" delay={90} />
        <Stat value={2} label="Ans · BTS CIEL IR" delay={180} />
        <Stat value={100} suffix="%" label="Orienté terrain" delay={270} />
      </div>
    </section>
  );
}
