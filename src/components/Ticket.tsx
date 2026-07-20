import Link from "next/link";

export default function Ticket({
  code,
  title,
  description,
  price,
  className = "",
}) {
  return (
    <div
      className={`
        flex
        h-full
        min-h-[280px]
        flex-col
        rounded-[28px]
        border
        border-slate-200
        bg-white
        p-6
        shadow-[0_10px_30px_rgba(15,23,42,0.08)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_15px_35px_rgba(15,23,42,0.12)]
        ${className}
      `}
    >

      {/* Ticket Code */}
      <span
        className="
          w-fit
          rounded-full
          bg-[#E6F2F3]
          px-3
          py-1
          text-xs
          font-semibold
          tracking-wide
          text-[#0F6A73]
        "
      >
        {code}
      </span>


      {/* Title */}
      <h3
        className="
          mt-5
          text-xl
          font-bold
          leading-tight
          text-slate-900
        "
      >
        {title}
      </h3>


      {/* Description */}
      <p
        className="
          mt-4
          text-sm
          leading-6
          text-slate-600
        "
      >
        {description ||
          "Professional repair service with expert technicians and quality parts to restore your device quickly and safely."}
      </p>


      {/* Bottom Area */}
      <div className="mt-auto pt-5">

        <div className="h-px bg-slate-200" />


        <div className="mt-5 flex items-center justify-between gap-3">

          {/* Price */}
          <div>
            <p className="text-sm text-slate-500">
              Starting From Rs
            </p>

            <p className="text-lg font-bold text-[#0F6A73]">
              {price}
            </p>
          </div>


          {/* Button */}
          <Link href="/bookings">
            <button
              className="
                h-10
                rounded-xl
                border
                border-slate-200
                bg-[#f9fcfc]
                px-4
                text-sm
                font-semibold
                text-slate-900
                transition-all
                duration-300
                hover:bg-[#f0f6f7]
              "
            >
              Book a Repair
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}