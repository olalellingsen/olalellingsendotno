import React from "react";
import { client } from "@/sanity/client";
import { CONCERTS_QUERY } from "@/app/queries";
import { Concert } from "../types";
import { ConcertCard } from "../components/ConcertCard";

export default async function page() {
  const allConcerts = await client.fetch<Concert[]>(CONCERTS_QUERY);

  // Normalize today's date to midnight for date-only comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingConcerts = allConcerts
    .filter((concert) => {
      if (!concert.date) return false;
      const concertDate = new Date(concert.date);
      concertDate.setHours(0, 0, 0, 0);
      return concertDate >= today;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // soonest first

  const pastConcerts = allConcerts
    .filter((concert) => {
      if (!concert.date) return false;
      const concertDate = new Date(concert.date);
      concertDate.setHours(0, 0, 0, 0);
      return concertDate < today;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // most recent first

  return (
    <main>
      <h1>Concerts</h1>
      <h2>Upcoming Concerts</h2>
      <ul>
        {upcomingConcerts.map((concert) => (
          <ConcertCard key={concert._id} concert={concert} upcoming={true} />
        ))}
      </ul>
      <br />
      <h2>Past Concerts</h2>
      <ul>
        {pastConcerts.map((concert) => (
          <ConcertCard key={concert._id} concert={concert} upcoming={false} />
        ))}
      </ul>
    </main>
  );
}
