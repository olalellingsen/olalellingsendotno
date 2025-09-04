import { PortableTextBlock } from "@portabletext/react";

export type Project = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  body: Array<{
    _type: string;
    children: Array<{
      _type: string;
      text: string;
    }>;
  }>;
  image?: {
    asset: {
      _id: string;
      url: string;
      metadata?: {
        lqip: string;
        palette?: {
          darkMuted?: {
            background: string;
            foreground: string;
            population: number;
          };
        };
      };
    };
  };
  spotifyLink: string;
  concerts: Concert[];
};

export type Concert = {
  _id: string;
  band: string;
  date: string; // ISO date string
  time?: string;
  venue?: {
    name: string;
    locationLink: string;
  };
  ticketLink?: string;
};

export type HomePage = {
  _id: string;
  title: string;
  richText: Array<{
    _type: string;
    children: Array<{
      _type: string;
      text: string;
    }>;
  }>;
  image?: {
    asset: {
      _id: string;
      url: string;
    };
  };
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
};

// Rich text block type
export type RichTextBlock = {
  _type: "richText";
  content: PortableTextBlock[];
};
