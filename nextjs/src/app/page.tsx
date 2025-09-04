import { HOME_QUERY } from "./queries";
import { client, urlForImage } from "../sanity/client";
import Image from "next/image";
import { HomePage } from "./types";
import PortableTextSection from "./components/PortableTextSection";
import InstagramComponent from "./components/InstagramComponent";

export default async function IndexPage() {
  const home = await client.fetch<HomePage>(HOME_QUERY);

  return (
    <main className="flex flex-col items-center">
      <header className="h-[90vh]">
        {home.image && (
          <Image
            src={urlForImage(home?.image).url()}
            alt="Home Image"
            width={800}
            height={600}
            className="pt-20 sm:pt-0"
          />
        )}
      </header>

      <article className="flex flex-col items-center gap-10">
        <PortableTextSection
          content={{ _type: "richText", content: home.richText }}
        />

        <iframe
          className="w-full h-[500px]"
          data-testid="embed-iframe"
          src="https://open.spotify.com/embed/artist/4NZ0fCPxiuIaEHw9kUgURe?utm_source=generator&theme=0"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />

        <InstagramComponent />
      </article>
    </main>
  );
}
