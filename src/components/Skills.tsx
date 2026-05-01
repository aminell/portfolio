import { content } from "@/lib/content";
import type { Skill } from "@/types/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

// Mapping niveau → progression visuelle (sur 5 blocs).
// Tu peux changer les valeurs en éditant content.json (le label "level" est libre).
const LEVEL_STEPS: Record<string, number> = {
  Apprentissage: 1,
  "À l'aise": 3,
  Confirmé: 4,
  Avancé: 5
};

function levelToSteps(level: string): number {
  return LEVEL_STEPS[level] ?? 2;
}

function SkillCard({ skill, idx }: { skill: Skill; idx: number }) {
  const steps = levelToSteps(skill.level);

  return (
    <Reveal delay={idx * 60}>
      <article className="brut-border brut-press group flex h-full flex-col gap-4 bg-paper-alt p-6 shadow-brut-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="mono text-xs uppercase tracking-widest text-ink-soft">{skill.category}</p>
            <h3 className="display-text mt-1 text-3xl">{skill.name}</h3>
          </div>
          <span className="brut-border whitespace-nowrap bg-accent px-2 py-1 mono text-[10px] font-bold uppercase tracking-widest text-accent-ink">
            {skill.level}
          </span>
        </div>

        {skill.note && <p className="text-sm text-ink-soft">{skill.note}</p>}

        <div className="mt-auto">
          <p className="mono mb-2 text-[10px] uppercase tracking-widest text-ink-soft">Niveau</p>
          <div className="flex gap-1.5" role="img" aria-label={`Niveau ${steps} sur 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`h-2.5 flex-1 border-2 border-ink ${i < steps ? "bg-accent" : "bg-paper"}`}
              />
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Skills() {
  const { skills } = content;
  const navItem = content.nav.find((n) => n.id === "competences");

  // Groupement par catégorie pour l'affichage : les catégories vides sont masquées.
  const byCategory = skills.categories
    .map((cat) => ({
      category: cat,
      items: skills.items.filter((s) => s.category === cat)
    }))
    .filter((group) => group.items.length > 0);

  const ungrouped = skills.items.filter((s) => !skills.categories.includes(s.category));
  if (ungrouped.length > 0) {
    byCategory.push({ category: "Autres", items: ungrouped });
  }

  return (
    <section id="competences" className="border-b-2 border-ink bg-paper-alt py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading index={navItem?.index ?? "03"} kicker={skills.kicker} title={skills.title} />

        <div className="space-y-12">
          {byCategory.map((group) => (
            <div key={group.category}>
              <Reveal>
                <div className="mb-5 flex items-end justify-between border-b-2 border-ink pb-3">
                  <h3 className="display-text text-2xl uppercase">{group.category}</h3>
                  <span className="mono text-xs uppercase tracking-widest text-ink-soft">
                    {String(group.items.length).padStart(2, "0")} {group.items.length > 1 ? "items" : "item"}
                  </span>
                </div>
              </Reveal>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.items.map((item, idx) => (
                  <SkillCard key={item.name} skill={item} idx={idx} />
                ))}
              </div>
            </div>
          ))}

          {byCategory.length === 0 && (
            <Reveal>
              <div className="brut-border-thick bg-paper p-10 text-center shadow-brut">
                <p className="mono text-xs uppercase tracking-widest text-ink-soft">À venir</p>
                <p className="mt-3 text-xl font-semibold">
                  Les compétences seront listées ici dès qu&apos;elles seront prêtes à être présentées.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
