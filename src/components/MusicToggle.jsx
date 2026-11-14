import { useEffect, useRef, useState } from "react"

/** Round button that plays / pauses looping background music. */
export default function MusicToggle({ src, volume = 0.6, startOnFirstClick = true }) {
  const audioRef = useRef(null)
  const buttonRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.preload = "auto"
    audio.volume = Math.min(1, Math.max(0, volume))
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    audio.addEventListener("play", onPlay)
    audio.addEventListener("pause", onPause)
    audioRef.current = audio
    return () => {
      audio.pause()
      audio.removeEventListener("play", onPlay)
      audio.removeEventListener("pause", onPause)
      audioRef.current = null
    }
  }, [src])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = Math.min(1, Math.max(0, volume))
  }, [volume])

  // Start the music on the visitor's first click anywhere (e.g. opening the envelope).
  useEffect(() => {
    if (!startOnFirstClick) return
    const handler = (event) => {
      if (buttonRef.current && buttonRef.current.contains(event.target)) return
      document.removeEventListener("pointerdown", handler)
      audioRef.current?.play().catch(() => {})
    }
    document.addEventListener("pointerdown", handler)
    return () => document.removeEventListener("pointerdown", handler)
  }, [startOnFirstClick, src])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) audio.play().catch(() => {})
    else audio.pause()
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className="vv-music"
      onClick={toggle}
      aria-label={playing ? "Turn music off" : "Turn music on"}
      aria-pressed={playing}
    >
      <svg width="45%" height="45%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" fill="currentColor" fillOpacity={0.15} />
        {playing ? (
          <>
            <path d="M15.5 9a4 4 0 0 1 0 6" />
            <path d="M18.2 6.5a7.5 7.5 0 0 1 0 11" />
          </>
        ) : (
          <>
            <path d="M16 9.5l5 5" />
            <path d="M21 9.5l-5 5" />
          </>
        )}
      </svg>
    </button>
  )
}
