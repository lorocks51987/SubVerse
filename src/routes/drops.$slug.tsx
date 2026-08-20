import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Ouroboros } from "@/components/Ouroboros";
import { Reveal, MaskReveal } from "@/components/site/Reveal";
import { getDrop } from "@/data/drops";
import { getWhatsAppAcquireUrl } from "@/lib/whatsapp";
import { SizeGuideModal } from "@/components/site/SizeGuideModal";
import { motion } from "motion/react";

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
    <section className="border-t border-border/40 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-[1600px] gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <span className="tech text-muted-foreground text-xs font-mono">{index}</span>
          <h2 className="font-display mt-3 text-4xl uppercase md:text-6xl text-foreground">
            {title}
          </h2>
        </div>
        <div className="md:col-span-7 md:col-start-6">{children}</div>
      </div>
    </section>
  );
}

function DropPage() {
  const { drop } = Route.useLoaderData();
  const [size, setSize] = useState<string | null>("M");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
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

  const whatsappUrl = getWhatsAppAcquireUrl({
    pieceName: drop.artifact.name,
    pieceCode: drop.artifact.code,
    dropName: `DROP ${drop.number} — ${drop.name}`,
    size: size ?? undefined,
  });

  return (
    <div className="concrete-surface pt-28">
      {/* HEADER DO CAPÍTULO */}
      <section className="px-5 md:px-8">
        <div className="mx-auto max-w-[1600px] flex flex-wrap items-end justify-between gap-6 border-b border-border/40 pb-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="tech text-muted-foreground text-xs font-mono">DROP {drop.number}</span>
              <span className="tech text-muted-foreground text-xs font-mono">STATUS: {drop.status}</span>
            </div>
            <MaskReveal>
              <h1 className="display-xl mt-3 text-foreground">{drop.name}</h1>
            </MaskReveal>
          </div>
          <div className="text-right font-mono text-xs">
            <p className="tech text-muted-foreground">{drop.period}</p>
            <p className="tech text-foreground font-bold mt-0.5">ARTEFATO DE COLEÇÃO LIMITADA</p>
          </div>
        </div>
      </section>

      {/* COVER EDITORIAL */}
      {cover && (
        <section className="mt-14 px-5 md:px-8">
          <div className="relative mx-auto max-w-[1600px] overflow-hidden bg-neutral-950 group">
            <img
              src={cover.src}
              alt={`${drop.name} — imagem editorial do capítulo ${drop.number}`}
              width={1408}
              height={1760}
              loading="eager"
              fetchPriority="high"
              className="h-[60svh] w-full object-cover grayscale contrast-110 md:h-[88svh] transition-transform duration-[1800ms] group-hover:scale-[1.02]"
            />
            <span className="tech absolute bottom-4 left-4 bg-background/90 px-3 py-1 text-foreground text-xs font-mono">
              {cover.label}
            </span>
          </div>
        </section>
      )}

      {/* CAPÍTULOS NARRATIVOS */}
      <div className="mt-20">
        <Chapter index="I — CONCEITO" title="O conceito">
          <p className="text-lg leading-relaxed md:text-2xl text-foreground font-display">{drop.concept}</p>
        </Chapter>

        <Chapter index="II — NARRATIVA" title="A história">
          <p className="leading-relaxed text-muted-foreground md:text-lg">{drop.story}</p>
        </Chapter>

        <Chapter index="III — SÍMBOLO" title="O símbolo">
          <p className="leading-relaxed text-muted-foreground md:text-lg">{drop.symbol}</p>
        </Chapter>

        <Chapter index="IV — OUROBOROS" title="O ciclo em formação">
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            <div className="relative h-28 w-28 shrink-0">
              <Ouroboros
                variant={drop.status === "ACTIVE" ? "forming" : "deteriorated"}
                className="spin-slow h-full w-full text-foreground/90"
              />
            </div>
            <p className="leading-relaxed text-muted-foreground md:text-lg">{drop.ouroboros}</p>
          </div>
        </Chapter>

        <Chapter index="V — PROCESSO" title="O processo">
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
      <section className="border-t border-border/40 px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1600px]">
          <span className="tech text-muted-foreground text-xs font-mono">VI — ARTEFATO</span>
          <h2 className="display-lg mt-3 text-foreground">{drop.artifact.name}</h2>
          <p className="tech mt-2 text-muted-foreground font-mono text-xs">{drop.artifact.code}</p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {drop.images.map((img, i) => (
              <Reveal key={img.label} delay={i * 0.08}>
                <figure className="relative overflow-hidden bg-neutral-950 group">
                  <img
                    src={img.src}
                    alt={`${drop.artifact.name} — ${img.label}`}
                    width={1200}
                    height={1500}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover grayscale contrast-110 transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                  />
                  <figcaption className="tech absolute bottom-3 left-3 bg-background/90 px-2.5 py-1 text-[0.65rem] text-foreground font-mono">
                    {img.label}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <dl className="mt-12 grid gap-px border border-border/40 bg-border/40 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["MATÉRIA", drop.artifact.fabric],
              ["MODELAGEM", drop.artifact.fit],
              ["TIRAGEM", `${drop.edition.made} UNIDADES TOTAIS`],
              ["STATUS", drop.status],
            ].map(([k, v]) => (
              <div key={k} className="bg-background p-6">
                <dt className="tech text-muted-foreground text-xs font-mono">{k}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-foreground font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* THE EDITION — ESCASSEZ */}
      <section className="border-t border-border/40 px-5 py-20 md:px-8 md:py-28 bg-neutral-950">
        <div className="mx-auto max-w-[1600px]">
          <span className="tech text-muted-foreground text-xs font-mono">VII — TIRAGEM</span>

          <div className="mt-8 grid gap-8 md:grid-cols-12 items-center">
            <div className="md:col-span-6 space-y-4">
              <p className="font-mono text-3xl md:text-5xl tracking-widest text-foreground font-bold">
                {claimed < 10 ? `00${claimed}` : `0${claimed}`} /{" "}
                {made < 10 ? `00${made}` : `0${made}`}
              </p>

              <div className="font-mono text-base sm:text-xl md:text-2xl text-foreground tracking-normal sm:tracking-widest overflow-hidden select-none">
                {barGraphic}
              </div>

              <p className="tech text-foreground font-bold tracking-wider text-xs font-mono">
                {sold
                  ? "00 ARTEFATOS RESTANTES"
                  : `${remaining < 10 ? `0${remaining}` : remaining} ARTEFATOS RESTANTES`}
              </p>
            </div>

            <div className="md:col-span-6 border-l border-border/40 pl-6 space-y-3">
              <p className="tech text-muted-foreground text-xs font-mono">REGRA DO CICLO</p>
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
      <section className="border-t border-border/40 px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1600px] gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="tech text-muted-foreground text-xs font-mono">VIII — AQUISIÇÃO</span>
            <h2 className="display-lg mt-3 text-foreground">Aquisição</h2>
            <p className="tech mt-2 text-muted-foreground text-xs font-mono">VALOR DO ARTEFATO</p>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <p className="font-display text-5xl md:text-7xl text-foreground font-bold">
              {drop.artifact.price}
            </p>

            {sold ? (
              <div className="mt-8 border border-border/60 p-6 bg-card/20">
                <p className="tech text-foreground font-bold text-xs font-mono">ARCHIVED — CAPÍTULO ESGOTADO</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Quem estava naquele capítulo, estava. Você pode consultar os registros na página
                  de Arquivo.
                </p>
              </div>
            ) : (
              <>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="tech text-muted-foreground text-xs font-mono">SELECIONE A GRADE:</span>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="tech text-foreground hover:underline text-xs font-mono font-bold cursor-pointer"
                    >
                      TABELA DE MEDIDAS →
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2.5 sm:gap-3">
                    {drop.artifact.sizes.map((s) => (
                      <motion.button
                        key={s}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSize(s)}
                        className={`tech border px-5 py-3.5 sm:px-6 sm:py-4 transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer font-mono ${
                          size === s
                            ? "border-foreground bg-foreground text-background font-bold ring-2 ring-foreground"
                            : "border-border/60 text-muted-foreground hover:border-foreground hover:text-foreground"
                        }`}
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-full items-center justify-between bg-foreground px-6 sm:px-8 py-4 sm:py-5 text-background font-bold transition-all hover:bg-background hover:text-foreground border border-foreground sm:w-auto sm:gap-12 min-h-[52px]"
                  >
                    <span className="tech text-xs tracking-wider">
                      ADQUIRIR VIA WHATSAPP {size ? `(${size})` : ""}
                    </span>
                    <span className="tech text-xs">→</span>
                  </a>
                </div>
              </>
            )}

            <div className="mt-14 pt-6 border-t border-border/40 flex items-center justify-between">
              <Link to="/archive" className="tech link-underline text-xs font-mono font-bold">
                CONSULTAR TODOS OS CAPÍTULOS ARQUIVADOS →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Size Guide Modal */}
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </div>
  );
}
