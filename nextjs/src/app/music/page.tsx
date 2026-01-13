import { client, urlForImage } from "@/sanity/client";
import React from "react";
import { Album } from "../types";
import Image from "next/image";
import { ALBUMS_QUERY } from "../queries";
import Button from "../components/Button";

export default async function page() {
  const albums = await client.fetch<Album[]>(ALBUMS_QUERY);

  return (
    <article className="content">
      <h1>Discography</h1>

      <ul className="w-full flex flex-row gap-2 md:gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth no-scrollbar lg:grid lg:grid-cols-3">
        {albums.map((album) => (
          <li
            key={album._id}
            className="min-w-9/10 sm:min-w-2/5 snap-start group *:transition-opacity *:duration-500"
          >
            {album.coverArt && (
              <Image
                src={urlForImage(album.coverArt).url()}
                alt={album.title}
                width={400}
                height={400}
                className="w-full"
              />
            )}
            <div className="p-4">
              <h3>{album.title}</h3>
              <p>
                {album.artist ? (
                  <Button
                    href={`/projects/${album.artist.slug.current}`}
                    variant="link"
                  >
                    {album.artist.title}
                  </Button>
                ) : (
                  album.otherArtist
                )}
              </p>
              <p>
                Released:{" "}
                {new Date(album.releaseDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <Button href={album.streamingLink || "#"} variant="link">
                Listen Here
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
