import React from "react";
import { client } from "@/sanity/client";
import { CONCERTS_QUERY } from "@/app/queries";
import { Concert } from "../types";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

export default async function page() {
  const concerts = await client.fetch<Concert[]>(CONCERTS_QUERY);
  console.log("Concerts:", concerts);

  return (
    <section>
      <h1>Concerts</h1>
      <div>
        {concerts.map((concert) => (
          <div key={concert._id}>
            <h2>{concert.band}</h2>
            <p>{concert.date}</p>
            <p>{concert.location}</p>
            {concert.image && (
              <Image
                src={urlFor(concert.image).url()}
                alt={concert.band}
                width={800}
                height={600}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
