import { content } from "@/lib/content";
import type { Project } from "@/types/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  return (
    <Reveal delay={idx * 80}>
      <article className="brut-border brut-press flex h-full flex-col bg-paper-alt shadow-brut-sm">
        {/* Visuel décoratif — pas d'image pour rester rapide et stylé. */}
        <div
          className="relative h-44 border-b-2 border-ink bg-accent"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,var(--ink)_48%,var(--ink)_52%,transparent_52%),linear-gradient(-45deg,transparent_48%,var(--ink)_48%,var(--ink)_52%,transparent_52%)] bg-[length:24px_24px] opacity-30" />
          <div className="absolute left-4 top-4 brut-border bg-paper px-2 py-1 mono text-[10px] font-bold uppercase tracking-widest">
            {project.year ?? "Projet"}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <h3 className="display-text text-2xl">{project.title}</h3>
          <p className="text-ink-soft">{project.description}</p>

          {project.technologies.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="brut-border bg-paper px-2 py-0.5 mono text-[11px] font-bold uppercase tracking-wide"
                >
                  {tech}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto flex flex-wrap gap-3 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="brut-border inline-flex items-center gap-1.5 bg-paper px-3 py-1.5 text-sm font-bold uppercase hover:bg-accent"
              >
                Code <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="brut-border inline-flex items-center gap-1.5 bg-ink px-3 py-1.5 text-sm font-bold uppercase text-paper hover:bg-accent hover:text-accent-ink"
              >
                Démo <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function EmptyState() {
  const { emptyState } = content.projects;
  return (
    <Reveal>
      <div className="brut-border-thick relative overflow-hidden bg-paper p-10 shadow-brut-lg sm:p-16">
        {/* Motif diagonal de fond */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent,transparent_18px,var(--ink-line)_18px,var(--ink-line)_19px)] opacity-60"
        />
        <div className="relative">
          <p className="mono text-xs uppercase tracking-[0.3em] text-ink-soft">[ work in progress ]</p>
          <h3 className="display-text mt-4 text-5xl uppercase sm:text-7xl">{emptyState.title}</h3>
          <p className="mt-6 max-w-2xl text-lg text-ink-soft">{emptyState.message}</p>
          <a
            href={emptyState.ctaHref}
            className="brut-border brut-press mt-8 inline-flex items-center gap-2 bg-accent px-5 py-3 font-bold uppercase text-accent-ink shadow-brut"
          >
            {emptyState.ctaLabel} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </Reveal>
  );
}

export function Projects() {
  const { projects } = content;
  const navItem = content.nav.find((n) => n.id === "projets");

  return (
    <section id="projets" className="border-b-2 border-ink py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading index={navItem?.index ?? "04"} kicker={projects.kicker} title={projects.title} />

        {projects.items.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.items.map((project, idx) => (
              <ProjectCard key={project.title} project={project} idx={idx} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}
