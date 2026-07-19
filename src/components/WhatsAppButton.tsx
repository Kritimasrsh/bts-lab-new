const WHATSAPP = "9779866754678";
const MESSAGE = "Hi BTS Lab, I need help with a device repair.";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.59 4.46 1.712 6.402L3.2 28.8l6.57-1.68a12.75 12.75 0 0 0 6.234 1.588h.005c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.332-6.635-3.752-9.056A12.72 12.72 0 0 0 16.004 3.2Zm0 23.02h-.004a10.6 10.6 0 0 1-5.4-1.48l-.387-.23-4.003 1.023 1.07-3.9-.253-.4a10.56 10.56 0 0 1-1.62-5.634c0-5.867 4.774-10.64 10.64-10.64a10.57 10.57 0 0 1 7.52 3.12 10.57 10.57 0 0 1 3.116 7.526c0 5.867-4.773 10.64-10.64 10.64Zm5.834-7.968c-.32-.16-1.89-.933-2.183-1.04-.293-.107-.507-.16-.72.16-.213.32-.826 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.35-.498-2.57-1.586-.95-.847-1.592-1.894-1.778-2.214-.187-.32-.02-.493.14-.653.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.734-.986-2.374-.26-.623-.523-.54-.72-.55l-.613-.01c-.213 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.667 0 1.573 1.147 3.093 1.307 3.307.16.213 2.253 3.44 5.46 4.824.763.33 1.36.527 1.824.674.767.244 1.464.21 2.016.127.615-.092 1.89-.773 2.157-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373Z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MESSAGE)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.7)] transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-25 [animation-duration:2.5s]" aria-hidden />
      <WhatsAppIcon className="relative h-7 w-7" />
    </a>
  );
}
