
import { Project, Skill } from './types.ts';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Narrative illustration project",
    category: "Illustration",
    image: "https://i.pinimg.com/736x/cb/ad/1a/cbad1adcd1594297f2042d24c6ec7aeb.jpg",
    description: "A complete identity redesign for a contemporary city lifestyle magazine.",
    tags: ["Logo Design", "Style Guide", "Typography"]
  },
  {
    id: 2,
    title: "Charachter design",
    category: "Illustration and Research",
    image: "https://i.pinimg.com/736x/3a/b8/b5/3ab8b5645520079aa88a18efccaa8b96.jpg",
    description: "A series of digital illustrations exploring the boundary between sleep and reality.",
    tags: ["Digital Art", "Color Theory", "Storytelling"]
  },
  {
    id: 3,
    title: "Type expiriments",
    category: "Typography",
    image: "https://i.pinimg.com/originals/b9/0b/94/b90b949e7df42442fba3ad73543f0b81.gif",
    description: "An experimental variable typeface designed for fluid digital interfaces.",
    tags: ["Font Design", "Glyphs", "Web Design"]
  },
  {
    id: 4,
    title: "Merch design",
    category: "Branding",
    image: "https://i.pinimg.com/1200x/f7/b2/44/f7b244c05d1c52a3c6de16f736f67970.jpg",
    description: "A headless e-commerce frontend built with React and Framer Motion.",
    tags: ["React", "Tailwind", "UI/UX"]
  },
  {
    id: 5,
    title: "Packaging",
    category: "Branding",
    image: "https://i.pinimg.com/1200x/0c/1d/74/0c1d74d690ab90adf1f65ae3760b6d5f.jpg",
    description: "Brand system that evolves through motion and user interaction.",
    tags: ["Motion Design", "Identity", "Modern"]
  },
  {
    id: 6,
    title: "Stickers",
    category: "Illustration",
    image: "https://i.pinimg.com/1200x/cc/2d/00/cc2d003910b7450d64d2d0a1246c3917.jpg",
    description: "Botanical illustrations with a modern communication design twist.",
    tags: ["Hand-drawn", "Digitalization", "Layout"]
  }
];

export const SKILLS: Skill[] = [
  { name: "Illustration", level: 95, icon: "PenTool" },
  { name: "Typography", level: 90, icon: "Type" },
  { name: "Branding", level: 85, icon: "Palette" },
  { name: "Web Development", level: 80, icon: "Code" },
  { name: "Video Editing", level: 75, icon: "Video" },
  { name: "Visual Arts", level: 88, icon: "Sparkles" }
];
