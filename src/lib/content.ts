import raw from "@content";
import type { SiteContent } from "@/types/content";

// Single source of truth : tout passe par ce loader.
// Si content.json devient un .mdx ou un CMS, on ne change que ce fichier.
export const content = raw as unknown as SiteContent;
