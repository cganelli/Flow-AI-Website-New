"use client";

import Link from "next/link";
import { LazyImage } from "@/components/ui/lazy-image";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Gytis Kandrotas",
      role: "Strategist",
      description:
        "I'll help you get your project out of paper and design a unique solution for your company's website from scratch, with no templates and bolder outcomes! The final design is yours, from desktop to mobile so you can do whatever you want with it.",
      image:
        "https://framerusercontent.com/images/FyPbZqHxPifTG1ppU2VktVEUmw.png?scale-down-to=1024",
      calendlyUrl: "https://calendly.com/vitororem/30min",
    },
    {
      name: "Jorge Del Castillo",
      role: "AI Enthusiast",
      description:
        "I'll help you get your project out of paper and design a unique solution for your company's website from scratch, with no templates and bolder outcomes! The final design is yours, from desktop to mobile so you can do whatever you want with it.",
      image:
        "https://framerusercontent.com/images/EivkBv5Hgct5CYbPeRKHwH9iYdY.png?scale-down-to=1024",
      calendlyUrl: "https://calendly.com/vitororem/30min",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="border border-gray/10 rounded-xl p-6 md:p-8"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-gray">{member.role}</p>
              </div>

              <p className="text-sm mb-6">{member.description}</p>

              <div className="mb-6">
                <a
                  href={member.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium hover:underline text-primary"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <title>Book a call icon</title>
                    <path
                      d="M8 12H16M12 8V16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  Book a call
                </a>
              </div>

              <div className="rounded-xl overflow-hidden h-[300px]">
                <LazyImage
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/book-call" className="btn-primary">
            Get a Free AI Demo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
