
import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Github, Linkedin, Instagram, ArrowUpRight, Menu, X, Star, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, SOCIAL_LINKS } from './constants.tsx';
import { Theme, Project } from './types.ts';

// ==========================================
// CUSTOM ICONS
// ==========================================

const BehanceIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M23.177 15.01c-.134-1.258-1.048-2.316-2.52-2.316-2.03 0-2.43 1.838-2.43 2.502 0 .524.168 2.516 2.458 2.516 1.485 0 2.21-1.037 2.492-2.702zm-12.222-2.77c.475-.13 1.135-.505 1.135-1.503 0-.486-.237-1.424-1.523-1.424h-2.31v2.927h2.698zm.39 5.378c.86 0 1.637-.48 1.637-1.745 0-1.282-.81-1.696-1.547-1.696h-3.178v3.44h3.088zm8.13-10.45h4.156v1.442h-4.156V7.168zm4.49 8.1c-.085-3.355-2.275-5.362-5.462-5.362-3.142 0-5.518 2.062-5.518 5.642 0 3.396 2.36 5.626 5.753 5.626 3.012 0 4.965-1.55 5.232-4.14h-2.31c-.15.82-.767 1.474-2.115 1.474-1.923 0-2.143-1.63-2.143-2.268h6.563zm-13.064-7.443h-5.901v13.5h5.534c4.693 0 5.617-2.906 5.617-4.498 0-1.722-.962-3.193-2.614-3.56.914-.42 2.193-1.393 2.193-3.11 0-1.695-1.053-2.332-4.83-2.332z"/>
  </svg>
);

// ==========================================
// INTERACTIVE GRID COMPONENT
// ==========================================

const InteractiveGrid: React.FC<{ theme: Theme }> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const dots = useRef<{ x: number; y: number; ox: number; oy: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const spacing = 24;
    const radius = 1.0;
    const hoverRadius = 120;
    const strength = 25;

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const newDots = [];
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          newDots.push({ x, y, ox: x, oy: y });
        }
      }
      dots.current = newDots;
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const opacity = theme === 'dark' ? 0.18 : 0.08;
      const dotColor = theme === 'dark' ? `rgba(255,255,255,${opacity})` : `rgba(0,0,0,${opacity})`;

      for (const d of dots.current) {
        const dx = mouse.current.x - d.x;
        const dy = mouse.current.y - d.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < hoverRadius) {
          const force = (hoverRadius - dist) / hoverRadius;
          const angle = Math.atan2(dy, dx);
          d.x = d.ox - Math.cos(angle) * force * strength;
          d.y = d.oy - Math.sin(angle) * force * strength;
        } else {
          d.x += (d.ox - d.x) * 0.08;
          d.y += (d.oy - d.y) * 0.08;
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

// ==========================================
// UTILITY & SHARED COMPONENTS
// ==========================================

const BlurryStar: React.FC<{ className?: string }> = ({ className }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 0.4, scale: 1 }}
    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
    className={`absolute text-brandRed filter blur-sm select-none pointer-events-none ${className}`}
  >
    <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  </motion.div>
);

// ==========================================
// PROJECT DETAIL COMPONENT
// ==========================================

const ProjectDetail: React.FC<{ project: Project; onBack: () => void }> = ({ project, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen pt-24 md:pt-32 pb-20 px-4 md:px-6 max-w-7xl mx-auto relative z-10"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-brandRed font-bold uppercase tracking-widest text-[10px] md:text-xs mb-8 md:mb-12 hover:gap-4 transition-all"
      >
        <ArrowLeft size={16} /> Back to Work
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 mb-16 md:mb-24">
        <div>
          <span className="text-brandRed font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
            {project.category}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 md:mb-8">{project.title}</h1>
          <div className="flex flex-wrap gap-2 mb-8 md:mb-12">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-brandRed/10 text-brandRed text-[10px] font-bold rounded-full uppercase tracking-widest">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
            {project.longDescription}
          </p>
        </div>
      </div>

      <div className="space-y-8 md:space-y-12">
        {project.contentImages.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl bg-zinc-100 dark:bg-zinc-900"
          >
            <img src={img} alt={`${project.title} view ${idx + 1}`} className="w-full h-auto block" />
          </motion.div>
        ))}
      </div>

      <div className="mt-16 md:mt-20 pt-16 md:pt-20 border-t border-zinc-200 dark:border-zinc-800 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Next Project?</h3>
        <button
          onClick={onBack}
          className="px-8 md:px-12 py-4 md:py-5 bg-brandRed text-white font-bold rounded-xl md:rounded-2xl hover:scale-105 transition-transform shadow-xl uppercase tracking-widest text-[10px] md:text-xs"
        >
          View All Work
        </button>
      </div>
    </motion.div>
  );
};

// ==========================================
// MAIN CONTENT COMPONENTS
// ==========================================

const Navbar: React.FC<{ theme: Theme; toggleTheme: () => void; isProjectView: boolean; onHomeClick: () => void }> = ({ theme, toggleTheme, isProjectView, onHomeClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Work', id: 'work' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (isProjectView) {
      onHomeClick();
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const offsetPosition = (elementRect - bodyRect) - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPosition = (elementRect - bodyRect) - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md border-b border-zinc-200/20 dark:border-zinc-800/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <button 
          onClick={() => { setIsOpen(false); onHomeClick(); }}
          className="text-xl font-bold tracking-tighter hover:opacity-70 transition-opacity p-2"
        >
          SP<span className="text-brandRed">.</span>
        </button>

        <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className="text-[10px] font-bold hover:text-brandRed transition-colors uppercase tracking-[0.3em]"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>

        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-zinc-900 dark:text-zinc-100"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 py-8 px-6 md:hidden flex flex-col items-center space-y-6 shadow-xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="text-sm font-bold hover:text-brandRed transition-colors uppercase tracking-[0.3em]"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero: React.FC = () => (
  <section id="home" className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-16 overflow-hidden">
    <BlurryStar className="top-[15%] right-[5%] md:right-[15%] rotate-12 scale-75 md:scale-100" />
    <BlurryStar className="bottom-[15%] left-[5%] md:left-[10%] -rotate-12 scale-75 md:scale-100" />
    
    <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="flex flex-col items-center justify-center text-center relative"
      >
        <div className="relative mb-12 md:mb-0 w-full max-w-5xl mx-auto">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-brandRed text-[4.5rem] sm:text-[7rem] md:text-[10rem] lg:text-[12rem] xl:text-[15rem] font-script leading-[1] py-12 md:py-16 select-none relative block overflow-visible"
          >
            Portfolio
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute top-[15%] md:top-[18%] right-0 md:right-[-2%] lg:right-[-5%] text-brandRed font-sans font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl"
            >
              '26
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="md:absolute md:bottom-[-2rem] lg:bottom-[-3rem] md:left-[30%] text-center md:text-left z-10"
          >
            <div className="text-brandRed font-sans font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight uppercase flex flex-col md:items-start items-center">
              <span>VISUAL</span>
              <span>DESIGNER</span>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-[-6rem] md:bottom-[-8rem] lg:bottom-[-12rem]"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-zinc-400">Scroll</span>
            <div className="w-[1px] h-10 md:h-12 bg-zinc-300 dark:bg-zinc-700" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const ProjectCard: React.FC<{ project: Project; index: number; onClick: () => void }> = ({ project, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden aspect-[4/3] rounded-xl md:rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-4">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-brandRed/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8">
          <p className="text-white text-[10px] md:text-xs font-medium mb-1 uppercase tracking-widest">{project.category}</p>
          <h3 className="text-white text-xl md:text-2xl font-bold mb-3 md:mb-4">{project.title}</h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 md:py-1 bg-white/20 backdrop-blur-sm text-white text-[9px] md:text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-start group-hover:px-1 transition-all duration-300">
        <div>
          <h3 className="text-base md:text-lg font-bold leading-tight">{project.title}</h3>
          <p className="text-[11px] md:text-sm text-zinc-500 dark:text-zinc-400 mt-1">{project.category}</p>
        </div>
        <ArrowUpRight className="text-zinc-400 group-hover:text-brandRed group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0 ml-2" size={20} />
      </div>
    </motion.div>
  );
};

const Work: React.FC<{ onProjectSelect: (id: number) => void }> = ({ onProjectSelect }) => (
  <section id="work" className="py-20 md:py-32 bg-white/50 dark:bg-black/20 backdrop-blur-sm border-t border-zinc-200/20">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6 md:gap-8">
        <div>
          <span className="text-brandRed font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Archives</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter">Curated Work</h2>
        </div>
        <p className="max-w-xs text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed border-l-2 border-brandRed/20 pl-6">
          Exploring visual communication through experimental typography and brand narratives.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {PROJECTS.map((project, idx) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={idx} 
            onClick={() => onProjectSelect(project.id)}
          />
        ))}
      </div>
    </div>
  </section>
);

const About: React.FC = () => (
  <section id="about" className="py-20 md:py-32 overflow-hidden relative">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-32 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative max-w-md mx-auto lg:max-w-none w-full"
        >
          <div className="relative aspect-[4/5] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl group">
            <img 
              src="https://i.pinimg.com/736x/9a/2c/96/9a2c96419df75708dbd2cbdc7e1b612e.jpg" 
              alt="Siddhi Purohit" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-brandRed/10 mix-blend-overlay group-hover:bg-transparent transition-all" />
          </div>
          <div className="absolute -bottom-8 -right-8 w-32 md:w-48 h-32 md:h-48 bg-brandRed/5 rounded-full blur-3xl -z-10" />
          <div className="absolute top-4 left-4 p-2 md:p-4 border border-brandRed/20 rounded-full bg-white/10 backdrop-blur-md">
             <Star className="text-brandRed animate-spin-slow" size={24} fill="currentColor" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <span className="text-brandRed font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Biography</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-8 md:mb-10">
            About <br />
            <span className="text-brandRed italic font-serif">me.</span> 
          </h2>
          
          <div className="space-y-6 text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
            <p>
              I am <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Siddhi Purohit</strong>, a communication design student dedicated to finding the intersection between raw emotion and functional aesthetics. 
            </p>
            <p>
              My journey in design is fueled by a curiosity for how we perceive information and a passion for experimental typography. I believe that every brand has a heartbeat, and my role is to make it visible through intentional visual narratives.
            </p>
            <p>
              Specializing in <span className="text-brandRed border-b border-brandRed/20">illustration</span> and <span className="text-brandRed border-b border-brandRed/20">brand strategy</span>, I work to create immersive experiences that go beyond the screen or the page.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 md:gap-8 pt-10 border-t border-zinc-200 dark:border-zinc-800">
            <div>
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 mb-2">Location</h4>
              <p className="font-semibold text-sm md:text-base">Ahmedabad, India</p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 mb-2">Focus</h4>
              <p className="font-semibold text-sm md:text-base">Comm. Design</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Contact: React.FC = () => {
  const socialLinksData = [
    { icon: Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
    { icon: BehanceIcon, href: SOCIAL_LINKS.behance, label: 'Behance' },
    { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 bg-brandRed text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-white/60 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Contact</span>
            <h2 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-8 md:mb-12">
              Let's connect. <br />
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 md:mb-12 max-w-md font-medium leading-relaxed">
              Open to collaborations, internships, and conversations about the future of visual design.
            </p>
            <div className="flex flex-col space-y-6">
              <a href="mailto:siddhipurohit64@gmail.com" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold hover:text-zinc-900 transition-colors flex items-center gap-3 md:gap-4 group w-fit break-all">
                siddhipurohit64@gmail.com
                <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 flex-shrink-0" size={24} />
              </a>
              <div className="flex space-x-3 md:space-x-4">
                {socialLinksData.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <a 
                      key={idx} 
                      href={item.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label={item.label}
                      className="p-3 md:p-4 border border-white/20 rounded-full hover:bg-white hover:text-brandRed transition-all"
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-white/10 backdrop-blur-md p-8 md:p-14 rounded-2xl md:rounded-[3rem] border border-white/20 shadow-2xl"
          >
            <form className="space-y-6 md:space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                <div className="border-b border-white/30 py-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/60">Name</label>
                  <input type="text" className="w-full bg-transparent outline-none pt-2 placeholder:text-white/30 text-sm md:text-base" placeholder="Your Name" />
                </div>
                <div className="border-b border-white/30 py-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/60">Email</label>
                  <input type="email" className="w-full bg-transparent outline-none pt-2 placeholder:text-white/30 text-sm md:text-base" placeholder="your@email.com" />
                </div>
              </div>
              <div className="border-b border-white/30 py-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/60">Message</label>
                <textarea rows={4} className="w-full bg-transparent outline-none pt-2 placeholder:text-white/30 resize-none text-sm md:text-base" placeholder="How can I help you?" />
              </div>
              <button
                type="submit"
                className="w-full py-4 md:py-5 bg-white text-brandRed font-bold rounded-xl md:rounded-2xl hover:scale-[1.02] active:scale-95 transition-transform shadow-xl uppercase tracking-widest text-[10px] md:text-xs"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => (
  <footer className="py-12 px-4 md:px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 border-t border-zinc-200 dark:border-zinc-800 pt-12">
      <div className="flex flex-col items-center md:items-start">
         <span className="text-xl font-bold tracking-tighter">SP<span className="text-brandRed">.</span></span>
         <p className="text-[10px] uppercase tracking-widest text-zinc-400 mt-2">Communication Design</p>
      </div>
      <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] text-center">
        © {new Date().getFullYear()} Siddhi Purohit.
      </p>
      <div className="flex flex-wrap justify-center gap-6 md:space-x-8 text-[10px] font-bold uppercase tracking-widest">
        <a href={SOCIAL_LINKS.behance} target="_blank" rel="noopener noreferrer" className="hover:text-brandRed transition-colors">Behance</a>
        <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brandRed transition-colors">Instagram</a>
        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brandRed transition-colors">LinkedIn</a>
      </div>
    </div>
  </footer>
);

// ==========================================
// MAIN APP COMPONENT
// ==========================================

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleHomeClick = () => {
    setSelectedProjectId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedProject = PROJECTS.find(p => p.id === selectedProjectId);

  return (
    <div className="min-h-screen text-zinc-900 dark:text-zinc-50 font-sans selection:bg-brandRed selection:text-white transition-colors duration-300 overflow-x-hidden relative">
      <InteractiveGrid theme={theme} />
      
      <div className="relative z-10">
        <Navbar 
          theme={theme} 
          toggleTheme={toggleTheme} 
          isProjectView={!!selectedProjectId}
          onHomeClick={handleHomeClick}
        />

        <AnimatePresence mode="wait">
          {!selectedProjectId ? (
            <motion.div
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero />
              <Work onProjectSelect={setSelectedProjectId} />
              <About />
              <Contact />
              <Footer />
            </motion.div>
          ) : (
            <ProjectDetail 
              key={`project-${selectedProjectId}`}
              project={selectedProject!} 
              onBack={() => setSelectedProjectId(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
