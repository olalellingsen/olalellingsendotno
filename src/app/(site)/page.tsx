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
    <article className="flex flex-col items-center space-y-2 md:space-y-4">
      {home.image && (
        <SanityImage
          image={home.image}
          height={1500}
          width={1200}
          alt={home.title || "Home"}
          sizes="(max-width: 768px) 100vw, 768px"
          className="w-full max-w-3xl sm:aspect-square object-cover"
          priority
        />
      )}

      <section className="max-w-3xl w-full p-2">
        <h2>Upcoming concerts</h2>
        <NextConcerts />
        <Button href="/concerts" variant="link" className="mt-2">
          See all concerts
        </Button>
      </section>

      <section className="max-w-3xl w-full p-2">
        <PortableTextSection
          content={{ _type: "richText", content: home.richText }}
        />
      </section>

      <section className="bg-black/20 p-2 sm:p-6">
        <h2>
          <Link href="/news">News</Link>
        </h2>
        <NewsList maxItems={3} />
      </section>

      <section className="w-full max-w-3xl p-2">
        <InstagramComponent />
      </section>

      <section className="max-w-3xl w-full p-2">
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
