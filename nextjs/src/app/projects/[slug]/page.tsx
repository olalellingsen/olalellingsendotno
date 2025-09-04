import React from "react";
import { client } from "@/sanity/client";
import { PROJECT_QUERY } from "@/app/queries";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { Project } from "../../types";
import Button from "../../components/Button";
import { ConcertCard } from "@/app/components/ConcertCard";

const options = { next: { revalidate: 30 } };

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = await client.fetch<Project>(
    PROJECT_QUERY,
    await params,
    options
  );

  return (
    <main>
      {project.image && (
        <Image
          src={urlFor(project.image).url() || ""}
          alt={project.title}
          width={800}
          height={300}
          className="w-full aspect-square md:aspect-video object-cover rounded-3xl"
          placeholder="blur"
          blurDataURL={project.image?.asset.metadata?.lqip || ""}
        />
      )}

      <h1 className="p-4">{project.title}</h1>

      {project.body && (
        <section className="prose p-4">
          {Array.isArray(project.body) && <PortableText value={project.body} />}
        </section>
      )}

      {project.concerts && (
        <section className="p-4">
          <h2>Upcoming concerts with {project.title}</h2>
          <ul className="space-y-4">
            {project.concerts.map((concert) => (
              <ConcertCard key={concert._id} concert={concert} upcoming={true} />
            ))}
          </ul>
        </section>
      )}

      {project.spotifyLink && (
        <Button href={project.spotifyLink || "#"}>Listen on Spotify</Button>
      )}
    </main>
  );
}
