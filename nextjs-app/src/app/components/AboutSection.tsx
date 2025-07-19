import React from "react";
import { ABOUT } from "../queries";
import { client, urlForImage } from "../../sanity/client";
import { PortableText } from "next-sanity";
import Image from "next/image";

export default async function AboutSection() {
  const about = await client.fetch(ABOUT);
  console.log("About Section Data:", about);

  return (
    <section className="max-w-4xl mx-auto p-6">
      <Image
        src={urlForImage(about?.image).url()}
        alt="About Image"
        width={800}
        height={600}
      />

      <PortableText value={about?.richText} />
    </section>
  );
}
