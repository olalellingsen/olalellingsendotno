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
    };
  };
  spotifyLink: string;
  members: string[];
};

export type Concert = {
  _id: string;
  band: string;
  date: string; // ISO date string
  location: string;
  ticketLink?: string;
  image?: {
    asset: {
      _id: string;
      url: string;
    };
  };
};
