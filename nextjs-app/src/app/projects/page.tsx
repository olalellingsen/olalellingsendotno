import React from "react";
import { client } from "@/sanity/client";
import Link from "next/link";
import { PROJECTS_QUERY } from "@/app/queries";
import { Project } from "../types";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

export default async function page() {
  const projects = await client.fetch<Project[]>(PROJECTS_QUERY);
  console.log("Projects fetched:", projects);

  return (
    <main>
      <ul className="w-full">
        {projects.map((project) => {
          const bgColor =
            project.image?.asset.metadata?.palette?.darkMuted?.background ||
            "#fff";
          return (
            <li key={project._id}>
              <Link
                href={`/projects/${project.slug.current}`}
                className="w-full h-full flex group"
              >
                {project.image && (
                  <Image
                    src={urlFor(project.image).url()}
                    alt={project.title}
                    width={1200}
                    height={800}
                    className="aspect-video object-cover w-1/4 group-hover:w-1/3 transition-all duration-500 ease-in-out"
                  />
                )}

                <div
                  style={{ backgroundColor: bgColor }}
                  className="w-full p-8 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                >
                  <h2 className="text-xl">{project.title}</h2>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
