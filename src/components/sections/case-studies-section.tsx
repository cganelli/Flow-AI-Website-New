"use client";

import Link from "next/link";

const CaseStudiesSection = () => {
  const caseStudies = [
    {
      title: "Client Intake",
      description: "90% of admin tasks automated retainers, litigation, prenups, and more."
    },
    {
      title: "Inquiry System",
      description: "Automatically qualifies leads, logs insights, and sends instant follow-ups ensuring no inquiry goes unanswered."
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container-custom">
        <h2 className="heading-lg mb-12 text-center">Case Studies</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {caseStudies.map((caseStudy) => (
            <div
              key={caseStudy.title}
              className="bg-gray/10 p-8 rounded-xl"
            >
              <h3 className="text-xl font-bold mb-3">{caseStudy.title}</h3>
              <p className="text-gray">{caseStudy.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="https://linklemon.gitbook.io/linklemon"
            className="text-sm font-medium inline-flex items-center hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View More
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1"
              aria-hidden="true"
            >
              <path
                d="M8 3L14 8L8 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 8H2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
