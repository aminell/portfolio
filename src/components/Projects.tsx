import { CalendarClock, ExternalLink, LayoutTemplate, ShieldHalf } from 'lucide-react';
import ScrambleText from './ScrambleText';
import TiltCard from './TiltCard';

export default function Projects() {
  const projectList = [
    {
      mission: 'Lab 01',
      tag: 'Next.js · Design',
      stack: ['Next.js', 'React', 'Neo-Brutalist'],
      title: 'Portfolio Neo-Brutalist',
      desc: 'Site personnel développé en Next.js avec une identité néo-brutaliste, déployé sur aminelarbi.com.',
      link: 'https://aminelarbi.com',
      linkLabel: 'aminelarbi.com',
      Icon: LayoutTemplate,
      variant: 'python',
    },
    {
      mission: 'Lab 02',
      tag: 'Cybersécurité · Offensive',
      stack: ['Kali Linux', 'VirtualBox', 'TryHackMe'],
      title: 'Lab cybersécurité',
      desc: 'Environnement offensif isolé : Kali Linux sous VirtualBox pour s\'entraîner sur les rooms TryHackMe.',
      link: 'https://github.com/aminell',
      linkLabel: 'github.com/aminell',
      Icon: ShieldHalf,
      variant: 'security',
    },
    {
      mission: 'Lab 03',
      tag: 'Productivité · Méthode',
      stack: ['Notion', 'Google Calendar'],
      title: 'Workspace organisé',
      desc: 'Système de suivi personnel sous Notion couplé à Google Calendar pour planifier labs, veille et révisions.',
      link: 'https://github.com/aminell',
      linkLabel: 'github.com/aminell',
      Icon: CalendarClock,
      variant: 'infra',
    },
  ];

  return (
    <section id="projets" className="section">
      <div className="section-heading" data-reveal>
        <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" /> Labs portfolio</p>
        <ScrambleText text="Des projets pensés comme des preuves techniques." />
      </div>

      <div className="projects-list">
        {projectList.map((project, index) => {
          const Icon = project.Icon;

          return (
            <TiltCard className="project-card" key={project.title} delay={index * 110}>
              <div className="project-media">
                <span className="mission-label">{project.mission}</span>
                <div className={`project-poster project-poster-${project.variant}`}>
                  <Icon size={44} />
                  <span>{project.tag}</span>
                </div>
              </div>
              <div className="project-details">
                <div className="project-header">
                  <span className="project-tag">{project.tag}</span>
                  <a
                    className="project-link"
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Ouvrir le projet ${project.title}`}
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <ul className="project-stack" aria-label="Technologies">
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a className="project-cta" href={project.link} target="_blank" rel="noreferrer">
                  {project.linkLabel}
                  <ExternalLink size={14} />
                </a>
              </div>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
}
