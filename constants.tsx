
import { Project, Skill } from './types.ts';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Narrative illustration project",
    category: "Illustration",
    image: "https://i.pinimg.com/736x/cb/ad/1a/cbad1adcd1594297f2042d24c6ec7aeb.jpg",
    description: "A complete identity redesign for a contemporary city lifestyle magazine.",
    longDescription: "This project explores the intersection of traditional storytelling and modern digital illustration. Through a series of hand-drawn assets and digital refinement, I created a cohesive narrative world that challenges the viewer's perception of linear time. The magazine identity was redesigned to prioritize breathing space and bold, illustrative covers that act as standalone art pieces.",
    contentImages: [
      "https://i.pinimg.com/736x/cb/ad/1a/cbad1adcd1594297f2042d24c6ec7aeb.jpg",
      "https://i.pinimg.com/736x/a2/5c/42/a25c423f03b22e1858525b64c06f363c.jpg",
      "https://i.pinimg.com/736x/1d/94/9e/1d949e6f363c8b25645520079aa88a18.jpg"
    ],
    tags: ["Logo Design", "Style Guide", "Typography"]
  },
  {
    id: 2,
    title: "Charachter design",
    category: "Illustration and Research",
    image: "https://i.pinimg.com/736x/3a/b8/b5/3ab8b5645520079aa88a18efccaa8b96.jpg",
    description: "A series of digital illustrations exploring the boundary between sleep and reality.",
    longDescription: "A deep dive into character psychology through visual form. Each character represents a specific state of the 'subconscious' mind during REM sleep. The research phase involved studying surrealist techniques and translating them into a modern digital painting style, using high-contrast color palettes to emphasize emotional weight.",
    contentImages: [
      "https://i.pinimg.com/736x/3a/b8/b5/3ab8b5645520079aa88a18efccaa8b96.jpg",
      "https://i.pinimg.com/736x/8e/31/5e/8e315e7a9b1c7c9e8d4a5b6c7d8e9f0a.jpg",
      "https://i.pinimg.com/736x/2a/1b/4c/2a1b4c3d4e5f6g7h8i9j0k1l2m3n4o5p.jpg"
    ],
    tags: ["Digital Art", "Color Theory", "Storytelling"]
  },
  {
    id: 3,
    title: "Type expiriments",
    category: "Typography",
    image: "https://i.pinimg.com/originals/b9/0b/94/b90b949e7df42442fba3ad73543f0b81.gif",
    description: "An experimental variable typeface designed for fluid digital interfaces.",
    longDescription: "Type as a living organism. This variable font was built to respond to user interaction—stretching, thinning, and thickening based on mouse proximity and scroll speed. The goal was to remove the static nature of text on the web and make reading an active, performative experience. Built with Glyphs and integrated via custom CSS properties.",
    contentImages: [
      "https://i.pinimg.com/originals/b9/0b/94/b90b949e7df42442fba3ad73543f0b81.gif",
      "https://i.pinimg.com/1200x/6d/4b/3c/6d4b3c2a1b0c9d8e7f6a5b4c3d2e1f0.jpg"
    ],
    tags: ["Font Design", "Glyphs", "Web Design"]
  },
  {
    id: 4,
    title: "Merch design",
    category: "Branding",
    image: "https://i.pinimg.com/1200x/f7/b2/44/f7b244c05d1c52a3c6de16f736f67970.jpg",
    description: "A headless e-commerce frontend built with React and Framer Motion.",
    longDescription: "Creating a tactile feel in a digital space. This merchandise line for an independent music collective required a brand identity that felt 'lo-fi' yet premium. I designed the apparel, packaging, and the custom e-commerce experience, focusing on high-energy motion design and a grainy, printed texture throughout the UI.",
    contentImages: [
      "https://i.pinimg.com/1200x/f7/b2/44/f7b244c05d1c52a3c6de16f736f67970.jpg",
      "https://i.pinimg.com/1200x/a1/b2/c3/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p.jpg"
    ],
    tags: ["React", "Tailwind", "UI/UX"]
  },
  {
    id: 5,
    title: "Packaging",
    category: "Branding",
    image: "https://i.pinimg.com/1200x/0c/1d/74/0c1d74d690ab90adf1f65ae3760b6d5f.jpg",
    description: "Brand system that evolves through motion and user interaction.",
    longDescription: "A redesign for sustainable wellness products. The packaging uses biodegradable materials and a minimal typographic approach. The secondary brand language involves a series of abstract patterns derived from the ingredients of the products, creating a sensory connection between the box and its contents.",
    contentImages: [
      "https://i.pinimg.com/1200x/0c/1d/74/0c1d74d690ab90adf1f65ae3760b6d5f.jpg",
      "https://i.pinimg.com/1200x/b2/c3/d4/b2c3d4e5f6g7h8i9j0k1l2m3n4o5p.jpg"
    ],
    tags: ["Motion Design", "Identity", "Modern"]
  },
  {
    id: 6,
    title: "Stickers",
    category: "Illustration",
    image: "https://i.pinimg.com/1200x/cc/2d/00/cc2d003910b7450d64d2d0a1246c3917.jpg",
    description: "Botanical illustrations with a modern communication design twist.",
    longDescription: "The 'Sticker Society' project explores small-scale art as a medium for large-scale communication. These botanical designs blend classical scientific illustration with street art aesthetics. The project included material testing for weather resistance and a conceptual 'drop' strategy for local communities.",
    contentImages: [
      "https://i.pinimg.com/1200x/cc/2d/00/cc2d003910b7450d64d2d0a1246c3917.jpg",
      "https://i.pinimg.com/1200x/c1/d2/e3/c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r.jpg"
    ],
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

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/siddhi_purohit",
  behance: "https://behance.net/siddhipurohit",
  linkedin: "https://linkedin.com/in/siddhipurohit"
};
