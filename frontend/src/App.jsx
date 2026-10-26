// App.js — Premium Interactive Portfolio
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  FaCode, FaGraduationCap, FaBriefcase, FaStar,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub,
  FaLinkedin, FaPaperPlane, FaExternalLinkAlt,
  FaBars, FaTimes, FaWhatsapp, FaArrowRight,
  FaDatabase, FaBrain, FaChartLine, FaVideo,
  FaRobot, FaPython, FaReact, FaNodeJs, FaJs, FaJava,
  FaFire, FaTrophy, FaEye, FaSun, FaMoon,
  FaCheckCircle, FaInfoCircle, FaPhoneAlt, FaLayerGroup,
  FaCalendarAlt
} from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, SiShopify, SiTypescript, SiRedis } from 'react-icons/si';
import './App.css';

import project1 from './assets/MyinnersideGroup4.jpeg';
import project2 from './assets/1.jpg';
import project3 from './assets/BG.jpg';
import project4 from './assets/HOME1.jpg';
import project5 from './assets/Home-banner-1.webp';
import project6 from './assets/shanupg.jpeg';
import recreators from './assets/recreators.png'
import burgshake from './assets/burgshake.png'
import insight from './assets/insight.png'
import neysa from './assets/neysa.png'
/* ============================================================
   1. CUSTOM CURSOR (Smooth + Magnetic)
   ============================================================ */
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current, ring = ringRef.current;
    let mx = 0, my = 0, rx = 0, ry = 0;
    let rafId;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px'; }
    };

    const animate = () => {
      rx += (mx - rx) * 0.2; // Smoother follow
      ry += (my - ry) * 0.2;
      if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
      rafId = requestAnimationFrame(animate);
    };

    // Event Delegation for hover states
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, .project-card-modern, .filter-btn, .theme-toggle, .chat-fab, .wa-fab, .magnetic-btn');
      if (target && ring) ring.classList.add('cursor-hover');
    };
    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, .project-card-modern, .filter-btn, .theme-toggle, .chat-fab, .wa-fab, .magnetic-btn');
      if (target && ring) ring.classList.remove('cursor-hover');
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

/* ============================================================
   2. MAGNETIC BUTTON (Interactive)
   ============================================================ */
const MagneticButton = ({ children, className = '', ...props }) => {
  const ref = useRef(null);
  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };
  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };
  return (
    <div
      ref={ref}
      className={`magnetic-wrap ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ display: 'inline-block', transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
    >
      {children}
    </div>
  );
};

/* ============================================================
   3. TILT CARD
   ============================================================ */
const TiltCard = ({ children, className = '' }) => {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const rx = ((y - r.height / 2) / (r.height / 2)) * -5;
    const ry = ((x - r.width / 2) / (r.width / 2)) * 5;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    el.style.setProperty('--mx', `${(x / r.width) * 100}%`);
    el.style.setProperty('--my', `${(y / r.height) * 100}%`);
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };
  return (
    <div ref={ref} className={`tilt-card ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
};

/* ============================================================
   4. ANIMATED COUNTER
   ============================================================ */
const Counter = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null), started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          setCount(Math.floor(end * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
};

/* ============================================================
   5. SCROLL REVEAL
   ============================================================ */
const Reveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => ref.current?.classList.add('revealed'), delay);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
};

/* ============================================================
   6. SMART AI CHATBOT
   ============================================================ */
const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hey there! 👋 I'm Shubham's AI assistant. Ask me anything about his projects, skills, or just say hi!" }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  const getAnswer = (q) => {
    const l = q.toLowerCase().trim();
    if (l.match(/\b(hi|hello|hey|namaste|yo)\b/)) return "Hello! 👋 Great to see you. Want to know about Shubham's projects, skills, or just chat? Fire away!";
    if (l.match(/how (are|r) (you|u)|how's it going/)) return "I'm running at peak performance, thanks for asking! 😄 How can I help you with Shubham's portfolio today?";
    if (l.match(/who (are|r) (you|u)|introduce yourself/)) return "I'm Shubham's personal AI assistant — a digital version of his portfolio. Ask me anything about his work or skills!";
    if (l.match(/who (is|'s) shubham|about shubham|tell me about (him|shubham)/)) return "Shubham Shukla is a Full Stack Developer & Web Designer with 2+ years of experience. He specializes in MERN, Next.js, Shopify, and AI-integrated apps (RAG). 40+ projects shipped, 5★ HackerRank! 🚀";
    if (l.match(/project|work|portfolio|app|website/)) return "Shubham has built 40+ projects! Highlights: Recreators (AI/RAG/WebRTC), My Inner Side (mental wellness), Rogue0707 (Shopify), HealthStory, Prakritisa, BurgShake, and more. Which one do you want to explore? 🚀";
    if (l.includes('recreator')) return "Recreators is a flagship project — full-stack platform with WebRTC video calling, Socket.IO real-time chat, RAG-powered AI chatbot, Razorpay payments, and analytics dashboards. Live at recreators-main.vercel.app 🚀";
    if (l.includes('inner side')) return "My Inner Side is a mental wellness consultation platform connecting users with certified professionals for 1-on-1 sessions. Built with React, MongoDB, Express, Tailwind, and Razorpay. 🌿";
    if (l.includes('rogue')) return "Rogue0707 is a modern fashion e-commerce platform built with headless Shopify GraphQL backend and React storefront. 🛍️";
    if (l.match(/skill|tech|stack|know|language|framework/)) return "Shubham's stack: MERN, Next.js, Shopify, Tailwind, TypeScript, Java, Python, Redis, WebRTC, Socket.IO, GraphQL, Razorpay, Pandas, NumPy. Plus AI (RAG, vector search) and Data Analytics. 💻";
    if (l.match(/experience|job|work at|company/)) return "Currently a Full Stack Developer at Recreators Design & Media (Nov 2024 – Present). Shipped 40+ projects, built production Shopify + Next.js platforms, optimized backends with Redis. 💼";
    if (l.match(/education|study|degree|college/)) return "B.Tech in Computer Science with strong DSA foundation — 250+ problems solved, 5★ HackerRank in Java & SQL. 🎓";
    if (l.match(/contact|email|phone|reach|whatsapp|call|hire|freelance/)) return "Reach out:\n📧 shubshukla2332@gmail.com\n📞 +91 9335162135 (Call/WhatsApp)\n💼 linkedin.com/in/shubham-shukla-b480a726a\n🐙 github.com/shubhamaaaa\n\nOpen to freelance and full-time roles! 💬";
    if (l.match(/hobby|hobbies|free time|fun|interest/)) return "When not coding, Shubham loves solving DSA problems, exploring AI/ML trends, reading tech blogs, and experimenting with new frameworks. ☕💡";
    if (l.match(/location|city|where|based/)) return "Shubham is based in Ghaziabad, Uttar Pradesh, India 🇮🇳. Open to remote work worldwide.";
    if (l.match(/achiev|award|hackerrank|rank|star|dsa/)) return "Achievements:\n🏆 5★ HackerRank (Java & SQL)\n💡 250+ DSA problems solved\n📦 40+ production projects shipped\n⚡ Full Stack Developer @ Recreators";
    if (l.match(/thank|thanks|thx/)) return "You're welcome! 😊 Good luck with your work! 🚀";
    if (l.match(/bye|goodbye|exit/)) return "Goodbye! 👋 Feel free to reach out anytime at shubshukla2332@gmail.com.";
    if (l.match(/joke|funny/)) {
      const jokes = ["Why do programmers prefer dark mode? Light attracts bugs! 🐛", "There are 10 types of people: those who understand binary and those who don't. 🤓", "I'd tell you a UDP joke, but you might not get it. 📡"];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }
    if (l.match(/awesome|amazing|great|nice/)) return "Thank you so much! 😊 Let me know if you'd like to see anything specific! 🚀";
    const fallbacks = [
      "Interesting question! I'm best at talking about Shubham's projects, skills, or contact info. What would you like to know? 😊",
      "Hmm, I might not have that info. Try asking about his projects, tech stack, or how to hire him! 🚀"
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  const send = (text) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { from: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages(m => [...m, { from: 'bot', text: getAnswer(text) }]);
      setTyping(false);
    }, 800);
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  return (
    <>
      <button className={`chat-fab ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
        {open ? <FaTimes /> : <FaRobot />}
        {!open && <span className="chat-fab-pulse" />}
      </button>

      {open && (
        <div className="chat-window">
          <div className="chat-head">
            <div className="chat-head-info">
              <div className="chat-avatar"><FaRobot /></div>
              <div>
                <strong>AI Assistant</strong>
                <span className="chat-status"><span className="online-dot" /> Online</span>
              </div>
            </div>
            <button className="chat-close" onClick={() => setOpen(false)}><FaTimes /></button>
          </div>
          <div className="chat-body" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.from}`}>
                {m.from === 'bot' && <div className="msg-avatar"><FaRobot /></div>}
                <div className="msg-bubble">{m.text}</div>
              </div>
            ))}
            {typing && (
              <div className="chat-msg bot">
                <div className="msg-avatar"><FaRobot /></div>
                <div className="msg-bubble typing"><span /><span /><span /></div>
              </div>
            )}
          </div>
          <div className="chat-quick">
            {['Tell me about Recreators', 'What are his skills?', 'How to hire?'].map(q => (
              <button key={q} onClick={() => send(q)}>{q}</button>
            ))}
          </div>
          <form className="chat-input-row" onSubmit={(e) => { e.preventDefault(); send(input); }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything..." />
            <button type="submit" className="chat-send"><FaPaperPlane /></button>
          </form>
        </div>
      )}
    </>
  );
};

/* ============================================================
   7. WHATSAPP FAB
   ============================================================ */
const WhatsAppFab = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`wa-fab-wrap ${expanded ? 'expanded' : ''}`}>
      {expanded && (
        <div className="wa-menu">
          <a href="https://wa.me/919335162135?text=Hi%20Shubham!" target="_blank" rel="noreferrer" className="wa-option"><FaWhatsapp /> WhatsApp Chat</a>
          <a href="tel:+919335162135" className="wa-option"><FaPhoneAlt /> Call Now</a>
          <a href="https://wa.me/919335162135?text=Can%20we%20schedule%20a%20call%3F" target="_blank" rel="noreferrer" className="wa-option"><FaCalendarAlt /> Book a Call</a>
        </div>
      )}
      <button className="wa-fab" onClick={() => setExpanded(!expanded)}>
        {expanded ? <FaTimes /> : <FaWhatsapp />}
        {!expanded && <span className="wa-tooltip">Chat with me · +91 9335162135</span>}
      </button>
    </div>
  );
};

/* ============================================================
   8. PROJECT MODAL
   ============================================================ */
const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const onEsc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onEsc);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = originalOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><FaTimes /></button>
        <div className="modal-img">
          <img src={project.img} alt={project.title} />
          <div className="modal-img-overlay" />
        </div>
        <div className="modal-body">
          <div className="modal-meta">
            <span className="project-cat">{project.category}</span>
            {project.featured && <span className="modal-featured"><FaStar /> Featured</span>}
          </div>
          <h2>{project.title}</h2>
          <p>{project.desc}</p>
          {project.highlights && (
            <div className="modal-highlights">
              <h4><FaInfoCircle /> Key Highlights</h4>
              <ul>{project.highlights.map((h, i) => <li key={i}><FaCheckCircle /> {h}</li>)}</ul>
            </div>
          )}
          <div className="modal-tech">
            <h4><FaLayerGroup /> Tech Stack</h4>
            <div className="project-tech">{project.tech.map(t => <span key={t}>{t}</span>)}</div>
          </div>
          <div className="modal-actions">
            <a href={project.link} target="_blank" rel="noreferrer" className="btn btn-primary"><FaExternalLinkAlt /> Visit Live Site</a>
            <a href="#contact" className="btn btn-ghost" onClick={onClose}><FaEnvelope /> Discuss Similar Project</a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   9. DATA
   ============================================================ */
const PROJECTS = [
  { id: 1, title: 'Recreators', img: recreators, link: 'https://recreators-main.vercel.app/', desc: 'AI-powered business platform with real-time video calling, live chat, and an intelligent RAG-based chatbot.', tech: ['Next.js', 'WebRTC', 'Socket.IO', 'RAG', 'MongoDB', 'Razorpay'], category: 'AI + Full Stack', featured: true, highlights: ['WebRTC video calling', 'Socket.IO real-time chat', 'RAG-powered AI chatbot', 'Razorpay payments', 'Analytics dashboard', 'Vercel deployment'] },
  { id: 4, title: 'HealthStory', img: project4, link: 'https://healthstory.net.in/', desc: 'Wellness e-commerce with curated herbal catalog, secure payments, and subscription management.', tech: ['React', 'MongoDB', 'Express', 'Node'], category: 'E-Commerce', highlights: ['Curated wellness catalog', 'Secure checkout', 'Subscriptions', 'Order tracking'] },
  { id: 5, title: 'Prakritisa', img: project5, link: 'https://prakritisa.com/', desc: 'Natural botanical products e-commerce with responsive design and optimized checkout.', tech: ['React', 'MongoDB', 'Express', 'Node'], category: 'E-Commerce', highlights: ['Botanical catalog', 'Optimized checkout', 'Search & filters', 'Customer reviews'] },
  { id: 6, title: 'Ishmi Herbal', img: project2, link: 'https://ishmiherbal.com/', desc: 'Herbal marketplace with dynamic catalog, auth, and secure Razorpay integration.', tech: ['React', 'MongoDB', 'Tailwind', 'Express', 'Node'], category: 'E-Commerce', highlights: ['Dynamic catalog', 'Auth & profiles', 'Razorpay payments', 'Admin dashboard'] },
  { id: 7, title: 'BurgShake', img: burgshake, link: 'https://burgshake.vercel.app/', desc: 'Modern food delivery brand website with animated menu, cart, and ordering flow.', tech: ['React', 'Vite', 'Tailwind'], category: 'Frontend', highlights: ['Animated menu', 'Interactive cart', 'Order flow', 'Mobile-first'] },
  { id: 2, title: 'My Inner Side', img: project1, link: 'https://myinnerside.com/', desc: 'Mental wellness consultation platform connecting users with certified professionals through secure 1-on-1 sessions.', tech: ['React', 'MongoDB', 'Tailwind', 'Express', 'Razorpay'], category: 'Full Stack', featured: true, highlights: ['1-on-1 consultation booking', 'Razorpay integration', 'Professional onboarding', 'Session scheduling', 'Responsive across devices'] },
  { id: 3, title: 'Rogue0707', img: project3, link: 'https://www.rogue0707.com/', desc: 'Modern fashion e-commerce with headless Shopify GraphQL backend and React-powered storefront.', tech: ['React', 'Shopify', 'GraphQL'], category: 'E-Commerce', featured: true, highlights: ['Headless Shopify store', 'GraphQL API', 'Optimized performance', 'Custom checkout', 'SEO pages'] },
  { id: 8, title: 'Warrior Beverages', img: neysa, link: 'https://warriorbeverages.in/', desc: 'Corporate beverage brand website with product showcase and lead generation.', tech: ['React', 'Node', 'MongoDB'], category: 'Business', highlights: ['Product showcase', 'Lead capture', 'Brand storytelling', 'SEO-ready'] },
  { id: 9, title: 'Insight Integrators', img: insight, link: 'https://insightintegrators.ae/', desc: 'UAE-based consulting firm website with modern UI, SEO, and analytics dashboard.', tech: ['Next.js', 'Tailwind', 'Node'], category: 'Business', highlights: ['Modern corporate UI', 'SEO pages', 'Analytics dashboard', 'Multi-language ready'] },
  { id: 10, title: 'ShanuPG', img: project6, link: 'https://shanupg-frontend.vercel.app/', desc: 'Responsive PG accommodation discovery platform with booking and filters.', tech: ['React', 'Vite', 'Tailwind'], category: 'Frontend', highlights: ['PG search & filters', 'Booking flow', 'Responsive UI', 'Vercel deploy'] },
];

const SKILLS = {
  'Languages': [
    { name: 'JavaScript', level: 95, icon: <FaJs /> },
    { name: 'Java', level: 90, icon: <FaJava /> },
    { name: 'Python', level: 85, icon: <FaPython /> },
    { name: 'TypeScript', level: 80, icon: <SiTypescript /> },
  ],
  'Frontend': [
    { name: 'React.js', level: 95, icon: <FaReact /> },
    { name: 'Next.js', level: 90, icon: <SiNextdotjs /> },
    { name: 'Tailwind CSS', level: 92, icon: <SiTailwindcss /> },
    { name: 'Shopify', level: 85, icon: <SiShopify /> },
  ],
  'Backend': [
    { name: 'Node.js', level: 90, icon: <FaNodeJs /> },
    { name: 'Express.js', level: 88, icon: <SiExpress /> },
    { name: 'MongoDB', level: 87, icon: <SiMongodb /> },
    { name: 'Redis', level: 75, icon: <SiRedis /> },
  ],
  'AI / Data': [
    { name: 'Pandas / NumPy', level: 85, icon: <FaDatabase /> },
    { name: 'Matplotlib / Seaborn', level: 80, icon: <FaChartLine /> },
    { name: 'RAG / Vector Search', level: 78, icon: <FaBrain /> },
    { name: 'WebRTC / Socket.IO', level: 82, icon: <FaVideo /> },
  ],
};

const TECH_MARQUEE = ['React', 'Next.js', 'Node.js', 'MongoDB', 'Express', 'Tailwind', 'Shopify', 'TypeScript', 'Python', 'Java', 'Redis', 'WebRTC', 'Socket.IO', 'RAG', 'GraphQL', 'Razorpay', 'Pandas', 'NumPy'];
const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

/* ============================================================
   10. THEME HOOK
   ============================================================ */
const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('theme') || 'dark';
  });
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  return { theme, toggle: () => setTheme(t => t === 'dark' ? 'light' : 'dark') };
};

/* ============================================================
   11. MAIN APP
   ============================================================ */
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ sending: false, sent: false, error: '' });
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const { theme, toggle: toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / total) * 100);
      const sections = document.querySelectorAll('section');
      let current = 'home';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200 && window.scrollY < s.offsetTop + s.clientHeight - 200) current = s.id;
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }, []);

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formStatus.sending) return;
    setFormStatus({ sending: true, sent: false, error: '' });
    try {
      // Fake API for demo, replace with your real endpoint
      await new Promise(r => setTimeout(r, 1500)); 
      setFormStatus({ sending: false, sent: true, error: '' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setFormStatus({ sending: false, sent: false, error: 'Network error. Please try again.' });
    }
  };

  const categories = ['All', ...new Set(PROJECTS.map(p => p.category))];
  const filteredProjects = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <div className="App">
      <CustomCursor />
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* NEW AURORA BACKGROUND (No ugly lines) */}
      <div className="bg-aurora">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="noise-overlay" />
      </div>

      <header className={`header ${scrollProgress > 5 ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          <a className="logo" href="#home" onClick={() => scrollToSection('home')}>
            <span className="logo-mark">S</span>
            <span className="logo-text">Shubham<span>.dev</span></span>
          </a>
          <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
            {NAV_ITEMS.map(item => (
              <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? 'active' : ''} onClick={() => scrollToSection(item.id)}>
                {item.label}
              </a>
            ))}
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
            <MagneticButton>
              <a href="#contact" className="btn btn-sm btn-primary" onClick={() => scrollToSection('contact')}>Hire Me</a>
            </MagneticButton>
          </nav>
          <div className="header-mobile-controls">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
            <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      <section id="home" className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-left">
              <div className="hero-badge"><span className="pulse-dot" /> Available for opportunities</div>
              <h1 className="hero-title">
                Building <span className="gradient-text">intelligent</span><br />
                web experiences<br />
                that <span className="gradient-text">scale.</span>
              </h1>
              <p className="hero-sub">
                Full Stack Developer & AI Enthusiast crafting production-grade platforms with
                MERN, Next.js, Shopify, and <strong>RAG-powered AI</strong>. 40+ shipped projects.
              </p>
              <div className="hero-cta">
                <MagneticButton>
                  <a href="#projects" className="btn btn-primary" onClick={() => scrollToSection('projects')}>
                    Explore Work <FaArrowRight />
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <a href="https://wa.me/919335162135" target="_blank" rel="noreferrer" className="btn btn-ghost">
                    <FaWhatsapp /> WhatsApp Me
                  </a>
                </MagneticButton>
              </div>
              <div className="hero-socials">
                <a href="https://www.linkedin.com/in/shubham-shukla-b480a726a" target="_blank" rel="noreferrer"><FaLinkedin /></a>
                <a href="https://github.com/shubhamaaaa" target="_blank" rel="noreferrer"><FaGithub /></a>
                <a href="https://wa.me/919335162135" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
                <a href="mailto:shubshukla2332@gmail.com"><FaEnvelope /></a>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-visual">
                <div className="hero-card-3d">
                  <div className="hero-avatar">SS</div>
                  <div className="hero-float-card float-1"><FaRobot /> <span>AI / RAG</span></div>
                  <div className="hero-float-card float-2"><FaFire /> <span>40+ Projects</span></div>
                  <div className="hero-float-card float-3"><FaTrophy /> <span>5★ HackerRank</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="stats-bar">
            <div className="stat-block"><Counter end={40} suffix="+" /><span>Projects</span></div>
            <div className="stat-block"><Counter end={250} suffix="+" /><span>DSA Solved</span></div>
            <div className="stat-block"><Counter end={5} suffix="★" /><span>HackerRank</span></div>
            <div className="stat-block"><Counter end={2} suffix="+ yrs" /><span>Experience</span></div>
          </div>
        </div>

        <div className="marquee">
          <div className="marquee-track">
            {[...TECH_MARQUEE, ...TECH_MARQUEE].map((t, i) => (
              <span key={i} className="marquee-item">{t} <span className="dot">•</span></span>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="section-tag">01 — About</span>
              <h2>Engineer by craft. <span className="gradient-text">Creator by passion.</span></h2>
            </div>
          </Reveal>

          <div className="bento-grid">
            <Reveal delay={100} className="bento-large">
              <TiltCard>
                <div className="bento-card glass">
                  <div className="bento-icon"><FaCode /></div>
                  <h3>The Story</h3>
                  <p>I'm <span className="highlight">Shubham Shukla</span> — a Full Stack Developer & Web Designer specializing in <span className="highlight">MERN</span>, <span className="highlight">Next.js</span>, <span className="highlight">Shopify</span>, and <span className="highlight">AI-integrated apps</span>. I turn complex business requirements into elegant, scalable digital products.</p>
                  <p>From <span className="highlight">RAG-powered chatbots</span> to <span className="highlight">WebRTC video platforms</span>, I build production-ready systems that solve real problems with performance and polish.</p>
                </div>
              </TiltCard>
            </Reveal>
            <Reveal delay={150}><TiltCard><div className="bento-card glass"><FaGraduationCap className="bento-icon" /><h4>Education</h4><p>B.Tech Computer Science</p><span className="bento-tag">Strong CS Foundation</span></div></TiltCard></Reveal>
            <Reveal delay={200}><TiltCard><div className="bento-card glass"><FaBriefcase className="bento-icon" /><h4>Experience</h4><p>Full Stack Dev @ Recreators</p><span className="bento-tag">Nov 2024 – Present</span></div></TiltCard></Reveal>
            <Reveal delay={250}><TiltCard><div className="bento-card glass"><FaBrain className="bento-icon" /><h4>AI & Data</h4><p>RAG · Vector Search · Pandas</p><span className="bento-tag">Kaggle · Jupyter</span></div></TiltCard></Reveal>
            <Reveal delay={300}><TiltCard><div className="bento-card glass"><FaTrophy className="bento-icon" /><h4>Achievements</h4><p>5★ Java & SQL on HackerRank</p><span className="bento-tag">250+ DSA solved</span></div></TiltCard></Reveal>
          </div>
        </div>
      </section>

      <section id="experience" className="experience">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="section-tag">02 — Experience</span>
              <h2>Where I've <span className="gradient-text">shipped real things.</span></h2>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-content glass">
                  <div className="timeline-head">
                    <div>
                      <h3>Full Stack Developer & Web Designer</h3>
                      <h4 className="gradient-text">Recreators Design & Media Pvt. Ltd.</h4>
                    </div>
                    <span className="timeline-date">Nov 2024 – Present</span>
                  </div>
                  <ul className="timeline-list">
                    <li>Built <span className="highlight">Recreators platform</span> with WebRTC video calling, Socket.IO real-time, and RAG-powered AI chatbot using embeddings & vector search.</li>
                    <li>Integrated <span className="highlight">Razorpay payments</span>, REST APIs, MongoDB, and analytics dashboards for business insights.</li>
                    <li>Optimized backend with <span className="highlight">Redis caching</span> and async job queues for high-traffic scalability.</li>
                    <li>Delivered production Shopify + Next.js platforms: <span className="highlight">Flickemart</span>, <span className="highlight">Riarmart</span>, and more.</li>
                    <li>Built secure <span className="highlight">REST APIs</span>, RBAC, and admin dashboards.</li>
                    <li>Shipped <span className="highlight">40+ projects</span> end-to-end, from Figma to deploy.</li>
                  </ul>
                  <div className="timeline-tags">
                    {['MERN', 'Next.js', 'RAG', 'WebRTC', 'Socket.IO', 'Redis', 'Shopify', 'Razorpay'].map(t => <span key={t}>{t}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="skills" className="skills">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="section-tag">03 — Skills</span>
              <h2>A stack built for <span className="gradient-text">real products.</span></h2>
            </div>
          </Reveal>
          <div className="skills-grid-modern">
            {Object.entries(SKILLS).map(([cat, items], idx) => (
              <Reveal key={cat} delay={idx * 100}>
                <div className="skill-panel glass">
                  <h3 className="skill-panel-title">{cat}</h3>
                  <div className="skill-list">
                    {items.map(s => (
                      <div key={s.name} className="skill-row">
                        <div className="skill-row-top">
                          <span className="skill-icon">{s.icon}</span>
                          <span className="skill-name">{s.name}</span>
                          <span className="skill-pct">{s.level}%</span>
                        </div>
                        <div className="skill-track"><div className="skill-fill" style={{ '--target': `${s.level}%` }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="projects">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="section-tag">04 — Projects</span>
              <h2>Selected <span className="gradient-text">work.</span></h2>
            </div>
          </Reveal>

          <div className="filter-bar">
            {categories.map(c => (
              <button key={c} className={`filter-btn ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>{c}</button>
            ))}
          </div>

          <div className="projects-grid-modern">
            {filteredProjects.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <TiltCard>
                  <div className="project-card-modern" onClick={() => setSelectedProject(p)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(p)}>
                    <div className="project-img-wrap">
                      <img src={p.img} alt={p.title} loading="lazy" />
                      <div className="project-overlay"><span className="project-view"><FaEye /> View Details</span></div>
                      {p.featured && <span className="featured-badge"><FaStar /> Featured</span>}
                    </div>
                    <div className="project-body">
                      <div className="project-meta"><span className="project-cat">{p.category}</span><span className="project-open-icon"><FaExternalLinkAlt /></span></div>
                      <h3>{p.title}</h3>
                      <p>{p.desc}</p>
                      <div className="project-tech">{p.tech.slice(0, 4).map(t => <span key={t}>{t}</span>)}{p.tech.length > 4 && <span>+{p.tech.length - 4}</span>}</div>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <Reveal>
            <div className="contact-wrapper">
              <div className="contact-left">
                <span className="section-tag">05 — Contact</span>
                <h2>Let's build something <span className="gradient-text">extraordinary.</span></h2>
                <p className="contact-lead">Open to freelance, full-time roles, and ambitious collaborations.</p>
                <div className="contact-links">
                  <a href="mailto:shubshukla2332@gmail.com" className="contact-link-item"><FaEnvelope /> shubshukla2332@gmail.com</a>
                  <a href="tel:+919335162135" className="contact-link-item"><FaPhone /> +91 9335162135</a>
                  <a href="https://wa.me/919335162135" target="_blank" rel="noreferrer" className="contact-link-item"><FaWhatsapp /> WhatsApp</a>
                </div>
              </div>
              
              {/* COMPACT FORM */}
              <form className="contact-form-compact glass" onSubmit={handleSubmit}>
                <div className="form-row">
                  <input id="name" name="name" value={formData.name} onChange={handleFormChange} placeholder="Your Name" required />
                  <input id="email" type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="Your Email" required />
                </div>
                <textarea id="message" name="message" value={formData.message} onChange={handleFormChange} placeholder="Your Message" required />
                <div className="form-footer">
                  <div className="form-status">
                    {formStatus.error && <span className="error-text">{formStatus.error}</span>}
                    {formStatus.sent && <span className="success-text">✓ Message sent!</span>}
                  </div>
                  <MagneticButton>
                    <button type="submit" className="btn btn-primary" disabled={formStatus.sending}>
                      {formStatus.sending ? 'Sending...' : 'Send Message'}
                    </button>
                  </MagneticButton>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      <footer>
        <div className="container footer-inner">
          <div className="footer-brand">
            <div className="logo"><span className="logo-mark">S</span><span className="logo-text">Shubham<span>.dev</span></span></div>
            <p>Full Stack Developer · AI Enthusiast · Problem Solver</p>
          </div>
          <div className="footer-links">
            {NAV_ITEMS.map(i => <a key={i.id} href={`#${i.id}`} onClick={() => scrollToSection(i.id)}>{i.label}</a>)}
          </div>
          <div className="footer-bottom"><p>© {new Date().getFullYear()} Shubham Shukla. Crafted with React & ☕</p></div>
        </div>
      </footer>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <WhatsAppFab />
      <ChatBot />
    </div>
  );
}

export default App;