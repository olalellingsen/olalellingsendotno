import { Album } from "@/app/types";
import React from "react";
import Link from "next/link";
import Button from "./Button";
import SanityImage from "./SanityImage";
import SliderItem from "./SliderItem";

export default function AlbumCard({ album }: { album: Album }) {
  return (
    <SliderItem>
      {album.coverArt && (
        <Link
          href={album.streamingLink || "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SanityImage
            image={album.coverArt}
            alt={album.title}
            width={600}
            height={600}
            sizes="(max-width: 640px) 50vw, 240px"
            className="w-full group-hover:opacity-70 transition-opacity duration-300 rounded-2xl"
          />
        </Link>
      )}
      <div className="p-2 flex flex-col items-center text-center">
        <h3>{album.title}</h3>

        {new Date(album.releaseDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}

        {album.artist ? (
          <Button
            href={`/projects/${album.artist.slug.current}`}
            variant="link"
          >
            {album.artist.title}
          </Button>
        ) : (
          <p>{album.otherArtist}</p>
        )}

        {album.label && album.labelLink && (
          <p>
            <Button
              href={album.labelLink}
              external
              variant="link"
              className="ml-2"
            >
              {album.label}
            </Button>
          </p>
        )}
        {album.streamingLink && (
          <Button href={album.streamingLink} external className="my-2">
            Listen Here
          </Button>
        )}
      </div>
    </SliderItem>
  );
}
