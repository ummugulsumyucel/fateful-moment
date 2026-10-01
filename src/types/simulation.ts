export type SimulationStage =
  | 'intro'
  | 'video1'
  | 'choices1'
  | 'video2'
  | 'choices2'
  | 'video3'
  | 'decisionDNA'
  | 'complete';

// ─── Choice ──────────────────────────────────────────────────────────────────

export type Choice = {
  id: string;
  label: string;
};
export type ChoicesStage = 'choices1' | 'choices2';
