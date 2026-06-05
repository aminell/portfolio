import { BrainCircuit, CircuitBoard, ExternalLink, GraduationCap, Server, ShieldCheck, SplitSquareHorizontal } from 'lucide-react';

export default function Projects() {
  const projectList = [
    {
      mission: 'Lab 01',
      tag: 'Ubuntu · Docker',
      title: 'Stack IA locale sur Ubuntu',
      desc: 'Installation d\'Ollama, Docker et Open WebUI pour héberger un service local et comprendre son exposition réseau.',
      link: 'https://github.com/aminell',
      Icon: Server,
      variant: 'infra',
    },
    {
      mission: 'Lab 02',
      tag: 'Système · Boot',
      title: 'Dual-boot Ubuntu / Windows',
      desc: 'Partitionnement multi-disques, installation propre et environnement de travail pour tester des outils réseau.',
      link: 'https://github.com/aminell',
      Icon: SplitSquareHorizontal,
      variant: 'system',
    },
    {
      mission: 'Lab 03',
      tag: 'Python · Automatisation',
      title: 'Scripts et résumé de texte',
      desc: 'Mini-projet Python pour progresser sur la manipulation de texte, les fonctions et la logique de traitement.',
      link: 'https://github.com/aminell',
      Icon: BrainCircuit,
      variant: 'python',
    },
    {
      mission: 'Lab 04',
      tag: 'IoT · ESP32',
      title: 'Station météo connectée',
      desc: 'ESP32, capteurs température / humidité / pression et données envoyées en Wi-Fi vers un dashboard local.',
      link: 'https://github.com/aminell',
      Icon: CircuitBoard,
      variant: 'iot',
    },
    {
      mission: 'Lab 05',
      tag: 'Sécurité · Méthode',
      title: 'Carnet de durcissement',
      desc: 'Checklist personnelle : mots de passe, mises à jour, sauvegardes, pare-feu et bonnes pratiques utilisateur.',
      link: 'https://github.com/aminell',
      Icon: ShieldCheck,
      variant: 'security',
    },
    {
      mission: 'Lab 06',
      tag: 'Formation · Python',
      title: 'CS50P Harvard',
      desc: 'Parcours Python en cours pour renforcer les bases de programmation utiles à l\'automatisation réseau.',
      link: 'https://github.com/aminell',
      Icon: GraduationCap,
      variant: 'training',
    },
  ];

  return (
    <section id="projets" className="section">
      <div className="section-heading">
        <p className="eyebrow">Labs portfolio</p>
        <h2>Des projets pensés comme des preuves techniques.</h2>
      </div>

      <div className="projects-list">
        {projectList.map((project) => {
          const Icon = project.Icon;

          return (
          <article className="project-card" key={project.title}>
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
                  aria-label={`Voir le projet ${project.title} sur GitHub`}
                >
                  <ExternalLink size={18} />
                </a>
              </div>
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
            </div>
          </article>
          );
        })}
      </div>
    </section>
  );
}
