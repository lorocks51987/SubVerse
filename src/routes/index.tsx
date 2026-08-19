import { createFileRoute, Link } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Ouroboros } from "@/components/Ouroboros";
import { Logo } from "@/components/Logo";
import { Marquee } from "@/components/site/Marquee";
import {
  Reveal,
  MaskReveal,
  LateralReveal,
  ClipReveal,
  ImageReveal,
  LineReveal,
  FadeIn,
} from "@/components/site/Reveal";
import { activeDrop } from "@/data/drops";
import heroEditorial from "@/assets/hero-editorial.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SUBVERSE — Para os que não se encaixam" },
      {
        name: "description",
        content:
          "SubVerse é um universo underground brasileiro de streetwear. Não é sobre o que você veste, é sobre o que você se torna.",
      },
      { property: "og:title", content: "SUBVERSE — Para os que não se encaixam" },
      {
        property: "og:description",
        content:
          "Marca brasileira de streetwear underground. Ciclo, ruptura e transformação sob o símbolo do Ouroboros.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const shouldReduceMotion = useReducedMotion();
  const entryRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: entryRef,
    offset: ["start start", "end start"],
  });

  // ─── HERO SCROLL ──────────────────────────────────────────────────────────
  // Fase 1 (0 → 0.55): cobra cresce suavemente, texto estável e visível
  // Fase 2 (0.55 → 1.0): tudo some juntos conforme a seção sai do viewport

  const ringScale = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    shouldReduceMotion ? [1, 1, 1] : [1, 1.25, 1.35]
  );
  const ringRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : 55]
  );
  const ringOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [0.65, 0.45, 0]
  );

  // Texto: visível desde o início, sai suavemente no final
  const titleY = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    shouldReduceMotion ? [0, 0, 0] : [0, 0, -20]
  );
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1, 0]
  );


  // Mouse tracking ultra-sutil — apenas desktop com ponteiro preciso
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mouseSpringX = useSpring(mousePos.x, { stiffness: 35, damping: 28 });
  const mouseSpringY = useSpring(mousePos.y, { stiffness: 35, damping: 28 });

  useEffect(() => {
    if (typeof window === "undefined" || shouldReduceMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Máximo de 10px — movimento lento, não segue o cursor agressivamente
      const x = (e.clientX / innerWidth - 0.5) * 12;
      const y = (e.clientY / innerHeight - 0.5) * 12;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion]);

  // Axioma: opacity da segunda frase controlada por scroll
  const axiomRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: axiomProgress } = useScroll({
    target: axiomRef,
    offset: ["start 80%", "end 40%"],
  });
  const secondLineOpacity = useTransform(
    axiomProgress,
    [0, 0.3, 1],
    [0.3, 0.6, 1]
  );

  return (
    <div className="concrete-surface">
      {/* 01 — HERO */}
      <section
        ref={entryRef}
        className="relative flex h-[100svh] flex-col items-center justify-center overflow-hidden px-5"
      >
        {/* OUROBOROS — zoom-out na entrada, estabiliza, some no final */}
        <motion.div
          style={{
            scale: ringScale,
            opacity: ringOpacity,
            rotate: ringRotate,
            x: shouldReduceMotion ? 0 : mouseSpringX,
            y: shouldReduceMotion ? 0 : mouseSpringY,
          }}
          className="pointer-events-none absolute top-1/2 left-1/2 h-[76vmin] w-[76vmin] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        >
          <Ouroboros
            variant="intact"
            className="h-full w-full text-foreground"
            strokeWidth={0.75}
          />
        </motion.div>

        {/* TÍTULO — entra depois que o Ouroboros encolhe, sai junto no final */}
        <motion.div
          style={{
            y: titleY,
            opacity: titleOpacity,
          }}
          className="relative z-10 text-center flex flex-col items-center will-change-transform"
        >
          <motion.h1
            className="display-xl text-foreground select-none font-bold tracking-tight"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Subverse
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex items-center gap-3"
          >
            <span className="h-px w-6 sm:w-10 bg-border" />
            <p className="tech text-foreground/90 tracking-[0.32em] sm:tracking-[0.42em] uppercase text-xs sm:text-sm font-bold font-mono">
              Para os que não se encaixam.
            </p>
            <span className="h-px w-6 sm:w-10 bg-border" />
          </motion.div>
        </motion.div>

        {/* SCROLL TO ENTER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.9 }}
          className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none pb-[env(safe-area-inset-bottom)]"
        >
          <div className="h-5 w-px bg-gradient-to-b from-foreground/50 to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* MARQUEE PRINCIPAL */}
      <Marquee text="QUESTIONAR — ROMPER — TRANSFORMAR — EVOLUIR — RECOMEÇAR" />

      {/* 02 — MANIFESTO: TENSÃO E RUPTURA */}
      <section className="relative px-5 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1600px] space-y-20 md:space-y-28">

          {/* IMPOSIÇÃO — frase 1: revelação por máscara, linha por linha */}
          <div className="max-w-4xl">
            <FadeIn delay={0}>
              <span className="tech text-muted-foreground text-xs block mb-4 font-mono">
                // 001 — O MOLDE
              </span>
            </FadeIn>
            <LineReveal delay={0.1} className="mb-6 w-16" />
            <p className="display-lg text-foreground font-display text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] leading-[0.88]">
              <MaskReveal delay={0.18}>
                <span>Você foi ensinado</span>
              </MaskReveal>
              <MaskReveal delay={0.32}>
                <span>a caber.</span>
              </MaskReveal>
            </p>
          </div>

          {/* RUPTURA — frase 2: entrada lateral — representa saída do padrão */}
          <div className="flex justify-end">
            <div className="max-w-4xl text-right">
              <FadeIn delay={0}>
                <span className="tech text-muted-foreground text-xs block mb-4 font-mono">
                  // 002 — A RUPTURA
                </span>
              </FadeIn>
              <LineReveal delay={0.1} fromRight className="mb-6 w-16 ml-auto" />
              <p className="display-lg text-foreground font-display text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] leading-[0.88]">
                <LateralReveal x={40} delay={0.18}>
                  <span className="block">Mas nem todo mundo</span>
                </LateralReveal>
                {/* Linha 2 entra com pequeno desfasamento — irregularidade intencional */}
                <LateralReveal x={28} delay={0.32}>
                  <span className="block">foi feito para caber.</span>
                </LateralReveal>
              </p>
            </div>
          </div>

          {/* OS QUATRO PRINCÍPIOS — stagger sequencial com LineReveal */}
          <div>
            <LineReveal delay={0} className="mb-0" />
            <div className="grid gap-4 md:grid-cols-4">
              {[
                ["01", "QUESTIONAR.", "A recusa da primeira certeza imposta."],
                ["02", "ROMPER.", "A forma precisa rachar para você existir."],
                ["03", "TRANSFORMAR.", "O que sobra da ruptura vira matéria."],
                ["04", "EVOLUIR.", "O ciclo não tem última volta."],
              ].map(([num, w, desc], i) => (
                <Reveal key={w} delay={i * 0.12} y={14}>
                  <div className="group border-t border-border pt-4 bg-card/20 p-6 min-h-[180px] flex flex-col justify-between transition-all duration-300 hover:border-foreground/60 hover:-translate-y-0.5">
                    <div>
                      <span className="tech text-muted-foreground text-[0.65rem] font-mono group-hover:text-foreground/70 transition-colors duration-300">
                        {num}
                      </span>
                      <p
                        className="font-display text-3xl uppercase md:text-4xl text-foreground mt-2 transition-transform duration-300 group-hover:translate-x-0.5"
                        style={{ transform: `rotate(${i % 2 === 0 ? -0.4 : 0.4}deg)` }}
                      >
                        {w}
                      </p>
                    </div>
                    <p className="tech text-muted-foreground text-[0.65rem] mt-6 leading-relaxed group-hover:text-muted-foreground/80 transition-colors duration-300">
                      {desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* AXIOMA CENTRAL — impacto máximo da seção */}
          <div
            ref={axiomRef}
            className="border border-border p-6 sm:p-8 md:p-14 bg-card/20 flex flex-col md:flex-row items-center gap-8 md:gap-12 hover:border-foreground/50 transition-colors duration-500"
          >
            {/* Ouroboros aparece primeiro via FadeIn */}
            <FadeIn delay={0} className="h-20 w-20 md:h-28 md:w-28 shrink-0">
              <Ouroboros variant="intact" className="h-full w-full" />
            </FadeIn>
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-3">
                <span className="tech text-muted-foreground text-[0.65rem]">AXIOMA CENTRAL</span>
                <div className="h-px flex-1 bg-border/60" />
                <span className="tech text-muted-foreground text-[0.65rem]">SUBVERSE // BR</span>
              </div>
              <h2 className="display-lg text-foreground font-display text-3xl sm:text-5xl md:text-6xl leading-[0.95]">
                {/* Linha 1 — revelação por máscara */}
                <MaskReveal delay={0.15}>
                  <span>Não é sobre o que você veste.</span>
                </MaskReveal>
                {/* Linha 2 — começa apagada, ganha intensidade com scroll */}
                <motion.span
                  className="block mt-2"
                  style={{ opacity: shouldReduceMotion ? 1 : secondLineOpacity }}
                >
                  <MaskReveal delay={0.3}>
                    <span className="text-muted-foreground">
                      É sobre o que você se torna.
                    </span>
                  </MaskReveal>
                </motion.span>
              </h2>
              <div className="pt-3 flex flex-wrap items-center justify-between gap-4">
                <Link
                  to="/manifesto"
                  className="tech link-underline inline-block text-xs font-bold text-foreground transition-transform duration-300 hover:translate-x-1"
                >
                  LER O MANIFESTO COMPLETO →
                </Link>
                <span className="tech text-[0.6rem] text-muted-foreground font-mono">
                  001 // POSTULADO
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — THE SUBVERSE: RESPIRAÇÃO APÓS O AXIOMA */}
      <section className="border-y border-border px-5 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-14 md:grid-cols-12 items-start">
            <div className="md:col-span-5 space-y-6">
              <ClipReveal>
                <span className="tech text-muted-foreground text-xs">ARQUIVO // 002</span>
                <h2 className="display-lg text-foreground mt-2">The Subverse</h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base mt-4">
                  A SubVerse nasce daqueles que não encontram pertencimento nos padrões
                  estabelecidos. Não porque desejam simplesmente ser diferentes, mas porque entendem
                  que padrões podem ser questionados.
                </p>
                <div className="pt-4">
                  <Link
                    to="/universe"
                    className="tech link-underline inline-block text-xs font-bold transition-transform duration-300 hover:translate-x-1"
                  >
                    EXPLORAR OS 3 PILARES DA MARCA →
                  </Link>
                </div>
              </ClipReveal>
            </div>

            <div className="md:col-span-7 space-y-4">
              {[
                [
                  "SUBVERSO",
                  "O LUGAR",
                  "O lugar daqueles que não se encaixam. Território de pertencimento para quem questiona padrões consolidados e recusa o conforto do consenso.",
                ],
                [
                  "SUBVERSÃO",
                  "O ATO",
                  "A necessidade ativa de questionar, romper e transformar. A atitude que racha a casca e transforma matéria bruta em evolução.",
                ],
                [
                  "OUROBOROS",
                  "O CICLO",
                  "O ciclo permanente de destruição e reconstrução. A serpente devorando a cauda como assinatura de que nunca existirá uma versão final estática.",
                ],
              ].map(([title, role, desc], idx) => (
                <Reveal key={title} delay={idx * 0.1} y={14}>
                  <div className="group border border-border p-6 bg-card/20 transition-all duration-300 hover:border-foreground/60 hover:-translate-y-px">
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-display text-2xl uppercase tracking-wide text-foreground transition-transform duration-300 group-hover:translate-x-0.5">
                          {title}
                        </h3>
                        <span className="tech text-muted-foreground text-[0.65rem]">// {role}</span>
                      </div>
                      <span className="tech text-muted-foreground text-[0.6rem] transition-colors duration-300 group-hover:text-foreground/60">
                        PILAR // 0{idx + 1}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed mt-3 transition-colors duration-300 group-hover:text-muted-foreground/90">
                      {desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04 — VOCÊ RECONHECE OS SEUS: CONVERGÊNCIA EDITORIAL */}
      <section className="px-5 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-12 md:grid-cols-12 items-center">
            {/* ESQUERDA — texto entra primeiro */}
            <div className="md:col-span-6 space-y-6">
              <ClipReveal>
                <div className="flex items-center gap-3">
                  <span className="tech text-muted-foreground text-xs">
                    CÓDIGO DE RECONHECIMENTO
                  </span>
                  <div className="h-px w-12 bg-border" />
                  <span className="tech text-muted-foreground text-xs">003</span>
                </div>
                <h2 className="display-lg text-foreground mt-3">Você reconhece os seus.</h2>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-[48ch] mt-4">
                  Pessoas que compartilham a mesma inquietação reconhecem umas às outras. O símbolo
                  na etiqueta, a textura do algodão pesado e a recusa do padrão são a nossa
                  linguagem comum.
                </p>
              </ClipReveal>
            </div>

            {/* DIREITA — símbolos entram convergindo (de lados opostos), após o texto */}
            <div className="md:col-span-6 flex items-center justify-center">
              <div className="w-full max-w-lg overflow-hidden">
                <motion.div
                  className="flex items-center justify-center gap-8 sm:gap-12 p-8 sm:p-14 border border-border bg-card/20"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Logo: entra da esquerda */}
                  <motion.div
                    initial={shouldReduceMotion ? {} : { x: -24, opacity: 0 }}
                    whileInView={shouldReduceMotion ? {} : { x: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-8% 0px" }}
                    transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Logo className="h-20 w-20 sm:h-28 sm:w-28 md:h-32 md:w-32 shrink-0 transition-transform duration-700 hover:scale-105" />
                  </motion.div>
                  <div className="h-16 sm:h-20 w-px bg-border shrink-0" />
                  {/* Ouroboros: entra da direita */}
                  <motion.div
                    initial={shouldReduceMotion ? {} : { x: 24, opacity: 0 }}
                    whileInView={shouldReduceMotion ? {} : { x: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-8% 0px" }}
                    transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Ouroboros className="spin-slower h-20 w-20 sm:h-28 sm:w-28 md:h-32 md:w-32 shrink-0 text-foreground/90" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — CAPÍTULO I: DROP 001 — MOLDADOS */}
      <section className="border-t border-border px-5 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <ClipReveal>
                <span className="tech text-muted-foreground text-xs">CAPÍTULO I // MOLDADOS</span>
                <h2 className="display-xl mt-4 text-foreground">Moldados</h2>
                <p className="font-display mt-2 text-2xl md:text-3xl text-foreground">
                  "Subversivos não nascem prontos. São moldados."
                </p>
              </ClipReveal>
            </div>
            <Reveal y={10} delay={0.1}>
              <div className="space-y-1 text-right font-mono text-xs">
                <p className="tech text-muted-foreground">ARTEFATO // 007</p>
                <p className="tech text-muted-foreground">TIRAGEM // 038 / 050</p>
                <p className="tech text-foreground font-bold">STATUS // ACTIVE</p>
              </div>
            </Reveal>
          </div>

          {/* Imagem editorial — revelação lenta, 1100ms */}
          <ImageReveal delay={0.08} className="mt-12 border border-border group relative">
            <img
              src={heroEditorial}
              alt="Editorial do Drop 001 — MOLDADOS"
              width={1408}
              height={1760}
              className="h-[65svh] w-full object-cover object-center grayscale contrast-110 md:h-[86svh] transition-transform duration-[1200ms] group-hover:scale-[1.015]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            {/* Ouroboros no canto — aparece por último */}
            <FadeIn delay={0.35} className="absolute right-6 bottom-6">
              <Ouroboros
                variant="forming"
                className="h-16 w-16 text-foreground/90 mix-blend-difference md:h-24 md:w-24"
              />
            </FadeIn>
          </ImageReveal>

          <div className="mt-12 grid gap-8 md:grid-cols-12 items-center justify-between">
            <div className="md:col-span-7 space-y-3">
              <Reveal y={10}>
                <p className="tech text-muted-foreground text-[0.68rem]">
                  HISTÓRIA DO CAPÍTULO // CONCRETO & MADRUGADA
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[56ch]">
                  {activeDrop.concept} Registrado em concreto e marquise. Malha pesada 240g com
                  serigrafia rachada na cura para registrar o processo de ruptura.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-5 md:text-right">
              <Reveal y={10} delay={0.1}>
                <Link
                  to="/drops/$slug"
                  params={{ slug: activeDrop.slug }}
                  className="group inline-flex items-center gap-6 border border-foreground bg-foreground px-8 py-5 text-background font-bold transition-all hover:bg-background hover:text-foreground w-full justify-between sm:w-auto"
                >
                  <span className="tech">ENTRAR NO CAPÍTULO I</span>
                  <Ouroboros
                    variant="forming"
                    className="h-5 w-5 transition-transform duration-700 group-hover:rotate-180"
                  />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Marquee
        text="DROP 001 — MOLDADOS — SUBVERSIVOS NÃO NASCEM PRONTOS. SÃO MOLDADOS."
        items={4}
      />
    </div>
  );
}
