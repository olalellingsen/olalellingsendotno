import Image, { ImageProps } from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import type {
  SanityImageSource,
  SanityImageObject,
} from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";

const builder = imageUrlBuilder(client);

/**
 * Shape we look for on an expanded image asset. None of these are required —
 * the component degrades gracefully when fields are missing — but if your
 * GROQ projection includes `asset->{ _id, url, metadata }` you get:
 *   - native dimensions (better default width/height + aspect)
 *   - LQIP blur placeholder
 *   - default alt text
 */
type ExpandedAsset = {
  _id?: string;
  url?: string;
  altText?: string;
  metadata?: {
    lqip?: string;
    dimensions?: {
      width?: number;
      height?: number;
      aspectRatio?: number;
    };
  };
};

type SanityImageInput = SanityImageSource & {
  alt?: string;
  asset?: { _ref?: string; _id?: string } & ExpandedAsset;
};

type SanityImageProps = Omit<ImageProps, "src" | "placeholder"> & {
  /** A Sanity image source (the value of an `image`-type field). */
  image: SanityImageInput | SanityImageSource | null | undefined;
  /**
   * If true, render with `fill` and let the parent CSS dictate dimensions.
   * Otherwise pass `width`/`height` like a normal next/image and the URL
   * will be cropped to those dimensions, honoring the hotspot.
   */
  fill?: boolean;
  /**
   * Opt out of the LQIP blur placeholder (defaults to "blur" when the
   * asset's `metadata.lqip` is available, otherwise "empty").
   */
  placeholder?: "blur" | "empty";
};

/**
 * Hotspot- and crop-aware wrapper around next/image for Sanity images.
 *
 * The image-url builder applies the hotspot/crop set in Sanity Studio
 * automatically — but only when the URL has explicit dimensions and is
 * configured to crop. This component always passes width+height and
 * `fit('crop')`, so the hotspot is honored.
 *
 * Works in both server and client components (no hooks).
 */
export default function SanityImage({
  image,
  alt,
  fill,
  width,
  height,
  sizes,
  placeholder,
  ...rest
}: SanityImageProps) {
  // Bail out if there's no usable image source. Handles undefined/null,
  // empty objects, and image fields where the asset hasn't been uploaded yet.
  if (!hasAssetReference(image)) return null;

  const dims = readDimensions(image);
  const lqip = readLqip(image);
  const resolvedAlt = alt ?? readAlt(image) ?? "";
  const resolvedPlaceholder =
    placeholder ?? (lqip ? "blur" : "empty");
  const blurDataURL = resolvedPlaceholder === "blur" ? lqip : undefined;

  if (fill) {
    // Pick a reasonable target size for the URL (the displayed size is
    // controlled by CSS — `sizes` decides which URL the browser picks).
    const targetWidth = 1600;
    const aspect = dims ? dims.width / dims.height : 16 / 9;
    const targetHeight = Math.round(targetWidth / aspect);

    const src = builder
      .image(image)
      .width(targetWidth)
      .height(targetHeight)
      .fit("crop")
      .auto("format")
      .url();

    return (
      <Image
        {...rest}
        src={src}
        alt={resolvedAlt}
        fill
        sizes={sizes ?? "100vw"}
        placeholder={resolvedPlaceholder}
        blurDataURL={blurDataURL}
      />
    );
  }

  // Default to a sensible width if the caller didn't supply one
  const w = typeof width === "number" ? width : 1200;
  const h =
    typeof height === "number"
      ? height
      : dims
        ? Math.round((w * dims.height) / dims.width)
        : Math.round(w * (2 / 3));

  const src = builder
    .image(image)
    .width(w)
    .height(h)
    .fit("crop")
    .auto("format")
    .url();

  return (
    <Image
      {...rest}
      src={src}
      alt={resolvedAlt}
      width={w}
      height={h}
      sizes={sizes}
      placeholder={resolvedPlaceholder}
      blurDataURL={blurDataURL}
    />
  );
}

/* ----------------------------- internals ------------------------------ */

/**
 * Returns true if the source is something the image-url builder can resolve.
 * The builder needs at least an asset reference (or an expanded asset doc
 * with a url/_id). Without one it throws "Unable to resolve image URL from source".
 */
function hasAssetReference(source: unknown): source is SanityImageSource {
  if (!source || typeof source !== "object") return false;
  const obj = source as Record<string, unknown>;
  const asset = obj.asset as Record<string, unknown> | undefined;
  if (asset && (asset._ref || asset._id || asset.url)) return true;
  // The source can also be a bare asset doc, or an _id/_ref directly
  if (typeof obj._ref === "string" || typeof obj._id === "string") return true;
  return false;
}

function readDimensions(
  source: SanityImageSource,
): { width: number; height: number } | null {
  // Prefer expanded metadata.dimensions when available
  const meta = (source as SanityImageObject & { asset?: ExpandedAsset })?.asset
    ?.metadata?.dimensions;
  if (meta?.width && meta?.height) {
    return { width: meta.width, height: meta.height };
  }
  // Fall back to parsing "<id>-<w>x<h>-<format>" from asset._ref
  const ref =
    (source as SanityImageObject)?.asset?._ref ??
    (typeof source === "object" && source && "_ref" in source
      ? (source as { _ref: string })._ref
      : undefined);
  if (!ref) return null;
  const match = ref.match(/-(\d+)x(\d+)-/);
  if (!match) return null;
  return { width: parseInt(match[1], 10), height: parseInt(match[2], 10) };
}

function readLqip(source: SanityImageSource): string | undefined {
  const asset = (source as SanityImageObject & { asset?: ExpandedAsset })
    ?.asset;
  return asset?.metadata?.lqip;
}

function readAlt(source: SanityImageSource): string | undefined {
  const obj = source as { alt?: string; asset?: ExpandedAsset };
  return obj?.alt || obj?.asset?.altText;
}
