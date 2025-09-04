import React from "react";
import Button from "./Button";
import { Concert } from "../types";

interface ConcertCardProps {
  concert: Concert;
  upcoming: boolean;
}

export const ConcertCard = ({ concert, upcoming }: ConcertCardProps) => {
  return (
    <li className="px-2 py-4">
      <div className="flex justify-between">
        <div>
          <p>{new Date(concert.date).toLocaleDateString()}</p>
          <h3 className="font-bold">{concert.band}</h3>
        </div>
        {concert.ticketLink && upcoming && (
          <Button href={concert.ticketLink}>Tickets</Button>
        )}
      </div>

      {concert.venue?.locationLink ? (
        <Button href={concert.venue?.locationLink} variant="link">
          {concert.venue?.name}
        </Button>
      ) : (
        <p>{concert.venue?.name}</p>
      )}
      <hr className="mt-2" />
    </li>
  );
};
