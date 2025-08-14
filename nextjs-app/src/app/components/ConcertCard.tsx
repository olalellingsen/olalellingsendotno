import React from "react";
import Button from "./Button";
import { Concert } from "../types";

export const ConcertCard = ({ concert }: { concert: Concert }) => {
  return (
    <li className="p-2 border-b flex justify-between">
      <div>
        <h3>{concert.band}</h3>
        <p>{new Date(concert.date).toLocaleDateString()}</p>
        <p>{concert.location}</p>
      </div>

      <Button href={concert.ticketLink || "#"} variant="outline">
        Tickets
      </Button>
    </li>
  );
};
