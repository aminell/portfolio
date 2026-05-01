import { content } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  const { about } = content;
  const navItem = content.nav.find((n) => n.id === "a-propos");

  return (
    <section id="a-propos" className="border-b-2 border-ink py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading index={navItem?.index ?? "02"} kicker={about.kicker} title={about.title} />

        <div className="grid gap-10 md:grid-cols-12">
          {/* Texte principal */}
          <Reveal className="md:col-span-7 md:pr-8">
            {about.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={`text-lg sm:text-xl ${idx === 0 ? "font-semibold" : "mt-6 text-ink-soft"}`}
              >
                {p}
              </p>
            ))}
          </Reveal>

          {/* Soft skills + intérêts en colonne droite */}
          <div className="space-y-6 md:col-span-5">
            <Reveal delay={120}>
              <div className="brut-border bg-paper-alt p-6 shadow-brut-sm">
                <h3 className="mono mb-4 text-xs uppercase tracking-[0.25em] text-ink-soft">
                  Soft skills
                </h3>
                <ul className="space-y-4">
                  {about.softSkills.map((skill) => (
                    <li key={skill.label} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 bg-accent" />
                      <div>
                        <p className="font-bold uppercase tracking-tight">{skill.label}</p>
                        <p className="text-sm text-ink-soft">{skill.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="brut-border bg-paper p-6 shadow-brut-sm">
                <h3 className="mono mb-4 text-xs uppercase tracking-[0.25em] text-ink-soft">
                  Centres d&apos;intérêt
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {about.interests.map((interest) => (
                    <li
                      key={interest}
                      className="brut-border bg-paper-alt px-3 py-1.5 text-sm font-bold uppercase"
                    >
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
