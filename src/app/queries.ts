import groq from "groq";

// Reusable projection that expands an image asset with everything SanityImage
// needs (lqip for blur placeholders, dimensions for intrinsic sizing, altText).
// `...` keeps hotspot/crop on the outer image object.
const IMAGE_FRAGMENT = groq`{
  ...,
  asset->{
    _id,
    url,
    altText,
    metadata {
      lqip,
      dimensions { width, height, aspectRatio }
    }
  }
}`;

export const PROJECTS_QUERY = groq`
*[_type == "projects"] | order(order asc) {
  _id,
  title,
  description,
  slug { current },
  image ${IMAGE_FRAGMENT},
  spotifyLink,
  members
}`;

export const PROJECT_QUERY = groq`*[_type == "projects" && slug.current == $slug][0]{
  _id,
  title,
  body,
  slug { current },
  image ${IMAGE_FRAGMENT},
  spotifyLink
}`;

export const PROJECT_UPCOMING_CONCERTS_QUERY = groq`*[_type == "concerts" && project._ref == $projectId && date >= now()] | order(date asc, time asc){
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

export const PROJECT_ALBUMS_QUERY = groq`*[_type == "albums" && artist._ref == $projectId] | order(releaseDate desc) {
  _id,
  title,
  artist->{
    title,
    slug
  },
  otherArtist,
  releaseDate,
  coverArt ${IMAGE_FRAGMENT},
  streamingLink
}`;

export const UPCOMING_CONCERTS_QUERY = groq`*[_type == "concerts" && date >= $today] | order(date asc, time asc){
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

export const PREVIOUS_CONCERTS_QUERY = groq`*[_type == "concerts" && date < $today] | order(date desc, time asc){
    _id,
    band,
    date,
    venue->{
      name
    }
  }`;

export const NEXT_CONCERT_QUERY = groq`*[_type == "concerts" && date >= $today] | order(date asc, time asc)[0]{
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

export const HOME_QUERY = groq`*[_id == "home"][0]{
  _id,
  title,
  richText,
  image ${IMAGE_FRAGMENT},
  socialLinks {
    platform,
    url
  }
}`;

export const ALBUMS_QUERY = groq`*[_type == "albums"] | order(releaseDate desc) {
  _id,
  title,
  artist->{
    title,
    slug
  },
  label,
  labelLink,
  otherArtist,
  releaseDate,
  coverArt ${IMAGE_FRAGMENT},
  streamingLink
}`;

export const GALLERY_QUERY = groq`*[_id == "gallery"][0]{
  _id,
  images[]{
    _key,
    photographer,
    alt,
    image ${IMAGE_FRAGMENT}
  }
}`;

export const NEWS_QUERY = groq`*[_type == "news" && publishedAt <= $today] | order(publishedAt desc){
    _id,
    title,
    slug,
    publishedAt,
    image ${IMAGE_FRAGMENT},
    excerpt,
    content
}`;

export const NEWS_ITEM_QUERY = groq`*[_type == "news" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  image ${IMAGE_FRAGMENT},
  excerpt,
  content
}`;
