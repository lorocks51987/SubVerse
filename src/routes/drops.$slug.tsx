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
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const sold = drop.status === "ARCHIVED";

  const made = drop.edition.made;
  const remaining = drop.edition.remaining;
  const claimed = made - remaining;
  const progressRatio = made > 0 ? claimed / made : 1;
  const totalBlocks = 24;
  const filledBlocks = Math.round(progressRatio * totalBlocks);
  const emptyBlocks = totalBlocks - filledBlocks;
  const barGraphic = "█".repeat(filledBlocks) + "░".repeat(emptyBlocks);

  const images = drop.images.length > 0 ? drop.images : [{ src: drop.cover, label: "EDITORIAL" }];
  const currentImg = images[activeImageIndex] ?? images[0]!;

  const whatsappUrl = getWhatsAppAcquireUrl({
    pieceName: drop.artifact.name,
    pieceCode: drop.artifact.code,
    dropName: `DROP ${drop.number} — ${drop.name}`,
    size: size ?? undefined,
    price: drop.artifact.price,
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

      {/* ── 01. VITRINE PROTAGONISTA DO ARTEFATO (PRODUTO PRIMEIRO) ───────────── */}
      <section className="mt-10 px-5 md:px-8">
        <div className="mx-auto max-w-[1600px] grid gap-10 lg:grid-cols-12 items-start">
          {/* FOTO PRINCIPAL & MACRO */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative overflow-hidden bg-neutral-950 aspect-[4/5] border border-border/40 group">
              <img
                src={currentImg.src}
                alt={`${drop.artifact.name} — ${currentImg.label}`}
                width={1408}
                height={1760}
                loading="eager"
                fetchPriority="high"
                className="h-full w-full object-cover grayscale contrast-110 transition-transform duration-[1200ms] group-hover:scale-[1.02]"
              />
              <span className="tech absolute bottom-4 left-4 bg-background/90 px-3 py-1 text-foreground text-xs font-mono">
                {currentImg.label}
              </span>
            </div>

            {/* MINIATURAS MACRO / ÂNGULOS */}
            {images.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                <span className="tech text-muted-foreground text-[0.65rem] font-mono mr-1">
                  ÂNGULOS / DETALHES:
                </span>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-square w-16 overflow-hidden border transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-foreground opacity-100 ring-2 ring-foreground"
                        : "border-border/40 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={img.src} alt={img.label} className="h-full w-full object-cover grayscale" />
                    <span className="tech absolute bottom-0.5 right-0.5 bg-background/90 px-1 text-[0.55rem] font-mono">
                      0{idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFORMAÇÕES COMERCIAIS & AQUISIÇÃO */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:pl-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="tech bg-background/90 px-2.5 py-1 text-xs font-mono font-bold text-foreground">
                  {drop.artifact.code}
                </span>
                <span className="tech text-muted-foreground text-xs font-mono">
                  {made > 0 ? `${made} UNIDADES TOTAIS` : "EDIÇÃO LIMITADA"}
                </span>
              </div>

              <h2 className="display-lg text-foreground text-3xl sm:text-5xl mt-3">
                {drop.artifact.name}
              </h2>

              <p className="font-display text-4xl sm:text-5xl text-foreground font-bold mt-4">
                {drop.artifact.price || "PREÇO A DEFINIR"}
              </p>
            </div>

            {/* SELEÇÃO DE TAMANHO & GUIA DE MEDIDAS */}
            {!sold && (
              <div className="border-t border-border/40 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="tech text-foreground text-xs font-mono font-bold">
                    GRADE DISPONÍVEL:
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="tech text-foreground hover:underline text-xs font-mono font-bold cursor-pointer"
                  >
                    TABELA DE MEDIDAS →
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {drop.artifact.sizes.map((s) => {
                    const isSelected = size === s;
                    return (
                      <motion.button
                        key={s}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => setSize(s)}
                        className={`tech border px-4 py-3 sm:px-5 sm:py-3.5 transition-all duration-200 min-h-[44px] min-w-[48px] flex items-center justify-center cursor-pointer font-mono text-sm ${
                          isSelected
                            ? "border-foreground bg-foreground text-background font-bold ring-2 ring-foreground"
                            : "border-border/60 text-muted-foreground hover:border-foreground hover:text-foreground"
                        }`}
                      >
                        {s}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ESPECIFICAÇÕES ESSENCIAIS */}
            <dl className="border-t border-border/40 pt-4 space-y-2.5 text-xs font-mono">
              <div className="flex justify-between items-baseline">
                <dt className="tech text-muted-foreground">MATÉRIA:</dt>
                <dd className="tech text-foreground font-bold">{drop.artifact.fabric}</dd>
              </div>
              <div className="flex justify-between items-baseline">
                <dt className="tech text-muted-foreground">MODELAGEM:</dt>
                <dd className="tech text-foreground">{drop.artifact.fit}</dd>
              </div>
              <div className="flex justify-between items-baseline">
                <dt className="tech text-muted-foreground">DISPONIBILIDADE:</dt>
                <dd className="tech text-foreground font-bold">
                  {sold
                    ? "ESGOTADO"
                    : made > 0 && remaining > 0
                    ? `${remaining} UNIDADES RESTANTES`
                    : "SEM REPOSIÇÃO"}
                </dd>
              </div>
            </dl>

            {/* CTA COMPRA / STATUS */}
            <div className="pt-4 border-t border-border/40 space-y-3">
              {sold ? (
                <div className="border border-border/60 p-5 bg-card/20 text-center">
                  <p className="tech text-foreground font-bold text-xs font-mono">
                    ARCHIVED — CAPÍTULO ESGOTADO
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Tiragem encerrada. Consulte registros no Arquivo.
                  </p>
                </div>
              ) : (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between bg-foreground px-6 py-4 sm:py-5 text-background font-bold transition-all hover:bg-background hover:text-foreground border border-foreground w-full min-h-[54px] cursor-pointer"
                >
                  <span className="tech text-xs sm:text-sm tracking-wider">
                    ADQUIRIR VIA WHATSAPP {size ? `(${size})` : ""}
                  </span>
                  <span className="tech text-sm transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              )}

              <div className="flex items-center justify-between text-[0.65rem] text-muted-foreground font-mono">
                <span>ENVIO NACIONAL COM RASTREIO</span>
                <div className="flex items-center gap-1.5">
                  <Ouroboros className="h-3 w-3 text-muted-foreground" />
                  <span>PRODUÇÃO LIMITADA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. TIRAGEM / ESCASSEZ (CICLO) ────────────────────────────────────── */}
      <section className="mt-20 border-t border-border/40 px-5 py-16 md:px-8 bg-neutral-950">
        <div className="mx-auto max-w-[1600px]">
          <span className="tech text-muted-foreground text-xs font-mono">TIRAGEM & ESCASSEZ</span>

          <div className="mt-6 grid gap-8 md:grid-cols-12 items-center">
            <div className="md:col-span-6 space-y-3">
              {made > 0 ? (
                <>
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
                </>
              ) : (
                <div className="space-y-3">
                  <p className="font-display text-2xl sm:text-4xl text-foreground uppercase">
                    Tiragem Estrita // Sem Reposição
                  </p>
                  <p className="tech text-xs text-foreground font-mono font-bold">
                    PRODUÇÃO RESTRITA — CAPÍTULO EM FORMAÇÃO
                  </p>
                </div>
              )}
            </div>

            <div className="md:col-span-6 border-l border-border/40 pl-6 space-y-2">
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


      {/* ── 03. CAPÍTULOS NARRATIVOS (CONCEITO DEPOIS) ─────────────────────────── */}
      <div className="mt-10">
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

      <div className="border-t border-border/40 px-5 py-12 md:px-8">
        <div className="mx-auto max-w-[1600px] flex items-center justify-between">
          <Link to="/archive" className="tech link-underline text-xs font-mono font-bold">
            CONSULTAR TODOS OS CAPÍTULOS ARQUIVADOS →
          </Link>
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </div>
  );
}

