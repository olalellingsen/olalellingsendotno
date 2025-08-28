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
  time?: string; // Optional, can be HH:MM format or TBA
  location: string;
  ticketLink?: string;
  image?: {
    asset: {
      _id: string;
      url: string;
    };
  };
};
