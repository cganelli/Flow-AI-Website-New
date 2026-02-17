export type DayStep = {
  id: string;
  label: string;
  prompt: string;
};

export type PlanDay = {
  day: number;
  title: string;
  summary: string;
  steps: DayStep[];
};

export type PlanV2Key = "plan1" | "plan2" | "plan3" | "plan4" | "plan5";

export type PlanV2 = {
  key: PlanV2Key;
  name: string;
  oneLiner: string;
  days: PlanDay[];
  diyTime: string;
  diyCalendar: string;
  diyNeeds: string[];
  diyRisks: string[];
  buildOutput: {
    title: string;
    bullets: (string | { label: string; sub: string[] })[];
  };
  diyStarterKit: {
    title: string;
    howToUse: string[];
    prompts: { title: string; prompt: string }[];
  };
};
