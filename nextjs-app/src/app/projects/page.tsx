import React from "react";
import { client } from "@/sanity/client";
import Link from "next/link";
import { PROJECTS_QUERY } from "@/app/queries";
import { Project } from "../types";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

export default async function page() {
  const projects = await client.fetch<Project[]>(PROJECTS_QUERY);

  return (
    <section className="container mx-auto p-8 grid gap-4 sm:gap-8 sm:grid-cols-2">
      {projects.map((project) => (
        <Link key={project._id} href={`/projects/${project.slug.current}`}>
          <h2>{project.title}</h2>
          {project.image && (
            <Image
              src={urlFor(project.image).url()}
              alt={project.title}
              width={1200}
              height={800}
            />
          )}
        </Link>
      ))}
    </section>
  );
}
