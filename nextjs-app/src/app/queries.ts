import groq from "groq";

export const PROJECTS_QUERY = groq`*[_type == "projects"]{
  _id,
  title,
  description,
  slug {
    current
  },
  image {
    asset -> {
      _id,
      url
    }
  },
  spotifyLink,
  members
}`;

export const PROJECT_QUERY = groq`*[_type == "projects" && slug.current == $slug][0]{
  _id,
  title,
  description,
  slug {
    current
  },
  image {
    asset -> {
      _id,
      url
    }
  },
  spotifyLink,
  members
}`;

export const CONCERTS_QUERY = groq`*[_type == "concerts"]|order(date asc){
  _id,
  band,
  date,
  location,
  ticketLink,
  image {
    asset -> {
      _id,
      url
    }
    }   
}`;

export const ABOUT = groq`*[_type == "about"][0]{
  _id,
  title,
  richText,
  image {
    asset -> {
      _id,
      url
    }
  },
  socialLinks {
    platform,
    url
  }
}`;
