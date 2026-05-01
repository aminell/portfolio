import { content } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Contact() {
  const { contact } = content;
  const navItem = content.nav.find((n) => n.id === "contact");

  return (
    <section id="contact" className="border-b-2 border-ink py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading index={navItem?.index ?? "06"} kicker={contact.kicker} title={contact.title} />

        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="text-xl text-ink-soft sm:text-2xl">{contact.intro}</p>
            <div className="mt-8 brut-border bg-paper-alt p-6 shadow-brut-sm">
              <p className="mono text-xs uppercase tracking-widest text-ink-soft">Réponse</p>
              <p className="mt-2 text-2xl font-bold">Sous 48h ouvrées.</p>
              <p className="mt-1 text-sm text-ink-soft">Du lundi au vendredi, basé en Île-de-France (UTC+1).</p>
            </div>
          </Reveal>

          <ul className="space-y-4 md:col-span-7">
            {contact.channels.map((channel, idx) => (
              <Reveal as="li" key={channel.label} delay={idx * 80}>
                <a
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                  className={`brut-border brut-press group flex items-center justify-between gap-4 p-6 shadow-brut sm:p-8 ${
                    channel.primary ? "bg-accent text-accent-ink" : "bg-paper-alt"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p
                      className={`mono text-xs uppercase tracking-widest ${
                        channel.primary ? "text-accent-ink/70" : "text-ink-soft"
                      }`}
                    >
                      {channel.label}
                    </p>
                    <p className="display-text mt-1 truncate text-2xl uppercase sm:text-3xl">
                      {channel.value}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="brut-border grid h-12 w-12 shrink-0 place-items-center bg-paper text-2xl text-ink transition-transform group-hover:rotate-45"
                  >
                    ↗
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
