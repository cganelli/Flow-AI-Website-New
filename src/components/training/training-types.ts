export type BulletList = string[];

export interface TrainingTrackLearnSection {
  title: string;
  points: BulletList;
}

export interface TrainingTrack {
  id: string;
  title: string;
  shortOverview: string;
  bestFor: BulletList;
  learnSections: TrainingTrackLearnSection[];
  format: BulletList;
  outcomes: BulletList;
}

export interface WorkshopCard {
  id: string;
  title: string;
  shortText: string;
  anchorId: string;
}

export interface WorkshopDetail {
  id: string;
  title: string;
  shortOverview: string;
  whoFor: BulletList;
  learnPoints: TrainingTrackLearnSection[];
  format: BulletList;
  outcomes: BulletList;
}

