"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronDown, CheckCircle2, Video, Info, FileText, ArrowRight, HandHeart, Play, ChevronLeft, ChevronRight, Heart, Calculator } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const CAROUSEL_ITEMS = [
  { type: "video", src: "/videos/Do_Imposto_ao_Afeto_version_1.mp4" },
  { type: "video", src: "/videos/declare_ate_29.mp4" },
  { type: "video", src: "/videos/destine_6.mp4" },
  { type: "video", src: "/videos/custo_zero.mp4" },
  { type: "video", src: "/videos/seu_amor.mp4" },
];

const LOGO_SRC = "/images/Whisk_a56ed57694ceb3287694a268dc33ef3bdr-removebg-preview.svg";

// Animation variants
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', skipSnaps: false }, [Autoplay({ delay: 4500, stopOnInteraction: false })]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tutorialOpen, setTutorialOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const steps = [
    "Escolha o modelo de declaração completa.",
    "Preencha sua declaração normalmente. Depois, acesse a “Ficha da Declaração”.",
    "Clique em 'Doações diretamente na declaração'.",
    "Selecione para qual fundo deseja destinar: “Criança e Adolescente” ou “Idoso”.",
    "Em seguida, procure por \"fundo municipal de Porto Velho\".",
    "O sistema calcula automaticamente o limite que pode ser destinado.\nDigite o valor desejado dentro do limite (é possível doar até 3% p/ cada fundo).",
    "Para concluir, gere o DARF e efetue o pagamento.\n\n(Em caso de restituição, você receberá de volta. Se houver imposto a pagar, o valor pago será abatido)"
  ];

  const cards = [
    { title: "Até 6% do imposto", desc: "Você pode destinar até 6% do valor do seu IR. Esse percentual já faz parte do cálculo da sua declaração." },
    { title: "Sem custo adicional", desc: "Você não paga nada a mais. O valor já seria pago ao Governo Federal — a diferença é que você escolhe o destino." },
    { title: "3% + 3%", desc: "Até 3% para o Fundo da Criança e do Adolescente e até 3% para o Fundo da Pessoa Idosa." },
    { title: "Mais retorno para você", desc: "A destinação pode reduzir o imposto a pagar ou aumentar o valor da sua restituição." },
    { title: "Fica no município", desc: "O recurso vai para os Fundos Municipais de Porto Velho e financia projetos sociais na própria cidade." }
  ];

  const faqs = [
    { q: "Vou pagar mais imposto?", a: "Não. O valor destinado já está dentro do imposto devido. Você apenas escolhe que parte desse valor vá para os fundos sociais, em vez de ir para o Governo Federal." },
    { q: "Vou receber menos restituição?", a: "Não. A destinação pode reduzir o imposto a pagar ou aumentar a restituição, dependendo do seu caso. O próprio sistema da Receita faz esse cálculo automaticamente." },
    { q: "Preciso escolher uma instituição?", a: "Não. Durante a declaração, você só precisa selecionar \"fundo municipal\". Os recursos são distribuídos para projetos aprovados e fiscalizados." },
    { q: "Para onde vai o dinheiro?", a: "O valor é destinado aos Fundos Municipais da Criança e do Adolescente e da Pessoa Idosa. Esses fundos financiam projetos sociais em Porto Velho." },
    { q: "É seguro?", a: "Sim. Os recursos são geridos por conselhos municipais e passam por fiscalização. A aplicação segue regras definidas em lei." },
    { q: "Quem pode participar?", a: "Contribuintes que fazem a declaração no modelo completo. A opção simplificada não permite destinação." },
    { q: "Posso escolher o valor?", a: "Sim. Você pode definir o valor dentro do limite disponível, que é informado pelo sistema." },
    { q: "Até quando posso destinar?", a: "Durante o período de entrega da declaração do Imposto de Renda. Após esse prazo, a destinação não pode ser feita na declaração." }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-brand-cyan text-white font-sans overflow-x-hidden">
      {/* Decorative background vectors */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, #FFD400 0%, transparent 40%)',
        backgroundSize: '120% 120%',
        backgroundPosition: '150% -20%',
        mixBlendMode: 'screen'
      }}></div>

      {/* Navbar */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-cyan/95 backdrop-blur-xl shadow-xl py-3' : 'bg-transparent py-5 sm:py-6'} ${tutorialOpen ? 'hidden' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-0 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative w-28 h-24 sm:w-36 sm:h-32 md:w-48 md:h-40 lg:w-56 lg:h-36 -my-8 sm:-my-12 transition-transform drop-shadow-lg origin-left">
              <Image src={LOGO_SRC} alt="Logo Central" fill className="object-contain object-left" priority />
            </div>
            <div className="relative w-12 h-10 sm:w-16 sm:h-12 md:w-20 md:h-16 lg:w-24 lg:h-14 -my-1 sm:-my-3 -ml-6 sm:-ml-10 md:-ml-12 lg:-ml-14 transition-transform drop-shadow-lg origin-left">
              <Image src="/images/image.svg" alt="Logo Prefeitura/TJRO" fill className="object-contain object-left" priority />
            </div>
          </div>
          <nav className="hidden lg:flex gap-6 font-bold text-white text-lg">
            <a href="#inicio" className="hover:text-brand-yellow transition-colors drop-shadow-sm">Início</a>
            <a href="#como-destinar" className="hover:text-brand-yellow transition-colors drop-shadow-sm">Como Destinar</a>
            <a href="#tutorial" className="hover:text-brand-yellow transition-colors drop-shadow-sm">Tutorial</a>
            <a href="#sobre" className="hover:text-brand-yellow transition-colors drop-shadow-sm">Sobre</a>
            <a href="#quem-pode" className="hover:text-brand-yellow transition-colors drop-shadow-sm">Quem Pode</a>
            <a href="#faq" className="hover:text-brand-yellow transition-colors drop-shadow-sm">Dúvidas</a>
          </nav>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/download/pgd/dirpf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-brand-yellow text-slate-900 font-extrabold px-3 py-2.5 sm:px-8 sm:py-4 rounded-full shadow-[0_0_30px_rgba(255,212,0,0.5)] hover:bg-yellow-300 transition-colors text-xs sm:text-base uppercase tracking-wider gap-1.5 sm:gap-2 whitespace-nowrap"
          >
            Baixe o Programa <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.a>
        </div>
      </motion.header>

      <main className="flex-grow pt-24 sm:pt-32 md:pt-40 relative z-10">
        {/* Hero Section */}
        <section id="inicio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-white/10 text-brand-yellow font-bold uppercase tracking-widest text-sm mb-8 backdrop-blur-md border border-white/20 shadow-xl">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-yellow"></span>
              </span>
              Com um simples gesto, você apoia projeto sociais em Porto Velho
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-6 sm:mb-8 leading-[1.1] drop-shadow-2xl">
              Seu Imposto <br className="hidden sm:block"/>
              <span className="text-brand-yellow relative inline-block">
                Ajuda Quem Mais Precisa
                <svg className="absolute w-full h-3 sm:h-6 -bottom-1 sm:-bottom-3 left-0 text-white/20" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="transparent" strokeLinecap="round"/></svg>
              </span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-base sm:text-xl md:text-3xl text-white/90 font-medium mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-md px-2">
              Parte do seu Imposto de Renda pode financiar projetos que atendem crianças, adolescentes e idosos de Porto Velho
            </motion.p>
            
            {/* Novas Info Cards Hero */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mt-6 sm:mt-10"
            >
              <motion.div 
                variants={fadeInUp} 
                whileHover={{ y: -6, scale: 1.02 }} 
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/20 shadow-2xl text-center flex items-center justify-center overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-yellow/0 via-brand-yellow/10 to-brand-yellow/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-yellow to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-white font-black leading-tight text-lg sm:text-xl md:text-2xl transition-all duration-300 relative z-10 group-hover:-translate-y-1">
                  Sem custo extra e você ainda recebe o valor de volta com correção!
                </h3>
              </motion.div>

              <motion.div 
                variants={fadeInUp} 
                whileHover={{ y: -6, scale: 1.02 }} 
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/20 shadow-2xl text-center flex items-center justify-center overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/0 via-brand-cyan/10 to-brand-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-white font-black leading-tight text-lg sm:text-xl md:text-2xl transition-all duration-300 relative z-10 group-hover:-translate-y-1">
                  Apoie crianças e idosos
                </h3>
              </motion.div>

              <motion.div 
                variants={fadeInUp} 
                whileHover={{ y: -6, scale: 1.02 }} 
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/20 shadow-2xl text-center flex items-center justify-center overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-white font-black leading-tight text-lg sm:text-xl md:text-2xl transition-all duration-300 relative z-10 group-hover:-translate-y-1">
                  A destinação sai de parte do seu Imposto de Renda
                </h3>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Dynamic Carousel Section */}
        <section className="w-full relative pb-16">
          <div className="absolute top-1/2 left-0 right-0 h-full bg-white -z-10 rounded-t-[3rem] sm:rounded-t-[5rem]"></div>
          <div className="max-w-xl mx-auto px-6 sm:px-10 relative group">
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ type: "spring", stiffness: 70, damping: 20 }}
               className="embla overflow-hidden rounded-2xl md:rounded-[3rem] shadow-2xl border border-slate-200/50 bg-white relative"
               ref={emblaRef}
            >
              <div className="embla__container flex touch-pan-y cursor-grab active:cursor-grabbing">
                {CAROUSEL_ITEMS.map((item, index) => (
                  <div key={index} className="embla__slide flex-[0_0_100%] min-w-0">
                    <div className="relative w-full h-full flex justify-center items-center p-2 sm:p-5">
                      {item.type === "video" ? (
                        <video
                          src={item.src}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-auto object-contain rounded-xl md:rounded-[2rem] shadow-lg"
                        />
                      ) : (
                        <Image
                          src={item.src}
                          alt={`Campanha Declare seu Amor - Banner ${index + 1}`}
                          width={1920}
                          height={1080}
                          className="w-full h-auto object-contain rounded-xl md:rounded-[2rem] shadow-lg"
                          priority={index <= 1}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Navigation Buttons */}
            <button 
              onClick={() => emblaApi?.scrollPrev()}
              className="cursor-pointer absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-brand-cyan text-white border-2 border-white rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(0,178,205,0.5)] hover:shadow-[0_15px_30px_rgba(255,212,0,0.6)] hover:bg-brand-yellow hover:text-slate-900 transition-all duration-300 hover:scale-110 active:scale-95 z-20"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 ml-[-2px] transition-transform duration-300" />
            </button>
            <button 
              onClick={() => emblaApi?.scrollNext()}
              className="cursor-pointer absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-brand-cyan text-white border-2 border-white rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(0,178,205,0.5)] hover:shadow-[0_15px_30px_rgba(255,212,0,0.6)] hover:bg-brand-yellow hover:text-slate-900 transition-all duration-300 hover:scale-110 active:scale-95 z-20"
              aria-label="Próximo"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 mr-[-2px] transition-transform duration-300" />
            </button>
          </div>
        </section>

        {/* Como Destinar (Passo a Passo) Section — 100vh */}
        <section id="como-destinar" className="bg-white text-slate-900 min-h-screen flex flex-col justify-center rounded-b-[2rem] sm:rounded-b-[3rem] md:rounded-b-[5rem] relative -mt-10 px-3 sm:px-6 lg:px-8 overflow-hidden mb-10 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-10"
            >
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-2 tracking-tighter">Veja <span className="text-brand-cyan">como é fácil.</span></h2>
              <p className="text-sm sm:text-lg text-slate-500 font-medium">Siga estes passos durante a sua declaração do Imposto de Renda.</p>
            </motion.div>

            {/* Alerta Importante */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto mb-12 p-5 sm:p-6 bg-brand-yellow/10 border-2 border-brand-yellow/50 rounded-3xl flex items-center gap-5 shadow-lg relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 blur-3xl -z-10 group-hover:bg-brand-yellow/20 transition-all duration-700"></div>
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-brand-yellow flex items-center justify-center shadow-[0_5px_15px_rgba(255,212,0,0.4)]">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Info className="text-slate-950 w-7 h-7" />
                </motion.div>
              </div>
              <p className="text-slate-900 text-base sm:text-xl font-black leading-tight tracking-tight">
                A declaração precisa ser feita <span className="text-brand-cyan underline decoration-brand-yellow/30 underline-offset-4">exclusivamente</span> pelo aplicativo ou programa da Receita Federal
              </p>
            </motion.div>

            {/* Steps Grid — Row 1: Steps 1-4 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-4 sm:mb-5">
              {steps.slice(0, 4).map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 120, damping: 20 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="relative bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/60 shadow-md hover:shadow-2xl transition-all cursor-default group overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-brand-cyan to-brand-cyan-dark rounded-l-2xl"></div>
                  <h3 className="text-3xl sm:text-4xl font-black text-brand-cyan mb-2 leading-none">
                    {String(idx + 1).padStart(2, '0')}
                  </h3>
                  <p className="text-sm sm:text-base font-bold text-slate-700 leading-snug whitespace-pre-line">
                    {step}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Steps Grid — Row 2: Steps 5-7 + CTA */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
              {steps.slice(4).map((step, idx) => (
                <motion.div
                  key={idx + 4}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx + 4) * 0.1, type: "spring", stiffness: 120, damping: 20 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="relative bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/60 shadow-md hover:shadow-2xl transition-all cursor-default group overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-brand-yellow to-brand-yellow-dark rounded-l-2xl"></div>
                  <h3 className="text-3xl sm:text-4xl font-black text-brand-yellow mb-2 leading-none">
                    {String(idx + 5).padStart(2, '0')}
                  </h3>
                  <p className="text-sm sm:text-base font-bold text-slate-700 leading-snug whitespace-pre-line">
                    {step}
                  </p>
                </motion.div>
              ))}

              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, type: "spring", stiffness: 120 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="relative bg-slate-900 rounded-2xl p-4 sm:p-5 shadow-xl overflow-hidden flex flex-col items-center justify-center text-center group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-green-500 text-white flex items-center justify-center mb-2 shadow-md">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <p className="text-xs sm:text-sm font-black text-white mb-3 leading-snug">Pronto! Declare agora.</p>
                <a
                  href="https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/download/pgd/dirpf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer bg-brand-yellow text-slate-900 font-black px-4 py-2 rounded-full shadow-lg hover:bg-white transition-colors text-xs sm:text-sm flex items-center gap-1 hover:scale-105 active:scale-95"
                >
                  Baixe o Programa <ArrowRight className="w-3 h-3" />
                </a>
              </motion.div>
            </div>

            {/* Bottom info bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className="flex items-center justify-center gap-3 bg-brand-cyan/5 border border-brand-cyan/10 rounded-2xl px-6 py-3"
            >
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image src={LOGO_SRC} alt="Logo" fill className="object-contain" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-600">
                Você não paga nada a mais — apenas escolhe para onde vai uma parte do seu imposto. <span className="text-brand-cyan">Simples assim.</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tutorial Section */}
        <section id="tutorial" className="bg-brand-cyan py-16 sm:py-24 md:py-32 text-white relative overflow-hidden">
          {/* Decorative blurs */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-brand-yellow blur-[150px] opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-white blur-[150px] opacity-10"></div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4 sm:mb-6">
                Veja o <span className="text-brand-yellow">Tutorial</span>
              </h2>
              <p className="text-base sm:text-xl text-white/80 font-medium max-w-2xl mx-auto">
                Acompanhe o passo a passo completo de como destinar parte do seu Imposto de Renda.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="flex justify-center"
            >
              {/* Phone mockup */}
              <div className="relative mx-auto w-[280px] sm:w-[340px] md:w-[420px] cursor-pointer group/phone" onClick={() => setTutorialOpen(true)}>
                {/* Glow behind phone */}
                <div className="absolute inset-0 bg-brand-yellow/20 blur-[80px] scale-110 rounded-full"></div>
                {/* Phone frame - silver/dark metallic */}
                <div className="relative rounded-[2.5rem] sm:rounded-[3rem] bg-gradient-to-b from-[#2c2c2e] via-[#1c1c1e] to-[#2c2c2e] p-[7px] sm:p-[8px] shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_0_2px_rgba(180,180,190,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] transition-transform duration-300 group-hover/phone:scale-[1.02]">
                  {/* Metallic edge highlight */}
                  <div className="absolute inset-0 rounded-[2.5rem] sm:rounded-[3rem] border border-[#555] pointer-events-none"></div>
                  <div className="relative rounded-[2rem] sm:rounded-[2.3rem] overflow-hidden bg-black">
                    {/* Notch / Dynamic Island */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-black w-20 sm:w-28 h-5 sm:h-7 rounded-b-2xl flex items-center justify-center">
                      <div className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 rounded-full bg-[#1a1a1a] border border-[#333] shadow-inner"></div>
                    </div>
                    {/* Screen */}
                    <div className="relative overflow-hidden" style={{ aspectRatio: '9/19.5' }}>
                      <video
                        src="/videos/VÍDEO - TUTORIAL DOAÇÃO IR.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-contain bg-black"
                      />
                      {/* Play overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover/phone:opacity-100 transition-opacity duration-300">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                          <Play className="w-7 h-7 sm:w-8 sm:h-8 text-slate-900 ml-1" />
                        </div>
                      </div>
                    </div>
                    {/* Bottom bar indicator */}
                    <div className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 z-20 w-24 sm:w-32 h-1 bg-white/30 rounded-full"></div>
                  </div>
                </div>
                {/* Side button (power) */}
                <div className="absolute top-32 sm:top-40 -right-[10px] w-[4px] h-14 sm:h-16 bg-black rounded-r-sm transition-transform duration-300 origin-left group-hover/phone:scale-x-150"></div>
                {/* Volume buttons */}
                <div className="absolute top-24 sm:top-28 -left-[10px] w-[4px] h-10 sm:h-12 bg-black rounded-l-sm transition-transform duration-300 origin-right group-hover/phone:scale-x-150"></div>
                <div className="absolute top-40 sm:top-44 -left-[10px] w-[4px] h-10 sm:h-12 bg-black rounded-l-sm transition-transform duration-300 origin-right group-hover/phone:scale-x-150"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tutorial Video Modal */}
        <AnimatePresence>
          {tutorialOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setTutorialOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="relative w-auto flex flex-col items-center max-w-[95vw] md:max-w-[500px]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <div className="w-full flex justify-end mb-3">
                  <button
                    onClick={() => setTutorialOpen(false)}
                    className="text-white hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-sm font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-md"
                  >
                    Fechar ✕
                  </button>
                </div>
                <video
                  src="/videos/VÍDEO - TUTORIAL DOAÇÃO IR.mp4"
                  autoPlay
                  controls
                  playsInline
                  className="w-auto h-auto max-w-full max-h-[70vh] md:max-h-[80vh] rounded-[2rem] shadow-2xl border border-white/10"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Impact e Cards */}
        <section id="impacto" className="bg-brand-yellow py-12 sm:py-16 md:py-20 text-slate-900 relative">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-20"
            >
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4 sm:mb-6">O que <span className="text-white drop-shadow-md">muda</span> na prática?</h2>
              <p className="text-lg sm:text-2xl font-bold text-slate-800">Seu imposto deixa de ser número e vira cuidado direto e carinho.</p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6 max-w-6xl mx-auto"
            >
              {cards.map((card, idx) => (
                <motion.div 
                  variants={scaleIn}
                  key={idx}
                  whileHover={{ y: -10 }}
                  className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-2xl shadow-yellow-900/10 border-4 border-white"
                >
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2 sm:mb-3">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 sm:mt-10 bg-slate-900 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-16 text-center relative overflow-hidden"
            >
              <div className="absolute left-0 bottom-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-brand-cyan/40 via-transparent to-transparent"></div>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-6 sm:mb-10 relative z-10">
                Apoio real a causas <span className="text-brand-yellow">urgentes.</span>
              </h3>
              <p className="text-sm sm:text-lg text-white/70 font-medium mb-6 sm:mb-10 relative z-10 max-w-3xl mx-auto">
                Os recursos que você destinar são encaminhados aos Fundos Municipais e aplicados em projetos que atendem quem mais precisa.
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-5 relative z-10">
                {[
                  "Apoio a crianças em risco",
                  "Combate ao trabalho infantil",
                  "Vítimas de violência",
                  "Apoio a famílias vulneráveis",
                  "Incentivo à adoção",
                  "Capacitação de jovens",
                  "Atendimento à pessoa idosa"
                ].map((item, idx) => (
                  <span key={idx} className="bg-white/10 backdrop-blur-md text-white font-bold px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-lg md:text-xl border border-white/20">
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-white/40 font-medium mt-6 sm:mt-10 relative z-10">
                Os projetos são acompanhados por conselhos e seguem o Estatuto da Criança e do Adolescente.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Sobre a Campanha */}
        <section id="sobre" className="bg-white py-16 sm:py-24 md:py-32 text-slate-900 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4 sm:mb-6">Sobre a <span className="text-brand-cyan">Campanha</span></h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-brand-cyan/5 to-slate-50 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-16 border border-slate-100 shadow-xl mb-10 sm:mb-16"
            >
              <p className="text-base sm:text-xl text-slate-700 font-medium leading-relaxed mb-6">
                A campanha <strong className="text-brand-cyan">Declare Seu Amor</strong> é uma iniciativa do Tribunal de Justiça de Rondônia (TJRO), com apoio da Prefeitura de Porto Velho, que incentiva contribuintes a destinarem parte do Imposto de Renda (IR) para fundos municipais que financiam projetos sociais voltados a crianças, adolescentes e idosos.
              </p>
              <p className="text-base sm:text-xl text-slate-700 font-medium leading-relaxed mb-8">
                Criada em 2018, a iniciativa mobiliza instituições públicas, privadas e a sociedade para fortalecer projetos voltados a crianças, adolescentes e idosos.
              </p>
              <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-center">
                <p className="text-lg sm:text-2xl font-black text-white">
                  &ldquo;Você não paga nada. Só decide para onde vai parte do seu imposto.&rdquo;
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quem Pode Participar */}
        <section id="quem-pode" className="bg-slate-900 py-16 sm:py-24 md:py-32 text-white relative overflow-x-clip overflow-y-visible">
          <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-brand-cyan blur-[120px] opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-brand-yellow blur-[120px] opacity-10"></div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4 sm:mb-6">Quem pode <span className="text-brand-yellow">destinar?</span></h2>
              <p className="text-base sm:text-xl text-white/70 font-medium">
                Contribuintes que fazem a declaração do Imposto de Renda no modelo completo.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12"
            >
              <motion.div variants={fadeInUp} whileHover={{ y: -8 }} className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-[2rem] p-8 sm:p-10 border border-white/10 text-center overflow-hidden group cursor-default transition-all hover:shadow-2xl hover:shadow-brand-cyan/10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-cyan to-brand-cyan/50"></div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3">Pessoa Física</h3>
                <p className="text-sm sm:text-base text-white/50 font-medium leading-relaxed">Pode destinar até 6% do imposto devido.</p>
                <div className="mt-5 inline-block bg-brand-cyan/15 text-brand-cyan text-xs sm:text-sm font-black px-4 py-1.5 rounded-full">Até 6%</div>
              </motion.div>

              <motion.div variants={fadeInUp} whileHover={{ y: -8 }} className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-[2rem] p-8 sm:p-10 border border-white/10 text-center overflow-hidden group cursor-default transition-all hover:shadow-2xl hover:shadow-brand-yellow/10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-yellow to-brand-yellow/50"></div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3">Pessoa Jurídica</h3>
                <p className="text-sm sm:text-base text-white/50 font-medium leading-relaxed">Também podem participar, conforme legislação vigente.</p>
                <div className="mt-5 inline-block bg-brand-yellow/15 text-brand-yellow text-xs sm:text-sm font-black px-4 py-1.5 rounded-full">Conforme lei</div>
              </motion.div>

              <motion.div variants={fadeInUp} whileHover={{ y: -8 }} className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-[2rem] p-8 sm:p-10 border border-white/10 text-center overflow-hidden group cursor-default transition-all hover:shadow-2xl hover:shadow-white/5">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/40 to-white/10"></div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3">Contadores</h3>
                <p className="text-sm sm:text-base text-white/50 font-medium leading-relaxed">Podem orientar clientes durante a declaração.</p>
                <div className="mt-5 inline-block bg-white/10 text-white/70 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full">Orientação</div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl px-6 py-4 sm:px-8 sm:py-5 text-center"
            >
              <p className="text-sm sm:text-lg font-bold text-brand-yellow">
                ⚠️ A opção simplificada não permite destinação. É necessário usar o modelo completo.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-brand-cyan py-16 sm:py-24 md:py-32 text-white relative">
          <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4 sm:mb-6">Dúvidas Frequentes</h2>
              <p className="text-base sm:text-xl md:text-2xl font-medium text-white/80 px-2">
                Tudo o que você precisa saber para destinar seu imposto com segurança.
              </p>
            </motion.div>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {faqs.map((faq, idx) => (
                <motion.div 
                  variants={fadeInUp}
                  key={idx} 
                  className="bg-white/10 backdrop-blur-lg rounded-[2rem] border border-white/20 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="cursor-pointer w-full text-left px-4 py-4 sm:px-8 sm:py-6 flex items-center justify-between hover:bg-white/10 transition-colors focus:outline-none"
                  >
                    <span className="text-base sm:text-xl md:text-2xl font-bold pr-3 sm:pr-4">{faq.q}</span>
                    <ChevronDown className={`w-6 h-6 sm:w-8 sm:h-8 text-brand-yellow transition-transform duration-500 flex-shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                       <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: "auto", opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                         className="overflow-hidden"
                       >
                         <div className="px-4 pb-6 sm:px-8 sm:pb-8 text-sm sm:text-lg md:text-xl font-medium text-white/90 leading-relaxed border-t border-white/10 pt-4">
                           {faq.a}
                         </div>
                       </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-20 text-center"
            >
              <div className="relative w-52 h-52 mx-auto mb-8 drop-shadow-2xl">
                <Image src={LOGO_SRC} alt="Logo" fill className="object-contain" />
              </div>
              <h3 className="text-3xl font-black mb-6">Pronto para transformar sua cidade?</h3>
              <a
                href="https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/download/pgd/dirpf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-brand-yellow text-slate-900 font-black text-xl px-12 py-5 rounded-full shadow-[0_0_40px_rgba(255,212,0,0.6)] hover:bg-white transition-colors gap-3 hover:scale-105 active:scale-95"
              >
                Baixe o Programa <ArrowRight className="w-6 h-6" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-white relative z-20">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            
            {/* Column 1 — Logo & Description */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 sm:gap-4 mb-6">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 drop-shadow-2xl">
                  <Image src={LOGO_SRC} alt="Logo Declare Seu Amor" fill className="object-contain" />
                </div>
                <div className="relative w-28 h-20 sm:w-32 sm:h-24 drop-shadow-2xl">
                  <Image src="/images/image.svg" alt="Logo Prefeitura/TJRO" fill className="object-contain" />
                </div>
              </div>
              <p className="text-sm text-white/50 font-medium leading-relaxed text-center md:text-left max-w-xs">
                Campanha Municipal de incentivo à destinação do Imposto de Renda para crianças, adolescentes e idosos de Porto Velho.
              </p>
            </div>

            {/* Column 2 — Links */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-base font-black text-white mb-5 uppercase tracking-wider">Links Úteis</h4>
              <nav className="flex flex-col gap-3">
                <a href="#como-destinar" className="text-sm text-white/50 hover:text-brand-yellow transition-colors font-medium flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" /> Como destinar
                </a>
                <a href="#faq" className="text-sm text-white/50 hover:text-brand-yellow transition-colors font-medium flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" /> Dúvidas frequentes
                </a>
                <a href="https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/download/pgd/dirpf" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-brand-yellow transition-colors font-medium flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" /> Baixe o Programa
                </a>
                <a href="https://www.tjro.jus.br/declareseuamor" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-brand-yellow transition-colors font-medium flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" /> Site Oficial TJRO
                </a>
              </nav>
            </div>

            {/* Column 3 — Partners */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-base font-black text-white mb-5 uppercase tracking-wider">Realização</h4>
              <div className="space-y-4 w-full max-w-xs">
                <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-brand-cyan flex-shrink-0"></div>
                  <span className="text-sm text-white/70 font-bold">Tribunal de Justiça de Rondônia</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-brand-yellow flex-shrink-0"></div>
                  <span className="text-sm text-white/70 font-bold">Prefeitura de Porto Velho</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30 font-medium text-center sm:text-left" suppressHydrationWarning>
              © {new Date().getFullYear()} Declare Seu Amor — Porto Velho, RO. Todos os direitos reservados.
            </p>
            <p className="text-xs text-white/30 font-medium">
              Feito com <span className="text-red-400">❤</span> para Porto Velho
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
