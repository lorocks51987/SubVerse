import { createFileRoute, Link } from "@tanstack/react-router";
import { Ouroboros } from "@/components/Ouroboros";
import { OuroborosInfinity } from "@/components/OuroborosInfinity";
import {
  Reveal,
  MaskReveal,
  LateralReveal,
  ClipReveal,
  LineReveal,
  FadeIn,
} from "@/components/site/Reveal";

export const Route = createFileRoute("/manifesto")({
  head: () => ({
    meta: [
      { title: "Manifesto — SUBVERSE" },
      {
        name: "description",
        content:
          "Questionar, romper, transformar, evoluir. O manifesto da SubVerse para os que não se encaixam.",
      },
      { property: "og:title", content: "Manifesto — SUBVERSE" },
      {
        property: "og:description",
        content: "Questionar, romper, transformar, evoluir. O manifesto da SubVerse.",
      },
    ],
  }),
  component: Manifesto,
});

function Manifesto() {
  return (
    <div className="concrete-surface pt-28">
      {/* HEADER */}
      <section className="px-5 md:px-8">
        <div className="mx-auto max-w-[1600px] flex flex-wrap items-end justify-between gap-6 border-b border-border/40 pb-10">
          <ClipReveal>
            <span className="tech text-muted-foreground text-xs font-mono">DOCUMENTO 001</span>
            <h1 className="display-xl text-foreground mt-3">Manifesto</h1>
          </ClipReveal>
          <Reveal y={10} delay={0.1}>
            <div className="text-right font-mono text-xs">
              <p className="tech text-muted-foreground">SUBVERSE — POSTULADO</p>
              <p className="tech text-foreground font-bold mt-0.5">SÃO PAULO — RUA</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TEXTO PRINCIPAL */}
      <section className="px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto max-w-[1600px] space-y-24 md:space-y-36">

          {/* IMPOSIÇÃO */}
          <div className="max-w-4xl">
            <p className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-[7.5rem] leading-[0.9] text-foreground">
              <MaskReveal delay={0}>
                <span className="block">Você foi ensinado</span>
              </MaskReveal>
              <MaskReveal delay={0.16}>
                <span className="block">a caber.</span>
              </MaskReveal>
            </p>
          </div>

          {/* ESTRUTURA */}
          <Reveal y={18} delay={0.06}>
            <p className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-[6rem] leading-[0.95] text-muted-foreground max-w-4xl">
              <span className="block">Ensinado a repetir</span>
              <span className="block">a forma que já existia.</span>
            </p>
          </Reveal>

          {/* RUPTURA */}
          <div className="flex justify-end">
            <div className="max-w-4xl text-right">
              <p className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-[7.5rem] leading-[0.9] text-right text-foreground">
                <LateralReveal x={40} delay={0}>
                  <span className="block">Mas nem todo mundo</span>
                </LateralReveal>
                <LateralReveal x={28} delay={0.14}>
                  <span className="block">foi feito para caber.</span>
                </LateralReveal>
              </p>
            </div>
          </div>

          {/* OS QUATRO PILARES */}
          <div>
            <LineReveal delay={0} className="mb-0" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                [
                  "01",
                  "QUESTIONAR",
                  "Nada do que te entregaram pronto foi feito pensando em você. A forma começa a mudar no momento em que você recusa a primeira certeza.",
                ],
                [
                  "02",
                  "ROMPER",
                  "A forma imposta precisa rachar antes de virar outra coisa. Ruptura não é destruição gratuita: é espaço aberto para existir.",
                ],
                [
                  "03",
                  "TRANSFORMAR",
                  "O que sobra da ruptura vira matéria-prima. Não existe versão final acabada. Existe transformação contínua.",
                ],
                [
                  "04",
                  "EVOLUIR",
                  "E então recomeça. O ciclo não tem última volta. Quem para no molde aceita ser definido pelos outros.",
                ],
              ].map(([num, title, body], i) => (
                <Reveal key={title} delay={i * 0.1} y={14}>
                  <div className="pt-6 min-h-[220px] flex flex-col justify-between p-6">
                    <div>
                      <span className="tech text-muted-foreground font-mono text-xs">
                        {num} — ETAPA
                      </span>
                      <h2 className="font-display mt-3 text-3xl uppercase md:text-4xl text-foreground">
                        {title}
                      </h2>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{body}</p>
                    </div>
                    <div className="mt-8 pt-4 border-t border-border/40 flex items-center justify-between">
                      <span className="tech text-[0.6rem] text-muted-foreground font-mono">
                        CICLO PERMANENTE
                      </span>
                      {title === "EVOLUIR" && <OuroborosInfinity className="h-4 w-10 opacity-70" />}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* AXIOMA / BLOCO CENTRAL */}
          <div className="py-16 md:py-24 text-center border-t border-b border-border/40">
            <div className="mx-auto max-w-2xl flex flex-col items-center">
              <FadeIn delay={0} className="relative my-6 h-32 w-32 md:h-44 md:w-44">
                <Ouroboros variant="intact" className="h-full w-full text-foreground/85" />
              </FadeIn>

              <p className="display-lg mt-4 max-w-[20ch] text-foreground">
                <MaskReveal delay={0.15}>
                  <span>Não é sobre o que você veste.</span>
                </MaskReveal>
                <MaskReveal delay={0.3}>
                  <span className="text-muted-foreground block mt-2">
                    É sobre o que você se torna.
                  </span>
                </MaskReveal>
              </p>

              <Reveal y={8} delay={0.5}>
                <p className="tech mt-8 max-w-[48ch] text-muted-foreground text-[0.7rem] leading-relaxed font-mono">
                  CADA PEÇA É UMA MANIFESTAÇÃO FÍSICA DE UMA IDEIA. CADA DROP É UM CAPÍTULO. QUANDO
                  O CICLO SE FECHA, O QUE RESTA É TRANSFORMAÇÃO.
                </p>
              </Reveal>
            </div>
          </div>

          {/* CONVITES NARRATIVOS */}
          <div className="pt-12">
            <div className="grid gap-12 md:grid-cols-12 items-center">
              <div className="md:col-span-6 space-y-4">
                <ClipReveal>
                  <span className="tech text-muted-foreground text-xs font-mono">PRÓXIMO PASSO</span>
                  <h3 className="display-lg text-foreground mt-2">
                    Você quer saber o que é esse universo?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base mt-4">
                    O manifesto é a espinha dorsal de tudo o que produzimos. Conheça as manifestações
                    físicas dessa filosofia.
                  </p>
                </ClipReveal>
              </div>

              <div className="md:col-span-5 md:col-start-8 flex flex-col gap-4">
                <Reveal y={10} delay={0.1}>
                  <Link
                    to="/drops/$slug"
                    params={{ slug: "001" }}
                    className="group flex items-center justify-between bg-foreground p-6 text-background transition-all hover:bg-background hover:text-foreground font-bold border border-foreground duration-300"
                  >
                    <div>
                      <span className="tech block text-[0.65rem] opacity-75 font-mono">PRIMEIRO CAPÍTULO</span>
                      <span className="font-display text-2xl uppercase tracking-wider">
                        ENTRAR NO CAPÍTULO I →
                      </span>
                    </div>
                    <Ouroboros
                      variant="forming"
                      className="h-6 w-6 transition-transform duration-700 group-hover:rotate-180 shrink-0"
                    />
                  </Link>
                </Reveal>

                <Reveal y={8} delay={0.2}>
                  <Link
                    to="/universe"
                    className="flex items-center justify-between border border-border/60 p-5 text-foreground transition-colors hover:border-foreground"
                  >
                    <div>
                      <span className="tech block text-[0.65rem] text-muted-foreground font-mono">
                        FILOSOFIA DA MARCA
                      </span>
                      <span className="tech text-sm tracking-widest uppercase font-bold font-mono">
                        EXPLORAR O UNIVERSO →
                      </span>
                    </div>
                    <span className="tech text-muted-foreground font-mono text-xs">002</span>
                  </Link>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
