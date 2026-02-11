import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, LogIn, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './components/ProjectCard';
import ContactCard from './components/ContactCard';
import ResponseCard from './components/ResponseCard';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface FormResponse {
  id: number;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Campus Lost & Found System",
    description: "A web-based application to help students report and recover lost items with user banning, email notifications, and robust database management.",
    techStack: ["PHP", "MySQL", "HTML", "CSS"],
    image: "/images/project1.jpg",
    link: "https://github.com/Keshhaavvvv/lostfound"
  },
  {
    id: 2,
    title: "React Contact Cards(scroll down!)",
    description: "Dynamic SPA for managing user contacts with live updates, modular architecture, and parent-child component communication.",
    techStack: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    image: "/images/project2.jpg",
    link: "https://github.com/Keshhaavvvv" 
  },
  {
    id: 3,
    title: "Portfolio(OJT Project)",
    description: "React component featuring props, useState for toggling liked status, and smooth animations. Featured in this very portfolio.",
    techStack: ["React", "useState", "Lucide Icons"],
    image: "/images/project7.jpg",
    link: "https://github.com/Keshhaavvvv" 
  },
  {
  id: 4,
  title: "INTVL - Location Based Game\n(Prototype In Progress)",
  description: "A geospatial augmented reality strategy game that transforms real-world movement into territory control using the H3 hexagonal indexing system. The platform orchestrates real-time GPS synchronization, persistent competitive faction warfare with weekly seasonal resets. Features include dynamic leaderboard aggregation, badge milestones, and loyalty-locked team mechanics.",
  techStack: ["React", "Leaflet", "Supabase", "H3.js"],
  image: "/images/project4.jpg",
  link: "https://github.com/Keshhaavvvv"
},
  {
  id: 5,
  title: "youtube automation bot",
  description: "A comprehensive automation engine for viral video production with dual-language support (English & Hinglish), real-time trend aggregation, and retention-focused AI scriptwriting. The system enforces deep psychological narrative structures, elastic audio-visual synchronization via FFmpeg, dynamic asset retrieval, and crash-resilient rendering to simultaneously manage and scale two distinct YouTube channels.",
  techStack: ["Python", "Groq AI", "FFmpeg", "MoviePy", "Edge-TTS", "Google Trends API"],
  image: "/images/project5.jpg",
  link: "https://github.com/Keshhaavvvv/youtube-automation-bot"
},
  {
  id: 6,
  title: "HomeWorld",
  description: "A full-stack e-commerce web application for home essentials with user authentication, dynamic product browsing, category filtering, persistent cart management, and order placement. The system enforces login-based access control, real-time cart updates, and structured MySQL relational data handling.",
  techStack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "XAMPP"],
  image: "/images/project6.jpg",
  link: "https://github.com/Keshhaavvvv/homeworld"
}
];

function App() {
  // 1. Initialize Theme State Correctly (Lazy Initialization)
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme !== null) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Contact Form
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Contact Manager Demo
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });
  
  // Admin Responses
  const [responses, setResponses] = useState<FormResponse[]>([]);

  // 2. Sync DOM and LocalStorage whenever darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // 3. Simple Toggle Function
  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  // Load from localStorage
  useEffect(() => {
    const savedResponses = localStorage.getItem('formResponses');
    if (savedResponses) {
      setResponses(JSON.parse(savedResponses));
    }
    
    const savedContacts = localStorage.getItem('demoContacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  // Save responses to localStorage
  const saveResponses = (newResponses: FormResponse[]) => {
    localStorage.setItem('formResponses', JSON.stringify(newResponses));
    setResponses(newResponses);
  };

  // Save demo contacts
  const saveDemoContacts = (newContacts: Contact[]) => {
    localStorage.setItem('demoContacts', JSON.stringify(newContacts));
    setContacts(newContacts);
  };

  // Handle Contact Form Submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) return;

    const newResponse: FormResponse = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      message: formData.message,
      timestamp: new Date().toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      })
    };

    const updatedResponses = [newResponse, ...responses];
    saveResponses(updatedResponses);
    
    setFormSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => {
      setFormSubmitted(false);
    }, 2200);
  };

  // Contact Manager Functions
  const addContact = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newContact.name || !newContact.email || !newContact.phone) return;

    const newContactObj: Contact = {
      id: Date.now(),
      ...newContact
    };

    const updatedContacts = [...contacts, newContactObj];
    saveDemoContacts(updatedContacts);
    setNewContact({ name: '', email: '', phone: '' });
  };

  const deleteContact = (id: number) => {
    const updated = contacts.filter(c => c.id !== id);
    saveDemoContacts(updated);
  };

  // Admin Login
  const handleAdminLogin = () => {
    if (adminPassword === 'k3shavadmin123') {
      setIsLoggedIn(true);
      setLoginError('');
      setAdminPassword('');
    } else {
      setLoginError('Incorrect password.(check email from keshav if any.)');
    }
  };

  const handleAdminLogout = () => {
    setIsLoggedIn(false);
    setIsAdminModalOpen(false);
  };

  // Delete Response
  const deleteResponse = (id: number) => {
    const updated = responses.filter(r => r.id !== id);
    saveResponses(updated);
  };

  const openAdminModal = () => {
    setIsAdminModalOpen(true);
    setLoginError('');
  };

  // Smooth Scroll
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - bodyRect - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-transparent text-inherit overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-mono text-xl font-bold">KV</span>
            </div>
            <div>
              <div className="font-semibold tracking-tighter text-2xl text-zinc-900 dark:text-white">
                KESHAV WAGHULE
              </div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-400 -mt-1">BSC COMPUTER SCIENCE</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-zinc-900 dark:text-zinc-200">
            <button onClick={() => scrollToSection('about')} className="hover:text-violet-600 dark:hover:text-violet-400 transition">About</button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-violet-600 dark:hover:text-violet-400 transition">Skills</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-violet-600 dark:hover:text-violet-400 transition">Projects</button>
            <button onClick={() => scrollToSection('demo')} className="hover:text-violet-600 dark:hover:text-violet-400 transition">Live Demo</button>
            <button onClick={() => scrollToSection('education')} className="hover:text-violet-600 dark:hover:text-violet-400 transition">Education</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-violet-600 dark:hover:text-violet-400 transition">Contact</button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-3 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition text-zinc-900 dark:text-white"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button 
              onClick={openAdminModal}
              className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-black dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 text-white text-sm rounded-full transition font-medium"
            >
              <LogIn className="w-4 h-4" /> ADMIN
            </button>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="md:hidden p-3"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <div className="px-6 py-8 flex flex-col gap-4 text-lg">
                {['about', 'skills', 'projects', 'demo', 'education', 'contact'].map((section) => (
                  <button 
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="text-left py-1.5 capitalize hover:text-violet-600 dark:hover:text-violet-400"
                  >
                    {section === 'demo' ? 'Live Contact Demo' : section}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <section id="home" className="min-h-screen pt-20 flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#27272a_0.8px,transparent_1px)] dark:bg-[radial-gradient(#3f3f46_0.8px,transparent_1px)] bg-[length:4px_4px]"></div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 pt-12">
          <div className="max-w-3xl">
            <div className="inline-block px-5 py-1.5 mb-6 rounded-full border border-orange-500/50 bg-orange-500/10 text-orange-600 dark:text-orange-400 text-sm tracking-[3px]">
              PUNE, INDIA
            </div>
            
            <h1 
  className="text-[92px] md:text-[120px] leading-[0.92] font-semibold tracking-tighter mb-6 transition-colors duration-300"
  style={{ color: darkMode ? '#ffffff' : '#52525b' }} 
>
  KESHAV<br />
  WAGHUL<span className="text-violet-600 dark:text-violet-400">E</span>
</h1>

            <div className="text-4xl md:text-5xl text-violet-600 dark:text-violet-400 mb-10 tracking-tight transition-colors duration-300">
              BSc Computer Science Student
            </div>

            <p 
  className="text-xl max-w-lg leading-relaxed mb-10 transition-colors duration-300"
  style={{ color: darkMode ? '#a1a1aa' : '#52525b' }}
>
  Building efficient web solutions with passion for backend development and growing frontend expertise.
</p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToSection('projects')}
                className="px-10 py-4 rounded-full border border-zinc-900 dark:border-white hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 transition-all flex items-center gap-3 group"
              >
                EXPLORE PROJECTS 
                <div className="group-hover:-rotate-45 transition">↗</div>
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-10 py-4 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:bg-black dark:hover:bg-zinc-100 transition"
              >
                GET IN TOUCH
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-xs tracking-[3px] text-zinc-500">
           
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="h-8 w-px bg-gradient-to-b from-transparent via-zinc-400 to-transparent" />
        </div>

        <div className="absolute bottom-0 right-8 hidden xl:block">
          <img src="/images/hero.jpg" alt="Keshav" className="h-[580px] object-cover rounded-tl-[120px] -mb-16" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-5xl mx-auto px-6 pt-24 pb-28 border-b border-zinc-200 dark:border-zinc-800">
        <div className="grid md:grid-cols-12 gap-x-6">
          <div className="md:col-span-5">
            <div className="sticky top-24">
              <div className="uppercase tracking-[4px] text-sm mb-4 text-zinc-500">CHAPTER 01</div>
              <h2 className="text-7xl font-semibold tracking-tighter leading-none">About Me</h2>
            </div>
          </div>
          
          <div className="md:col-span-7 mt-14 md:mt-0 text-[17px] leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-[39ch]">
            I am currently a Third Year BSc Computer Science student at Nowrosjee Wadia College, Pune. 
            My core focus has been backend development using PHP, Python, MySQL, and Java. 
            I am also actively growing my frontend skills with HTML, CSS, JavaScript and React.
            
            <div className="h-px w-16 bg-zinc-300 dark:bg-zinc-700 my-9" />
            
            Passionate about building efficient, user-centric web solutions. 
            I enjoy creating delightful digital experiences and have hands-on experience building full stack applications, 
            interactive games and AI tools.
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="max-w-5xl mx-auto px-6 py-24 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="uppercase tracking-[4px] text-xs mb-4 text-violet-600 dark:text-violet-400">EXPERTISE</div>
          <h2 className="text-6xl font-semibold tracking-[-2.4px]">Technical Skills</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="p-10 border border-zinc-200 dark:border-zinc-800 rounded-3xl">
            <div className="uppercase text-xs tracking-[3px] mb-8 text-zinc-500">LANGUAGES &amp; FRAMEWORKS</div>
            <ul className="space-y-4 text-2xl font-light tracking-tight">
              {["PHP", "Python", "Java", "JavaScript", "React", "C / C++"].map((s, i) => (
                <li key={i} className="flex items-center gap-4 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white group-hover:scale-150 transition" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-10 border border-zinc-200 dark:border-zinc-800 rounded-3xl">
            <div className="uppercase text-xs tracking-[3px] mb-8 text-zinc-500">WEB • DATABASES • TOOLS</div>
            <div className="grid grid-cols-2 gap-y-4 text-lg">
              {[
                "HTML5", "CSS3", "AJAX", "JSON",
                "MySQL", "MariaDB", "Git", "VS Code",
                "WSL", "Three.js", "APIs", "Supabase"
              ].map((skill, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="text-violet-500">↗</div> {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS (ADDED ID="projects" HERE) */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-24 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-end gap-4 mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">Selected Works</h2>
          <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1 mb-2"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              key={project.id} 
              className="block transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <ProjectCard 
                id={index} 
                title={project.title} 
                description={project.description} 
                techStack={project.techStack} 
                image={project.image} 
              />
            </a>
          ))}
        </div>
      </section>

      {/* CONTACT MANAGER DEMO */}
      <section id="demo" className="bg-zinc-900 text-white py-24 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-5/12">
              <div className="uppercase tracking-[4px] text-xs text-violet-400 mb-4">REACT MINI PROJECT</div>
              <h3 className="text-white text-[62px] leading-none tracking-tight mb-8">Dynamic Contact Cards</h3>
              
              <p className="text-xl text-zinc-400 pr-4">Add new contacts. Watch them instantly appear as beautiful animated cards. Built with React, TypeScript and Framer Motion.</p>
              
              <div className="mt-12 text-xs uppercase tracking-widest text-zinc-500">HOW TO USE</div>
              <div className="mt-4 space-y-2 text-sm text-zinc-400">
                <div>1. Fill the form below</div>
                <div>2. Click ADD CONTACT</div>
                <div>3. Watch the magic</div>
              </div>
            </div>

            <div className="lg:w-7/12">
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-10">
                <form onSubmit={addContact} className="space-y-6">
                  <div>
                    <label className="text-xs tracking-[1px] text-zinc-500 block mb-2">FULL NAME</label>
                    <input 
                      type="text" 
                      value={newContact.name}
                      onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                      placeholder="last middle first" 
                      className="w-full bg-transparent border-b border-zinc-700 pb-4 text-3xl placeholder:text-zinc-700 focus:outline-none" 
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs tracking-[1px] text-zinc-500 block mb-2">EMAIL ADDRESS</label>
                      <input 
                        type="email" 
                        value={newContact.email}
                        onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                        placeholder="@gmail.com" 
                        className="w-full bg-transparent border-b border-zinc-700 pb-4 text-xl placeholder:text-zinc-700 focus:outline-none" 
                      />
                    </div>
                    <div>
                      <label className="text-xs tracking-[1px] text-zinc-500 block mb-2">PHONE NUMBER</label>
                      <input 
                        type="tel" 
                        value={newContact.phone}
                        onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                        placeholder="+91" 
                        className="w-full bg-transparent border-b border-zinc-700 pb-4 text-xl placeholder:text-zinc-700 focus:outline-none" 
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={!newContact.name || !newContact.email || !newContact.phone}
                    className="mt-4 w-full py-4 rounded-full bg-white text-black font-medium disabled:bg-zinc-800 disabled:text-zinc-500 hover:bg-zinc-200 transition flex items-center justify-center gap-3"
                  >
                    ADD TO DIRECTORY
                  </button>
                </form>
              </div>

              <div className="mt-9 text-xs uppercase text-zinc-500 tracking-[1px]">LIVE CONTACT CARDS</div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AnimatePresence>
                  {contacts.length > 0 ? (
                    contacts.map((contact) => (
                      <ContactCard 
                        key={contact.id} 
                        id={contact.id} 
                        name={contact.name} 
                        email={contact.email} 
                        phone={contact.phone} 
                        onDelete={deleteContact} 
                      />
                    ))
                  ) : (
                    <div className="col-span-2 py-16 border border-dashed border-zinc-800 rounded-3xl flex flex-col items-center justify-center text-center">
                      <div className="text-6xl mb-4 opacity-40">👋</div>
                      <div className="text-xl text-zinc-400">No contacts yet.<br />Add some above.</div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="max-w-4xl mx-auto px-6 py-24 border-b border-zinc-200 dark:border-zinc-800">
        <div className="text-center mb-16">
          <div className="uppercase text-xs tracking-[4px] mb-4 text-zinc-500">CHAPTER 05</div>
          <h2 className="text-6xl tracking-tight">Education</h2>
        </div>

        <div className="border-l-2 border-zinc-200 dark:border-zinc-800 pl-12 max-w-md mx-auto relative">
          <div className="-left-[9px] absolute w-4 h-4 rounded-full border-[5px] border-zinc-950 dark:border-white bg-white dark:bg-zinc-950" />
          
          <div className="-mt-2">
            <div className="uppercase text-xs tracking-widest text-zinc-500">NOWROSJEE WADIA COLLEGE, PUNE</div>
            <div className="mt-2 font-medium text-4xl tracking-tighter leading-none">B.Sc Computer Science</div>
            
            <div className="mt-4 text-zinc-500">Third Year • Expected Graduation: 2026</div>
            
            <div className="mt-8 text-sm text-balance leading-relaxed text-zinc-600 dark:text-zinc-400">
              Completed coursework in Data Structures &amp; Algorithms, Database Management, Web Technologies, and Software Engineering.
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-3xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <div className="text-sm tracking-[4px] text-violet-600 mb-4">GET IN TOUCH</div>
          <h2 className="text-7xl font-semibold tracking-tight">Contact Me</h2>
          <p className="mt-4 max-w-xs mx-auto text-xl text-zinc-500">I am always open for new opportunities and interesting conversations.</p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block uppercase tracking-widest text-xs text-zinc-500 mb-4">YOUR NAME</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="w-full border-b border-zinc-300 dark:border-zinc-700 bg-transparent py-4 text-4xl placeholder:text-zinc-300 focus:outline-none" 
                placeholder="Name" 
              />
            </div>
            <div>
              <label className="block uppercase tracking-widest text-xs text-zinc-500 mb-4">EMAIL ADDRESS</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="w-full border-b border-zinc-300 dark:border-zinc-700 bg-transparent py-4 text-4xl placeholder:text-zinc-300 focus:outline-none" 
                placeholder="you@domain.com" 
              />
            </div>
          </div>
          
          <div>
            <label className="block uppercase tracking-widest text-xs text-zinc-500 mb-4">YOUR MESSAGE</label>
            <textarea 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
              rows={6}
              className="w-full border-b border-zinc-300 dark:border-zinc-700 bg-transparent py-4 text-2xl resize-y min-h-[120px] placeholder:text-zinc-300 focus:outline-none" 
              placeholder="Please drop a message here, to help me improve this portfolio and my skills. I read every single message and it motivates me a lot!"
            />
          </div>

          <button 
            type="submit" 
            className="mt-4 w-full py-[22px] bg-zinc-950 hover:bg-black text-white rounded-full text-sm tracking-[1px] flex items-center justify-center disabled:bg-zinc-800"
            disabled={!formData.name || !formData.email || !formData.message}
          >
            SEND MESSAGE →
          </button>
        </form>

        <AnimatePresence>
          {formSubmitted && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-sm px-9 py-3.5 rounded-full flex items-center gap-3 shadow-xl"
            >
              ✓ MESSAGE SAVED IN LOCALSTORAGE. ADMIN CAN VIEW IT
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center mt-20 text-xs tracking-widest text-zinc-500">NOTE: DATA IS SAVED IN BROWSER LOCALSTORAGE ONLY FOR DEMONSTRATION</div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-16 text-sm">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-y-16">
          <div>
            <div className="font-mono text-xs mb-6">© {new Date().getFullYear()} KESHAV VASANT WAGHULE</div>
            
            <div className="flex flex-col gap-y-2 text-xs">
              <a href="https://www.linkedin.com/in/keshav-waghule-b961b82b6" target="_blank" className="hover:text-zinc-900 dark:hover:text-white transition">LINKEDIN</a>
              <a href="https://github.com/Keshhaavvvv" target="_blank" className="hover:text-zinc-900 dark:hover:text-white transition">GITHUB</a>
              <a href="mailto:keshavwaghule@gmail.com" className="hover:text-zinc-900 dark:hover:text-white transition">keshavwaghule@gmail.com</a>
            </div>
          </div>
          
          <div className="text-right text-xs max-w-xs md:text-left text-zinc-500">
            Crafted with React 19, TypeScript, Tailwind 4, Framer Motion &amp; LocalStorage.<br />Made to fulfill capstone requirements.
          </div>
        </div>
      </footer>

      {/* ADMIN MODAL */}
      <AnimatePresence>
        {isAdminModalOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70" onClick={() => setIsAdminModalOpen(false)}>
            <motion.div 
              className="bg-white dark:bg-zinc-900 w-full max-w-lg mx-4 rounded-3xl overflow-hidden"
              initial={{ scale: 0.88, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="px-10 py-9">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <div className="font-semibold text-3xl">Admin Portal</div>
                    <div className="text-sm text-zinc-500">Response Retrieval Center</div>
                  </div>
                  <button onClick={() => setIsAdminModalOpen(false)}><X /></button>
                </div>

                {!isLoggedIn ? (
                  <div>
                    <div className="mb-8">
                      <div className="text-sm text-zinc-500 mb-2">ENTER PASSWORD TO ACCESS STORED CONTACT RESPONSES</div>
                      <input 
                        type="password" 
                        value={adminPassword} 
                        onChange={(e) => setAdminPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                        placeholder="••••••••••" 
                        className="w-full py-4 border-b text-4xl placeholder:text-zinc-300 bg-transparent focus:outline-none dark:text-white" 
                      />
                    </div>
                    
                    {loginError && <div className="text-red-500 text-xs mb-6 tracking-wide">{loginError}</div>}
                    
                    <button 
                      onClick={handleAdminLogin}
                      className="w-full py-4 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-black font-medium hover:bg-black"
                    >
                      UNLOCK RESPONSES
                    </button>
                    
                    <div className="text-center text-[10px] mt-8 text-zinc-500"></div>
                  </div>
                ) : (
                  <div className="-mx-2">
                    <div className="flex justify-between mb-7 px-2 items-center">
                      <div className="text-sm text-zinc-500">RECEIVED MESSAGES ({responses.length})</div>
                      <button onClick={handleAdminLogout} className="text-xs text-red-500 flex items-center gap-1">LOGOUT <LogOut className="w-3 h-3" /></button>
                    </div>
                    
                    <div className="max-h-[480px] overflow-y-auto pr-1 space-y-4 custom-scroll">
                      {responses.length > 0 ? (
                        responses.map((resp) => (
                          <ResponseCard 
                            key={resp.id} 
                            id={resp.id} 
                            name={resp.name} 
                            email={resp.email} 
                            message={resp.message} 
                            timestamp={resp.timestamp} 
                            onDelete={deleteResponse} 
                          />
                        ))
                      ) : (
                        <div className="py-16 text-center">
                          <div className="mx-auto w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-6">
                            ✉️
                          </div>
                          <div className="text-xl text-zinc-400">No messages yet</div>
                          <div className="text-sm mt-1.5 text-zinc-500">Submit the contact form to see live data</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;