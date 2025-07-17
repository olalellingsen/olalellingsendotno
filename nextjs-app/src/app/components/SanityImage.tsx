"use client";

import { urlForImage } from "../../../client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image, { ImageProps } from "next/image";

type Props = Omit<ImageProps, "src"> & {
  src: SanityImageSource;
};

export default function SanityImage({ src, alt, ...props }: Props) {
  if (!src) {
    return null;
  }

  return (
    <Image
      src={urlForImage(src).url()}
      alt={alt}
      loader={({ width, quality = 100 }) =>
        urlForImage(src).width(width).quality(quality).url()
      }
      {...props}
    />
  );
}
