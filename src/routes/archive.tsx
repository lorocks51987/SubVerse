import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Ouroboros } from "@/components/Ouroboros";
import { drops } from "@/data/drops";

export const Route = createFileRoute("/archive")({
  head: () => ({
    meta: [
      { title: "Arquivo de Capítulos — SUBVERSE" },
      {
        name: "description",
        content:
          "O arquivo dos capítulos da SubVerse: drops ativos e arquivados. O registro de quem estava lá.",
      },
      { property: "og:title", content: "Arquivo de Capítulos — SUBVERSE" },
      {
        property: "og:description",
        content: "Todos os capítulos da SubVerse — ativos e arquivados.",
      },
    ],
  }),
  component: Archive,
});

function Archive() {
  return (
    <div className="concrete-surface pt-28">
      {/* HEADER */}
      <section className="px-5 md:px-8">
        <div className="mx-auto max-w-[1600px] flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <span className="tech text-muted-foreground text-xs">REGISTRO HISTÓRICO</span>
            <h1 className="display-xl mt-4 text-foreground">Archive</h1>
            <p className="mt-4 max-w-[48ch] leading-relaxed text-muted-foreground">
              O arquivo não é catálogo. É registro. Quem estava naquele capítulo, estava. Quando o
              número fecha, não há reposição.
            </p>
          </div>

          <div className="text-right">
            <p className="tech text-muted-foreground">MEMÓRIA PERMANENTE</p>
            <p className="tech text-foreground">SÃO PAULO // BR</p>
          </div>
        </div>
      </section>

      {/* LISTA DE DROPS */}
      <section className="mt-14 px-5 pb-32 md:px-8">
        <div className="mx-auto max-w-[1600px]">
          {drops.map((drop, i) => (
            <Reveal key={drop.slug} delay={i * 0.05}>
              <Link
                to="/drops/$slug"
                params={{ slug: drop.slug }}
                className="group grid grid-cols-1 items-center gap-6 border-t border-border py-10 transition-colors hover:bg-secondary/40 md:grid-cols-12 md:gap-8"
              >
                <div className="md:col-span-1 flex items-center gap-2">
                  <span className="tech text-muted-foreground font-mono text-base font-bold">
                    {drop.number}
                  </span>
                </div>

                <div className="md:col-span-4">
                  <div className="flex items-center gap-3">
                    <h2 className="font-display text-4xl uppercase md:text-6xl text-foreground">
                      {drop.name}
                    </h2>
                    {drop.status === "ARCHIVED" && (
                      <span className="tech border border-border px-2 py-0.5 text-[0.6rem] text-muted-foreground">
                        ENCERRADO
                      </span>
                    )}
                  </div>
                  <p className="tech text-muted-foreground text-[0.65rem] mt-2">{drop.period}</p>
                </div>

                <div className="overflow-hidden md:col-span-3 border border-border">
                  <img
                    src={drop.cover}
                    alt={`Capa do Drop ${drop.number} — ${drop.name}`}
                    width={800}
                    height={500}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover grayscale contrast-110 transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                  />
                </div>

                <p className="max-w-[38ch] text-sm leading-relaxed text-muted-foreground md:col-span-3">
                  {drop.concept}
                </p>

                <div className="flex items-center justify-between gap-4 md:col-span-1 md:flex-col md:items-end">
                  <span
                    className={`tech px-2 py-1 text-[0.65rem] ${
                      drop.status === "ACTIVE"
                        ? "border border-foreground bg-foreground text-background font-bold"
                        : "border border-border text-muted-foreground"
                    }`}
                  >
                    {drop.status}
                  </span>
                  <span className="tech text-muted-foreground text-[0.6rem]">
                    {drop.edition.made} PEÇAS
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-border py-12">
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0">
                <Ouroboros variant="deteriorated" className="spin-slower text-foreground/40" />
              </div>
              <div>
                <p className="tech text-foreground text-xs sm:text-sm">
                  PRÓXIMO CAPÍTULO EM FORMAÇÃO
                </p>
                <p className="tech text-muted-foreground text-[0.65rem] mt-1">
                  O CICLO NUNCA PARA DE GIRAR.
                </p>
              </div>
            </div>

            <Link
              to="/products"
              className="tech border border-border px-5 py-3 text-muted-foreground hover:border-foreground hover:text-foreground w-full sm:w-auto text-center"
            >
              VER PRODUTOS DISPONÍVEIS →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
