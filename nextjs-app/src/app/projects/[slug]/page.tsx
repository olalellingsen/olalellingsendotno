import React from "react";
import { client } from "../../../../client";
import { PROJECT_QUERY } from "@/app/queries";
import Link from "next/link";
import { urlForImage } from "../../../../client";
import Image from "next/image";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await client.fetch(PROJECT_QUERY, { slug });

  return (
    <div>
      <h1>Project: {project.title}</h1>
      <p>{project.description}</p>
      <Image
        src={urlForImage(project.image).url()}
        alt={project.title}
        width={800}
        height={600}
      />

      {project.members && (
        <ul className="list-disc pl-5">
          {project.members.map((member: string, index: number) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
      )}
      <Link href={project.spotifyLink ? project.spotifyLink : "#"}>
        Listen on Spotify
      </Link>
    </div>
  );
}
