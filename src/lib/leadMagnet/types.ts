export type LeadMagnetSubmission = {
  firstName: string;
  lastName?: string;
  email: string;
  websiteUrl?: string;
  answers: {
    a1Outcome: string;
    a2WorkPilesUp: string;
    a3WorkStarts: string;
    a4MissedOpportunity: string;
    a5Role: string;
  };
  timestampIso: string;
  utm: Record<string, string>;
  path: string;
};
