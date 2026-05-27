import { HOME_QUERY } from "../queries";
import { client } from "../../sanity/client";
import { HomePage } from "../types";
import SanityImage from "./components/SanityImage";
import PortableTextSection from "./components/PortableTextSection";
import InstagramComponent from "./components/InstagramComponent";
import Button from "./components/Button";
import NewsList from "./components/NewsList";
import NextConcerts from "./components/NextConcerts";
import Link from "next/link";

export default async function IndexPage() {
  const home = await client.fetch<HomePage>(HOME_QUERY);

  return (
    <article className="flex flex-col items-center space-y-8 p-2">
      {home.image && (
        <SanityImage
          image={home.image}
          alt={home.title || "Home"}
          width={1200}
          height={800}
          sizes="(max-width: 768px) 100vw, 768px"
          className="w-full max-w-3xl h-auto"
          priority
        />
      )}

      <section className="max-w-3xl w-full">
        <h2>Upcoming concerts</h2>
        <NextConcerts />
        <Button href="/concerts" variant="link" className="mt-2">
          See all concerts
        </Button>
      </section>

      <section className="max-w-3xl w-full">
        <PortableTextSection
          content={{ _type: "richText", content: home.richText }}
        />
      </section>

      <section className="bg-sky-950 p-6 -mx-2">
        <h2>
          <Link href="/news">News</Link>
        </h2>
        <NewsList maxItems={3} />
      </section>

      <section className="w-full max-w-3xl">
        <InstagramComponent />
      </section>

      <section className="max-w-3xl w-full">
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
      </section>
    </article>
  );
}
