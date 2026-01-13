import React from "react";
import { client } from "@/sanity/client";
import { PROJECTS_QUERY } from "@/app/queries";
import { Project } from "../types";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import Link from "next/link";

export default async function page() {
  const projects = await client.fetch<Project[]>(PROJECTS_QUERY);

  return (
    <article className="content">
      <h1>Projects</h1>

      <ul className="w-full flex flex-row gap-2 md:gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth no-scrollbar lg:grid lg:grid-cols-3">
        {projects.map((project) => {
          return (
            <Link
              key={project._id}
              href={`/projects/${project.slug.current}`}
              className="min-w-9/10 md:min-w-2/5 snap-start group relative *:transition-opacity *:duration-500"
            >
              {project.image && (
                <Image
                  src={urlFor(project.image).url() || ""}
                  alt={project.title}
                  width={1200}
                  height={800}
                  className="aspect-3/4 lg:aspect-square object-cover rounded-2xl group-hover:opacity-80 transition-opacity duration-300"
                />
              )}

              <h3 className="p-2 group-hover:underline">{project.title}</h3>
            </Link>
          );
        })}
      </ul>
    </article>
  );
}
