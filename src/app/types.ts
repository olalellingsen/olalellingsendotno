import { PortableTextBlock } from "@portabletext/react";
import {
  SanityImageObject,
  SanityImageSource,
} from "@sanity/image-url/lib/types/types";

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
  image?: SanityImageObject;
  spotifyLink: string;
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

export type Album = {
  _id: string;
  title: string;
  artist: {
    title: string;
    slug: {
      current: string;
    };
  };
  otherArtist?: string;
  releaseDate: string;
  coverArt?: SanityImageSource;
  streamingLink: string;
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
  image?: SanityImageObject;
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

export type Footer = {
  contactEmail: string;
  contactPhone: string;
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
};

// A single image inside the gallery's `images` array. Mirrors the shape
// returned by GALLERY_QUERY (asset is expanded so we can use metadata.lqip
// and metadata.dimensions for blur placeholders + intrinsic sizing).
export type GalleryImage = {
  _key: string;
  photographer?: string;
  alt?: string;
  image: SanityImageObject & {
    asset?: {
      _id: string;
      url: string;
      altText?: string;
      metadata?: {
        lqip?: string;
        dimensions?: {
          width: number;
          height: number;
          aspectRatio: number;
        };
      };
    };
  };
};

export type Gallery = {
  _id: string;
  images: GalleryImage[];
};

export type NewsItem = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string; // ISO date string
  image?: SanityImageObject;
  excerpt: string;
  content: Array<{
    _type: string;
    children: Array<{
      _type: string;
      text: string;
    }>;
  }>;
};
