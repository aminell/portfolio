import { content } from "@/lib/content";
import type { TimelineStatus } from "@/types/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const STATUS_LABEL: Record<TimelineStatus, string> = {
  done: "Validé",
  current: "En cours",
  upcoming: "À venir",
  goal: "Objectif"
};

const STATUS_STYLE: Record<TimelineStatus, string> = {
  done: "bg-paper text-ink",
  current: "bg-accent text-accent-ink",
  upcoming: "bg-paper-alt text-ink",
  goal: "bg-ink text-paper"
};

export function Timeline() {
  const { timeline } = content;
  const navItem = content.nav.find((n) => n.id === "parcours");

  return (
    <section id="parcours" className="border-b-2 border-ink bg-paper-alt py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          index={navItem?.index ?? "05"}
          kicker={timeline.kicker}
          title={timeline.title}
        />

        <ol className="relative space-y-8">
          {/* Ligne verticale brutaliste */}
          <span
            aria-hidden="true"
            className="absolute left-[18px] top-2 bottom-2 w-[3px] bg-ink md:left-1/2 md:-translate-x-1/2"
          />

          {timeline.items.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <Reveal
                as="li"
                key={`${item.year}-${item.title}`}
                delay={idx * 80}
                className="relative flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-12"
              >
                {/* Puce */}
                <span
                  aria-hidden="true"
                  className="absolute left-[10px] top-6 z-10 h-5 w-5 border-2 border-ink bg-accent md:left-1/2 md:-translate-x-1/2"
                />

                {/* Année (côté variable selon position) */}
                <div
                  className={`pl-12 md:pl-0 ${isEven ? "md:text-right md:pr-12" : "md:order-2 md:pl-12"}`}
                >
                  <p className="display-text text-5xl sm:text-6xl">{item.year}</p>
                  <span
                    className={`mt-2 inline-block brut-border px-2 py-0.5 mono text-[10px] font-bold uppercase tracking-widest ${STATUS_STYLE[item.status]}`}
                  >
                    {STATUS_LABEL[item.status]}
                  </span>
                </div>

                {/* Carte de contenu */}
                <div className={`pl-12 md:pl-0 ${isEven ? "" : "md:order-1 md:pr-12 md:text-right"}`}>
                  <div className="brut-border bg-paper p-5 shadow-brut-sm">
                    <h3 className="display-text text-xl uppercase">{item.title}</h3>
                    <p className="mt-2 text-ink-soft">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
