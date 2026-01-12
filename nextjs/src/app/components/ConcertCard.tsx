import React from "react";
import Button from "./Button";
import { Concert } from "../types";

interface ConcertCardProps {
  concert: Concert;
  upcoming: boolean;
}

export const ConcertCard = ({ concert, upcoming }: ConcertCardProps) => {
  return (
    <li
      className="
        border-b border-foreground/20 py-4
        grid lg:grid-cols-10 lg:items-center
      "
    >
      <div className="font-medium">
        {new Date(concert.date).toLocaleDateString()}
      </div>

      <div className="text-gray-500">
        {concert.time ? `${concert.time}` : ""}
      </div>

      <div className="font-medium lg:col-span-5 mr-20 lg:mr-0">
        {concert.band}
      </div>

      <div className="lg:col-span-2">
        {concert.venue?.locationLink ? (
          <Button href={concert.venue.locationLink} variant="link">
            {concert.venue.name}
          </Button>
        ) : (
          <p>{concert.venue?.name}</p>
        )}
      </div>

      {concert.ticketLink && upcoming && (
        <Button
          size="sm"
          className="justify-self-end absolute lg:relative"
          href={concert.ticketLink}
        >
          Tickets
        </Button>
      )}
    </li>
  );
};
