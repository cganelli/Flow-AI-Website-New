"use client";

type RoadmapCtasProps = {
  blueprintCallUrl: string;
};

export function RoadmapCtas({ blueprintCallUrl }: RoadmapCtasProps) {
  return (
    <div className="flex justify-center">
      <a
        href={blueprintCallUrl}
        target={blueprintCallUrl.startsWith("http") ? "_blank" : undefined}
        rel={blueprintCallUrl.startsWith("http") ? "noreferrer" : undefined}
        className="btn btn-primary whitespace-nowrap text-sm font-semibold px-6 py-3 flex-shrink-0"
      >
        Let us build it for you
      </a>
    </div>
  );
}
