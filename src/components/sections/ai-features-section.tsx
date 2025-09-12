"use client";

const AIFeaturesSection = () => {
  return (
    <section className="py-8 md:py-16 bg-black text-white" aria-labelledby="ai-features-title" id="ai-features">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 id="ai-features-title" className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-8">
            Let AI Help You
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/90 italic">
            (intro section with benefit statements)
          </p>

          {/* Three Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-12">
            <div className="text-center">
              <h3 className="text-base md:text-lg font-medium mb-2">AI never misses a call — so you never lose a customer</h3>
            </div>
            <div className="text-center">
              <h3 className="text-base md:text-lg font-medium mb-2">Your AI assistant books meetings while you sleep</h3>
            </div>
            <div className="text-center">
              <h3 className="text-base md:text-lg font-medium mb-2">AI handles 100 calls at once — so you scale without hiring</h3>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-6 md:mb-16">
            <a href="#book-appointment" className="btn-primary bg-primary hover:bg-primary/90">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIFeaturesSection;
