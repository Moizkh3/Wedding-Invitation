import { useEffect, useLayoutEffect, useState } from "react"

export const BASE_W = 600
export const BASE_H = 924

function measure() {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const phone = vw < 810
  const reserveH = phone ? 104 : 132 // section padding + caption below the envelope
  const sideW = phone ? 20 : 80
  const s = Math.min((vh - reserveH) / BASE_H, (vw - sideW) / BASE_W, 1)
  return Math.max(0.35, s)
}

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect

/** Scale that fits the full (opened) 600 × 924 invitation inside the viewport. */
export function useFitScale() {
  const [scale, setScale] = useState(() => (typeof window === "undefined" ? 1 : measure()))
  useIsoLayoutEffect(() => {
    const update = () => setScale(measure())
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])
  return scale
}
