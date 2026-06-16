import type { CSSProperties } from 'react';
import { Code, Mail, MapPin, Radar, ShieldCheck, TerminalSquare } from 'lucide-react';
import TerminalDashboard from './TerminalDashboard';

export default function Hero() {
  return (
    <section id="accueil" className="hero section">
      <div className="hero-content">
        <p className="eyebrow" data-reveal style={{ '--reveal-delay': '40ms' } as CSSProperties}>
          <span className="eyebrow-dot" aria-hidden="true" /> Cybersécurité · Réseaux · DevSecOps
        </p>

        <h1 data-reveal style={{ '--reveal-delay': '120ms' } as CSSProperties}>
          <span className="hero-name">Amine Larbi</span>
        </h1>

        <p className="hero-subtitle" data-reveal style={{ '--reveal-delay': '220ms' } as CSSProperties}>
          Futur étudiant <span className="hl">BTS CIEL IR</span> — passionné de{' '}
          <span className="hl hl-alt">cybersécurité</span> &amp; <span className="hl hl-alt">réseaux</span>.
        </p>

        <p className="hero-text" data-reveal style={{ '--reveal-delay': '300ms' } as CSSProperties}>
          Basé à Vitry-sur-Seine, j'apprends en cassant proprement puis en documentant : labs Kali Linux,
          réseaux (OSI, TCP/IP, TLS) et automatisation. Cap suivi : le <strong>pentesting</strong> et le{' '}
          <strong>DevSecOps</strong>.
        </p>

        <ul className="hero-metrics" aria-label="Informations rapides" data-reveal style={{ '--reveal-delay': '380ms' } as CSSProperties}>
          <li>
            <strong><MapPin size={15} aria-hidden="true" /> Vitry-sur-Seine</strong>
            <span>Île-de-France</span>
          </li>
          <li>
            <strong>BTS CIEL IR</strong>
            <span>Informatique &amp; réseaux</span>
          </li>
          <li>
            <strong>Pentest · DevSecOps</strong>
            <span>Direction visée</span>
          </li>
        </ul>

        <div className="hero-actions" data-reveal style={{ '--reveal-delay': '460ms' } as CSSProperties}>
          <a className="button button-primary" href="#contact">
            <Mail size={18} />
            <span>Me contacter</span>
          </a>
          <a className="button button-secondary" href="https://github.com/aminell" target="_blank" rel="noreferrer">
            <Code size={18} />
            <span>GitHub</span>
          </a>
          <a className="button button-ghost" href="#projets">
            <Radar size={18} />
            <span>Voir les labs</span>
          </a>
        </div>
      </div>

      <div className="hero-panel-stack">
        <div className="mission-card" data-reveal style={{ '--reveal-delay': '260ms' } as CSSProperties}>
          <div>
            <span className="mission-kicker"><TerminalSquare size={14} aria-hidden="true" /> Cap suivi</span>
            <strong>Devenir analyste sécurité offensive &amp; DevSecOps</strong>
          </div>
          <div className="mission-rewards" aria-label="Objectifs">
            <span><ShieldCheck size={16} /> Pentesting</span>
            <span><TerminalSquare size={16} /> Kali Linux</span>
            <span><Radar size={16} /> Réseaux sécurisés</span>
            <span><Code size={16} /> Open source</span>
          </div>
        </div>
        <TerminalDashboard />
      </div>
    </section>
  );
}
