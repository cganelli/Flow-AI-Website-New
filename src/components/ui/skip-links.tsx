"use client";

export function SkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <a
        href="#main"
        className="absolute top-0 left-0 z-50 px-4 py-2 bg-primary text-white text-sm font-medium rounded-br-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
        onFocus={(e) => {
          e.target.classList.remove('sr-only');
        }}
        onBlur={(e) => {
          e.target.classList.add('sr-only');
        }}
      >
        Skip to main content
      </a>
      <a
        href="#navigation"
        className="absolute top-0 left-20 z-50 px-4 py-2 bg-primary text-white text-sm font-medium rounded-br-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 sr-only focus:not-sr-only"
      >
        Skip to navigation
      </a>
    </div>
  );
}
