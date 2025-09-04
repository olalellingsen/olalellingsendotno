import groq from "groq";

export const PROJECTS_QUERY = groq`
*[_type == "projects"]{
  _id,
  title,
  description,
  slug {
    current
  },
  image {
    asset -> {
      _id,
      url,
      metadata
    }
  },
  spotifyLink,
  members
}`;

export const PROJECT_QUERY = groq`*[_type == "projects" && slug.current == $slug][0]{
  _id,
  title,
  body,
  slug {
    current
  },
  image {
    asset -> {
      _id,
      url,
      metadata
    }
  },
  spotifyLink,
  concerts[]->{
    _id,
    band,
    date,
    location,
    ticketLink,
  }
}`;

export const CONCERTS_QUERY = groq`*[_type == "concerts"] | order(date asc){
  _id,
  band,
  date,
  time,
  venue->{
    name,
    locationLink
  },
  ticketLink,
}`;

export const HOME_QUERY = groq`*[_type == "home"][0]{
  _id,
  title,
  richText,
  image,
  socialLinks {
    platform,
    url
  }
}`;

export const ALBUMS_QUERY = groq`*[_type == "albums"]{
  _id,
  title,
  artist,
  releaseDate,
  coverArt,
  trackList,
  personnel,
  spotifyLink,
  description
}`;

export const SINGLES_QUERY = groq`*[_type == "singles"]{
  _id,
  title,
  artist,
  releaseDate,
  coverArt,
  spotifyLink
}`;
