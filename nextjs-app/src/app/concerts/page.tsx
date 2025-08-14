import React from "react";
import { client } from "@/sanity/client";
import { CONCERTS_QUERY } from "@/app/queries";
import { Concert } from "../types";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

export default async function page() {
  const concerts = await client.fetch<Concert[]>(CONCERTS_QUERY);

  return (
    <main>
      <h1>Concerts</h1>
      <ul>
        {concerts.map((concert) => (
          <li key={concert._id}>
            <h2>{concert.band}</h2>
            <p>{new Date(concert.date).toLocaleDateString()}</p>
            {concert.time && <p>Time: {concert.time}</p>}
            <p>{concert.location}</p>
            {concert.image && (
              <Image
                src={urlFor(concert.image).url()}
                alt={concert.band}
                width={800}
                height={600}
              />
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
