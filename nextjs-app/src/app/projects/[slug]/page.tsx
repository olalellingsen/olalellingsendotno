import React from "react";
import { client } from "../../../../client";
import { PROJECT_QUERY } from "@/app/queries";

export default async function page({ params }: { params: { slug: string } }) {
  const project = await client.fetch(PROJECT_QUERY, { slug: params.slug });

  return (
    <div>
      <h1>Project: {project.title}</h1>
      <p>{project.description}</p>
      {project.image && (
        <img src={project.image.asset.url} alt={project.title} />
      )}
      <p>
        <a href={project.spotifyLink}>Listen on Spotify</a>
      </p>
      <p>Members: {project.members.join(", ")}</p>
    </div>
  );
}
