import type { CSSProperties } from 'react';

export default function Skills() {
  const skillList = [
    { name: 'Réseaux IP', level: 'En construction', desc: 'Adressage, services, segmentation, logique VLAN et diagnostic.', score: 58 },
    { name: 'Systèmes Linux / Windows', level: 'Bases solides', desc: 'Dual-boot, terminal, installation, Docker et services locaux.', score: 64 },
    { name: 'Cybersécurité', level: 'Culture active', desc: 'Hygiène numérique, durcissement, authentification et veille.', score: 46 },
    { name: 'Python / scripts', level: 'Bases', desc: 'Automatiser, traiter des fichiers, prototyper des outils simples.', score: 52 },
    { name: 'Web et données', level: 'Bases', desc: 'HTML, CSS, JavaScript, tableaux de bord et valorisation de données.', score: 60 },
    { name: 'IoT / embarqué', level: 'Bases', desc: 'ESP32, capteurs, Wi-Fi et remontée de mesures sur dashboard.', score: 56 },
  ];

  return (
    <section id="competences" className="section section-alt">
      <div>
        <div className="section-heading">
          <p className="eyebrow">Compétences</p>
          <h2>Des bases techniques alignées avec CIEL IR.</h2>
        </div>

        <div className="skills-grid">
          {skillList.map((skill, index) => (
            <article className="skill-card" key={index}>
              <span className="skill-index">{String(index + 1).padStart(2, '0')}</span>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
