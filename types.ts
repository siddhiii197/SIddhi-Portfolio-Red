
export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}

export type Theme = 'light' | 'dark';
