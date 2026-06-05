import { Cpu, Mail, Radar, ShieldCheck, Trophy, Wifi } from 'lucide-react';
import TerminalDashboard from './TerminalDashboard';

export default function Hero() {
  return (
    <section id="accueil" className="hero section">
      <div className="hero-content">
        <p className="eyebrow">BTS CIEL option A · Informatique et réseaux</p>
        <h1>Amine Larbi</h1>
        <p className="hero-subtitle">
          Portfolio orienté réseaux sécurisés, systèmes et cybersécurité.
        </p>

        <p className="hero-text">
          Bac STI2D SIN, projets personnels en Linux, Python, IoT et IA locale.
          Je construis un profil technique aligné avec le BTS CIEL IR : concevoir,
          exploiter et maintenir des réseaux informatiques sécurisés.
        </p>

        <ul className="hero-metrics" aria-label="Informations rapides">
          <li>
            <strong>Option A</strong>
            <span>Informatique et réseaux</span>
          </li>
          <li>
            <strong>Bac+2</strong>
            <span>Formation en deux ans</span>
          </li>
          <li>
            <strong>Objectif</strong>
            <span>Stage / alternance réseau</span>
          </li>
        </ul>

        <div className="hero-actions">
          <a className="button button-primary" href="#contact">
            <Mail size={18} />
            <span>Me contacter</span>
          </a>
          <a className="button button-secondary" href="#projets">
            <Radar size={18} />
            <span>Voir les labs</span>
          </a>
        </div>
      </div>

      <div className="hero-panel-stack">
        <div className="mission-card">
          <div>
            <span className="mission-kicker">Cap suivi</span>
            <strong>Devenir technicien systèmes, réseaux et sécurité</strong>
          </div>
          <div className="mission-rewards" aria-label="Objectifs">
            <span><ShieldCheck size={16} /> Réseaux sécurisés</span>
            <span><Cpu size={16} /> Systèmes connectés</span>
            <span><Wifi size={16} /> Services IP</span>
            <span><Trophy size={16} /> Projet terrain</span>
          </div>
        </div>
        <TerminalDashboard />
      </div>
    </section>
  );
}
