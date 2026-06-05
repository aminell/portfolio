export default function About() {
  const pillars = [
    'Concevoir une architecture réseau adaptée à un besoin client.',
    'Installer, exploiter et maintenir un réseau informatique sécurisé.',
    'Valoriser les données et automatiser les opérations techniques.',
    'Travailler en mode projet avec documentation, tests et communication.',
  ];

  return (
    <section id="a-propos" className="section">
      <div className="section-heading">
        <p className="eyebrow">Formation visée</p>
        <h2>BTS CIEL A, la voie informatique et réseaux.</h2>
      </div>

      <div className="two-columns">
        <div className="text-block">
          <p>
            L'option A du BTS CIEL se concentre sur l'informatique, les réseaux
            de communication et la cybersécurité. C'est le bon cadre pour relier
            mes projets personnels à des compétences professionnelles : systèmes,
            services, supervision, sécurité et maintenance.
          </p>
          <p>
            Ma méthode reste très terrain : installer, casser proprement,
            documenter, recommencer, puis transformer l'essai en procédure claire.
            Ce site présente cette progression avec des labs concrets plutôt
            qu'une simple liste de mots-clés.
          </p>
        </div>

        <div className="note-card">
          <span className="card-kicker">Ce que je vise</span>
          <h3>Un profil prêt pour le terrain</h3>
          <ul className="mission-list">
            {pillars.map((pillar) => (
              <li key={pillar}>{pillar}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
