import { content } from "@/lib/content";
import type { Project } from "@/types/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  const demoIsExternal = project.demo?.startsWith("http");
  const githubIsExternal = project.github?.startsWith("http");

  return (
    <Reveal delay={idx * 80}>
      <article className="brut-border flex h-full flex-col bg-paper p-6">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="mono text-[10px] font-bold uppercase tracking-widest text-ink-soft">
            {project.year ?? "Projet"}
          </span>
          {project.status && (
            <span className="brut-border bg-paper-alt px-2 py-1 mono text-[10px] font-bold uppercase tracking-widest">
              {project.status}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <h3 className="display-text text-2xl">{project.title}</h3>
          <p className="text-ink-soft">{project.description}</p>

          {project.impact && (
            <div className="border-l-4 border-accent pl-3">
              <p className="mono text-[10px] font-bold uppercase tracking-widest text-ink-soft">
                Impact
              </p>
              <p className="mt-1 text-sm font-semibold">{project.impact}</p>
            </div>
          )}

          {project.technologies.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="bg-paper-alt px-2 py-1 mono text-[11px] font-bold uppercase tracking-wide"
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
                target={githubIsExternal ? "_blank" : undefined}
                rel={githubIsExternal ? "noreferrer" : undefined}
                className="brut-border inline-flex items-center gap-1.5 bg-paper px-3 py-1.5 text-sm font-bold uppercase hover:bg-accent"
              >
                Code <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target={demoIsExternal ? "_blank" : undefined}
                rel={demoIsExternal ? "noreferrer" : undefined}
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
          <h3 className="display-text mt-4 break-words text-3xl uppercase sm:text-5xl md:text-7xl">{emptyState.title}</h3>
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
