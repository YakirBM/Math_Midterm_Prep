
export interface Option {
  id: string;
  text: string; // Can contain LaTeX
  isCorrect: boolean;
}

export type VisualizationType = 'unit-circle' | 'parity-even' | 'parity-odd' | 'inverse-function' | 'domain-range' | 'log-exp' | 'general';

export interface ExpandedExplanation {
  title: string;
  content: string; // Explanation text (can contain basic HTML/LaTeX)
  visualizationType: VisualizationType;
}

export interface Question {
  id: number;
  title: string;
  content: string; // LaTeX description
  type: 'multiple-choice' | 'open';
  options: Option[];
  solution: {
    concept: string;
    steps: string[];
    finalAnswer: string;
  };
  expandedExplanation?: ExpandedExplanation;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}
