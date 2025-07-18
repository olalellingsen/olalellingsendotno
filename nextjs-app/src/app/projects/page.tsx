import React from "react";
import { client, urlForImage } from "../../../client";
import Link from "next/link";
import { PROJECTS_QUERY } from "@/app/queries";
import { Project } from "../types";
import Image from "next/image";

export default async function page() {
  const projects = await client.fetch<Project[]>(PROJECTS_QUERY);

  return (
    <section className="container mx-auto p-8 grid gap-4 sm:gap-8 sm:grid-cols-2">
      {projects.map((project) => (
        <Link key={project._id} href={`/projects/${project.slug.current}`}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          {project.image && (
            <Image
              src={urlForImage(project.image).url()}
              alt={project.title}
              width={800}
              height={600}
            />
          )}
        </Link>
      ))}
    </section>
  );
}
