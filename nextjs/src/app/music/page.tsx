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

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {albums.map((album) => (
          <li key={album._id}>
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
                Released: {new Date(album.releaseDate).toLocaleDateString()}
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
