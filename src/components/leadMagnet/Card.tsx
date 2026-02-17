"use client";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  /** If true, adds the site's left red accent bar */
  accent?: boolean;
};

export function Card({ children, className = "", accent = true }: CardProps) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm ${className}`}
    >
      {accent && (
        <div
          className="absolute inset-y-0 left-0 w-1 bg-[#EA3D2A]"
          aria-hidden="true"
        />
      )}
      <div className={accent ? "p-5 pl-6" : "p-5"}>{children}</div>
    </div>
  );
}
