import React from "react";
import { client } from "../../../client";
import Link from "next/link";
import { PROJECTS_QUERY } from "@/app/queries";
import { Project } from "../types";

export default async function page() {
  const projects = await client.fetch<Project[]>(PROJECTS_QUERY);

  return (
    <section className="container mx-auto p-8 grid gap-4 sm:gap-8 sm:grid-cols-2">
      {projects.map((project) => (
        <Link key={project._id} href={`/projects/${project.slug.current}`}>
          <div className="">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            {project.image && (
              <img src={project.image.asset.url} alt={project.title} />
            )}
            <p>
              <a href={project.spotifyLink}>Listen on Spotify</a>
            </p>
            <p>Members: {project.members.join(", ")}</p>
          </div>
        </Link>
      ))}
    </section>
  );
}
