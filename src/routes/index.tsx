import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
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

  const ringScale = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.45], [0.65, 0]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  return (
    <div className="concrete-surface">
      {/* 01 — HERO / ENTRADA */}
      <section
        ref={entryRef}
        className="relative flex h-[100svh] flex-col items-center justify-center overflow-hidden px-5"
      >
        <motion.div
          style={{ scale: ringScale, opacity: ringOpacity, rotate: ringRotate }}
          className="pointer-events-none absolute top-1/2 left-1/2 h-[78vmin] w-[78vmin] -translate-x-1/2 -translate-y-1/2"
        >
          <Ouroboros
            variant="intact"
            className="h-full w-full text-foreground"
            strokeWidth={0.75}
          />
        </motion.div>

        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative z-10 text-center"
        >
          <h1 className="display-xl text-foreground select-none">Subverse</h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="tech mt-6 text-foreground tracking-[0.38em] uppercase text-[0.82rem] font-bold"
          >
            Para os que não se encaixam.
          </motion.p>
        </motion.div>
      </section>

      {/* MARQUEE PRINCIPAL */}
      <Marquee text="QUESTIONAR — ROMPER — TRANSFORMAR — EVOLUIR — RECOMEÇAR" />

      {/* 02 — MANIFESTO VISCERAL */}
      <section className="relative px-5 py-28 md:px-8 md:py-44">
        <div className="mx-auto max-w-[1600px] space-y-24 md:space-y-36">
          <Reveal>
            <p className="display-lg max-w-[16ch] text-foreground font-display text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] leading-[0.9]">
              Você foi ensinado a caber.
            </p>
          </Reveal>

          <Reveal>
            <div className="flex justify-end">
              <p className="display-lg text-right max-w-[18ch] text-foreground font-display text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] leading-[0.9]">
                Mas nem todo mundo foi feito para caber.
              </p>
            </div>
          </Reveal>

          {/* OS QUATRO PRINCÍPIOS COM ALINHAMENTO HARMONIOSO */}
          <div className="grid gap-4 md:grid-cols-4 pt-12 border-t border-border">
            {[
              ["01", "QUESTIONAR.", "A recusa da primeira certeza imposta."],
              ["02", "ROMPER.", "A forma precisa rachar para você existir."],
              ["03", "TRANSFORMAR.", "O que sobra da ruptura vira matéria."],
              ["04", "EVOLUIR.", "O ciclo não tem última volta."],
            ].map(([num, w, desc], i) => (
              <Reveal key={w} delay={i * 0.08}>
                <div className="border-t border-border pt-4 bg-card/20 p-6 min-h-[180px] flex flex-col justify-between">
                  <div>
                    <span className="tech text-muted-foreground text-[0.65rem] font-mono">{num}</span>
                    <p
                      className="font-display text-3xl uppercase md:text-4xl text-foreground mt-2"
                      style={{ transform: `rotate(${i % 2 === 0 ? -0.4 : 0.4}deg)` }}
                    >
                      {w}
                    </p>
                  </div>
                  <p className="tech text-muted-foreground text-[0.65rem] mt-6 leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* AXIOMA CENTRAL */}
          <Reveal>
            <div className="border border-border p-8 md:p-14 bg-card/20 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="h-24 w-24 md:h-32 md:w-32 shrink-0">
                <Ouroboros variant="intact" className="h-full w-full" />
              </div>
              <div className="space-y-4 flex-1">
                <h2 className="display-lg text-foreground font-display text-3xl sm:text-5xl md:text-6xl leading-[0.95]">
                  Não é sobre o que você veste.{" "}
                  <span className="text-muted-foreground block mt-2">
                    É sobre o que você se torna.
                  </span>
                </h2>
                <div className="pt-3">
                  <Link to="/manifesto" className="tech link-underline inline-block text-xs font-bold text-foreground">
                    LER O MANIFESTO COMPLETO →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 — THE SUBVERSE / OS 3 PILARES */}
      <section className="border-y border-border px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-16 md:grid-cols-12 items-start">
            <div className="md:col-span-5 space-y-6">
              <span className="tech text-muted-foreground text-xs">ARQUIVO // 002</span>
              <h2 className="display-lg text-foreground">The Subverse</h2>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                A SubVerse nasce daqueles que não encontram pertencimento nos padrões estabelecidos. Não porque desejam simplesmente ser diferentes, mas porque entendem que padrões podem ser questionados.
              </p>

              <div className="pt-4">
                <Link to="/universe" className="tech link-underline inline-block text-xs font-bold">
                  EXPLORAR OS 3 PILARES DA MARCA →
                </Link>
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              {[
                [
                  "SUBVERSO",
                  "O lugar daqueles que não se encaixam.",
                  "Território de pertencimento para quem questiona padrões consolidados e recusa o conforto do consenso.",
                ],
                [
                  "SUBVERSÃO",
                  "A necessidade de questionar, romper e transformar.",
                  "A atitude ativa que racha a casca e transforma matéria bruta em evolução.",
                ],
                [
                  "OUROBOROS",
                  "O ciclo permanente de destruição e reconstrução.",
                  "A serpente devorando a cauda como assinatura de que nunca existirá uma versão final estática.",
                ],
              ].map(([title, subtitle, desc], idx) => (
                <Reveal key={title} delay={idx * 0.1}>
                  <div className="border border-border p-6 bg-card/20 hover:border-foreground transition-colors">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-2xl uppercase tracking-wide text-foreground">
                        {title}
                      </h3>
                      <span className="tech text-muted-foreground text-[0.6rem]">PILAR // 0{idx + 1}</span>
                    </div>
                    <p className="tech text-foreground/90 text-[0.7rem] mt-2 font-bold">{subtitle}</p>
                    <p className="text-muted-foreground text-xs leading-relaxed mt-3">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04 — VOCÊ RECONHECE OS SEUS (IDENTIDADE VISUAL & MASCOTE) */}
      <section className="px-5 py-28 md:px-8 md:py-44">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="flex flex-col gap-8">
              <span className="tech text-muted-foreground text-xs tracking-[0.25em] uppercase block">
                CÓDIGO DE RECONHECIMENTO
              </span>
              <h2 className="display-lg text-foreground">
                Você reconhece os seus.
              </h2>
            </div>

            <div className="flex items-center justify-center gap-6 sm:gap-10 p-6 sm:p-12 border border-border/40 bg-card/10">
              <Logo className="h-20 w-20 sm:h-32 sm:w-32 md:h-44 md:w-44 shrink-0" />
              <div className="h-16 sm:h-20 w-px bg-border shrink-0" />
              <Ouroboros className="spin-slower h-20 w-20 sm:h-32 sm:w-32 md:h-44 md:w-44 shrink-0 text-foreground/90" />
            </div>
          </div>
        </div>
      </section>

      {/* 05 — CAPÍTULO I (DROP 001 — MOLDADOS) */}
      <section className="border-t border-border px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1600px]">
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

          <Reveal className="mt-12">
            <div className="relative overflow-hidden border border-border">
              <img
                src={heroEditorial}
                alt="Editorial do Drop 001 — MOLDADOS"
                width={1408}
                height={1760}
                className="h-[65svh] w-full object-cover object-center grayscale contrast-110 md:h-[86svh]"
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
                {activeDrop.concept} Registrado em concreto e marquise. Malha pesada 240g com serigrafia rachada na cura para registrar o processo de ruptura.
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

      <Marquee text="DROP 001 — MOLDADOS — SUBVERSIVOS NÃO NASCEM PRONTOS. SÃO MOLDADOS." items={4} />
    </div>
  );
}
