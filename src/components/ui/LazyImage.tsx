import { useEffect, useState } from "react";
import { placeholderImage } from "@/data/images";

export default function LazyImage({
  src,
  alt,
  className = "",
  ratio = "aspect-[4/5]",
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
  sizes?: string;
}) {
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setErrored(false);
  }, [src]);

  return (
    <div className={`overflow-hidden bg-surface-soft ${ratio} ${className}`}>
      <img
        src={errored ? placeholderImage() : src}
        alt={alt}
        loading="lazy"
        decoding="async"
        sizes={sizes}
        onError={() => setErrored(true)}
        className={`h-full w-full ${errored ? "object-contain p-8 opacity-40" : "object-cover"}`}
      />
    </div>
  );
}
