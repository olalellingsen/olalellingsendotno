import React from "react";
import { client } from "@/sanity/client";
import { PROJECT_QUERY } from "@/app/queries";
import Link from "next/link";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

const options = { next: { revalidate: 30 } };

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = await client.fetch(PROJECT_QUERY, await params, options);

  return (
    <main>
      <h1>Project: {project.title}</h1>

      <Image
        src={urlFor(project.image)?.url() || ""}
        alt={project.title}
        width={800}
        height={300}
      />

      <div className="prose border p-4">
        {Array.isArray(project.body) && <PortableText value={project.body} />}
      </div>

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
    </main>
  );
}
