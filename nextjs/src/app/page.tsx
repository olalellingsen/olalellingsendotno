import { HOME_QUERY } from "./queries";
import { client, urlForImage } from "../sanity/client";
import Image from "next/image";
import { HomePage } from "./types";
import PortableTextSection from "./components/PortableTextSection";
import InstagramComponent from "./components/InstagramComponent";
import Button from "./components/Button";

export default async function IndexPage() {
  const home = await client.fetch<HomePage>(
    HOME_QUERY,
    {},
    { next: { revalidate: 60 } }
  );

  return (
    <article className="content flex flex-col items-center">
      {home.image && (
        <Image
          src={urlForImage(home?.image).url()}
          alt="Home Image"
          width={600}
          height={400}
        />
      )}
      <section className="w-full max-w-3xl mt-4 space-y-8">
        <PortableTextSection
          content={{ _type: "richText", content: home.richText }}
        />

        <div>
          <iframe
            className="w-full h-[480px]"
            data-testid="embed-iframe"
            src="https://open.spotify.com/embed/artist/4NZ0fCPxiuIaEHw9kUgURe?utm_source=generator&theme=0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
          <Button href="/music" variant="link" className="mt-2">
            See discography
          </Button>
        </div>

        <InstagramComponent />
      </section>
    </article>
  );
}
