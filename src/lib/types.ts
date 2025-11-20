import { Timestamp } from "firebase/firestore";

export type Issue = {
  id: string;
  category: 'Performance' | 'SEO' | 'Security' | 'Accessibility';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  title: string;
  description: string;
  possibleSolutions: string[];
};

export type Report = {
  id: string;
  url: string;
  scanDate: string | Timestamp;
  score: number;
  summary?: string;
  issues: Issue[];
};
