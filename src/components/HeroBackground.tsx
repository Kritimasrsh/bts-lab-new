/**
 * Full-bleed hero background: a looping repair-lab video with a dark teal
 * overlay + vignette so the centered content stays crisp. Falls back to a
 * poster image while the video buffers (and if autoplay is blocked).
 */
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#08191a]">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero/repairing-bg.jpg"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      >
        <source src="/repair-videos/6755161-uhd_3840_2160_25fps.mp4" type="video/mp4" />
      </video>

      {/* refined dark teal overlay — crisp text, intentional (not muddy).
          Uses fixed dark colors so it stays dark regardless of theme. */}
      <div className="absolute inset-0 bg-[#0a4d54]/65 mix-blend-multiply" />
      <div className="absolute inset-0 bg-linear-to-t from-[#061a1c] via-[#061a1c]/60 to-[#061a1c]/75" />
      {/* subtle vignette to focus the centered content */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 40%, transparent 40%, rgba(6,26,28,0.62) 100%)" }}
        aria-hidden
      />
    </div>
  );
}
