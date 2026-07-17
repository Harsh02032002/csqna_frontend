export interface UserDetails {
  id: string;
  name: string;
  email: string;
  username: string;
  role: 'admin' | 'user';
  createdAt?: string;
  planDetails?: {
    planName?: string;
  };
}

export interface DomainTopic {
  _id: string;
  name: string;
  slug: string;
}

export interface PracticeTestStats {
  active: number;
  ongoing: number;
  completed: number;
  total: number;
  graph: Array<{ questions: number; score: number }>;
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  _id: string;
  questionText: string;
  options: QuestionOption[];
  explanation?: string;
  correctOptionId?: string;
}

export interface PracticeTestSession {
  _id: string;
  title: string;
  questions: Question[];
  duration: number; // in minutes
  status: 'ongoing' | 'completed' | 'abandoned';
  score?: number;
  answers?: Record<string, string>; // questionId -> optionId
  createdAt: string;
}
