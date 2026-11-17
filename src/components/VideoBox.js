export default function VideoBox({ youtubeId, src, poster, title }) {
  const box = "aspect-video w-full overflow-hidden rounded-xl bg-navy shadow-xl";

  if (youtubeId) {
    return (
      <div className={box}>
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
          title={title}
          loading="lazy"
          allow="accelerometer; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (src) {
    return (
      <div className={box}>
        <video className="h-full w-full object-cover" controls preload="none" poster={poster}>
          <source src={src} type="video/mp4" />
        </video>
      </div>
    );
  }

  return (
    <div className={`${box} flex items-center justify-center text-white/70`}>
      <p>▶ {title} — video coming soon</p>
    </div>
  );
}