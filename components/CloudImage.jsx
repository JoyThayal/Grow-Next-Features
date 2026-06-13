"use client";

import { CldImage } from "next-cloudinary";

export default function CloudImage({ src, alt }) {
  return <CldImage width={600} height={400} src={src} alt={alt} />;
}
