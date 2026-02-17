export const WHAT_HAPPENS_LEFT = [
  "We confirm your data sources and technology setup.",
  "We identify your specific process \"bottlenecks\" and manual friction points.",
  "We establish your key requirements for this automation.",
] as const;

export const WHAT_HAPPENS_RIGHT = [
  "Not a sales pitch. Not a demo. A working session to scope one pilot.",
  "Next Step: After the call you'll receive a custom automation roadmap and a fixed-price proposal to handle the entire setup.",
] as const;

const WhatHappensContent = () => (
  <>
    <h2
      id="what-happens-heading"
      className="text-xl font-semibold text-white"
    >
      What Happens on the Call
    </h2>
    <div className="mt-3 grid grid-cols-1 gap-3 text-left">
      <ul className="space-y-1.5 text-white/90 text-sm list-none">
        {WHAT_HAPPENS_LEFT.map((item) => (
          <li key={item} className="flex gap-2 items-start">
            <span className="text-[#EA3D2A] flex-shrink-0">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <ul className="space-y-1.5 text-white/90 text-sm list-none">
        {WHAT_HAPPENS_RIGHT.map((item) => (
          <li key={item} className="flex gap-2 items-start">
            <span className="text-[#EA3D2A] flex-shrink-0">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </>
);

/** Inline black box "What Happens on the Call" — for left column on book-call page. */
export function WhatHappensOnCallBox() {
  return (
    <div
      className="rounded-xl bg-black text-white p-5"
      aria-labelledby="what-happens-heading"
    >
      <WhatHappensContent />
    </div>
  );
}

/** Full-width black section "What Happens on the Call" — used on results page. */
export function WhatHappensOnCallSection() {
  return (
    <section
      className="py-16 bg-black text-white"
      aria-labelledby="what-happens-heading"
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h2
            id="what-happens-heading"
            className="text-4xl font-semibold text-white text-center"
          >
            What Happens on the Call
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left">
            <ul className="space-y-2 text-white/90 text-lg list-none">
              {WHAT_HAPPENS_LEFT.map((item) => (
                <li key={item} className="flex gap-2 items-start">
                  <span className="text-[#EA3D2A] flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <ul className="space-y-2 text-white/90 text-lg list-none">
              {WHAT_HAPPENS_RIGHT.map((item) => (
                <li key={item} className="flex gap-2 items-start">
                  <span className="text-[#EA3D2A] flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
