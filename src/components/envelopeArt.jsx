// All artwork is drawn on the same 640 × 986 canvas the Framer file uses,
// then each layer is displayed at 600 × 924.

const VIEW_BOX = "0 0 640 986"
const r1 = (n) => Math.round(n * 10) / 10

function Layer({ children, className = "" }) {
  return (
    <svg className={`vv-layer ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox={VIEW_BOX} aria-hidden="true">
      {children}
    </svg>
  )
}

/** Scalloped outline: half-circles up the left side, across the top and down the right. */
function scallopPath({ x0, x1, yTop, yBottom, sideCount, sideR, topStep, topR }) {
  const d = [`M${x0} ${yBottom}`]
  const step = (yBottom - yTop) / sideCount
  for (let i = 1; i <= sideCount; i++) d.push(`A${sideR} ${sideR} 0 0 1 ${x0} ${r1(yBottom - step * i)}`)
  for (let x = x0 + topStep; x <= x1; x += topStep) d.push(`A${topR} ${topR} 0 0 1 ${x} ${yTop}`)
  for (let i = 1; i <= sideCount; i++) d.push(`A${sideR} ${sideR} 0 0 1 ${x1} ${r1(yTop + step * i)}`)
  return `${d.join(" ")} Z`
}

const LACE_OUTER = scallopPath({ x0: 64, x1: 576, yTop: 16, yBottom: 820, sideCount: 22, sideR: 21.9, topStep: 32, topR: 19.2 })
const LACE_STITCH = scallopPath({ x0: 80, x1: 560, yTop: 32, yBottom: 820, sideCount: 21, sideR: 22.5, topStep: 32, topR: 19.2 })

const EYELET_ROWS = Array.from({ length: 16 }, (_, i) => 160 + i * 40)
const TOP_DOTS = Array.from({ length: 9 }, (_, i) => 112 + i * 52)
const LEAVES = [
  [176, 54, -30],
  [206, 82, 25],
  [434, 82, -25],
  [464, 54, 30],
  [146, 70, 40],
  [494, 70, -40],
]
const FLOWERS = [
  { cx: 240, cy: 68, rx: 6.3, ry: 10.5, petalCy: 58.6, core: 6.3, dot: 2.3 },
  { cx: 400, cy: 68, rx: 6.3, ry: 10.5, petalCy: 58.6, core: 6.3, dot: 2.3 },
  { cx: 320, cy: 58, rx: 8.1, ry: 13.5, petalCy: 45.9, core: 8.1, dot: 3 },
]

export function EnvelopeBack() {
  return (
    <Layer>
      <defs>
        <linearGradient id="vv-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3A0A12" />
          <stop offset="1" stopColor="#26050A" />
        </linearGradient>
      </defs>
      <rect x="14" y="556" width="612" height="422" rx="6" fill="url(#vv-back)" />
    </Layer>
  )
}

export function CardLace() {
  return (
    <Layer>
      <defs>
        <pattern id="vv-dots" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="3.5" cy="3.5" r="1.15" fill="#B39E74" opacity=".5" />
        </pattern>
        <linearGradient id="vv-panel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EEE0C1" />
          <stop offset="1" stopColor="#E7D6B2" />
        </linearGradient>
        <filter id="vv-card-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000" floodOpacity=".45" />
        </filter>
      </defs>

      {/* paper, dotted texture, stitched inner edge */}
      <g filter="url(#vv-card-shadow)">
        <path d={LACE_OUTER} fill="#F1E6CB" />
      </g>
      <path d={LACE_OUTER} fill="url(#vv-dots)" />
      <path d={LACE_STITCH} fill="none" stroke="#C9B58C" strokeWidth="2.2" strokeDasharray="0 6" strokeLinecap="round" />

      {/* eyelets down both sides */}
      {EYELET_ROWS.flatMap((y) =>
        [92, 548].map((x) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="8" fill="none" stroke="#BFA97F" strokeWidth="1.4" />
            <circle cx={x} cy={y} r="2.6" fill="#BFA97F" opacity=".7" />
          </g>
        ))
      )}

      {/* row of dots under the garland */}
      {TOP_DOTS.map((x) => (
        <circle key={x} cx={x} cy="104" r="3" fill="#C9B58C" opacity=".8" />
      ))}

      {/* garland: vine, leaves, three flowers */}
      <path
        d="M132 74 C170 34 222 104 262 66 C290 42 302 60 320 60 C338 60 350 42 378 66 C418 104 470 34 508 74"
        fill="none"
        stroke="#C4AE84"
        strokeWidth="1.8"
      />
      {LEAVES.map(([cx, cy, angle]) => (
        <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx="9" ry="3.6" transform={`rotate(${angle} ${cx} ${cy})`} fill="#EFE3C4" stroke="#C4AE84" strokeWidth="1" />
      ))}
      {FLOWERS.map((f) => (
        <g key={f.cx}>
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <ellipse key={angle} cx={f.cx} cy={f.petalCy} rx={f.rx} ry={f.ry} transform={`rotate(${angle} ${f.cx} ${f.cy})`} fill="#F4EBD3" stroke="#C4AE84" strokeWidth="1.1" />
          ))}
          <circle cx={f.cx} cy={f.cy} r={f.core} fill="#E6D6B0" stroke="#B9A277" strokeWidth="1.1" />
          <circle cx={f.cx} cy={f.cy} r={f.dot} fill="#B9A277" />
        </g>
      ))}

      {/* text panel */}
      <rect x="120" y="120" width="400" height="700" fill="url(#vv-panel)" />
      <rect x="126" y="126" width="388" height="688" fill="none" stroke="#D3BF95" strokeWidth="1" />
    </Layer>
  )
}

export function EnvelopeFront() {
  return (
    <Layer>
      <defs>
        <linearGradient id="vv-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#611A26" />
          <stop offset="1" stopColor="#3A0B13" />
        </linearGradient>
        <filter id="vv-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <path d="M14 600 L320 812 L626 600" fill="none" stroke="#000" strokeOpacity=".45" strokeWidth="12" filter="url(#vv-soft)" />
      <path d="M14 600 L320 812 L626 600 L626 978 L14 978 Z" fill="url(#vv-front)" />
      <path d="M14 600 L320 812 L626 600" fill="none" stroke="#fff" strokeOpacity=".09" strokeWidth="2" />
      <path d="M14 978 L292 830 M348 830 L626 978" fill="none" stroke="#000" strokeOpacity=".28" strokeWidth="1.6" />
      <path d="M14 975 L292 827 M348 827 L626 975" fill="none" stroke="#fff" strokeOpacity=".05" strokeWidth="1" />
    </Layer>
  )
}

export function EnvelopeFlap() {
  return (
    <Layer className="vv-flap-art">
      <defs>
        <linearGradient id="vv-flap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4E111B" />
          <stop offset="1" stopColor="#6A1D2A" />
        </linearGradient>
        <filter id="vv-flap-shadow" x="-10%" y="-20%" width="120%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#000" floodOpacity=".5" />
        </filter>
      </defs>
      <g filter="url(#vv-flap-shadow)">
        <path d="M14 556 L626 556 L626 600 L320 840 L14 600 Z" fill="url(#vv-flap)" />
      </g>
      <path d="M14 600 L320 840 L626 600" fill="none" stroke="#fff" strokeOpacity=".1" strokeWidth="1.5" />
    </Layer>
  )
}

const WAX_PATH =
  "M371.3 812 L373.6 816.7 L374 821.5 L371.9 825.9 L368 829.5 L363.8 832.4 L360.6 835.4 L358.7 839.1 L357.6 843.5 L356 848 L353.2 851.6 L349.1 853.5 L344.3 854.1 L339.7 854.3 L335.8 855.4 L332.3 858 L328.8 861.7 L324.6 865 L320 866.5 L315.3 865.6 L311 862.8 L307.3 859.5 L303.6 857 L299.6 855.8 L295 855.4 L290.3 854.4 L286.4 852 L284 848 L282.9 843.1 L282.2 838.5 L280.7 834.7 L277.7 831.7 L273.6 828.9 L269.6 825.5 L267.1 821.3 L267 816.6 L268.7 812 L270.9 807.7 L272.3 803.6 L272.5 799.3 L272 794.5 L272.1 789.7 L273.9 785.4 L277.6 782.3 L282.4 780.5 L287.2 779.2 L290.9 777.3 L293.5 774.2 L295.7 769.9 L298.4 765.6 L302 762.6 L306.5 761.6 L311.2 762.3 L315.8 763.5 L320 763.9 L324.3 762.9 L329 761.2 L333.9 760.1 L338.6 761 L342.3 764.1 L345 768.6 L347.1 773.3 L349.5 776.9 L352.8 779.2 L357.1 780.9 L361.5 782.9 L364.8 786.1 L366.4 790.4 L366.4 795.1 L366 799.7 L366.6 803.8 L368.5 807.8 L371.3 812 Z"

export function WaxSeal() {
  return (
    <Layer>
      <defs>
        <radialGradient id="vv-wax" cx=".42" cy=".38" r=".7">
          <stop offset="0" stopColor="#F3DFA6" />   {/* was #8A6B55 – highlight */}
          <stop offset=".6" stopColor="#CFA85A" />  {/* was #5C4232 – main body */}
          <stop offset="1" stopColor="#9C7632" />   {/* was #3E2B20 – edge */}
        </radialGradient>
        <filter id="vv-seal-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000" floodOpacity=".45" />
        </filter>
      </defs>
      <g filter="url(#vv-seal-shadow)">
        <path d={WAX_PATH} fill="url(#vv-wax)" />
      </g>
      <circle cx="320" cy="812" r="36" fill="none" stroke="#2E1F17" strokeWidth="2.6" strokeOpacity=".8" />
      <circle cx="320" cy="812" r="33" fill="none" stroke="#fff" strokeOpacity=".14" strokeWidth="1" />
      <circle cx="320" cy="812" r="39" fill="none" stroke="#fff" strokeOpacity=".08" strokeWidth="1" />
    </Layer>
  )
}

export function Divider() {
  return (
    <svg className="vv-divider" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 12" aria-hidden="true">
      <path d="M0 6 H58 M82 6 H140" stroke="#8C6A4E" strokeWidth="1" />
      <path d="M70 1 L75 6 L70 11 L65 6 Z" fill="none" stroke="#8C6A4E" strokeWidth="1" />
      <circle cx="70" cy="6" r="1.4" fill="#8C6A4E" />
    </svg>
  )
}
