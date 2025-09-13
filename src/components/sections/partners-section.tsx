"use client";

import React from 'react';
import Link from 'next/link';

const PartnersSection = () => {
  // List of partners with their logos
  const partnerLogos = [
    { name: "OpenAI", src: "/uploads/OpenAI_2.png" },
    { name: "Notion", src: "/uploads/Notion 2.svg" },
    { name: "Cursor", src: "/uploads/cursor 2.svg" },
    { name: "Airtable", src: "/uploads/airtable 2.svg" },
    { name: "Gemini", src: "/uploads/Gemini 2.svg" },
    { name: "Make", src: "/uploads/make 2.svg" },
    { name: "ElevenLabs", src: "/uploads/eleven_labs_2.jpg" },
    { name: "Canva", src: "/uploads/Canva_2.png" },
    { name: "Netlify", src: "/uploads/netlify 2.svg" },
    { name: "Supabase", src: "/uploads/supabase 2.svg" },
    { name: "n8n", src: "/uploads/n8n 2.svg" }
  ];

  // Duplicate the logos for infinite scroll effect
  const duplicatedLogos = [...partnerLogos, ...partnerLogos];

  return (
    <section className="bg-black text-white pt-8 pb-2 md:pt-16 md:pb-4">
      <div className="container-custom">
        <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-8 text-center">Partners</h2>

        {/* Partners logos carousel */}
        <div className="bg-white rounded-xl py-6 md:py-10 px-4 md:px-12 mb-2 md:mb-6 overflow-hidden">
          <div className="relative">
            <div className="flex animate-scroll">
              {duplicatedLogos.map((partner, index) => (
                <div key={`${partner.name}-${index}`} className="flex-shrink-0 w-[200px] h-[70px] flex items-center justify-center mx-4">
                  <img
                    src={partner.src}
                    alt={`${partner.name} logo`}
                    className="h-[50px] w-[120px] object-contain opacity-80 hover:opacity-100 transition-opacity"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default PartnersSection;
