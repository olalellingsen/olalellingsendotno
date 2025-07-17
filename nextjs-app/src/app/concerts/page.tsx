import React from "react";
import { client } from "../../../client";
import { CONCERTS_QUERY } from "@/app/queries";
import { Concert } from "../types";

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
            {concert.ticketLink && (
              <a
                href={concert.ticketLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy Tickets
              </a>
            )}
            {concert.image && (
              <img src={concert.image.asset.url} alt={concert.band} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
