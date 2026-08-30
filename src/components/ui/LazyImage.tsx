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
  return (
    <div className={`overflow-hidden bg-surface-soft ${ratio} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        sizes={sizes}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
