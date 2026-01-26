"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: "default",
  title: "Ola Lømo Ellingsen",
  basePath: "/studio", // `basePath` must match the route of your Studio
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
