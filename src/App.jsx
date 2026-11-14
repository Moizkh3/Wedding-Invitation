import { useState } from "react"
import InvitationEnvelope from "./components/InvitationEnvelope.jsx"
import MusicToggle from "./components/MusicToggle.jsx"
import GoldDust from "./components/GoldDust.jsx"
import { BASE_H, BASE_W, useFitScale } from "./hooks/useFitScale.js"
import { content, extras, motion, music } from "./invitation.config.js"

export default function App() {
  const [open, setOpen] = useState(false)
  const scale = useFitScale()

  return (
    <>
      {extras.goldDust && <GoldDust />}
      <main className="vv-main">
        <section className="vv-section">
          <div className="vv-content">
            <div className="vv-holder" style={{ width: BASE_W * scale, height: BASE_H * scale }}>
              <InvitationEnvelope
                content={content}
                open={open}
                onToggle={() => setOpen((v) => !v)}
                scale={scale}
                motion={motion}
                extras={extras}
              />
            </div>
            <p className="vv-caption">{content.rsvpLine}</p>
          </div>
        </section>
      </main>
      {/* <MusicToggle {...music} /> */}
    </>
  )
}
