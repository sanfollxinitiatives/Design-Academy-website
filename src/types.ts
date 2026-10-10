export interface ProgramTrack {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  tag: string;
  duration: string;
  mode: string;
  batchSize: string;
  starts: string;
  featured?: boolean;
  description: string;
  overview: string;
  outcomes: string[];
  tools: { name: string; category: string; iconName?: string }[];
  curriculum: {
    weekRange: string;
    title: string;
    description: string;
    skills: string[];
  }[];
  careerRoles: string[];
}

export interface PillarItem {
  number: string;
  title: string;
  description: string;
  details: string;
  iconName: string;
}

export interface StudentWork {
  id: string;
  title: string;
  category: 'Branding' | 'Website' | 'UI/UX' | 'Motion & 3D';
  studentName: string;
  description: string;
  accentColor: string;
  tags: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
