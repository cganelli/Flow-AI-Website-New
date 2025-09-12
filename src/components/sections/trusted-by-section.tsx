"use client";

import { LazyImage } from "@/components/ui/lazy-image";

const TrustedBySection = () => {
  const logos = [
    { src: "https://ext.same-assets.com/1788045838/2783488693.png", alt: "Client Logo" },
    { src: "https://ext.same-assets.com/1788045838/3150250539.png", alt: "Client Logo" },
    { src: "https://ext.same-assets.com/1788045838/423259258.png", alt: "Client Logo" },
    { src: "https://ext.same-assets.com/1788045838/3481729017.png", alt: "Client Logo" },
    { src: "https://ext.same-assets.com/1788045838/593519029.png", alt: "Client Logo" },
    { src: "https://ext.same-assets.com/1788045838/2154591136.png", alt: "Client Logo" },
  ];

  return (
    <section
      className="py-16 bg-background border-t border-gray/10"
      aria-labelledby="trusted-by-title"
    >
      <div className="container-custom">
        <h3
          id="trusted-by-title"
          className="text-lg text-center text-gray mb-10"
        >
          Trusted by over 100+ businesses
        </h3>

        <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center items-center list-none">
          {logos.map((logo) => (
            <li
              key={logo.src}
              className="w-full max-w-[120px] h-[40px] relative flex items-center justify-center"
            >
              <LazyImage
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={40}
                className="max-w-full h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TrustedBySection;
