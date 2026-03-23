import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  ArrowRight, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Instagram, 
  Linkedin, 
  Facebook,
  ChevronRight,
  CheckCircle2,
  HardHat,
  Trees,
  Phone,
  Mail,
  Award,
  ShieldCheck,
  Zap,
  Quote,
  Loader2,
  Check
} from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  location: string;
  description: string;
}

// --- Components ---

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative">
          <Building2 className="w-24 h-24 text-gold animate-pulse" />
          <motion.div 
            className="absolute -inset-4 border-2 border-gold/20 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl font-serif font-bold tracking-[0.2em] text-white"
          >
            VÉRTICE
          </motion.h1>
        </div>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1, duration: 1.5 }}
          className="h-[1px] bg-gold/50"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.5 }}
          className="text-[10px] font-display uppercase tracking-[0.5em] text-white"
        >
          Engenharia de Valor
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/5511999999999"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-50 bg-[#25D366] p-4 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ rotate: 10 }}
  >
    <svg 
      viewBox="0 0 24 24" 
      width="32" 
      height="32" 
      fill="white"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  </motion.a>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Projetos', path: '/projetos' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Contato', path: '/contato' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'py-3 glass shadow-2xl' : 'py-6 bg-transparent'}`}>
      <div className="max-w-[1440px] mx-auto px-12 flex items-center">
        {/* Logo Area - flex-1 to push menu to center */}
        <div className="flex-1">
          <Link 
            to="/"
            className="flex items-center gap-3 group cursor-pointer w-fit"
          >
            <div className="relative">
              <Building2 className="w-8 h-8 text-gold transition-transform duration-500 group-hover:rotate-12" />
              <div className="absolute -inset-1 bg-gold/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-2xl md:text-3xl font-serif font-bold tracking-[0.2em] leading-tight text-white">VÉRTICE</span>
              <span className="text-[7px] font-display uppercase tracking-[0.6em] text-gold/90 -mt-1">Imobiliária & Construção</span>
            </div>
          </Link>
        </div>

        {/* Desktop Menu - Centered */}
        <div className="hidden lg:flex items-center gap-10 flex-shrink-0">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[10px] font-display uppercase tracking-[0.4em] transition-all duration-500 relative group ${location.pathname === link.path ? 'text-gold' : 'text-white/70 hover:text-white'}`}
            >
              {link.name}
              <span className={`absolute -bottom-2 left-0 h-[1px] bg-gold transition-all duration-500 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
          ))}
        </div>
        
        {/* Action Area - flex-1 to balance the layout */}
        <div className="hidden lg:flex flex-1 justify-end items-center gap-8">
          <div className="h-6 w-[1px] bg-white/10" />

          <button className="px-6 py-2.5 bg-gradient-to-r from-gold to-[#C5A028] text-white text-[10px] font-display font-bold uppercase tracking-[0.3em] transition-all duration-700 shadow-[0_10px_30px_-10px_rgba(197,160,40,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(197,160,40,0.7)] cursor-pointer border border-gold/30 hover:border-white rounded-sm active:scale-95 relative overflow-hidden group/btn">
            <span className="relative z-10">Consultoria VIP</span>
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700 ease-in-out" />
            <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex-1 flex justify-end">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 glass rounded-full text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full glass-dark overflow-hidden lg:hidden"
          >
            <div className="flex flex-col items-center py-16 gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-display uppercase tracking-[0.4em] transition-colors ${location.pathname === link.path ? 'text-gold' : 'text-white hover:text-gold'}`}
                >
                  {link.name}
                </Link>
              ))}
              <button className="px-12 py-5 bg-gradient-to-r from-gold to-[#C5A028] text-white text-[10px] font-display font-bold uppercase tracking-[0.3em] shadow-2xl shadow-gold/30 border border-gold/50 rounded-sm">
                Falar com Especialista
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2070",
      title: "Legado em Cada Estrutura",
      subtitle: "Projetamos espaços que transcendem o tempo, unindo engenharia de precisão e estética atemporal."
    },
    {
      image: "https://images.unsplash.com/photo-1600585154526-990dcea4d4d9?auto=format&fit=crop&q=80&w=2070",
      title: "Arquitetura de Sensações",
      subtitle: "Onde o luxo encontra a funcionalidade para criar experiências de moradia inigualáveis."
    },
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070",
      title: "Engenharia de Valor",
      subtitle: "Inovação tecnológica e gestão eficiente para empreendimentos que definem novos horizontes."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden scroll-mt-40">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full flex flex-col justify-center items-center text-center px-6 text-white pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-6xl"
        >
          <motion.h1
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 leading-[0.85] tracking-tighter"
          >
            {slides[currentSlide].title}
          </motion.h1>
          
          <motion.p
            key={`sub-${currentSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-sm md:text-xl font-light max-w-3xl mx-auto mb-10 leading-relaxed opacity-70"
          >
            {slides[currentSlide].subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ delay: 0.8, duration: 1.5 }}
            className="flex items-center gap-6 mb-12 justify-center"
          >
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold/30" />
            <span className="text-gold font-display uppercase text-[10px] md:text-[11px] tracking-[0.6em] whitespace-nowrap">
              Referência em Engenharia e Design de Alto Padrão
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gold/30" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-8 justify-center"
          >
            <button className="px-16 py-6 bg-gold text-white font-display uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-all duration-500 shadow-2xl shadow-gold/20 cursor-pointer">
              Explorar Portfólio
            </button>
            <button className="px-16 py-6 border border-white/20 text-white font-display uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-all duration-500 cursor-pointer">
              Agendar Reunião
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      whileHover={{ y: -15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative overflow-hidden aspect-[3/4] rounded-sm cursor-pointer shadow-2xl"
    >
      <img 
        src={project.image} 
        alt={project.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
      
      <div className="absolute inset-0 p-10 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
        <motion.span className="text-gold text-[10px] font-display uppercase tracking-[0.3em] mb-3 block">
          {project.category}
        </motion.span>
        <h3 className="text-white text-3xl font-serif mb-3 leading-tight">{project.title}</h3>
        <p className="text-white/60 text-xs font-light mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 line-clamp-2">
          {project.description}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-white/40 text-[10px] font-display uppercase tracking-widest flex items-center gap-2">
            <MapPin size={12} className="text-gold" /> {project.location}
          </p>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-500">
            <ArrowRight size={14} className="text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Stats = () => {
  const stats = [
    { label: "Anos de História", value: "28", suffix: "+" },
    { label: "Área Construída (m²)", value: "850", suffix: "k" },
    { label: "Projetos em Execução", value: "14", suffix: "" },
    { label: "NPS de Satisfação", value: "98", suffix: "%" }
  ];

  return (
    <section className="py-40 bg-black text-white relative overflow-hidden border-y border-white/5">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold via-transparent to-transparent" />
      <div className="max-w-[1440px] mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-20 relative z-10">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.8 }}
            className="text-center group"
          >
            <div className="text-6xl md:text-8xl font-serif mb-6 flex justify-center items-baseline tracking-tighter group-hover:text-gold transition-colors duration-500">
              {stat.value}<span className="text-2xl md:text-3xl ml-1 opacity-30">{stat.suffix}</span>
            </div>
            <div className="text-[10px] font-display uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity duration-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={sectionRef} id="sobre" className="py-60 px-8 relative overflow-hidden scroll-mt-32">
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-40 items-center">
        <div className="relative group">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative z-10 aspect-[4/5] overflow-hidden rounded-sm shadow-2xl"
          >
            <motion.img 
              style={{ y, scale: 1.2 }}
              src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=1000" 
              alt="Arquitetura Vértice"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-125"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute -left-12 top-0 w-[1px] bg-gold/30 -z-10" 
          />
          
          <div className="absolute -bottom-12 -right-12 p-12 glass rounded-sm hidden md:block animate-float">
            <Award className="text-gold w-12 h-12 mb-6" />
            <div className="text-[10px] font-display uppercase tracking-widest mb-2 opacity-50">Prêmio Nacional de</div>
            <div className="text-2xl font-serif">Excelência 2025</div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-12"
        >
          <div>
            <span className="text-gold font-display uppercase tracking-[0.5em] text-[11px] mb-8 block">Nossa Essência</span>
            <h2 className="text-5xl md:text-7xl font-serif mb-12 leading-[0.9] tracking-tighter">Onde a Engenharia Encontra a Arte</h2>
            <p className="text-xl font-light opacity-70 leading-relaxed text-justify">
              Na Vértice, não apenas construímos edifícios; moldamos o cenário urbano com uma visão que prioriza a harmonia entre o concreto e a vida. Nossa abordagem de <span className="text-gold font-medium italic">Lean Construction</span> garante eficiência máxima, enquanto nossa curadoria arquitetônica assegura que cada projeto seja uma obra de arte única.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-12">
            {[
              { icon: <ShieldCheck className="text-gold w-8 h-8" />, title: "Segurança Jurídica", desc: "Transparência total em cada contrato e etapa do desenvolvimento." },
              { icon: <Zap className="text-gold w-8 h-8" />, title: "Alta Performance", desc: "Tecnologia de ponta para obras rápidas, precisas e sustentáveis." }
            ].map((item, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex items-center gap-4">
                  {item.icon}
                  <h4 className="font-serif text-2xl">{item.title}</h4>
                </div>
                <p className="text-base font-light opacity-50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <button className="flex items-center gap-8 group font-display uppercase tracking-[0.4em] text-[11px] hover:text-gold transition-all cursor-pointer pt-8">
            Descubra nossa metodologia 
            <motion.div
              animate={{ x: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowRight className="text-gold" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Building2 className="w-14 h-14" />,
      title: "Incorporação de Luxo",
      desc: "Identificamos oportunidades únicas para criar empreendimentos que definem o novo padrão de sofisticação urbana e valorização imobiliária."
    },
    {
      icon: <HardHat className="w-14 h-14" />,
      title: "Gestão de Obras",
      desc: "Engenharia de alta precisão com foco em sustentabilidade, redução de resíduos e cumprimento rigoroso de cronogramas e orçamentos."
    },
    {
      icon: <Trees className="w-14 h-14" />,
      title: "Arquitetura Bioclimática",
      desc: "Projetos inteligentes que integram o meio ambiente ao espaço construído, maximizando o conforto térmico e a eficiência energética."
    }
  ];

  return (
    <section id="servicos" className="py-60 bg-neutral-100 dark:bg-[#050505] px-8 relative scroll-mt-32">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-12">
          <div className="max-w-2xl">
            <span className="text-gold font-display uppercase tracking-[0.5em] text-[11px] mb-8 block">Expertise</span>
            <h2 className="text-5xl md:text-7xl font-serif tracking-tighter leading-[0.9]">Nossas Verticais de Atuação</h2>
          </div>
          <p className="text-xl font-light opacity-50 max-w-md leading-relaxed">
            Soluções completas que abrangem desde a concepção até a entrega das chaves, com foco em excelência técnica.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-1px bg-white/5 border border-white/5">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="p-20 bg-black hover:bg-neutral-900 transition-all duration-700 group relative overflow-hidden"
            >
              <div className="text-gold mb-12 transform transition-transform group-hover:scale-110 duration-700">{service.icon}</div>
              <h3 className="text-4xl font-serif mb-8 leading-tight">{service.title}</h3>
              <p className="font-light opacity-50 leading-relaxed text-lg">{service.desc}</p>
              
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold transition-all duration-700 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "Residencial Aurora",
      category: "High-End Living",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
      location: "Jardins, São Paulo",
      description: "Um marco da arquitetura contemporânea com jardins suspensos e automação total."
    },
    {
      id: 2,
      title: "Vértice Corporate",
      category: "Business Center",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000",
      location: "Faria Lima, São Paulo",
      description: "Lajes corporativas triple A com certificação LEED Platinum de sustentabilidade."
    },
    {
      id: 3,
      title: "Lakeside Villas",
      category: "Exclusive Resort",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1000",
      location: "Lago Sul, Brasília",
      description: "Mansões integradas à natureza com vista panorâmica e design minimalista."
    },
    {
      id: 4,
      title: "Eco Tower",
      category: "Sustainable Hub",
      image: "https://images.unsplash.com/photo-1545333253-c725f0378b5c?auto=format&fit=crop&q=80&w=1000",
      location: "Curitiba, PR",
      description: "O primeiro edifício do sul do país com energia 100% renovável e reuso de água."
    },
    {
      id: 5,
      title: "Skyline Loft",
      category: "Urban Luxury",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
      location: "Belo Horizonte, MG",
      description: "Lofts industriais de luxo com pé-direito duplo e acabamentos em mármore italiano."
    },
    {
      id: 6,
      title: "Ocean View",
      category: "Beachfront",
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1000",
      location: "Balneário Camboriú, SC",
      description: "A joia do litoral catarinense, com heliponto privativo e serviços de concierge 24h."
    },
    {
      id: 7,
      title: "Heritage Palace",
      category: "Restoration",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000",
      location: "Rio de Janeiro, RJ",
      description: "Restauração de patrimônio histórico transformado em residências ultra-exclusivas."
    },
    {
      id: 8,
      title: "Innovation Park",
      category: "Industrial",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1000",
      location: "Campinas, SP",
      description: "Complexo logístico e industrial inteligente com foco em indústria 4.0."
    }
  ];

  return (
    <section id="projetos" className="py-60 px-8 scroll-mt-32">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-12">
          <div className="max-w-3xl">
            <span className="text-gold font-display uppercase tracking-[0.5em] text-[11px] mb-8 block">Portfólio de Elite</span>
            <h2 className="text-5xl md:text-8xl font-serif tracking-tighter leading-[0.85]">Obras que Redefinem o Horizonte</h2>
          </div>
          <button className="px-16 py-6 border border-gold text-gold font-display uppercase tracking-[0.3em] text-[10px] hover:bg-gold hover:text-white transition-all duration-500 cursor-pointer">
            Ver Catálogo Completo
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project, idx) => (
            <div 
              key={project.id}
              className={`${idx === 0 || idx === 4 ? 'lg:col-span-2 lg:row-span-1' : ''}`}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-60 bg-neutral-100 dark:bg-[#050505] px-8 relative overflow-hidden border-y border-white/5">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <Quote className="w-20 h-20 text-gold/10 mx-auto mb-20" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif italic mb-20 leading-[1.1] tracking-tight">
            "A Vértice superou todas as nossas expectativas. A precisão técnica aliada ao bom gosto arquitetônico resultou em um empreendimento que valorizou <span className="text-gold">40% acima da média</span> do mercado em apenas 18 meses."
          </h2>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-8 border border-gold/30 p-2 relative">
              <div className="absolute inset-0 border border-gold rounded-full animate-spin-slow opacity-30" />
              <img 
                src="https://i.pravatar.cc/150?u=1" 
                alt="Cliente" 
                loading="lazy"
                className="w-full h-full rounded-full object-cover" 
              />
            </div>
            <div className="text-2xl font-serif mb-2">Dr. Ricardo Almeida</div>
            <div className="text-[11px] font-display uppercase tracking-[0.4em] text-gold">CEO - Almeida Capital</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulação de envio
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 5000);
    }, 2000);
  };

  return (
    <section id="contato" className="py-60 px-8 relative scroll-mt-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-40 relative z-10">
        <div className="space-y-20">
          <div>
            <span className="text-gold font-display uppercase tracking-[0.5em] text-[11px] mb-8 block">Inicie seu Legado</span>
            <h2 className="text-5xl md:text-8xl font-serif mb-12 tracking-tighter leading-[0.85]">Vamos Projetar o Incomum?</h2>
            <p className="text-xl font-light opacity-50 leading-relaxed max-w-xl">
              Nossa equipe de especialistas está à disposição para consultorias personalizadas sobre novos projetos, investimentos e parcerias estratégicas.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div className="flex items-start gap-8 group">
                <div className="w-16 h-16 rounded-full glass flex items-center justify-center text-gold shrink-0 group-hover:bg-gold group-hover:text-black transition-all duration-500">
                  <MapPin size={28} />
                </div>
                <div>
                  <div className="text-[10px] font-display uppercase tracking-widest opacity-30 mb-3">Sede Administrativa</div>
                  <div className="text-xl font-serif leading-relaxed">Av. Cabo Branco, 2000<br />João Pessoa - PB</div>
                </div>
              </div>
              <div className="flex items-start gap-8 group">
                <div className="w-16 h-16 rounded-full glass flex items-center justify-center text-gold shrink-0 group-hover:bg-gold group-hover:text-black transition-all duration-500">
                  <Phone size={28} />
                </div>
                <div>
                  <div className="text-[10px] font-display uppercase tracking-widest opacity-30 mb-3">Linha Direta</div>
                  <div className="text-xl font-serif leading-relaxed">+55 (83) 4003-0000</div>
                </div>
              </div>
            </div>
            <div className="space-y-12">
              <div className="flex items-start gap-8 group">
                <div className="w-16 h-16 rounded-full glass flex items-center justify-center text-gold shrink-0 group-hover:bg-gold group-hover:text-black transition-all duration-500">
                  <Mail size={28} />
                </div>
                <div>
                  <div className="text-[10px] font-display uppercase tracking-widest opacity-30 mb-3">E-mail Corporativo</div>
                  <div className="text-xl font-serif leading-relaxed">vip@vertice.com.br</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass p-12 md:p-24 rounded-sm relative border border-white/5"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Building2 size={200} />
          </div>
          <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <label className="text-[10px] font-display uppercase tracking-widest opacity-40">Nome Completo</label>
                <input required type="text" className="w-full bg-transparent border-b border-white/10 py-4 focus:border-gold outline-none transition-all text-xl font-serif placeholder:opacity-20" placeholder="Ex: Arthur Vértice" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-display uppercase tracking-widest opacity-40">E-mail Profissional</label>
                <input required type="email" className="w-full bg-transparent border-b border-white/10 py-4 focus:border-gold outline-none transition-all text-xl font-serif placeholder:opacity-20" placeholder="seu@email.com" />
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-display uppercase tracking-widest opacity-40">Interesse Principal</label>
              <select className="w-full bg-transparent border-b border-white/10 py-4 focus:border-gold outline-none transition-all text-xl font-serif appearance-none cursor-pointer">
                <option className="bg-[#050505]">Incorporação Residencial</option>
                <option className="bg-[#050505]">Projetos Corporativos</option>
                <option className="bg-[#050505]">Investimento Imobiliário</option>
                <option className="bg-[#050505]">Construção Industrial</option>
              </select>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-display uppercase tracking-widest opacity-40">Sua Mensagem</label>
              <textarea required rows={4} className="w-full bg-transparent border-b border-white/10 py-4 focus:border-gold outline-none transition-all text-xl font-serif resize-none placeholder:opacity-20" placeholder="Como podemos ajudar?" />
            </div>
            <button 
              disabled={status !== 'idle'}
              className={`w-full py-8 flex items-center justify-center gap-4 font-display uppercase tracking-[0.4em] text-[11px] transition-all duration-700 shadow-2xl cursor-pointer ${
                status === 'success' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gold text-white hover:bg-white hover:text-black shadow-gold/20'
              } disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {status === 'idle' && "Solicitar Consultoria"}
              {status === 'submitting' && (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processando...
                </>
              )}
              {status === 'success' && (
                <>
                  <Check className="w-5 h-5" />
                  Solicitação Enviada
                </>
              )}
            </button>
            <AnimatePresence>
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-[11px] font-display uppercase tracking-[0.3em] text-emerald-500"
                >
                  Entraremos em contato em até 24 horas.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white pt-40 pb-20 px-8 border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gold/5 to-transparent pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-24 mb-40 relative z-10">
        <div className="lg:col-span-2 space-y-12">
          <div className="flex items-center gap-6">
            <Building2 className="w-16 h-16 text-gold" />
            <div className="flex flex-col">
              <span className="text-5xl font-serif font-bold tracking-[0.2em] leading-tight text-white">VÉRTICE</span>
              <span className="text-[10px] font-display uppercase tracking-[0.6em] text-gold/90 -mt-1">Engenharia de Valor</span>
            </div>
          </div>
          <p className="text-white/40 max-w-md leading-relaxed text-lg font-light">
            Desde 1998, a Vértice redefine o horizonte brasileiro através de projetos que equilibram inovação tecnológica, sustentabilidade e estética superior. Somos o ponto de encontro entre o sonho e a estrutura.
          </p>
          <div className="flex gap-8">
            {[Instagram, Linkedin, Facebook].map((Icon, idx) => (
              <a key={idx} href="#" className="w-14 h-14 rounded-full glass flex items-center justify-center hover:text-gold hover:border-gold transition-all duration-700 group">
                <Icon size={24} className="group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-serif text-3xl mb-12">Navegação</h4>
          <ul className="space-y-6 text-white/40 text-[11px] font-display uppercase tracking-[0.4em]">
            <li><Link to="/" className="hover:text-gold transition-colors block">Início</Link></li>
            <li><Link to="/projetos" className="hover:text-gold transition-colors block">Projetos</Link></li>
            <li><Link to="/sobre" className="hover:text-gold transition-colors block">Sobre</Link></li>
            <li><Link to="/servicos" className="hover:text-gold transition-colors block">Serviços</Link></li>
            <li><Link to="/contato" className="hover:text-gold transition-colors block">Contato</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-3xl mb-12">Newsletter VIP</h4>
          <p className="text-[11px] font-display uppercase tracking-[0.3em] text-white/40 mb-10 leading-relaxed">
            Assine para receber insights exclusivos sobre o mercado imobiliário de luxo.
          </p>
          <div className="flex flex-col gap-6">
            <input type="email" placeholder="E-mail profissional" className="bg-white/5 border border-white/10 px-8 py-5 text-sm outline-none focus:border-gold transition-all font-serif" />
            <button className="bg-gold py-5 text-[11px] font-display uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-700">Inscrever-se</button>
          </div>
        </div>
      </div>
      
      <div className="max-w-[1440px] mx-auto pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
        <div className="text-[11px] font-display uppercase tracking-[0.3em] opacity-30">
          © 2026 Vértice Imobiliária & Construções. Todos os direitos reservados.
        </div>
        
        <button 
          onClick={scrollToTop}
          className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-700 group cursor-pointer"
        >
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ArrowRight className="-rotate-90" size={24} />
          </motion.div>
        </button>

        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="text-[11px] font-display uppercase tracking-[0.3em] text-gold/60">
            Desenvolvido por <span className="text-white font-bold opacity-100">GEDEON KASHOMONA</span>
          </div>
          <div className="flex gap-10 text-[10px] font-display uppercase tracking-[0.4em] opacity-30">
            <a href="#privacidade" className="hover:opacity-100 transition-opacity">Privacidade</a>
            <a href="#termos" className="hover:opacity-100 transition-opacity">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Pages ---

const HomePage = () => (
  <main>
    <Hero />
    <section className="py-48 px-8 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold/5 blur-[150px] rounded-full -z-10" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >
        <Quote className="w-12 h-12 text-gold/30 mx-auto mb-10" />
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif italic mb-12 leading-tight tracking-tighter">
          "A arquitetura é a vontade de uma época traduzida em espaço, onde cada traço conta uma história de inovação."
        </h2>
        <div className="flex items-center justify-center gap-6">
          <div className="h-[1px] w-12 bg-gold/30" />
          <span className="text-[10px] font-display uppercase tracking-[0.5em] text-gold">Mies van der Rohe</span>
          <div className="h-[1px] w-12 bg-gold/30" />
        </div>
      </motion.div>
    </section>
    <Stats />
    <section className="relative h-[80vh] parallax flex items-center justify-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2070)' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
      <div className="relative text-center text-white px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-8xl font-serif mb-10 tracking-tighter leading-none">Qualidade que Atravessa Gerações</h2>
          <p className="text-sm md:text-lg font-display tracking-[0.4em] uppercase opacity-70 mb-12">Compromisso com o Legado Brasileiro</p>
          <button className="px-12 py-5 bg-gold text-white text-[10px] font-display uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 cursor-pointer">
            Conheça Nossos Valores
          </button>
        </motion.div>
      </div>
    </section>
  </main>
);

const ProjectsPage = () => (
  <main className="pt-32">
    <Projects />
  </main>
);

const AboutPage = () => (
  <main className="pt-32">
    <About />
  </main>
);

const ServicesPage = () => (
  <main className="pt-32">
    <Services />
  </main>
);

const ContactPage = () => (
  <main className="pt-32">
    <Contact />
  </main>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Main App ---

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen transition-colors duration-700 dark bg-dark-bg text-white">
        <AnimatePresence>
          {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Navbar />
            
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projetos" element={<ProjectsPage />} />
              <Route path="/sobre" element={<AboutPage />} />
              <Route path="/servicos" element={<ServicesPage />} />
              <Route path="/contato" element={<ContactPage />} />
            </Routes>

            <Footer />
            <WhatsAppButton />
          </motion.div>
        )}
      </div>
    </BrowserRouter>
  );
}
