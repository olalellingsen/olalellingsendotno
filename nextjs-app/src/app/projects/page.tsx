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
    <main>
      <h1>Projects</h1>

      <ul className="w-full py-4 flex flex-row gap-4 overflow-auto snap-x snap-mandatory scroll-smooth no-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project) => {
          const textColor =
            project.image?.asset.metadata?.palette?.darkMuted?.foreground;
          return (
            <Link
              key={project._id}
              href={`/projects/${project.slug.current}`}
              className="min-w-4/5 md:min-w-2/5 snap-start group relative *:transition-opacity *:duration-500"
            >
              {project.image && (
                <Image
                  src={urlFor(project.image).url() || ""}
                  alt={project.title}
                  width={1200}
                  height={800}
                  placeholder="blur"
                  blurDataURL={project.image?.asset.metadata?.lqip || ""}
                  className="aspect-square object-cover rounded-3xl opacity-100 group-hover:opacity-50"
                />
              )}

              <h2
                style={{ color: textColor }}
                className="xl:opacity-0 group-hover:opacity-100 xl:absolute bottom-0 left-4 p-2"
              >
                {project.title}
              </h2>
            </Link>
          );
        })}
      </ul>
    </main>
  );
}
