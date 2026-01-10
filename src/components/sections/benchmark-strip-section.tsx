/**
 * Benchmark Strip Section Component
 * 
 * Location: /components/sections/benchmark-strip-section.tsx
 * 
 * Purpose: Displays benchmark statistics as proof points, framed as industry
 * benchmarks rather than client-specific data.
 */

"use client";

const BenchmarkStripSection = () => {
  const benchmarks = [
    {
      metric: "40%",
      description: "more productive work hours"
    },
    {
      metric: "27%",
      description: "higher conversion from faster follow-up"
    },
    {
      metric: "68%",
      description: "faster resolutions on support workflows"
    },
    {
      metric: "64%",
      description: "fewer manual errors"
    }
  ];

  return (
    <section
      className="py-8 md:py-12 bg-gradient-to-br from-primary/5 to-primary/10 border-t border-gray/10"
      aria-labelledby="benchmark-heading"
    >
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <h2 id="benchmark-heading" className="heading-xl mb-8 text-center">
            Why businesses invest in AI
          </h2>

          {/* Benchmark Cards - Horizontal Strip */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
            {benchmarks.map((benchmark) => (
              <article
                key={`${benchmark.metric}-${benchmark.description}`}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray/10 text-center"
                aria-label={`${benchmark.metric} ${benchmark.description}`}
              >
                <div
                  className="text-brand-lg mb-4"
                  aria-hidden="true"
                >
                  {benchmark.metric}
                </div>
                <p className="text-lg font-medium text-gray-700">
                  {benchmark.description}
                </p>
              </article>
            ))}
          </div>

          {/* Caption */}
          <p className="text-sm text-gray-600 text-center">
            Benchmarks from leading AI case studies across sales, support, and operations
          </p>
        </div>
      </div>
    </section>
  );
};

export default BenchmarkStripSection;

