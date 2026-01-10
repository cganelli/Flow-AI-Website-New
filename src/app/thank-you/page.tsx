// FILE: src/app/thank-you/page.tsx
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main" className="pt-20">
        <div className="container-custom py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-semibold mb-4">Thanks — we got it!</h1>
            <p className="opacity-80">
              We'll be in touch shortly.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
