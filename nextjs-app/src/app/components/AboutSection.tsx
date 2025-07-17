import React from "react";
import { ABOUT } from "../queries";
import { client } from "../../../client";
import { PortableText } from "next-sanity";
import SanityImage from "./SanityImage";

export default async function AboutSection() {
  const about = await client.fetch(ABOUT);
  console.log("About Section Data:", about);

  return (
    <section className="max-w-4xl mx-auto p-6">
      <SanityImage
        src={about?.image}
        alt="About Image"
        width={800}
        height={600}
      />

      <PortableText value={about?.richText} />
    </section>
  );
}
