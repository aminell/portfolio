export default function Trajectory() {
  const steps = [
    {
      time: '2025',
      title: 'Bac STI2D SIN',
      desc: 'Base technique : systèmes numériques, logique de projet, IoT et découverte des architectures connectées.',
    },
    {
      time: '2026',
      title: 'Entrée en BTS CIEL option A',
      desc: 'Objectif : consolider les réseaux, les systèmes, la cybersécurité et les méthodes d\'intervention.',
    },
    {
      time: 'BTS 1',
      title: 'Labs réseau et systèmes',
      desc: 'Monter des environnements propres, documenter les procédures et apprendre à diagnostiquer rapidement.',
    },
    {
      time: 'BTS 2',
      title: 'Stage ou alternance terrain',
      desc: 'Appliquer les compétences en entreprise : support, maintenance, sécurité, services et amélioration continue.',
    },
    {
      time: 'Après BTS',
      title: 'Poursuite réseau / cyber',
      desc: 'Viser une spécialisation en administration systèmes, réseaux ou cybersécurité selon l\'expérience acquise.',
    },
  ];

  return (
    <section id="trajectoire" className="section section-alt">
      <div>
        <div className="section-heading">
          <p className="eyebrow">Parcours</p>
          <h2>Une trajectoire lisible vers le terrain.</h2>
        </div>

        <ol className="timeline">
          {steps.map((step, index) => (
            <li key={index}>
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
