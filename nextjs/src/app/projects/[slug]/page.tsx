import React from "react";
import { client, urlForImage } from "@/sanity/client";
import {
  PROJECT_ALBUMS_QUERY,
  PROJECT_QUERY,
  PROJECT_UPCOMING_CONCERTS_QUERY,
} from "@/app/queries";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { Concert, Project } from "../../types";
import Button from "../../components/Button";
import { ConcertCard } from "@/app/components/ConcertCard";

const options = { next: { revalidate: 30 } };

export default async function page({ params }: { params: { slug: string } }) {
  const project = await client.fetch<Project>(PROJECT_QUERY, params, options);
  if (!project) {
    return <div>Project not found</div>;
  }
  const upcomingConcerts = await client.fetch<Concert[]>(
    PROJECT_UPCOMING_CONCERTS_QUERY,
    { projectId: project._id },
    options
  );

  const projectAlbums = await client.fetch<Project[]>(PROJECT_ALBUMS_QUERY, {
    projectId: project._id,
  });

  return (
    <main className="content">
      {project.image && (
        <Image
          src={urlForImage(project.image).url()}
          alt={project.title}
          width={1200}
          height={400}
          className="w-full aspect-square md:aspect-5/2 object-cover"
        />
      )}

      <article className="space-y-8 py-2">
        <h1>{project.title}</h1>

        {project.body && (
          <section className="prose">
            {Array.isArray(project.body) && (
              <PortableText value={project.body} />
            )}
          </section>
        )}

        {upcomingConcerts.length > 0 && (
          <section>
            <h3>Upcoming concerts with {project.title}</h3>
            <ul className="space-y-4">
              {upcomingConcerts.map((concert) => (
                <ConcertCard
                  key={concert._id}
                  concert={concert}
                  upcoming={true}
                />
              ))}
            </ul>
          </section>
        )}

        {projectAlbums.length > 0 && (
          <section>
            <h3>Albums by {project.title}</h3>
            <ul className="space-y-4">
              {projectAlbums.map((album) => (
                <li key={album._id}>
                  <h3>{album.title}</h3>
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.spotifyLink && (
          <Button href={project.spotifyLink || "#"}>Listen on Spotify</Button>
        )}
      </article>
    </main>
  );
}
