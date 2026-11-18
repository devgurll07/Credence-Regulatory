export default function Stars({ rating = 5, className = "text-lg" }) {
  return (
    <span className={`inline-flex ${className}`} role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const fill = rating >= n ? 100 : rating >= n - 0.5 ? 50 : 0;
        return (
          <span key={n} className="relative inline-block text-gray-300">
            ★
            <span className="absolute left-0 top-0 overflow-hidden text-amber-400" style={{ width: `${fill}%` }}>
              ★
            </span>
          </span>
        );
      })}
    </span>
  );
}