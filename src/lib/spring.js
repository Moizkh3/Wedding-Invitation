// Framer's duration + bounce spring, sampled into a CSS linear() easing so plain
// CSS transitions move exactly like the Framer variant transition.
export function springEasing({ duration = 1.1, bounce = 0.12, samples = 48 } = {}) {
  if (typeof CSS === "undefined" || !CSS.supports("transition-timing-function", "linear(0, 1)")) return null
  const zeta = Math.min(0.999, Math.max(0.05, 1 - bounce)) // damping ratio
  const root = Math.sqrt(1 - zeta * zeta)
  // Undamped frequency that lets the envelope settle to 0.1% by `duration`.
  const w0 = Math.log(zeta / (root * 0.001)) / (zeta * duration)
  const wd = w0 * root
  const points = []
  for (let i = 0; i <= samples; i++) {
    const t = (i / samples) * duration
    const x = 1 - Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) + ((zeta * w0) / wd) * Math.sin(wd * t))
    points.push(i === samples ? "1" : x.toFixed(4))
  }
  return `linear(${points.join(", ")})`
}
