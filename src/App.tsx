import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  ArrowRight, 
  Menu, 
  X, 
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

interface Metric {
  value: string;
  label: string;
}

interface HeroSlide {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  highlights: Metric[];
}

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  key?: React.Key;
}

interface SectionIntroProps {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
}

interface AmbientOrbProps {
  className: string;
  duration?: number;
  travelX?: number;
  travelY?: number;
  peakScale?: number;
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  metrics: Metric[];
  primaryAction?: {
    label: string;
    to: string;
  };
  secondaryAction?: {
    label: string;
    to: string;
  };
}

const NAV_LINKS = [
  { name: 'Início', path: '/' },
  { name: 'Projetos', path: '/projetos' },
  { name: 'Sobre', path: '/sobre' },
  { name: 'Serviços', path: '/servicos' },
  { name: 'Contato', path: '/contato' },
];

const HOME_STATS: Metric[] = [
  { value: '28+', label: 'anos de história' },
  { value: '850k', label: 'área construída (m²)' },
  { value: '14', label: 'projetos em execução' },
  { value: '98%', label: 'nps de satisfação' },
];

const HERO_SLIDES: HeroSlide[] = [
  {
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2070',
    eyebrow: 'Arquitetura de presença',
    title: 'Legado em Cada Estrutura',
    subtitle:
      'Projetamos espaços que transcendem o tempo, unindo engenharia de precisão, atendimento próximo e estética atemporal.',
    highlights: [
      { value: '28+', label: 'anos de história' },
      { value: '850k', label: 'm² executados' },
      { value: '98%', label: 'aprovação dos clientes' },
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154526-990dcea4d4d9?auto=format&fit=crop&q=80&w=2070',
    eyebrow: 'Experiência imobiliária premium',
    title: 'Arquitetura de Sensações',
    subtitle:
      'Onde o luxo encontra a funcionalidade para criar experiências de moradia inigualáveis e mais valiosas ao longo do tempo.',
    highlights: [
      { value: '32', label: 'lançamentos assessorados' },
      { value: '14', label: 'obras em andamento' },
      { value: '24h', label: 'retorno consultivo' },
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070',
    eyebrow: 'Estratégia, obra e valorização',
    title: 'Engenharia de Valor',
    subtitle:
      'Integramos gestão técnica, visão comercial e acabamento de alto padrão para entregar empreendimentos mais sólidos, elegantes e competitivos.',
    highlights: [
      { value: '40%', label: 'potencial médio de valorização' },
      { value: '100%', label: 'atuação sob medida' },
      { value: '360°', label: 'visão de negócio e execução' },
    ],
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Diagnóstico',
    description: 'Leitura estratégica do terreno, do negócio e do público para alinhar valor percebido, conceito e viabilidade.',
  },
  {
    step: '02',
    title: 'Desenvolvimento',
    description: 'Arquitetura, engenharia e gestão em sintonia para reduzir ruído, elevar qualidade e proteger prazo.',
  },
  {
    step: '03',
    title: 'Entrega',
    description: 'Acompanhamento final com acabamento rigoroso, documentação organizada e uma experiência premium até a conclusão.',
  },
];

const viewportConfig = { once: true, amount: 0.22 } as const;

const Reveal = ({ children, className = '', delay = 0 }: RevealProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportConfig}
      transition={{ duration: shouldReduceMotion ? 0.45 : 0.85, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SectionIntro = ({
  eyebrow,
  title,
  description,
  center = false,
  className = '',
}: SectionIntroProps) => (
  <div className={`${center ? 'mx-auto text-center' : ''} ${className}`}>
    <span className="mb-5 block text-[10px] uppercase tracking-[0.4em] text-gold sm:text-[11px]">
      {eyebrow}
    </span>
    <h2 className="text-4xl leading-[0.9] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
      {title}
    </h2>
    {description && (
      <p className={`mt-6 text-base leading-relaxed text-white/62 sm:text-lg md:text-xl ${center ? 'mx-auto max-w-3xl' : 'max-w-2xl'}`}>
        {description}
      </p>
    )}
  </div>
);

const AmbientOrb = ({
  className,
  duration = 18,
  travelX = 24,
  travelY = -20,
  peakScale = 1.08,
}: AmbientOrbProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-[130px] ${className}`}
      animate={
        shouldReduceMotion
          ? undefined
          : {
              x: [0, travelX, 0],
              y: [0, travelY, 0],
              scale: [1, peakScale, 1],
            }
      }
      transition={
        shouldReduceMotion
          ? undefined
          : { duration, repeat: Infinity, ease: 'easeInOut' }
      }
    />
  );
};

// --- Components ---

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex w-full max-w-sm flex-col items-center gap-6 px-6 text-center"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gold/10 blur-2xl" />
          <Building2 className="relative z-10 h-16 w-16 text-gold sm:h-20 sm:w-20" />
        </div>
        <div>
          <h1 className="text-3xl tracking-[0.25em] text-white sm:text-4xl">VÉRTICE</h1>
          <p className="mt-2 text-[10px] uppercase tracking-[0.45em] text-white/55">
            Imobiliária & Construções
          </p>
        </div>
        <div className="h-px w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-gold/30 via-gold to-gold/30"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/5511999999999"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_35px_-16px_rgba(37,211,102,0.75)] sm:bottom-8 sm:right-8"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.06 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
  >
    <motion.span
      className="absolute inset-0 rounded-full border border-white/25"
      animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0, 0.35] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
    />
    <svg 
      viewBox="0 0 24 24" 
      width="30"
      height="30"
      fill="currentColor"
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || isOpen ? 'py-3 glass shadow-2xl' : 'py-4 sm:py-6'
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center px-4 sm:px-6 lg:px-12">
        <div className="flex-1">
          <Link to="/" className="group inline-flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <Building2 className="h-7 w-7 text-gold transition-transform duration-500 group-hover:-rotate-6 sm:h-8 sm:w-8" />
              <div className="absolute -inset-1 rounded-full bg-gold/15 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl leading-tight tracking-[0.16em] text-white sm:text-2xl md:text-3xl md:tracking-[0.2em]">
                VÉRTICE
              </span>
              <span className="mt-[-2px] text-[6px] uppercase tracking-[0.35em] text-gold/90 sm:text-[7px] sm:tracking-[0.55em]">
                Imobiliária & Construções
              </span>
            </div>
          </Link>
        </div>

        <div className="hidden items-center gap-10 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`group relative text-[10px] uppercase tracking-[0.4em] transition-colors ${
                location.pathname === link.path ? 'text-gold' : 'text-white/70 hover:text-white'
              }`}
            >
              {link.name}
              <span
                className={`absolute -bottom-2 left-0 h-px bg-gold transition-all duration-500 ${
                  location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          ))}
        </div>
        
        <div className="hidden flex-1 justify-end lg:flex">
          <Link
            to="/contato"
            className="group relative overflow-hidden rounded-full border border-gold/40 bg-gradient-to-r from-gold to-[#C5A028] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white transition-all duration-500 hover:shadow-[0_20px_40px_-16px_rgba(197,160,40,0.55)]"
          >
            <span className="relative z-10">Consultoria VIP</span>
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
          </Link>
        </div>

        <div className="flex flex-1 justify-end lg:hidden">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="rounded-full border border-white/10 bg-white/5 p-2.5 text-white backdrop-blur-xl"
            aria-label="Abrir menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="glass-dark mt-3 overflow-hidden lg:hidden"
          >
            <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-7 px-6 py-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs uppercase tracking-[0.3em] transition-colors ${
                    location.pathname === link.path ? 'text-gold' : 'text-white/80 hover:text-gold'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contato"
                className="w-full max-w-xs rounded-full border border-gold/40 bg-gradient-to-r from-gold to-[#C5A028] px-8 py-4 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white"
              >
                Falar com Especialista
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const current = HERO_SLIDES[currentSlide];

  return (
    <section id="inicio" className="relative min-h-[100svh] overflow-hidden">
      <AmbientOrb className="z-[1] left-[-8%] top-[12%] h-56 w-56 bg-gold/18 sm:h-80 sm:w-80" duration={20} travelX={30} travelY={-28} peakScale={1.12} />
      <AmbientOrb className="z-[1] bottom-[12%] right-[-10%] h-64 w-64 bg-white/8 sm:h-96 sm:w-96" duration={24} travelX={-26} travelY={22} peakScale={1.1} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.985 }}
          transition={{ duration: shouldReduceMotion ? 0.55 : 1.1, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${current.image})` }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_35%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-black/85" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-center px-4 pt-32 pb-16 text-white sm:px-6 sm:pt-36 md:px-8 lg:px-12 lg:pt-40">
        <div className="max-w-5xl">
          <Reveal className="mb-6">
            <span className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-gold backdrop-blur-xl">
              {current.eyebrow}
            </span>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={`hero-copy-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <h1 className="max-w-4xl text-4xl leading-[0.86] tracking-tight sm:text-5xl md:text-7xl lg:text-8xl">
                {current.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg md:text-xl">
                {current.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <Reveal className="mt-10 flex flex-col gap-4 sm:flex-row" delay={0.2}>
            <Link
              to="/projetos"
              className="inline-flex w-full items-center justify-center rounded-full bg-gold px-8 py-4 text-[10px] uppercase tracking-[0.3em] text-white shadow-[0_18px_40px_-24px_rgba(212,175,55,0.75)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-white hover:text-black sm:w-auto sm:px-10"
            >
              Explorar Portfólio
            </Link>
            <Link
              to="/contato"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-[10px] uppercase tracking-[0.3em] text-white backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5 hover:border-gold hover:text-gold sm:w-auto sm:px-10"
            >
              Agendar Reunião
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-3 sm:gap-4 lg:max-w-4xl">
            {current.highlights.map((item, index) => (
              <Reveal key={item.label} delay={0.25 + index * 0.08}>
                <div className="glass rounded-[1.5rem] px-5 py-4 transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:bg-white/8">
                  <div className="text-2xl text-white sm:text-3xl">{item.value}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.28em] text-white/55">
                    {item.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between gap-6 lg:mt-16">
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
            transition={shouldReduceMotion ? undefined : { repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
            className="hidden items-center gap-4 sm:flex"
          >
            <span className="h-10 w-px bg-gradient-to-b from-white to-transparent" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-white/45">desça para explorar</span>
          </motion.div>

          <div className="ml-auto hidden items-center gap-4 md:flex">
            {HERO_SLIDES.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className="group flex items-center gap-3"
                aria-label={`Ir para slide ${index + 1}`}
              >
                <span className={`text-[10px] uppercase tracking-[0.35em] transition-colors ${currentSlide === index ? 'text-white' : 'text-white/35 group-hover:text-white/60'}`}>
                  0{index + 1}
                </span>
                <span className="relative h-px w-16 bg-white/15">
                  {currentSlide === index && (
                    <motion.span
                      layoutId="hero-indicator"
                      className="absolute inset-0 bg-gold"
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const PageHero = ({
  eyebrow,
  title,
  description,
  image,
  metrics,
  primaryAction,
  secondaryAction,
}: PageHeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', shouldReduceMotion ? '0%' : '10%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, shouldReduceMotion ? 1 : 1.04]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-b border-white/5 pt-32 pb-16 sm:pt-36 md:pt-40 lg:pt-44 lg:pb-24">
      <AmbientOrb className="left-[-8%] top-10 h-48 w-48 bg-gold/12 sm:h-72 sm:w-72" duration={20} travelX={22} travelY={-18} peakScale={1.1} />
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.20),_transparent_35%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/72 via-black/55 to-[#050505]" />
      </motion.div>

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12">
        <Reveal className="max-w-5xl">
          <div className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-white/45">
            <Link to="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-gold">{eyebrow}</span>
          </div>
          <span className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-gold backdrop-blur-xl">
            {eyebrow}
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl leading-[0.9] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg md:text-xl">
            {description}
          </p>
        </Reveal>

        {(primaryAction || secondaryAction) && (
          <Reveal className="mt-10 flex flex-col gap-4 sm:flex-row" delay={0.1}>
            {primaryAction && (
              <Link
                to={primaryAction.to}
                className="inline-flex w-full items-center justify-center rounded-full bg-gold px-8 py-4 text-[10px] uppercase tracking-[0.3em] text-white shadow-[0_18px_40px_-24px_rgba(212,175,55,0.75)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-white hover:text-black sm:w-auto"
              >
                {primaryAction.label}
              </Link>
            )}
            {secondaryAction && (
              <Link
                to={secondaryAction.to}
                className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-[10px] uppercase tracking-[0.3em] text-white backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5 hover:border-gold hover:text-gold sm:w-auto"
              >
                {secondaryAction.label}
              </Link>
            )}
          </Reveal>
        )}

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {metrics.map((metric, index) => (
            <Reveal key={metric.label} delay={0.15 + index * 0.08}>
              <div className="glass rounded-[1.6rem] px-5 py-5 transition-all duration-500 hover:-translate-y-1 hover:border-gold/25 hover:bg-white/[0.08]">
                <div className="text-2xl text-white sm:text-3xl">{metric.value}</div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.28em] text-white/55">
                  {metric.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, featured = false }: { project: Project; featured?: boolean }) => {
  return (
    <motion.article
      whileHover={{ y: -10 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`group relative overflow-hidden rounded-[1.75rem] border border-white/8 bg-white/4 shadow-[0_24px_70px_-35px_rgba(0,0,0,0.8)] ${
        featured ? 'aspect-[4/5] sm:aspect-[1.2/1] lg:aspect-[1.75/1]' : 'aspect-[4/5]'
      }`}
    >
      <img 
        src={project.image} 
        alt={project.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.16)_50%,transparent_80%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-6 sm:px-8">
        <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-gold backdrop-blur-xl">
          {project.category}
        </span>
        <span className="text-[10px] uppercase tracking-[0.35em] text-white/35">0{project.id}</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 px-6 pb-6 sm:px-8 sm:pb-8">
        <h3 className="max-w-lg text-2xl leading-tight text-white sm:text-3xl">{project.title}</h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/62">
          {project.description}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="flex min-w-0 items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-white/45">
            <MapPin size={12} className="text-gold" /> {project.location}
          </p>
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-black">
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const HomeQuote = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-4 py-20 text-center sm:px-6 md:px-8 lg:px-12 lg:py-28">
      <AmbientOrb className="left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 bg-gold/10 sm:h-[440px] sm:w-[440px]" duration={22} travelX={14} travelY={-16} peakScale={1.1} />
      <Reveal className="relative mx-auto max-w-5xl">
        <motion.div
          animate={shouldReduceMotion ? undefined : { y: [0, -6, 0], rotate: [0, 3, 0] }}
          transition={shouldReduceMotion ? undefined : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Quote className="mx-auto mb-8 h-10 w-10 text-gold/35 sm:h-12 sm:w-12" />
        </motion.div>
        <h2 className="text-2xl italic leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          "A arquitetura é a vontade de uma época traduzida em espaço, onde cada traço conta uma história de inovação."
        </h2>
        <div className="mt-8 flex items-center justify-center gap-4 sm:gap-6">
          <span className="h-px w-12 bg-gold/30" />
          <span className="text-[9px] uppercase tracking-[0.3em] text-gold sm:text-[10px] sm:tracking-[0.5em]">
            Mies van der Rohe
          </span>
          <span className="h-px w-12 bg-gold/30" />
        </div>
      </Reveal>
    </section>
  );
};

const Stats = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-black py-20 sm:py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.08),_transparent_50%)]" />
      <AmbientOrb className="left-[8%] top-[18%] h-44 w-44 bg-gold/10 sm:h-64 sm:w-64" duration={19} travelX={18} travelY={-12} peakScale={1.08} />
      <div className="relative mx-auto grid max-w-[1440px] grid-cols-2 gap-6 px-4 sm:gap-10 sm:px-6 md:grid-cols-4 md:px-8 lg:px-12">
        {HOME_STATS.map((stat, idx) => (
          <Reveal key={stat.label} delay={idx * 0.06}>
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -8, scale: 1.02 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="rounded-[1.5rem] border border-white/6 bg-white/[0.03] px-3 py-5 text-center transition-colors duration-500 hover:border-gold/20 hover:bg-white/[0.05] sm:px-4"
            >
              <div className="text-4xl tracking-tight text-white sm:text-6xl md:text-7xl">
                {stat.value}
              </div>
              <div className="mt-3 text-[10px] uppercase tracking-[0.28em] text-white/45">
                {stat.label}
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [shouldReduceMotion ? '0%' : '-5%', shouldReduceMotion ? '0%' : '5%']);

  return (
    <section ref={sectionRef} id="sobre" className="relative overflow-hidden px-4 py-24 sm:px-6 md:px-8 lg:px-12 lg:py-40">
      <AmbientOrb className="-left-20 top-1/3 h-56 w-56 bg-gold/8 sm:h-80 sm:w-80" duration={21} travelX={16} travelY={-18} peakScale={1.1} />
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 lg:grid-cols-[1fr,0.95fr] lg:gap-24">
        <Reveal>
          <div className="relative">
            <div className="absolute -left-4 top-10 hidden h-[72%] w-px bg-gradient-to-b from-gold/0 via-gold/35 to-gold/0 lg:block" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/8 shadow-[0_28px_80px_-40px_rgba(0,0,0,0.8)]">
              <motion.img 
                style={{ y: imageY, scale: shouldReduceMotion ? 1.03 : 1.06 }}
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=1200" 
                alt="Arquitetura Vértice"
                loading="lazy"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
              className="absolute -bottom-6 right-4 max-w-[220px] sm:right-8 md:-bottom-10"
            >
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, -5, 0] }}
                transition={shouldReduceMotion ? undefined : { duration: 5.4, repeat: Infinity, ease: 'easeInOut' }}
                className="glass rounded-[1.5rem] px-5 py-5"
              >
                <Award className="mb-3 h-8 w-8 text-gold" />
                <div className="text-[10px] uppercase tracking-[0.28em] text-white/45">Reconhecimento</div>
                <div className="mt-1 text-xl text-white sm:text-2xl">Excelência 2025</div>
              </motion.div>
            </motion.div>
          </div>
        </Reveal>
        
        <div className="space-y-8">
          <Reveal>
            <SectionIntro
              eyebrow="Nossa essência"
              title="Onde a Engenharia Encontra a Arte"
              description="Na Vértice, cada projeto nasce do encontro entre racionalidade técnica e leitura sensível do espaço. Isso nos permite criar empreendimentos mais elegantes, funcionais e sustentáveis."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <p className="max-w-2xl text-base leading-relaxed text-white/62 sm:text-lg md:text-xl">
              Nossa abordagem combina <span className="font-medium italic text-gold">lean construction</span>,
              visão de mercado e curadoria arquitetônica para reduzir ruído na operação e elevar a
              percepção de valor do produto final.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                icon: <ShieldCheck className="h-8 w-8 text-gold" />,
                title: 'Segurança Jurídica',
                desc: 'Processos claros, contratos transparentes e acompanhamento técnico em cada etapa da entrega.',
              },
              {
                icon: <Zap className="h-8 w-8 text-gold" />,
                title: 'Alta Performance',
                desc: 'Decisões mais precisas, cronogramas mais fortes e soluções que preservam qualidade e margem.',
              },
            ].map((item, idx) => (
              <Reveal key={item.title} delay={0.12 + idx * 0.08}>
                <div className="glass rounded-[1.5rem] px-6 py-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/20 hover:bg-white/[0.07]">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-xl text-white sm:text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/58 sm:text-base">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.28}>
            <Link
              to="/contato"
              className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-white/75 transition-colors hover:text-gold"
            >
              Descubra nossa metodologia
              <ArrowRight className="h-4 w-4 text-gold" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="servicos" className="relative overflow-hidden bg-neutral-100 px-4 py-24 dark:bg-[#050505] sm:px-6 md:px-8 lg:px-12 lg:py-40">
      <AmbientOrb className="right-[-8%] top-12 h-52 w-52 bg-gold/10 sm:h-80 sm:w-80" duration={20} travelX={-18} travelY={18} peakScale={1.1} />
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <SectionIntro
            eyebrow="Expertise"
            title="Nossas Verticais de Atuação"
            description="Soluções completas que conectam produto, execução e valorização do ativo com o mesmo rigor estético e técnico."
            className="max-w-4xl"
          />
        </Reveal>
        
        <div className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-white/5 bg-white/6 md:grid-cols-3">
          {[
            {
              icon: <Building2 className="h-12 w-12 sm:h-14 sm:w-14" />,
              title: 'Incorporação de Luxo',
              desc: 'Mapeamos oportunidades e conduzimos empreendimentos com estratégia comercial, sofisticação arquitetônica e visão de longo prazo.',
            },
            {
              icon: <HardHat className="h-12 w-12 sm:h-14 sm:w-14" />,
              title: 'Gestão de Obras',
              desc: 'Planejamento técnico, controle de cronograma e leitura de risco para conduzir obras com mais previsibilidade e acabamento superior.',
            },
            {
              icon: <Trees className="h-12 w-12 sm:h-14 sm:w-14" />,
              title: 'Arquitetura Bioclimática',
              desc: 'Projetos que elevam a experiência do espaço com inteligência ambiental, conforto térmico e eficiência energética.',
            },
          ].map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.8, delay: idx * 0.08, ease: 'easeOut' }}
              whileHover={shouldReduceMotion ? undefined : { y: -10 }}
              className="group relative overflow-hidden bg-black px-7 py-9 sm:px-10 sm:py-12 lg:px-12 lg:py-14"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.14),_transparent_40%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-between">
                  <div className="text-gold">{service.icon}</div>
                  <span className="text-[10px] uppercase tracking-[0.35em] text-white/25">0{idx + 1}</span>
                </div>
                <h3 className="text-3xl leading-tight text-white sm:text-4xl">{service.title}</h3>
                <p className="mt-5 text-base leading-relaxed text-white/58 sm:text-lg">{service.desc}</p>
              </div>
              
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold transition-all duration-700 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projetos" className="relative overflow-hidden px-4 py-24 sm:px-6 md:px-8 lg:px-12 lg:py-40">
      <AmbientOrb className="left-[-10%] top-20 h-56 w-56 bg-gold/9 sm:h-80 sm:w-80" duration={23} travelX={28} travelY={-18} peakScale={1.12} />
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionIntro
              eyebrow="Portfólio de elite"
              title="Obras que Redefinem o Horizonte"
              description="Uma seleção de empreendimentos pensados para unir impacto visual, funcionalidade real e valorização consistente."
              className="max-w-3xl"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              to="/contato"
              className="inline-flex w-full items-center justify-center rounded-full border border-gold/50 px-8 py-4 text-[10px] uppercase tracking-[0.3em] text-gold transition-all duration-500 hover:-translate-y-0.5 hover:bg-gold hover:text-black sm:w-auto"
            >
              Ver Catálogo Completo
            </Link>
          </Reveal>
        </div>
        
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {[
            {
              id: 1,
              title: 'Residencial Aurora',
              category: 'High-End Living',
              image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
              location: 'Jardins, São Paulo',
              description: 'Um marco contemporâneo com jardins suspensos, automação total e experiência residencial de alto padrão.',
            },
            {
              id: 2,
              title: 'Vértice Corporate',
              category: 'Business Center',
              image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
              location: 'Faria Lima, São Paulo',
              description: 'Lajes corporativas triple A com linguagem arquitetônica refinada e certificação LEED Platinum.',
            },
            {
              id: 3,
              title: 'Lakeside Villas',
              category: 'Exclusive Resort',
              image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200',
              location: 'Lago Sul, Brasília',
              description: 'Residências integradas à natureza com vista panorâmica, paisagismo autoral e design minimalista.',
            },
            {
              id: 4,
              title: 'Eco Tower',
              category: 'Sustainable Hub',
              image: 'https://images.unsplash.com/photo-1545333253-c725f0378b5c?auto=format&fit=crop&q=80&w=1200',
              location: 'Curitiba, PR',
              description: 'Empreendimento com energia renovável, reuso de água e soluções de operação sustentável de ponta a ponta.',
            },
            {
              id: 5,
              title: 'Skyline Loft',
              category: 'Urban Luxury',
              image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
              location: 'Belo Horizonte, MG',
              description: 'Lofts industriais de luxo com pé-direito duplo, interiores marcantes e assinatura material sofisticada.',
            },
            {
              id: 6,
              title: 'Ocean View',
              category: 'Beachfront',
              image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1200',
              location: 'Balneário Camboriú, SC',
              description: 'Projeto frente-mar com heliponto privativo, serviços exclusivos e experiência hoteleira permanente.',
            },
            {
              id: 7,
              title: 'Heritage Palace',
              category: 'Restoration',
              image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1200',
              location: 'Rio de Janeiro, RJ',
              description: 'Restauro de patrimônio histórico com atualização estrutural e transformação em residências raras.',
            },
            {
              id: 8,
              title: 'Innovation Park',
              category: 'Industrial',
              image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200',
              location: 'Campinas, SP',
              description: 'Complexo logístico e industrial com infraestrutura inteligente, eficiência operacional e escala de crescimento.',
            },
          ].map((project, idx) => (
            <Reveal key={project.id} delay={idx * 0.04}>
              <ProjectCard project={project} featured={idx === 0 || idx === 4} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessStrip = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-black px-4 py-20 sm:px-6 md:px-8 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.08),_transparent_55%)]" />
      <AmbientOrb className="right-[8%] top-1/2 h-44 w-44 -translate-y-1/2 bg-gold/10 sm:h-64 sm:w-64" duration={18} travelX={-16} travelY={14} peakScale={1.08} />
      <div className="relative mx-auto max-w-[1440px]">
        <Reveal>
          <SectionIntro
            eyebrow="Fluxo de trabalho"
            title="Um processo elegante também precisa ser preciso"
            description="Do primeiro estudo à entrega final, organizamos a jornada para reduzir atrito, melhorar comunicação e reforçar percepção de valor."
            center
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PROCESS_STEPS.map((step, index) => (
            <Reveal key={step.step} delay={index * 0.08}>
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { y: -8 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="glass rounded-[1.75rem] px-6 py-7 transition-colors duration-500 hover:border-gold/20 hover:bg-white/[0.07]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-gold">{step.step}</span>
                  <CheckCircle2 className="h-5 w-5 text-gold/70" />
                </div>
                <h3 className="text-2xl text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/58 sm:text-base">{step.description}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const ImmersiveShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [shouldReduceMotion ? '0%' : '4%', shouldReduceMotion ? '0%' : '-4%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, shouldReduceMotion ? 1.02 : 1.08]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-4 py-24 sm:px-6 md:px-8 lg:px-12 lg:py-40">
      <AmbientOrb className="right-[-8%] top-16 h-56 w-56 bg-white/7 sm:h-80 sm:w-80" duration={26} travelX={-24} travelY={20} peakScale={1.1} />
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[0.92fr,1.08fr] lg:gap-20">
        <div className="space-y-8">
          <Reveal>
            <SectionIntro
              eyebrow="Experiência de marca"
              title="Presença digital com o mesmo nível de sofisticação do produto"
              description="A mesma linguagem premium do empreendimento precisa aparecer na apresentação, na narrativa e na confiança transmitida em cada detalhe."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { value: '360°', label: 'visão do negócio e da obra' },
                { value: '24h', label: 'agilidade no primeiro retorno' },
                { value: 'Alto padrão', label: 'acabamento visual e comercial' },
                { value: 'Rigor técnico', label: 'estrutura e tomada de decisão' },
              ].map((item) => (
                <div key={item.label} className="glass rounded-[1.35rem] px-5 py-5">
                  <div className="text-xl text-white sm:text-2xl">{item.value}</div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.28em] text-white/50">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/8">
            <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=1600)',
                }}
              />
            </motion.div>
            <div className="relative aspect-[4/5] sm:aspect-[16/12]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/30 to-transparent" />
              <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-gold backdrop-blur-xl">
                Curadoria premium
              </div>

              <div className="absolute inset-x-0 bottom-0 px-6 pb-6 sm:px-8 sm:pb-8">
                <div className="max-w-md">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/45">Vértice Signature</div>
                  <h3 className="mt-2 text-3xl leading-tight text-white sm:text-4xl">
                    Comunicação, obra e posicionamento em uma mesma direção
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
                    Mais do que um site bonito, a apresentação precisa transmitir confiança, critério e maturidade de marca em todos os pontos de contato.
                  </p>
                </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  'Narrativa mais forte',
                  'Imagem mais consistente',
                  'Experiência mais memorável',
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.2rem] border border-white/10 bg-white/6 px-4 py-3 text-[10px] uppercase tracking-[0.26em] text-white/72 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-gold/25 hover:bg-white/10"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-neutral-100 px-4 py-24 dark:bg-[#050505] sm:px-6 md:px-8 lg:px-12 lg:py-40">
      <AmbientOrb className="right-0 top-0 h-[320px] w-[320px] translate-x-1/2 -translate-y-1/2 bg-gold/8 sm:h-[420px] sm:w-[420px]" duration={21} travelX={-14} travelY={18} peakScale={1.1} />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="text-center">
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [0, -6, 0], rotate: [0, -4, 0] }}
            transition={shouldReduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Quote className="mx-auto mb-8 h-14 w-14 text-gold/15 md:h-20 md:w-20" />
          </motion.div>
          <h2 className="text-2xl italic leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            "A Vértice superou todas as nossas expectativas. A precisão técnica aliada ao bom gosto arquitetônico resultou em um empreendimento que valorizou <span className="text-gold">40% acima da média</span> do mercado em apenas 18 meses."
          </h2>
        </Reveal>

        <Reveal className="mt-10 flex flex-col items-center" delay={0.1}>
          <div className="relative mb-6 h-24 w-24 overflow-hidden rounded-full border border-gold/30 p-2">
            <motion.div
              animate={shouldReduceMotion ? undefined : { rotate: 360 }}
              transition={shouldReduceMotion ? undefined : { duration: 16, ease: 'linear', repeat: Infinity }}
              className="absolute inset-0 rounded-full border border-gold/25"
            />
            <img 
              src="https://i.pravatar.cc/160?u=vertice" 
              alt="Cliente" 
              loading="lazy"
              className="h-full w-full rounded-full object-cover" 
            />
          </div>
          <div className="text-xl text-white sm:text-2xl">Dr. Ricardo Almeida</div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-gold sm:text-[11px]">CEO - Almeida Capital</div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: <ShieldCheck className="h-8 w-8 text-gold" />,
              title: 'Governança de ponta a ponta',
              desc: 'Processos transparentes, documentação organizada e leitura técnica durante toda a jornada.',
            },
            {
              icon: <Zap className="h-8 w-8 text-gold" />,
              title: 'Execução com mais ritmo',
              desc: 'Planejamento que reduz ruído, alinha equipes e mantém o projeto avançando com consistência.',
            },
            {
              icon: <CheckCircle2 className="h-8 w-8 text-gold" />,
              title: 'Entrega com percepção premium',
              desc: 'Detalhe visual, conforto e acabamento coerentes com o valor da marca e do ativo.',
            },
          ].map((item, index) => (
            <Reveal key={item.title} delay={0.18 + index * 0.08}>
              <div className="glass rounded-[1.5rem] px-6 py-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/20 hover:bg-white/[0.07]">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl text-white sm:text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/58 sm:text-base">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 4200);
    }, 1400);
  };

  return (
    <section id="contato" className="relative overflow-hidden px-4 py-24 sm:px-6 md:px-8 lg:px-12 lg:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.09),_transparent_35%)]" />
      <AmbientOrb className="left-[-10%] bottom-0 h-56 w-56 bg-gold/10 sm:h-80 sm:w-80" duration={20} travelX={18} travelY={-18} peakScale={1.1} />
      
      <div className="relative mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[0.92fr,1.08fr] lg:gap-20">
        <div className="space-y-10">
          <Reveal>
            <SectionIntro
              eyebrow="Contato consultivo"
              title="Vamos projetar uma presença mais forte para o seu negócio"
              description="Nossa equipe está pronta para entender o momento do projeto, o posicionamento da marca e o tipo de experiência que você deseja transmitir."
            />
          </Reveal>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: <MapPin size={26} />,
                title: 'Sede Administrativa',
                detail: 'Av. Cabo Branco, 2000\nJoão Pessoa - PB',
              },
              {
                icon: <Phone size={26} />,
                title: 'Linha Direta',
                detail: '+55 (83) 4003-0000',
              },
              {
                icon: <Mail size={26} />,
                title: 'E-mail Corporativo',
                detail: 'vip@vertice.com.br',
              },
              {
                icon: <CheckCircle2 size={26} />,
                title: 'Prazo de retorno',
                detail: 'Até 24 horas úteis',
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={0.08 + index * 0.06}>
                <motion.div
                  whileHover={shouldReduceMotion ? undefined : { y: -8 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="glass rounded-[1.5rem] px-6 py-6 transition-colors duration-500 hover:border-gold/20 hover:bg-white/[0.07]"
                >
                  <div className="mb-4 text-gold">{item.icon}</div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-white/45">{item.title}</div>
                  <div className="mt-3 whitespace-pre-line break-words text-lg leading-relaxed text-white sm:text-xl">
                    {item.detail}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="glass relative overflow-hidden rounded-[2rem] border border-white/8 px-6 py-7 sm:px-8 sm:py-10 md:px-12"
          >
            <div className="absolute right-0 top-0 h-36 w-36 translate-x-1/3 -translate-y-1/3 rounded-full bg-gold/12 blur-3xl" />
            <div className="relative z-10 mb-8">
              <div className="text-[10px] uppercase tracking-[0.32em] text-gold">Solicitação estratégica</div>
              <h3 className="mt-3 text-3xl text-white sm:text-4xl">Conte um pouco sobre o projeto</h3>
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.28em] text-white/40">Nome Completo</label>
                  <input required type="text" className="w-full border-b border-white/10 bg-transparent py-4 text-lg text-white outline-none transition-colors placeholder:text-white/20 focus:border-gold sm:text-xl" placeholder="Ex: Arthur Vértice" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.28em] text-white/40">E-mail Profissional</label>
                  <input required type="email" className="w-full border-b border-white/10 bg-transparent py-4 text-lg text-white outline-none transition-colors placeholder:text-white/20 focus:border-gold sm:text-xl" placeholder="seu@email.com" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.28em] text-white/40">Interesse Principal</label>
                <select className="w-full appearance-none border-b border-white/10 bg-transparent py-4 text-lg text-white outline-none transition-colors focus:border-gold sm:text-xl">
                  <option className="bg-[#050505]">Incorporação Residencial</option>
                  <option className="bg-[#050505]">Projetos Corporativos</option>
                  <option className="bg-[#050505]">Investimento Imobiliário</option>
                  <option className="bg-[#050505]">Construção Industrial</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.28em] text-white/40">Sua Mensagem</label>
                <textarea required rows={4} className="w-full resize-none border-b border-white/10 bg-transparent py-4 text-lg text-white outline-none transition-colors placeholder:text-white/20 focus:border-gold sm:text-xl" placeholder="Como podemos ajudar?" />
              </div>
              <button 
                disabled={status !== 'idle'}
                className={`w-full rounded-full py-5 text-[10px] uppercase tracking-[0.3em] transition-all duration-500 ${
                  status === 'success'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gold text-white shadow-[0_18px_40px_-24px_rgba(212,175,55,0.75)] hover:-translate-y-0.5 hover:bg-white hover:text-black'
                } disabled:cursor-not-allowed disabled:opacity-75`}
              >
                {status === 'idle' && 'Solicitar Consultoria'}
                {status === 'submitting' && (
                  <span className="inline-flex items-center gap-3">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processando...
                  </span>
                )}
                {status === 'success' && (
                  <span className="inline-flex items-center gap-3">
                    <Check className="h-4 w-4" />
                    Solicitação Enviada
                  </span>
                )}
              </button>
              <AnimatePresence>
                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="text-center text-[10px] uppercase tracking-[0.28em] text-emerald-400"
                  >
                    Entraremos em contato em até 24 horas.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
};

const Footer = () => {
  const shouldReduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#030303] px-4 pb-10 pt-20 text-white sm:px-6 sm:pb-14 sm:pt-24 md:px-8 lg:px-12 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.1),_transparent_32%)]" />
      <AmbientOrb className="bottom-0 right-0 h-[300px] w-[300px] translate-x-1/3 translate-y-1/3 bg-gold/10 sm:h-[380px] sm:w-[380px]" duration={24} travelX={-18} travelY={-16} peakScale={1.08} />

      <div className="relative mx-auto max-w-[1440px]">
        <Reveal>
          <div className="glass mb-14 rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10 lg:mb-20 lg:flex lg:items-end lg:justify-between lg:gap-10 lg:px-12">
            <div className="max-w-3xl">
              <div className="text-[10px] uppercase tracking-[0.34em] text-gold">Direção estratégica</div>
              <h2 className="mt-4 text-3xl leading-[0.95] text-white sm:text-4xl md:text-5xl">
                Um site premium precisa sustentar confiança, desejo e percepção de valor em cada detalhe.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/62 sm:text-base">
                A Vértice integra imagem, posicionamento e execução para apresentar empreendimentos com mais clareza, força comercial e sofisticação.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0">
              <Link
                to="/contato"
                className="inline-flex w-full items-center justify-center rounded-full bg-gold px-7 py-4 text-[10px] uppercase tracking-[0.3em] text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-white hover:text-black sm:w-auto"
              >
                Solicitar proposta
              </Link>
              <Link
                to="/projetos"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-4 text-[10px] uppercase tracking-[0.3em] text-white transition-all duration-500 hover:-translate-y-0.5 hover:border-gold hover:text-gold sm:w-auto"
              >
                Ver portfólio
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1.15fr,0.8fr,0.9fr,0.95fr] lg:gap-16">
          <Reveal>
            <div>
              <Link to="/" className="group inline-flex items-center gap-4">
                <div className="relative">
                  <Building2 className="h-11 w-11 text-gold transition-transform duration-500 group-hover:-rotate-6 sm:h-12 sm:w-12" />
                  <div className="absolute -inset-2 rounded-full bg-gold/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <div>
                  <div className="text-[1.65rem] tracking-[0.14em] text-white sm:text-4xl sm:tracking-[0.18em]">VÉRTICE</div>
                  <div className="mt-1 text-[8px] uppercase tracking-[0.3em] text-gold/85 sm:text-[9px] sm:tracking-[0.42em]">
                    Imobiliária & Construções
                  </div>
                </div>
              </Link>

              <p className="mt-6 max-w-md text-sm leading-relaxed text-white/56 sm:text-base">
                Presença institucional, linguagem arquitetônica e experiência digital alinhadas para valorizar a marca e transmitir maturidade ao mercado.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { value: '28+', label: 'anos de mercado' },
                  { value: '24h', label: 'retorno inicial' },
                  { value: '360°', label: 'visão consultiva' },
                ].map((item) => (
                  <div key={item.label} className="rounded-[1.2rem] border border-white/8 bg-white/4 px-4 py-4 transition-all duration-500 hover:-translate-y-1 hover:border-gold/25 hover:bg-white/[0.08]">
                    <div className="text-xl text-white">{item.value}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/42">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div>
              <h3 className="text-2xl text-white sm:text-3xl">Navegação</h3>
              <div className="mt-6 flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-white/45 transition-colors hover:text-gold"
                  >
                    <span className="h-px w-6 bg-white/14 transition-colors group-hover:bg-gold" />
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div>
              <h3 className="text-2xl text-white sm:text-3xl">Contato</h3>
              <div className="mt-6 space-y-5">
                <a href="tel:+558340030000" className="flex items-start gap-4 rounded-[1.2rem] border border-white/8 bg-white/4 px-4 py-4 transition-colors hover:border-gold/40">
                  <Phone className="mt-1 h-5 w-5 text-gold" />
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.26em] text-white/38">Linha direta</div>
                    <div className="mt-2 text-base text-white sm:text-lg">+55 (83) 4003-0000</div>
                  </div>
                </a>
                <a href="mailto:vip@vertice.com.br" className="flex items-start gap-4 rounded-[1.2rem] border border-white/8 bg-white/4 px-4 py-4 transition-colors hover:border-gold/40">
                  <Mail className="mt-1 h-5 w-5 text-gold" />
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.26em] text-white/38">E-mail corporativo</div>
                    <div className="mt-2 break-all text-base text-white sm:text-lg">vip@vertice.com.br</div>
                  </div>
                </a>
                <div className="flex items-start gap-4 rounded-[1.2rem] border border-white/8 bg-white/4 px-4 py-4">
                  <MapPin className="mt-1 h-5 w-5 text-gold" />
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.26em] text-white/38">Base estratégica</div>
                    <div className="mt-2 text-base leading-relaxed text-white sm:text-lg">Av. Cabo Branco, 2000<br />João Pessoa - PB</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="rounded-[1.75rem] border border-white/8 bg-white/[0.04] px-5 py-6 sm:px-6 sm:py-7">
              <div className="text-[10px] uppercase tracking-[0.32em] text-gold">Atendimento premium</div>
              <h3 className="mt-3 text-2xl leading-tight text-white sm:text-3xl">
                Cada ponto de contato deve reforçar a credibilidade da marca.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/58">
                Do primeiro acesso à tomada de decisão, buscamos uma experiência mais fluida, humana e segura para o cliente.
              </p>

              <div className="mt-6 space-y-3 text-[10px] uppercase tracking-[0.28em] text-white/44">
                <div className="flex items-center justify-between rounded-full border border-white/8 px-4 py-3">
                  <span>Resposta consultiva</span>
                  <span className="text-gold">até 24h</span>
                </div>
                <div className="flex items-center justify-between rounded-full border border-white/8 px-4 py-3">
                  <span>Briefing guiado</span>
                  <span className="text-gold">sob medida</span>
                </div>
              </div>

              <Link
                to="/contato"
                className="mt-6 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-white/72 transition-colors hover:text-gold"
              >
                Iniciar conversa
                <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col items-center gap-6 border-t border-white/5 pt-8 text-center sm:mt-16 sm:flex-row sm:justify-between sm:text-left">
          <div className="text-[10px] uppercase tracking-[0.24em] text-white/32 sm:tracking-[0.28em]">
            © 2026 Vértice Imobiliária & Construções. Todos os direitos reservados.
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="text-[10px] uppercase tracking-[0.18em] text-gold/65 sm:tracking-[0.24em]">
              Desenvolvido por{' '}
              <a
                href="https://www.okapicodeforge.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors duration-300 hover:text-gold"
              >
                Okapi Code Forge
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white/70 transition-all duration-500 hover:border-gold hover:text-gold"
              aria-label="Voltar ao topo"
            >
              <motion.div animate={shouldReduceMotion ? undefined : { y: [0, -4, 0] }} transition={shouldReduceMotion ? undefined : { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}>
                <ArrowRight className="-rotate-90" size={18} />
              </motion.div>
            </button>
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
    <HomeQuote />
    <Stats />
    <About />
    <Services />
    <Projects />
    <ImmersiveShowcase />
    <Testimonials />
  </main>
);

const ProjectsPage = () => (
  <main>
    <PageHero
      eyebrow="Projetos"
      title="Empreendimentos com assinatura, leitura de mercado e presença memorável"
      description="Uma seleção de obras e conceitos que traduzem nosso olhar para valorização imobiliária, sofisticação arquitetônica e execução de alto padrão."
      image="https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&q=80&w=1800"
      metrics={[
        { value: '32', label: 'projetos acompanhados' },
        { value: '4', label: 'frentes estratégicas' },
        { value: 'Brasil', label: 'atuação nacional' },
      ]}
      primaryAction={{ label: 'Falar sobre um projeto', to: '/contato' }}
      secondaryAction={{ label: 'Conhecer serviços', to: '/servicos' }}
    />
    <Projects />
    <Testimonials />
  </main>
);

const AboutPage = () => (
  <main>
    <PageHero
      eyebrow="Sobre"
      title="Critério técnico, linguagem premium e visão de longo prazo"
      description="Mais do que construir, buscamos estruturar experiências que fortaleçam a marca, valorizem o patrimônio e melhorem a leitura do empreendimento pelo mercado."
      image="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1800"
      metrics={[
        { value: '28+', label: 'anos de trajetória' },
        { value: '360°', label: 'visão de negócio' },
        { value: 'Alta curadoria', label: 'decisão e acabamento' },
      ]}
      primaryAction={{ label: 'Solicitar apresentação', to: '/contato' }}
      secondaryAction={{ label: 'Ver portfólio', to: '/projetos' }}
    />
    <About />
    <Stats />
  </main>
);

const ServicesPage = () => (
  <main>
    <PageHero
      eyebrow="Serviços"
      title="Soluções estruturadas para incorporar, construir e posicionar melhor"
      description="Organizamos produto, comunicação e execução em uma mesma direção, para que cada decisão sustente valor, eficiência e imagem de marca."
      image="https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=1800"
      metrics={[
        { value: 'Lean', label: 'gestão mais enxuta' },
        { value: 'Premium', label: 'percepção de valor' },
        { value: 'Entrega', label: 'controle ponta a ponta' },
      ]}
      primaryAction={{ label: 'Agendar consultoria', to: '/contato' }}
      secondaryAction={{ label: 'Conhecer projetos', to: '/projetos' }}
    />
    <Services />
    <ProcessStrip />
  </main>
);

const ContactPage = () => (
  <main>
    <PageHero
      eyebrow="Contato"
      title="Uma conversa bem conduzida já começa a construir confiança"
      description="Se você quer reposicionar o site, apresentar melhor um empreendimento ou estruturar uma presença digital mais madura, vamos conversar."
      image="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1800"
      metrics={[
        { value: '24h', label: 'primeiro retorno' },
        { value: 'Consultivo', label: 'atendimento estratégico' },
        { value: 'Sob medida', label: 'proposta de solução' },
      ]}
      primaryAction={{ label: 'Enviar briefing', to: '/contato' }}
      secondaryAction={{ label: 'Ver trajetória', to: '/sobre' }}
    />
    <Contact />
  </main>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
};

const AppShell = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg text-white transition-colors duration-700">
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <Routes location={location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/projetos" element={<ProjectsPage />} />
                <Route path="/sobre" element={<AboutPage />} />
                <Route path="/servicos" element={<ServicesPage />} />
                <Route path="/contato" element={<ContactPage />} />
              </Routes>
            </motion.div>
          </AnimatePresence>

          <Footer />
          <WhatsAppButton />
        </>
      )}
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
