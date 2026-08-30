import { useState } from "react";
import LazyImage from "@/components/ui/LazyImage";

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <LazyImage
        src={images[active]}
        alt={alt}
        ratio="aspect-square"
        className="rounded-2xl"
      />
      {images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`تصویر ${i + 1}`}
              aria-current={active === i}
              className={`overflow-hidden rounded-xl border-2 transition-colors ${
                active === i ? "border-gold" : "border-transparent"
              }`}
            >
              <LazyImage src={src} alt="" ratio="aspect-square" className="w-16 sm:w-20" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
