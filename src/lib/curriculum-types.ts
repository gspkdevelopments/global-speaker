export type CurriculumPracticeQuestion = {
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
};

export type LocalizedCurriculumSection = {
  heading: string;
  body: string;
  kind?: "practice" | "progress";
};

export type LocalizedCurriculumLessonOverride = {
  title: string;
  description: string;
  learningObjective: string;
  expectedOutcome: string;
  sections: LocalizedCurriculumSection[];
  practice: CurriculumPracticeQuestion[];
  checkpoints: string[];
};
