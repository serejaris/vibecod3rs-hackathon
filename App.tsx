
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Terminal, Globe, Zap, Cpu, MapPin, Menu, X, Calendar, Play, ChevronLeft, ChevronRight, Code, Gift, Award, Users } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ArtistCard from './components/ArtistCard'; // Treating as TrackCard
import AIChat from './components/AIChat';
import { HackathonTrack } from './types';

// Hackathon Data
const TRACKS: HackathonTrack[] = [
  { 
    id: '1', 
    title: 'Игры', 
    category: 'GameDev', 
    tag: 'Fun', 
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1000&auto=format&fit=crop',
    description: 'Создавай игры, в которые хочется залипнуть. От текстовых новелл и кликеров до полноценных браузерных шутеров. Главное — вайб и геймплей.'
  },
  { 
    id: '2', 
    title: 'Telegram Боты', 
    category: 'Automation', 
    tag: 'Bot', 
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1000&auto=format&fit=crop',
    description: 'Разрабатывай полезных или фановых ботов для Telegram. Интеграции, мини-аппы (TWA), сервисы или AI-ассистенты внутри мессенджера.'
  },
  { 
    id: '3', 
    title: 'Веб-сайты', 
    category: 'Frontend', 
    tag: 'Web', 
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000&auto=format&fit=crop',
    description: 'Креативный веб, лендинги, генеративный UI или полезные сервисы. Покажи, на что способен современный фронтенд.'
  },
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<HackathonTrack | null>(null);
  
  // Google Doc Link Placeholder - User to replace if specific URL provided, otherwise generic or telegram
  const GOOGLE_DOC_URL = "https://docs.google.com/forms/"; 

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedTrack) return;
      if (e.key === 'ArrowLeft') navigateTrack('prev');
      if (e.key === 'ArrowRight') navigateTrack('next');
      if (e.key === 'Escape') setSelectedTrack(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedTrack]);

  const handleRegister = () => {
    window.open(GOOGLE_DOC_URL, '_blank');
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navigateTrack = (direction: 'next' | 'prev') => {
    if (!selectedTrack) return;
    const currentIndex = TRACKS.findIndex(a => a.id === selectedTrack.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % TRACKS.length;
    } else {
      nextIndex = (currentIndex - 1 + TRACKS.length) % TRACKS.length;
    }
    setSelectedTrack(TRACKS[nextIndex]);
  };
  
  return (
    <div className="relative min-h-screen text-white selection:bg-[#4fb7b3] selection:text-black cursor-auto md:cursor-none overflow-x-hidden font-sans">
      <CustomCursor />
      <FluidBackground />
      <AIChat />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-8 py-6 mix-blend-difference">
        <div className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white cursor-default z-50 flex items-center gap-2">
          <Terminal className="w-6 h-6" />
          VIBECOD3RS
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest uppercase">
          {[
            { id: 'tracks', label: 'Треки' },
            { id: 'vibe', label: 'Вайб' },
            { id: 'prizes', label: 'Призы' }
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => scrollToSection(item.id)}
              className="hover:text-[#a8fbd3] transition-colors text-white cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item.label}
            </button>
          ))}
        </div>
        <button 
          onClick={() => window.open('https://t.me/vibecod3rs', '_blank')}
          className="hidden md:inline-block border border-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 text-white cursor-pointer bg-transparent"
          data-hover="true"
        >
          Telegram
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#31326f]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {[
              { id: 'tracks', label: 'Треки' },
              { id: 'vibe', label: 'Вайб' },
              { id: 'prizes', label: 'Призы' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-4xl font-heading font-bold text-white hover:text-[#a8fbd3] transition-colors uppercase bg-transparent border-none"
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => window.open('https://t.me/vibecod3rs', '_blank')}
              className="mt-8 border border-white px-10 py-4 text-sm font-bold tracking-widest uppercase bg-white text-black"
            >
              Telegram
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4">
        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl pb-24 md:pb-20"
        >
           {/* Date / Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 md:gap-6 text-xs md:text-base font-mono text-[#a8fbd3] tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <span>Онлайн</span>
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#4fb7b3] rounded-full animate-pulse"/>
            <span>30 Ноября</span>
          </motion.div>

          {/* Main Title */}
          <div className="relative w-full flex justify-center items-center flex-col">
            <GradientText 
              text="VIBE" 
              as="h1" 
              className="text-[15vw] md:text-[14vw] leading-[0.8] font-black tracking-tighter text-center" 
            />
             <GradientText 
              text="CODING" 
              as="h1" 
              className="text-[15vw] md:text-[14vw] leading-[0.8] font-black tracking-tighter text-center" 
            />
            {/* Optimized Orb */}
            <motion.div 
               className="absolute -z-20 w-[50vw] h-[50vw] bg-[#4fb7b3]/10 blur-[60px] rounded-full pointer-events-none will-change-transform"
               animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
               transition={{ duration: 6, repeat: Infinity }}
               style={{ transform: 'translateZ(0)' }}
            />
          </div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mt-4 md:mt-8 mb-6 md:mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-base md:text-2xl font-light max-w-xl mx-auto text-white/90 leading-relaxed drop-shadow-lg px-4 font-mono"
          >
            &lt; Хакатон эпохи AI /&gt;
          </motion.p>
        </motion.div>

        {/* MARQUEE */}
        <div className="absolute bottom-12 md:bottom-16 left-0 w-full py-4 md:py-6 bg-white text-black z-20 overflow-hidden border-y-4 border-black shadow-[0_0_40px_rgba(255,255,255,0.4)]">
          <motion.div 
            className="flex w-fit will-change-transform"
            animate={{ x: "-50%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {/* Duplicate content for seamless loop */}
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-3xl md:text-7xl font-heading font-black px-8 flex items-center gap-4">
                    VIBE CODING <span className="text-black text-2xl md:text-4xl">●</span> 
                    GAMES & BOTS <span className="text-black text-2xl md:text-4xl">●</span> 
                    PURE FLOW <span className="text-black text-2xl md:text-4xl">●</span>
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* TRACKS SECTION */}
      <section id="tracks" className="relative z-10 py-20 md:py-32">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 px-4">
             <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase leading-[0.9] drop-shadow-lg break-words w-full md:w-auto">
              ТВОЙ <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3]">ПУТЬ</span>
            </h2>
            <p className="text-gray-400 font-mono text-sm md:text-base mt-4 md:mt-0 max-w-md text-right">
              Выбери категорию и покажи скилл.<br/>
              Создавай будущее вместе с vibecod3rs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-white/10 bg-black/20 backdrop-blur-sm">
            {TRACKS.map((track) => (
              <ArtistCard key={track.id} track={track} onClick={() => setSelectedTrack(track)} />
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION (The Vibe) */}
      <section id="vibe" className="relative z-10 py-20 md:py-32 bg-black/20 backdrop-blur-sm border-t border-white/10 overflow-hidden">
        {/* Decorative blurred circle */}
        <div className="absolute top-1/2 right-[-20%] w-[50vw] h-[50vw] bg-[#4fb7b3]/20 rounded-full blur-[40px] pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }} />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <h2 className="text-4xl md:text-7xl font-heading font-bold mb-6 md:mb-8 leading-tight">
                ПОЙМАЙ <br/> <GradientText text="ПОТОК" className="text-5xl md:text-8xl" />
              </h2>
              <p className="text-lg md:text-xl text-gray-200 mb-8 md:mb-12 font-light leading-relaxed drop-shadow-md">
                Это не просто хакатон, это коллективный поток. Мы используем AI, чтобы кодить со скоростью мысли. Никаких ограничений, только творчество.
              </p>
              
              <div className="space-y-6 md:space-y-8">
                {[
                  { icon: Users, title: 'Сообщество', desc: 'Вливайся в тусовку vibecod3rs.' },
                  { icon: Cpu, title: 'AI Ускорение', desc: 'LLM разрешены и приветствуются.' },
                  { icon: Zap, title: 'Энергия', desc: 'Лоу-фай биты, стримы и чистый вайб.' },
                ].map((feature, i) => (
                  <div
                    key={i} 
                    className="flex items-start gap-6"
                  >
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/5">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2 font-heading">{feature.title}</h4>
                      <p className="text-sm text-gray-300">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 relative h-[400px] md:h-[700px] w-full order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-br from-[#637ab9] to-[#4fb7b3] rounded-3xl rotate-3 opacity-30 blur-xl" />
              <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop" 
                  alt="Coding Setup" 
                  className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 will-change-transform" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                  <div className="text-5xl md:text-8xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/0 opacity-50">
                    30.11
                  </div>
                  <div className="text-lg md:text-xl font-bold tracking-widest uppercase mt-2 text-white">
                    Старт
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRIZES / REGISTRATION SECTION */}
      <section id="prizes" className="relative z-10 py-20 md:py-32 px-4 md:px-6 bg-black/30 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
             <h2 className="text-5xl md:text-9xl font-heading font-bold opacity-20 text-white">
               ПРИЗЫ
             </h2>
             <p className="text-[#a8fbd3] font-mono uppercase tracking-widest -mt-3 md:-mt-8 relative z-10 text-sm md:text-base">
               Регистрация в Google Doc форме
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                title: 'Участник', 
                prize: 'Бесплатно', 
                desc: 'Участие в хакатоне бесплатное для всех.', 
                icon: Code,
                color: 'white', 
                accent: 'bg-white/5' 
              },
              { 
                title: 'Финалист', 
                prize: 'Скидка', 
                desc: 'Скидка на курс по вайб-кодингу всем, кто дойдет до финала.', 
                icon: Gift,
                color: 'teal', 
                accent: 'bg-[#4fb7b3]/10 border-[#4fb7b3]/50' 
              },
              { 
                title: 'Победитель', 
                prize: 'Курс', 
                desc: 'Первое место получает полное обучение на курсе бесплатно.', 
                icon: Award,
                color: 'periwinkle', 
                accent: 'bg-[#637ab9]/10 border-[#637ab9]/50' 
              },
            ].map((tier, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -20 }}
                  className={`relative p-8 md:p-10 border border-white/10 backdrop-blur-md flex flex-col min-h-[400px] transition-colors duration-300 ${tier.accent} will-change-transform`}
                  data-hover="true"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <tier.icon className={`w-6 h-6 ${tier.color === 'teal' ? 'text-[#4fb7b3]' : tier.color === 'periwinkle' ? 'text-[#637ab9]' : 'text-white'}`} />
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-white">{tier.title}</h3>
                    </div>
                    <div className={`text-4xl md:text-5xl font-bold mb-8 md:mb-10 tracking-tighter ${tier.color === 'white' ? 'text-white' : tier.color === 'teal' ? 'text-[#4fb7b3]' : 'text-[#637ab9]'}`}>
                      {tier.prize}
                    </div>
                    <p className="text-lg text-gray-200 leading-relaxed">
                      {tier.desc}
                    </p>
                  </div>
                  
                  {/* Only the last button initiates registration flow, but visually they all encourage action */}
                  <div className="w-full h-px bg-white/10 my-6" />
                  <div className="text-xs font-mono text-white/40 uppercase tracking-widest">
                    Vibecod3rs Community
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Main CTA */}
          <div className="mt-16 flex justify-center">
            <button 
              onClick={handleRegister}
              className="group relative px-12 py-6 bg-white text-black font-heading font-bold text-xl uppercase tracking-widest hover:bg-[#a8fbd3] transition-colors duration-300 clip-path-slanted"
              data-hover="true"
            >
              <span className="relative z-10 flex items-center gap-3">
                Зарегистрироваться <Terminal className="w-6 h-6" />
              </span>
            </button>
          </div>

        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-12 md:py-16 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
             <div className="font-heading text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-white">VIBECOD3RS</div>
             <div className="flex gap-2 text-xs font-mono text-gray-400">
               <span>Хакатон сообщества</span>
             </div>
          </div>
          
          <div className="flex gap-6 md:gap-8 flex-wrap">
            <a href="https://t.me/vibecod3rs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
              Telegram
            </a>
          </div>
        </div>
      </footer>

      {/* Track Detail Modal */}
      <AnimatePresence>
        {selectedTrack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTrack(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#1a1b3b] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-[#4fb7b3]/10 group/modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedTrack(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors"
                data-hover="true"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => { e.stopPropagation(); navigateTrack('prev'); }}
                className="absolute left-4 bottom-4 translate-y-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm"
                data-hover="true"
                aria-label="Previous Track"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); navigateTrack('next'); }}
                className="absolute right-4 bottom-4 translate-y-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm md:right-8"
                data-hover="true"
                aria-label="Next Track"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={selectedTrack.id}
                    src={selectedTrack.image} 
                    alt={selectedTrack.title} 
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b3b] via-transparent to-transparent md:bg-gradient-to-r" />
                {/* Matrix overlay for detail view */}
                <div className="absolute inset-0 bg-[url('https://media.istockphoto.com/id/539136778/photo/matrix-code.jpg?s=612x612&w=0&k=20&c=S3gQoK6bF3F6b4y2yv5y7y8y7y8y7y8y7y8y7y8y7y8=')] opacity-20 bg-cover mix-blend-overlay pointer-events-none"></div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 pb-24 md:p-12 flex flex-col justify-center relative">
                <motion.div
                  key={selectedTrack.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="flex items-center gap-3 text-[#4fb7b3] mb-4">
                     <Code className="w-4 h-4" />
                     <span className="font-mono text-sm tracking-widest uppercase">{selectedTrack.tag}</span>
                  </div>
                  
                  <h3 className="text-4xl md:text-6xl font-heading font-bold uppercase leading-none mb-2 text-white">
                    {selectedTrack.title}
                  </h3>
                  
                  <p className="text-lg text-[#a8fbd3] font-medium tracking-widest uppercase mb-6">
                    {selectedTrack.category}
                  </p>
                  
                  <div className="h-px w-20 bg-white/20 mb-6" />
                  
                  <p className="text-gray-300 leading-relaxed text-lg font-light mb-8">
                    {selectedTrack.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
