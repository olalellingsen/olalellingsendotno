"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./src/sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

// Document types that should be treated as singletons.
// Keep this in sync with SINGLETON_TYPES in ./src/sanity/structure.ts
const SINGLETON_TYPES = new Set(["home", "footer", "gallery"]);

// Only these actions remain available on singletons — no duplicate, no delete,
// no "create new" copy. Editors can still publish edits and discard drafts.
const SINGLETON_ACTIONS = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "default",
  title: "Ola Lømo Ellingsen",
  basePath: "/studio", // `basePath` must match the route of your Studio
  projectId,
  dataset,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    // Hide singleton types from the global "+ Create" menu so they can only
    // be reached through the custom structure entries.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    // Restrict actions on singleton documents (no duplicate / delete / new).
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(({ action }) => action && SINGLETON_ACTIONS.has(action))
        : input,
  },
});
