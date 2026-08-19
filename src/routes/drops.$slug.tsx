import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Ouroboros } from "@/components/Ouroboros";
import { Reveal, MaskReveal } from "@/components/site/Reveal";
import { Marquee } from "@/components/site/Marquee";
import { getDrop } from "@/data/drops";
import { motion, AnimatePresence } from "motion/react";

export const Route = createFileRoute("/drops/$slug")({
  loader: ({ params }) => {
    const drop = getDrop(params.slug);
    if (!drop) throw notFound();
    return { drop };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Drop indisponível — SUBVERSE" }, { name: "robots", content: "noindex" }],
      };
    }
    const { drop } = loaderData;
    const title = `Drop ${drop.number} — ${drop.name} | SUBVERSE`;
    return {
      meta: [
        { title },
        { name: "description", content: drop.concept.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: drop.concept.slice(0, 155) },
      ],
    };
  },
  component: DropPage,
});

function Chapter({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-[1600px] gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <span className="tech text-muted-foreground text-xs">{index}</span>
          <h2 className="font-display mt-4 text-4xl uppercase md:text-6xl text-foreground">{title}</h2>
        </div>
        <div className="md:col-span-7 md:col-start-6">{children}</div>
      </div>
    </section>
  );
}

function DropPage() {
  const { drop } = Route.useLoaderData();
  const [size, setSize] = useState<string | null>(null);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const sold = drop.status === "ARCHIVED";
  const cover = drop.images[0];

  const made = drop.edition.made;
  const remaining = drop.edition.remaining;
  const claimed = made - remaining;
  const progressRatio = made > 0 ? claimed / made : 1;
  const totalBlocks = 24;
  const filledBlocks = Math.round(progressRatio * totalBlocks);
  const emptyBlocks = totalBlocks - filledBlocks;
  const barGraphic = "█".repeat(filledBlocks) + "░".repeat(emptyBlocks);

  const handleAcquire = () => {
    if (!size) return;
    setFeedbackSuccess(true);
    setTimeout(() => setFeedbackSuccess(false), 3500);
  };

  return (
    <div className="concrete-surface pt-28">
      {/* HEADER DO CAPÍTULO */}
      <section className="px-5 md:px-8">
        <div className="mx-auto max-w-[1600px] flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="tech text-muted-foreground text-xs">DROP // {drop.number}</span>
              <span className="tech text-muted-foreground">STATUS // {drop.status}</span>
            </div>
            <MaskReveal>
              <h1 className="display-xl mt-4 text-foreground">{drop.name}</h1>
            </MaskReveal>
          </div>
          <div className="text-right">
            <p className="tech text-muted-foreground">{drop.period}</p>
            <p className="tech text-foreground">ARTEFATO DE COLEÇÃO LIMITADA</p>
          </div>
        </div>
      </section>

      {/* COVER EDITORIAL */}
      {cover && (
        <section className="mt-14 px-5 md:px-8">
          <div className="relative mx-auto max-w-[1600px] overflow-hidden border border-border group">
            <img
              src={cover.src}
              alt={`${drop.name} — imagem editorial do capítulo ${drop.number}`}
              width={1408}
              height={1760}
              className="h-[60svh] w-full object-cover grayscale contrast-110 md:h-[88svh] transition-transform duration-[1800ms] group-hover:scale-[1.02]"
            />
            <span className="tech absolute bottom-4 left-4 bg-background/90 px-3 py-1 text-foreground border border-border">
              {cover.label}
            </span>
          </div>
        </section>
      )}

      {/* CAPÍTULOS NARRATIVOS */}
      <div className="mt-20">
        <Chapter index="I // THE CONCEPT" title="O conceito">
          <p className="text-lg leading-relaxed md:text-2xl text-foreground">{drop.concept}</p>
        </Chapter>

        <Chapter index="II // THE STORY" title="A história">
          <p className="leading-relaxed text-muted-foreground md:text-lg">{drop.story}</p>
        </Chapter>

        <Chapter index="III // THE SYMBOL" title="O símbolo">
          <p className="leading-relaxed text-muted-foreground md:text-lg">{drop.symbol}</p>
        </Chapter>

        <Chapter index="IV // THE OUROBOROS" title="O ciclo em formação">
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            <div className="relative h-28 w-28 shrink-0">
              <Ouroboros
                variant={drop.status === "ACTIVE" ? "forming" : "deteriorated"}
                className="spin-slow h-full w-full text-foreground/90"
              />
            </div>
            <p className="leading-relaxed text-muted-foreground md:text-lg">
              {drop.ouroboros}
            </p>
          </div>
        </Chapter>

        <Chapter index="V // THE PROCESS" title="O processo">
          <ol className="space-y-5">
            {drop.process.map((step, i) => (
              <Reveal key={step} delay={i * 0.06}>
                <li className="hairline flex gap-6 pt-4">
                  <span className="tech text-foreground font-mono">0{i + 1}</span>
                  <span className="leading-relaxed text-muted-foreground">{step}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </Chapter>
      </div>

      {/* THE ARTIFACT */}
      <section className="border-t border-border px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1600px]">
          <span className="tech text-muted-foreground text-xs">VI // THE ARTIFACT</span>
          <h2 className="display-lg mt-4 text-foreground">{drop.artifact.name}</h2>
          <p className="tech mt-3 text-muted-foreground">{drop.artifact.code}</p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {drop.images.map((img, i) => (
              <Reveal key={img.label} delay={i * 0.08}>
                <figure className="relative overflow-hidden border border-border group">
                  <img
                    src={img.src}
                    alt={`${drop.artifact.name} — ${img.label}`}
                    width={1200}
                    height={1500}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover grayscale contrast-110 transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                  />
                  <figcaption className="tech absolute bottom-3 left-3 bg-background/90 px-2.5 py-1 border border-border text-[0.65rem] text-foreground">
                    {img.label}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <dl className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["FABRIC", drop.artifact.fabric],
              ["FIT", drop.artifact.fit],
              ["EDITION", `${drop.edition.made} UNIDADES TOTAIS`],
              ["STATUS", drop.status],
            ].map(([k, v]) => (
              <div key={k} className="bg-background p-6">
                <dt className="tech text-muted-foreground">{k}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* THE EDITION — ESCASSEZ BRUTALISTA */}
      <section className="border-t border-border px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1600px]">
          <span className="tech text-muted-foreground text-xs">VII // THE EDITION</span>
          
          <div className="mt-8 grid gap-8 md:grid-cols-12 items-center">
            <div className="md:col-span-6 space-y-4">
              <p className="font-mono text-3xl md:text-5xl tracking-widest text-foreground font-bold">
                {claimed < 10 ? `00${claimed}` : `0${claimed}`} / {made < 10 ? `00${made}` : `0${made}`}
              </p>
              
              <div className="font-mono text-base sm:text-xl md:text-2xl text-foreground tracking-normal sm:tracking-widest overflow-hidden select-none">
                {barGraphic}
              </div>

              <p className="tech text-foreground font-bold tracking-wider">
                {sold ? "00 ARTIFACTS REMAIN" : `${remaining < 10 ? `0${remaining}` : remaining} ARTIFACTS REMAIN`}
              </p>
            </div>

            <div className="md:col-span-6 border-l border-border pl-6 space-y-3">
              <p className="tech text-muted-foreground">REGRA DO CICLO</p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {sold
                  ? "Este capítulo foi definitivamente encerrado e arquivado. Nenhuma unidade adicional será produzida."
                  : "Quando a tiragem chega ao fim, o capítulo é permanentemente arquivado. Peças SubVerse não possuem reposição."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ACQUIRE */}
      <section className="border-t border-border px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1600px] gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="tech text-muted-foreground text-xs">VIII // ACQUIRE</span>
            <h2 className="display-lg mt-4 text-foreground">Aquisição</h2>
            <p className="tech mt-2 text-muted-foreground">VALOR REVELADO NO FINAL DO CICLO</p>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <p className="font-display text-5xl md:text-7xl text-foreground">{drop.artifact.price}</p>

            {sold ? (
              <div className="mt-8 border border-border p-6 bg-card/20">
                <p className="tech text-foreground font-bold">
                  ARCHIVED — CAPÍTULO ESGOTADO
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Quem estava naquele capítulo, estava. Você pode consultar os registros na página de Arquivo.
                </p>
              </div>
            ) : (
              <>
                <div className="mt-8">
                  <span className="tech text-muted-foreground text-xs">SELECIONE A GRADE:</span>
                  <div className="mt-3 flex flex-wrap gap-2.5 sm:gap-3">
                    {drop.artifact.sizes.map((s) => (
                      <motion.button
                        key={s}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSize(s)}
                        className={`tech border px-5 py-3.5 sm:px-6 sm:py-4 transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer ${
                          size === s
                            ? "border-foreground bg-foreground text-background font-bold ring-2 ring-foreground ring-offset-2 ring-offset-background"
                            : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                        }`}
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    disabled={!size}
                    onClick={handleAcquire}
                    className="group inline-flex w-full items-center justify-between border border-foreground bg-foreground px-6 sm:px-8 py-4 sm:py-5 text-background font-bold transition-all hover:bg-background hover:text-foreground disabled:cursor-not-allowed disabled:border-border disabled:bg-transparent disabled:text-muted-foreground sm:w-auto sm:gap-12 min-h-[48px] cursor-pointer"
                  >
                    <span className="tech">
                      {size ? "ADICIONAR AO CICLO" : "SELECIONE O TAMANHO"}
                    </span>
                    <Ouroboros
                      variant="forming"
                      className="h-5 w-5 transition-transform duration-700 group-hover:rotate-180 shrink-0"
                    />
                  </motion.button>

                  <AnimatePresence>
                    {feedbackSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-4 border border-foreground/40 bg-foreground/5 p-4 text-xs tech text-foreground"
                      >
                        ✓ ARTEFATO SELECIONADO: {drop.artifact.name} [{size}]. ADICIONADO AO CICLO.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}

            <div className="mt-14 pt-6 hairline flex items-center justify-between">
              <Link to="/archive" className="tech link-underline">
                CONSULTAR TODOS OS CAPÍTULOS ARQUIVADOS →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Marquee text="SUBVERSE // CAPÍTULO 001 // MOLDADOS // TIRAGEM LIMITADA 50 PEÇAS" items={4} />
    </div>
  );
}
