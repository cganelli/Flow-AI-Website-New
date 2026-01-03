export type UseCaseTier = "Foundation" | "Growth" | "Transform";

export type UseCaseFunction =
  | "Sales"
  | "Marketing"
  | "RevOps"
  | "Operations"
  | "Finance"
  | "Support"
  | "HR"
  | "Legal"
  | "Technology";

export type UseCaseOutcome = {
  text: string;
  sources?: string[];
};

export type UseCase = {
  slug: string;
  workflowLabel: string;
  title: string;
  subtitle: string;
  tier: UseCaseTier;
  issue: string;
  function: UseCaseFunction;
  software: string[];
  problemToSolve: string[];
  whatYouGet: string[];
  before: string[];
  after: string[];
  outcomes: UseCaseOutcome[];
};
