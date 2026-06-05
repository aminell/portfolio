import { useState } from 'react';
import { Code, Cpu, Server, ShieldCheck, Wifi } from 'lucide-react';

type FocusKey = 'infra' | 'services' | 'security' | 'data';

const focusCards: Record<FocusKey, { label: string; title: string; detail: string; points: string[] }> = {
  infra: {
    label: 'Infrastructure',
    title: 'Routeur, switch, postes et segmentation',
    detail: 'Lire une topologie, isoler les flux utiles et documenter une configuration réseau.',
    points: ['Plan IP', 'VLAN', 'Diagnostic'],
  },
  services: {
    label: 'Services',
    title: 'Linux, Docker et applications internes',
    detail: 'Installer un service, le tester localement, puis comprendre son exposition sur le réseau.',
    points: ['Ubuntu', 'Docker', 'Logs'],
  },
  security: {
    label: 'Sécurité',
    title: 'Durcissement et réflexes cyber',
    detail: 'Appliquer les bases : comptes, mises à jour, pare-feu, sauvegardes et moindre privilège.',
    points: ['Firewall', 'MFA', 'Sauvegardes'],
  },
  data: {
    label: 'Données',
    title: 'Mesures, supervision et exploitation',
    detail: 'Transformer des mesures ou journaux en informations exploitables pour agir plus vite.',
    points: ['Capteurs', 'Dashboard', 'Alertes'],
  },
};

const nodes: Array<{ key: FocusKey; label: string; className: string; Icon: typeof Server }> = [
  { key: 'infra', label: 'LAN', className: 'node-a', Icon: Wifi },
  { key: 'services', label: 'SRV', className: 'node-b', Icon: Server },
  { key: 'security', label: 'SEC', className: 'node-c', Icon: ShieldCheck },
  { key: 'data', label: 'DATA', className: 'node-d', Icon: Code },
];

export default function TerminalDashboard() {
  const [activeFocus, setActiveFocus] = useState<FocusKey>('infra');
  const active = focusCards[activeFocus];

  return (
    <aside className="status-card" aria-label="Topologie des compétences BTS CIEL option A">
      <div className="terminal-header">
        <div className="mac-dots" aria-hidden="true">
          <span className="dot dot-close"></span>
          <span className="dot dot-minimize"></span>
          <span className="dot dot-maximize"></span>
        </div>
        <strong className="terminal-title">CIEL-IR lab map</strong>
        <div className="terminal-status-indicator">
          <span className="live-dot" aria-hidden="true"></span>
          <span>Actif</span>
        </div>
      </div>

      <div className="topology" aria-label="Carte interactive des axes techniques">
        <svg className="topology-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line x1="50" y1="50" x2="20" y2="24" className={activeFocus === 'infra' ? 'active' : ''} />
          <line x1="50" y1="50" x2="80" y2="24" className={activeFocus === 'services' ? 'active' : ''} />
          <line x1="50" y1="50" x2="22" y2="78" className={activeFocus === 'security' ? 'active' : ''} />
          <line x1="50" y1="50" x2="78" y2="78" className={activeFocus === 'data' ? 'active' : ''} />
        </svg>

        <div className="node node-main">
          <Cpu size={18} />
          <span>CIEL</span>
        </div>

        {nodes.map(({ key, label, className, Icon }) => (
          <button
            className={`node ${className} ${activeFocus === key ? 'active' : ''}`}
            type="button"
            onClick={() => setActiveFocus(key)}
            aria-pressed={activeFocus === key}
            key={key}
          >
            <Icon size={17} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="lab-readout">
        <span className="card-kicker">{active.label}</span>
        <h3>{active.title}</h3>
        <p>{active.detail}</p>
        <ul>
          {active.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>

      <dl className="status-list">
        <div>
          <dt>Formation</dt>
          <dd>BTS CIEL option A</dd>
        </div>
        <div>
          <dt>Spécialité</dt>
          <dd>Informatique et réseaux</dd>
        </div>
        <div>
          <dt>Recherche</dt>
          <dd>Stage / alternance technique</dd>
        </div>
      </dl>
    </aside>
  );
}
