import Ticket from "@/components/Ticket";
import CtaBanner from "@/components/CtaBanner";
import { SERVICES } from "@/lib/data/services";

export const metadata = {
  title: "Repair Services | BTS Lab",
  description:
    "Screen, battery, water damage, back glass and motherboard repair in Kathmandu.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">

        {/* Our Services Title */}
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-10 bg-[#0F6A73]" />

          <span
            className="
              text-sm
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[#0F6A73]
            "
          >
            Our Services
          </span>
        </div>


        {/* Left Text + Service Cards */}
        <div className="grid gap-6 lg:grid-cols-3">


          {/* Left Content */}
          <div className="flex h-full flex-col justify-center">

            <h2
              className="
                text-4xl
                font-bold
                leading-tight
                text-slate-900
                lg:text-5xl
              "
            >
              <span
                className="
                  bg-[#0F6A73]
                  px-2
                  py-1
                  text-white
                "
              >
                Professional
              </span>{" "}
              Repairs
              <br />
              You Can Trust.
            </h2>


            <p
              className="
                mt-5
                max-w-md
                text-[15px]
                leading-7
                text-slate-600
              "
            >
              BTS Lab offers reliable smartphone, tablet and laptop repairs
              with expert technicians and quality parts.
            </p>

          </div>



          {/* Service Cards */}
          {SERVICES.map((service, index) => (
            <Ticket
              key={index}
              {...service}
              className="h-full"
            />
          ))}


        </div>

      </section>



      {/* CTA Section */}
      <CtaBanner
        title="Not sure what's wrong with it?"
        subtitle="Bring it in for a free diagnostic — no pressure, no obligation."
        ctaLabel="Book a Diagnostic"
      />

    </>
  );
}