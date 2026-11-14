// Faint gold specks drifting upward behind the envelope (extra, not in the Framer file).
function seeded(seed) {
  let s = seed
  return () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296)
}

const rand = seeded(19)
const SPECKS = Array.from({ length: 26 }, () => ({
  "--x": `${(rand() * 100).toFixed(2)}%`,
  "--s": `${(1.5 + rand() * 2.5).toFixed(2)}px`,
  "--o": (0.12 + rand() * 0.40).toFixed(2),
  "--d": `${(16 + rand() * 34).toFixed(1)}s`,
  "--delay": `${(-rand() * 30).toFixed(1)}s`,
  "--drift": `${(rand() * 80 - 40).toFixed(0)}px`,
}))

export default function GoldDust() {
  return (
    <div className="vv-dust" aria-hidden="true">
      {SPECKS.map((style, i) => (
        <i key={i} style={style} />
      ))}
    </div>
  )
}
