import { client } from "@/sanity/client";
import { NEWS_ITEM_QUERY } from "@/app/queries";
import { NewsItem } from "@/app/types";
import React from "react";
import SanityImage from "../../components/SanityImage";
import PortableTextSection from "../../components/PortableTextSection";
import Button from "../../components/Button";

export async function generateStaticParams() {
  const projects = await client.fetch<{ slug: string }[]>(
    `*[_type == "news"]{ "slug": slug.current }`,
  );

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function newsItem({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const newsItem = await client.fetch<NewsItem | null>(NEWS_ITEM_QUERY, {
    slug,
  });
  if (!newsItem) {
    return <div>News item not found</div>;
  }

  return (
    <div className="content space-y-2">
      <Button href="/news" variant="link">
        &larr; Back to news
      </Button>
      <div className="grid gap-4 sm:grid-cols-2">
        {newsItem.image && (
          <SanityImage
            image={newsItem.image}
            alt={newsItem.title}
            width={1600}
            height={1600}
            sizes="(max-width: 768px) 100vw, 768px"
            className="w-full aspect-square object-cover group-hover:opacity-70 transition-opacity duration-300"
            priority
          />
        )}
        <div className="space-y-2">
          <h1>{newsItem.title}</h1>
          <p>
            {new Date(newsItem.publishedAt).toLocaleDateString("en-GB", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
          <p className="font-semibold max-w-xl">{newsItem.excerpt}</p>
          <PortableTextSection
            content={{ _type: "richText", content: newsItem.content }}
          />
        </div>
      </div>
    </div>
  );
}
