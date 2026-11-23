import Image from "next/image";

export default function BgMedia({ image, alt = "", opacity = 0.5, position = "center", priority = false }) {
  if (!image) return null;
  return (
    <div aria-hidden="true" className="absolute inset-0" style={{ opacity: Math.min(opacity, 0.12) }}>
      <Image
        src={image}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}