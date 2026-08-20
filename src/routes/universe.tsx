import { createFileRoute, Link } from "@tanstack/react-router";
import { Ouroboros } from "@/components/Ouroboros";
import { OuroborosInfinity } from "@/components/OuroborosInfinity";
import { Reveal, ClipReveal, ImageReveal, LineReveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/universe")({
  head: () => ({
    meta: [
      { title: "The SubVerse — Os 3 Pilares e a Filosofia" },
      {
        name: "description",
        content:
          "Subverso, Subversão e Ouroboros: a espinha dorsal da SubVerse. O lugar daqueles que não se encaixam.",
      },
      { property: "og:title", content: "The SubVerse — Os 3 Pilares e a Filosofia" },
      {
        property: "og:description",
        content: "Subverso, Subversão e Ouroboros: a filosofia e os pilares da SubVerse.",
      },
    ],
  }),
  component: Universe,
});

function Universe() {
  return (
    <div className="concrete-surface pt-28">
      {/* HEADER */}
      <section className="px-5 md:px-8">
        <div className="mx-auto max-w-[1600px] flex flex-wrap items-end justify-between gap-6 border-b border-border/40 pb-8">
          <ClipReveal>
            <span className="tech text-muted-foreground text-xs font-mono">ARQUIVO EDITORIAL 002</span>
            <h1 className="display-xl mt-3 text-foreground">The Subverse</h1>
          </ClipReveal>
          <Reveal y={8} delay={0.1}>
            <p className="tech text-muted-foreground max-w-[34ch] text-xs font-mono">
              A ESPINHA DORSAL DA MARCA: SUBVERSO, SUBVERSÃO E OUROBOROS.
            </p>
          </Reveal>
        </div>
      </section>

      {/* OS 3 PILARES CONCEITUAIS */}
      <section className="px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto max-w-[1600px] space-y-28">
          <div>
            <LineReveal delay={0} className="mb-8" />
            <div className="grid gap-10 lg:grid-cols-3">
              {/* 1. SUBVERSO */}
              <Reveal delay={0.05} y={16}>
                <div className="group p-6 sm:p-8 min-h-[360px] flex flex-col justify-between transition-all duration-300">
                  <div>
                    <span className="tech text-muted-foreground text-xs font-mono">PILAR 01</span>
                    <h2 className="font-display text-4xl uppercase mt-3 text-foreground transition-transform duration-300 group-hover:translate-x-0.5">
                      Subverso
                    </h2>
                    <p className="tech mt-2 text-foreground/90 text-[0.7rem] font-bold font-mono">
                      O LUGAR DOS QUE NÃO SE ENCAIXAM.
                    </p>
                    <p className="mt-6 text-muted-foreground text-sm leading-relaxed">
                      A SubVerse não nasceu para agradar o consenso. Ela existe como um território
                      para quem se recusa a ser empurrado para formas prontas. Não é sobre ser
                      diferente por vaidade: é sobre encontrar pertencimento genuíno na recusa do
                      padrão imposto.
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-border/40 flex justify-between items-center text-xs font-mono">
                    <span className="tech text-muted-foreground">TERRITÓRIO</span>
                    <span className="tech text-foreground font-bold">SÃO PAULO — BR</span>
                  </div>
                </div>
              </Reveal>

              {/* 2. SUBVERSÃO */}
              <Reveal delay={0.12} y={16}>
                <div className="group p-6 sm:p-8 min-h-[360px] flex flex-col justify-between transition-all duration-300">
                  <div>
                    <span className="tech text-muted-foreground text-xs font-mono">PILAR 02</span>
                    <h2 className="font-display text-4xl uppercase mt-3 text-foreground transition-transform duration-300 group-hover:translate-x-0.5">
                      Subversão
                    </h2>
                    <p className="tech mt-2 text-foreground/90 text-[0.7rem] font-bold font-mono">
                      QUESTIONAR, ROMPER, TRANSFORMAR.
                    </p>
                    <p className="mt-6 text-muted-foreground text-sm leading-relaxed">
                      A atitude central. Nada no mundo é imutável. Toda estrutura, regra e estética
                      pré-moldada pode — e deve — ser questionada. A subversão é o ato de rachar o
                      molde para que algo autêntico possa finalmente emergir.
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-border/40 flex justify-between items-center text-xs font-mono">
                    <span className="tech text-muted-foreground">MÉTODO</span>
                    <span className="tech text-foreground font-bold">AÇÃO CONTÍNUA</span>
                  </div>
                </div>
              </Reveal>

              {/* 3. OUROBOROS */}
              <Reveal delay={0.19} y={16}>
                <div className="group p-6 sm:p-8 min-h-[360px] flex flex-col justify-between transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="tech text-muted-foreground text-xs font-mono">PILAR 03</span>
                      <OuroborosInfinity className="h-6 w-14 opacity-60 transition-all duration-500 group-hover:opacity-100" />
                    </div>
                    <h2 className="font-display text-4xl uppercase mt-3 text-foreground transition-transform duration-300 group-hover:translate-x-0.5">
                      Ouroboros
                    </h2>
                    <p className="tech mt-2 text-foreground/90 text-[0.7rem] font-bold font-mono">
                      O CICLO ETERNO DE EVOLUÇÃO.
                    </p>
                    <p className="mt-6 text-muted-foreground text-sm leading-relaxed">
                      A serpente devorando a própria cauda em ciclo infinito. Destruição, reconstrução
                      e evolução permanente. Você nunca atinge um estado estático: você rompe, se
                      transforma e recomeça o ciclo em um nível superior.
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-border/40 flex justify-between items-center text-xs font-mono">
                    <span className="tech text-muted-foreground">SÍMBOLO</span>
                    <span className="tech text-foreground font-bold">CICLO INFINITO</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* O OUROBOROS EXPLICADO VISUALMENTE */}
          <div className="grid max-w-[1600px] items-center gap-16 md:grid-cols-2 pt-16 border-t border-border/40">
            <ImageReveal>
              <div className="relative flex items-center justify-center p-8 bg-neutral-950">
                <Ouroboros className="spin-slower h-64 w-64 text-foreground/90 md:h-[22rem] md:w-[22rem]" />
                <div className="absolute top-4 left-4">
                  <span className="tech bg-background/90 px-2.5 py-1 text-[0.65rem] text-foreground font-mono font-bold">
                    SÍMBOLO CENTRAL
                  </span>
                </div>
                <span className="tech absolute bottom-4 right-4 text-muted-foreground text-xs font-mono">
                  CICLO ETERNO
                </span>
              </div>
            </ImageReveal>

            <div className="space-y-6">
              <ClipReveal>
                <div className="space-y-4">
                  <span className="tech text-muted-foreground text-xs tracking-widest uppercase block font-mono">
                    CÓDIGO VISUAL
                  </span>
                  <h2 className="display-lg text-foreground">Você reconhece os seus.</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    O Ouroboros da SubVerse é desenhado como uma marcação de rua: anel imperfeito,
                    traço de tinta pesada e a mandíbula que encontra a cauda no topo. Ele aparece na
                    etiqueta, na serigrafia, no arquivo digital e na rua.
                  </p>
                  <p className="leading-relaxed text-muted-foreground">
                    Quando alguém encontra o símbolo sem nenhum logotipo por perto, a mensagem já foi
                    transmitida.
                  </p>
                </div>
              </ClipReveal>

              <Reveal y={10} delay={0.15}>
                <div className="pt-6 border-t border-border/40 flex flex-wrap gap-4">
                  <Link
                    to="/drops/$slug"
                    params={{ slug: "001" }}
                    className="tech border border-foreground bg-foreground px-6 py-4 text-background transition-all hover:bg-background hover:text-foreground font-bold duration-300 text-xs font-mono"
                  >
                    VER COMO O SÍMBOLO GANHA FORMA NO DROP 001 →
                  </Link>
                  <Link
                    to="/products"
                    className="tech border border-border/60 px-6 py-4 text-muted-foreground hover:border-foreground hover:text-foreground transition-colors text-xs font-mono"
                  >
                    CONHECER OS PRODUTOS →
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
