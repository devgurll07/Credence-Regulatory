import BgMedia from "./BgMedia";

export default function SectionBg({
  image,
  opacity = 0.6,
  overlay = "bg-white/75",
  position = "center",
}) {
  return (
    <>
      <BgMedia image={image} alt="" opacity={opacity} position={position} />
      <div className={`absolute inset-0 ${overlay}`} />
    </>
  );
}