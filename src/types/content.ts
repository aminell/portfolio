// Schéma TypeScript du fichier content.json.
// Toute modification de la structure du contenu doit refléter ce schéma
// (et inversement) pour garantir l'autocomplétion et le typage strict.

export type Cta = {
  label: string;
  href: string;
};

export type NavItem = {
  id: string;
  label: string;
  index: string;
};

export type Hero = {
  available: boolean;
  availableLabel: string;
  name: string;
  headline: string;
  intro: string;
  ctaPrimary: Cta;
  ctaSecondary: Cta;
  metrics: Metric[];
};

export type Metric = {
  value: string;
  label: string;
  detail: string;
};

export type SoftSkill = {
  label: string;
  description: string;
};

export type About = {
  kicker: string;
  title: string;
  paragraphs: string[];
  softSkills: SoftSkill[];
  interests: string[];
};

export type SkillLevel = "Apprentissage" | "Confirmé" | "À l'aise" | "Avancé" | string;

export type Skill = {
  name: string;
  level: SkillLevel;
  category: string;
  note?: string;
};

export type Skills = {
  kicker: string;
  title: string;
  categories: string[];
  items: Skill[];
};

export type Project = {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  year?: string;
  status?: string;
  impact?: string;
};

export type Projects = {
  kicker: string;
  title: string;
  emptyState: {
    title: string;
    message: string;
    ctaLabel: string;
    ctaHref: string;
  };
  items: Project[];
};

export type TimelineStatus = "done" | "current" | "upcoming" | "goal";

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
  status: TimelineStatus;
};

export type Timeline = {
  kicker: string;
  title: string;
  items: TimelineItem[];
};

export type ContactChannel = {
  label: string;
  value: string;
  href: string;
  primary?: boolean;
};

export type Contact = {
  kicker: string;
  title: string;
  intro: string;
  channels: ContactChannel[];
};

export type SiteContent = {
  site: {
    name: string;
    title: string;
    description: string;
    url: string;
    locale: string;
  };
  nav: NavItem[];
  hero: Hero;
  about: About;
  skills: Skills;
  projects: Projects;
  timeline: Timeline;
  contact: Contact;
  footer: {
    tagline: string;
  };
};
