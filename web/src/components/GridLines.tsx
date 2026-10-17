const COLUMNS = 12;
const STREAKS = new Set([1, 4, 6, 9, 11]);

export function GridLines() {
  return (
    <div className="grid-lines" aria-hidden="true">
      {Array.from({ length: COLUMNS }, (_, i) => (
        <span key={i}>{STREAKS.has(i) && <i style={{ animationDelay: `${(i * 1.7) % 7}s` }} />}</span>
      ))}
    </div>
  );
}
