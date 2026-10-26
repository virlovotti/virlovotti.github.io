import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const caseStudies = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/case-studies" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      role: z.string(),
      skills: z.array(z.string()),
      cover: image(),
      order: z.number(),
      featured: z.boolean(),
    }),
});

export const collections = {
  "case-studies": caseStudies,
};
