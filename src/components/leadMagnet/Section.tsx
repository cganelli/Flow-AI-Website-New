"use client";

type SectionProps = {
  children: React.ReactNode;
  variant?: "default" | "black";
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
};

export function Section({
  children,
  variant = "default",
  className = "",
  id,
  "aria-labelledby": ariaLabelledBy,
}: SectionProps) {
  const isBlack = variant === "black";
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={
        isBlack
          ? `py-12 md:py-16 bg-black text-white ${className}`
          : `py-10 md:py-12 bg-background ${className}`
      }
    >
      {children}
    </section>
  );
}
