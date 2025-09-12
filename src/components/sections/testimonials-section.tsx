"use client";

import React from "react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "\"Flow AI transformed our invoicing and accounting\"",
      name: "Andreu Toms,",
      title: "Partner, Awesome AD"
    },
    {
      quote: "\"Their automated workflows save us about 40 hours every month\"",
      name: "Anthony Baltodano,",
      title: "Founder, Mission Inbox"
    },
    {
      quote: "\"They automated almost everything, saving me tens of thousands\"",
      name: "Bobby Offterdinger,",
      title: "Founder, TAM To Target"
    }
  ];

  return (
    <section className="py-16 bg-background border-t border-gray/10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray/10"
            >
              <p className="font-medium mb-4">{testimonial.quote}</p>
              <div>
                <p className="font-medium text-sm">{testimonial.name}</p>
                <p className="text-sm text-gray">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
