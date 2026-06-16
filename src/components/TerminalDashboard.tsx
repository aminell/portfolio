import { useState } from 'react';
import { Cpu, GitBranch, Network, Server, ShieldHalf, SquareTerminal } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';

type FocusKey = 'net' | 'pentest' | 'devsecops' | 'dev';

const focusCards: Record<FocusKey, { label: string; title: string; detail: string; points: string[] }> = {
  net: {
    label: 'Réseaux',
    title: 'OSI, TCP/IP et TLS',
    detail: 'Lire une topologie, comprendre les couches, isoler les flux et sécuriser les échanges.',
    points: ['OSI', 'TCP/IP', 'TLS'],
  },
  pentest: {
    label: 'Pentesting',
    title: 'Reconnaissance et exploitation',
    detail: 'Labs offensifs isolés sous Kali Linux : reconnaissance, scanning et rooms TryHackMe.',
    points: ['Kali Linux', 'Recon', 'TryHackMe'],
  },
  devsecops: {
    label: 'DevSecOps',
    title: 'Sécurité dans la chaîne',
    detail: 'Intégrer la sécurité au pipeline : conteneurs, versioning et durcissement par défaut.',
    points: ['Docker', 'Git', 'Hardening'],
  },
  dev: {
    label: 'Dev',
    title: 'Outils et automatisation',
    detail: 'Construire des interfaces et automatiser les tâches répétitives avec du code propre.',
    points: ['Next.js', 'Python', 'Scripts'],
  },
};

const nodes: Array<{ key: FocusKey; label: string; className: string; Icon: typeof Server }> = [
  { key: 'net', label: 'NET', className: 'node-a', Icon: Network },
  { key: 'pentest', label: 'PWN', className: 'node-b', Icon: ShieldHalf },
  { key: 'devsecops', label: 'CI/CD', className: 'node-c', Icon: GitBranch },
  { key: 'dev', label: 'DEV', className: 'node-d', Icon: SquareTerminal },
];

const commands = [
  'nmap -sV 10.0.0.0/24',
  'docker compose up -d --build',
  'ssh kali@lab --hardening',
  'git push origin main',
];

export default function TerminalDashboard() {
  const [activeFocus, setActiveFocus] = useState<FocusKey>('net');
  const active = focusCards[activeFocus];
  const typed = useTypewriter(commands);

  return (
    <aside className="status-card" aria-label="Carte interactive des axes techniques">
      <div className="terminal-header">
        <div className="mac-dots" aria-hidden="true">
          <span className="dot dot-close"></span>
          <span className="dot dot-minimize"></span>
          <span className="dot dot-maximize"></span>
        </div>
        <strong className="terminal-title">amine@ciel-ir: ~/labs</strong>
        <div className="terminal-status-indicator">
          <span className="live-dot" aria-hidden="true"></span>
          <span>Actif</span>
        </div>
      </div>

      <div className="terminal-cmd" aria-hidden="true">
        <span className="terminal-prompt">$</span>
        <span className="terminal-typed">{typed}</span>
        <span className="terminal-caret" />
      </div>

      <div className="topology" aria-label="Carte interactive des axes techniques">
        <svg className="topology-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line x1="50" y1="50" x2="20" y2="24" className={activeFocus === 'net' ? 'active' : ''} />
          <line x1="50" y1="50" x2="80" y2="24" className={activeFocus === 'pentest' ? 'active' : ''} />
          <line x1="50" y1="50" x2="22" y2="78" className={activeFocus === 'devsecops' ? 'active' : ''} />
          <line x1="50" y1="50" x2="78" y2="78" className={activeFocus === 'dev' ? 'active' : ''} />
        </svg>

        <div className="node node-main">
          <Cpu size={18} />
          <span>AL</span>
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
          <dd>BTS CIEL IR</dd>
        </div>
        <div>
          <dt>Direction</dt>
          <dd>Pentesting · DevSecOps</dd>
        </div>
        <div>
          <dt>Localisation</dt>
          <dd>Vitry-sur-Seine</dd>
        </div>
      </dl>
    </aside>
  );
}
