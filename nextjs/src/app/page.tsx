import { ABOUT } from "./queries";
import { client, urlForImage } from "../sanity/client";
import { PortableText } from "next-sanity";
import Image from "next/image";

export default async function IndexPage() {
  const about = await client.fetch(ABOUT);

  return (
    <main>
      <Image
        src={urlForImage(about?.image).url()}
        alt="About Image"
        width={800}
        height={600}
      />

      <div className="prose border p-4">
        {Array.isArray(about.richText) && (
          <PortableText value={about.richText} />
        )}
      </div>
    </main>
  );
}
