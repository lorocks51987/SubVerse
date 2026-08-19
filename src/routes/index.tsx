import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Ouroboros } from "@/components/Ouroboros";
import { Logo } from "@/components/Logo";
import { Marquee } from "@/components/site/Marquee";
import { Reveal } from "@/components/site/Reveal";
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
  const entryRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: entryRef,
    offset: ["start start", "end start"],
  });

  // Efeito de scroll do Hero
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.45], [0.65, 0]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  // Microinteração sutil de mouse (apenas desktop)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mouseSpringX = useSpring(mousePos.x, { stiffness: 45, damping: 25 });
  const mouseSpringY = useSpring(mousePos.y, { stiffness: 45, damping: 25 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Desativar em dispositivos com touch/sem hover
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Deslocamento máximo muito sutil: ~6px a 8px
      const x = (e.clientX / innerWidth - 0.5) * 14;
      const y = (e.clientY / innerHeight - 0.5) * 14;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="concrete-surface">
      {/* 01 — HERO / ENTRADA: OUROBOROS DOMINANTE + SUBVERSE + ASSINATURA */}
      <section
        ref={entryRef}
        className="relative flex h-[100svh] flex-col items-center justify-center overflow-hidden px-5"
      >
        {/* OUROBOROS COMO SÍMBOLO CENTRAL COM MICROINTERAÇÃO */}
        <motion.div
          style={{
            scale: ringScale,
            opacity: ringOpacity,
            rotate: ringRotate,
            x: mouseSpringX,
            y: mouseSpringY,
          }}
          className="pointer-events-none absolute top-1/2 left-1/2 h-[76vmin] w-[76vmin] -translate-x-1/2 -translate-y-1/2"
        >
          <Ouroboros
            variant="intact"
            className="h-full w-full text-foreground"
            strokeWidth={0.75}
          />
        </motion.div>

        {/* TÍTULO DOMINANTE & TAGLINE TÉCNICA */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative z-10 text-center flex flex-col items-center"
        >
          <h1 className="display-xl text-foreground select-none font-bold tracking-tight">
            Subverse
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex items-center gap-3"
          >
            <span className="h-px w-6 sm:w-10 bg-border" />
            <p className="tech text-foreground/90 tracking-[0.32em] sm:tracking-[0.42em] uppercase text-xs sm:text-sm font-bold font-mono">
              Para os que não se encaixam.
            </p>
            <span className="h-px w-6 sm:w-10 bg-border" />
          </motion.div>
        </motion.div>

        {/* SCROLL TO ENTER — INDICADOR DISCRETO COM DISTÂNCIA SEGURA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none pb-[env(safe-area-inset-bottom)]"
        >
          <span className="tech text-[0.62rem] tracking-[0.3em] text-muted-foreground">
            SCROLL TO ENTER
          </span>
          <div className="h-5 w-px bg-gradient-to-b from-foreground/50 to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* MARQUEE PRINCIPAL */}
      <Marquee text="QUESTIONAR — ROMPER — TRANSFORMAR — EVOLUIR — RECOMEÇAR" />

      {/* 02 — MANIFESTO: TENSÃO E RESPOSTA */}
      <section className="relative px-5 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1600px] space-y-20 md:space-y-28">
          {/* IMPOSIÇÃO */}
          <Reveal y={18}>
            <div className="max-w-4xl">
              <span className="tech text-muted-foreground text-xs block mb-3 font-mono">
                // 001 — O MOLDE
              </span>
              <p className="display-lg text-foreground font-display text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] leading-[0.88]">
                <span className="block">Você foi ensinado</span>
                <span className="block">a caber.</span>
              </p>
            </div>
          </Reveal>

          {/* RESPOSTA */}
          <Reveal y={18} delay={0.08}>
            <div className="flex justify-end">
              <div className="max-w-4xl text-right">
                <span className="tech text-muted-foreground text-xs block mb-3 font-mono">
                  // 002 — A RUPTURA
                </span>
                <p className="display-lg text-foreground font-display text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] leading-[0.88]">
                  <span className="block">Mas nem todo mundo</span>
                  <span className="block">foi feito para caber.</span>
                </p>
              </div>
            </div>
          </Reveal>

          {/* OS QUATRO PRINCÍPIOS */}
          <div className="grid gap-4 md:grid-cols-4 pt-12 border-t border-border">
            {[
              ["01", "QUESTIONAR.", "A recusa da primeira certeza imposta."],
              ["02", "ROMPER.", "A forma precisa rachar para você existir."],
              ["03", "TRANSFORMAR.", "O que sobra da ruptura vira matéria."],
              ["04", "EVOLUIR.", "O ciclo não tem última volta."],
            ].map(([num, w, desc], i) => (
              <Reveal key={w} delay={i * 0.06} y={16}>
                <div className="border-t border-border pt-4 bg-card/20 p-6 min-h-[180px] flex flex-col justify-between hover:border-foreground transition-all duration-300 hover:-translate-y-0.5">
                  <div>
                    <span className="tech text-muted-foreground text-[0.65rem] font-mono">
                      {num}
                    </span>
                    <p
                      className="font-display text-3xl uppercase md:text-4xl text-foreground mt-2"
                      style={{ transform: `rotate(${i % 2 === 0 ? -0.4 : 0.4}deg)` }}
                    >
                      {w}
                    </p>
                  </div>
                  <p className="tech text-muted-foreground text-[0.65rem] mt-6 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* FRASE DE VALOR DA MARCA / AXIOMA CENTRAL */}
          <Reveal y={20}>
            <div className="border border-border p-6 sm:p-8 md:p-14 bg-card/20 flex flex-col md:flex-row items-center gap-8 md:gap-12 hover:border-foreground/60 transition-colors">
              <div className="h-20 w-20 md:h-28 md:w-28 shrink-0">
                <Ouroboros variant="intact" className="h-full w-full" />
              </div>
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3">
                  <span className="tech text-muted-foreground text-[0.65rem]">AXIOMA CENTRAL</span>
                  <div className="h-px flex-1 bg-border/60" />
                  <span className="tech text-muted-foreground text-[0.65rem]">SUBVERSE // BR</span>
                </div>
                <h2 className="display-lg text-foreground font-display text-3xl sm:text-5xl md:text-6xl leading-[0.95]">
                  Não é sobre o que você veste.{" "}
                  <span className="text-muted-foreground block mt-2">
                    É sobre o que você se torna.
                  </span>
                </h2>
                <div className="pt-3 flex flex-wrap items-center justify-between gap-4">
                  <Link
                    to="/manifesto"
                    className="tech link-underline inline-block text-xs font-bold text-foreground"
                  >
                    LER O MANIFESTO COMPLETO →
                  </Link>
                  <span className="tech text-[0.6rem] text-muted-foreground font-mono">
                    001 // POSTULADO
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 — THE SUBVERSE: A TRÍADE CONCEITUAL */}
      <section className="border-y border-border px-5 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-14 md:grid-cols-12 items-start">
            <div className="md:col-span-5 space-y-6">
              <Reveal y={14}>
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
                    className="tech link-underline inline-block text-xs font-bold"
                  >
                    EXPLORAR OS 3 PILARES DA MARCA →
                  </Link>
                </div>
              </Reveal>
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
                <Reveal key={title} delay={idx * 0.08} y={16}>
                  <div className="border border-border p-6 bg-card/20 hover:border-foreground transition-all duration-300 hover:-translate-y-0.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-display text-2xl uppercase tracking-wide text-foreground">
                          {title}
                        </h3>
                        <span className="tech text-muted-foreground text-[0.65rem]">// {role}</span>
                      </div>
                      <span className="tech text-muted-foreground text-[0.6rem]">
                        PILAR // 0{idx + 1}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed mt-3">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04 — VOCÊ RECONHECE OS SEUS: CÓDIGO DE RECONHECIMENTO */}
      <section className="px-5 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-12 md:grid-cols-12 items-center">
            <div className="md:col-span-6 space-y-6">
              <Reveal y={18}>
                <div className="flex items-center gap-3">
                  <span className="tech text-muted-foreground text-xs">
                    CÓDIGO DE RECONHECIMENTO
                  </span>
                  <div className="h-px w-12 bg-border" />
                  <span className="tech text-muted-foreground text-xs">003</span>
                </div>
                <h2 className="display-lg text-foreground mt-3">Você reconhece os seus.</h2>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-[48ch]">
                  Pessoas que compartilham a mesma inquietação reconhecem umas às outras. O símbolo
                  na etiqueta, a textura do algodão pesado e a recusa do padrão são a nossa
                  linguagem comum.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-6 flex items-center justify-center">
              <Reveal y={18} delay={0.1} className="w-full max-w-lg">
                <div className="flex items-center justify-center gap-8 sm:gap-12 p-8 sm:p-14 border border-border bg-card/20">
                  <Logo className="h-20 w-20 sm:h-28 sm:w-28 md:h-32 md:w-32 shrink-0 transition-transform duration-700 hover:scale-105" />
                  <div className="h-16 sm:h-20 w-px bg-border shrink-0" />
                  <Ouroboros className="spin-slower h-20 w-20 sm:h-28 sm:w-28 md:h-32 md:w-32 shrink-0 text-foreground/90" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — CAPÍTULO I: DROP 001 — MOLDADOS */}
      <section className="border-t border-border px-5 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1600px]">
          <Reveal y={18}>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="tech text-muted-foreground text-xs">CAPÍTULO I // MOLDADOS</span>
                <h2 className="display-xl mt-4 text-foreground">Moldados</h2>
                <p className="font-display mt-2 text-2xl md:text-3xl text-foreground">
                  “Subversivos não nascem prontos. São moldados.”
                </p>
              </div>
              <div className="space-y-1 text-right font-mono text-xs">
                <p className="tech text-muted-foreground">ARTEFATO // 007</p>
                <p className="tech text-muted-foreground">TIRAGEM // 038 / 050</p>
                <p className="tech text-foreground font-bold">STATUS // ACTIVE</p>
              </div>
            </div>
          </Reveal>

          <Reveal y={20} delay={0.08} className="mt-12">
            <div className="relative overflow-hidden border border-border group">
              <img
                src={heroEditorial}
                alt="Editorial do Drop 001 — MOLDADOS"
                width={1408}
                height={1760}
                className="h-[65svh] w-full object-cover object-center grayscale contrast-110 md:h-[86svh] transition-transform duration-[1200ms] group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <Ouroboros
                variant="forming"
                className="absolute right-6 bottom-6 h-16 w-16 text-foreground/90 mix-blend-difference md:h-24 md:w-24"
              />
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-12 items-center justify-between">
            <div className="md:col-span-7 space-y-3">
              <p className="tech text-muted-foreground text-[0.68rem]">
                HISTÓRIA DO CAPÍTULO // CONCRETO & MADRUGADA
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-[56ch]">
                {activeDrop.concept} Registrado em concreto e marquise. Malha pesada 240g com
                serigrafia rachada na cura para registrar o processo de ruptura.
              </p>
            </div>

            <div className="md:col-span-5 md:text-right">
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
