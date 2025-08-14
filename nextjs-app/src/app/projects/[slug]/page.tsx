import React from "react";
import { client } from "@/sanity/client";
import { PROJECT_QUERY } from "@/app/queries";
import Link from "next/link";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { Project } from "../../types";
import Button from "../../components/Button";

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
  console.log("Project data:", project);

  return (
    <main>
      {project.image && (
        <Image
          src={urlFor(project.image).url() || ""}
          alt={project.title}
          width={800}
          height={300}
          placeholder="blur"
          blurDataURL={project.image?.asset.metadata?.lqip || ""}
        />
      )}

      <h1>{project.title}</h1>

      {project.body && (
        <section className="prose border p-4">
          {Array.isArray(project.body) && <PortableText value={project.body} />}
        </section>
      )}

      {project.concerts && (
        <section>
          <h2>Upcoming concerts</h2>
          <ul>
            {project.concerts.map((concert) => (
              <li key={concert._id}>
                <h3>{concert.band}</h3>
                <p>{new Date(concert.date).toLocaleDateString()}</p>
                <p>{concert.location}</p>

                <Button href={concert.ticketLink || "#"} variant="outline">
                  Tickets
                </Button>
              </li>
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
