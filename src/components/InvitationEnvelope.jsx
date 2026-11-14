import { useMemo } from "react"
import { springEasing } from "../lib/spring.js"
import { CardLace, Divider, EnvelopeBack, EnvelopeFlap, EnvelopeFront, WaxSeal } from "./envelopeArt.jsx"

/**
 * The 600 × 924 envelope. Closed: the envelope sits 190px higher with the card
 * tucked inside. Open: the flap swings back and fades, the card rises to the
 * top, the envelope settles down and the hint fades away.
 */
export default function InvitationEnvelope({ content, open, onToggle, scale = 1, motion, extras = {} }) {
  const ease = useMemo(() => springEasing(motion), [motion])

  const style = { transform: `scale(${scale})`, "--vv-dur": `${motion?.duration ?? 1.1}s` }
  if (ease) style["--vv-ease"] = ease

  const onKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onToggle()
    }
  }

  const classes = ["vv-envelope", extras.hoverLift && "vv-hover", extras.textReveal && "vv-reveal"].filter(Boolean).join(" ")

  return (
    <div
      className={classes}
      style={style}
      data-open={open}
      role="button"
      tabIndex={0}
      aria-label="Open or close the invitation"
      aria-expanded={open}
      onClick={onToggle}
      onKeyDown={onKeyDown}
    >
      <div className="vv-group">
        <EnvelopeBack />

        <div className="vv-card-clip">
          <div className="vv-card">
            <CardLace />
            <div className="vv-card-text">
              <p className="vv-eyebrow vv-balance">{content.eyebrow}</p>
              <div className="vv-names">
                <h1 className="vv-name">{content.partnerOne}</h1>
                <h1 className="vv-name">&amp; {content.partnerTwo}</h1>
              </div>
              <p className="vv-body-italic vv-balance">{content.invitationLine}</p>
              <Divider />
              <div className="vv-date-row">
                <div className="vv-date-box">
                  <p className="vv-eyebrow">{content.weekday}</p>
                </div>
                <p className="vv-numeral">{content.day}</p>
                <div className="vv-date-box">
                  <p className="vv-eyebrow">{content.monthYear}</p>
                </div>
              </div>
              <p className="vv-body-italic vv-balance">{content.timeLine}</p>
              <div className="vv-venue">
                <p className="vv-detail">{content.venueName}</p>
                <p className="vv-detail">{content.venueArea}</p>
              </div>
              <p className="vv-body-italic vv-balance">{content.receptionLine}</p>
            </div>
          </div>
        </div>

        <EnvelopeFront />

        <div className="vv-flap-stage">
          <div className="vv-flap">
            <EnvelopeFlap />
          </div>
        </div>

        <div className="vv-seal">
          <WaxSeal />
          <div className="vv-monogram">
            <p>{content.monogram}</p>
          </div>
        </div>

        <div className="vv-hint">
          <p className="vv-eyebrow vv-on-dark">{content.hintEyebrow}</p>
          <p className="vv-hint-text">{content.hintText}</p>
        </div>
      </div>
    </div>
  )
}
