import { Boxes, Container, GitBranch, ShieldHalf, SquareTerminal, TerminalSquare, Network } from 'lucide-react';
import type { CSSProperties } from 'react';
import ScrambleText from './ScrambleText';
import TiltCard from './TiltCard';

export default function Skills() {
  const skillList = [
    { name: 'Python', level: 'Bases solides', desc: 'Automatisation, scripts, traitement de données et prototypage d\'outils.', score: 64, Icon: SquareTerminal },
    { name: 'Linux', level: 'À l\'aise', desc: 'Terminal, services, dual-boot, gestion de paquets et durcissement système.', score: 70, Icon: TerminalSquare },
    { name: 'Docker', level: 'Bases', desc: 'Conteneurs, images, isolation de services et environnements de lab reproductibles.', score: 56, Icon: Container },
    { name: 'Réseaux', level: 'En construction', desc: 'Modèle OSI, TCP/IP, TLS, adressage, segmentation et diagnostic des flux.', score: 60, Icon: Network },
    { name: 'Kali Linux', level: 'Culture active', desc: 'Reconnaissance, scanning et outils offensifs en environnement de lab isolé.', score: 52, Icon: ShieldHalf },
    { name: 'Next.js', level: 'Bases', desc: 'React, composants, rendu moderne et déploiement de sites performants.', score: 58, Icon: Boxes },
    { name: 'Git', level: 'À l\'aise', desc: 'Versioning, branches, GitHub et bonnes pratiques de collaboration.', score: 66, Icon: GitBranch },
  ];

  return (
    <section id="competences" className="section section-alt">
      <div>
        <div className="section-heading" data-reveal>
          <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" /> Compétences</p>
          <ScrambleText text="Une stack alignée cybersécurité, réseaux & dev." />
        </div>

        <div className="skills-grid">
          {skillList.map((skill, index) => {
            const Icon = skill.Icon;
            return (
              <TiltCard className="skill-card" key={skill.name} delay={index * 70}>
                <span className="skill-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="skill-icon" aria-hidden="true"><Icon size={20} /></span>
                <h3>{skill.name}</h3>
                <p className="level">{skill.level}</p>
                <p>{skill.desc}</p>
                <div
                  className="skill-meter"
                  aria-label={`Progression ${skill.name} : ${skill.score}%`}
                  style={{ '--skill-level': `${skill.score}%` } as CSSProperties}
                >
                  <span></span>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
