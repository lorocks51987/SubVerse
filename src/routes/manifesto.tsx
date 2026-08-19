import { createFileRoute, Link } from "@tanstack/react-router";
import { Ouroboros } from "@/components/Ouroboros";
import { OuroborosInfinity } from "@/components/OuroborosInfinity";
import { Reveal } from "@/components/site/Reveal";
import { Marquee } from "@/components/site/Marquee";

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
        <div className="mx-auto max-w-[1600px] flex flex-wrap items-end justify-between gap-6 border-b border-border pb-10">
          <div>
            <span className="tech text-muted-foreground text-xs">DOCUMENTO // 001</span>
            <h1 className="display-xl text-foreground mt-4">Manifesto</h1>
          </div>
          <div className="text-right">
            <p className="tech text-muted-foreground">SUBVERSE // POSTULADO</p>
            <p className="tech text-foreground">SÃO PAULO // RUA</p>
          </div>
        </div>
      </section>

      {/* TEXTO PRINCIPAL */}
      <section className="px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto max-w-[1600px] space-y-24 md:space-y-36">
          <Reveal>
            <p className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-[7.5rem] leading-[0.9] text-foreground max-w-[15ch]">
              Você foi ensinado a caber.
            </p>
          </Reveal>

          <Reveal>
            <p className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-[6rem] leading-[0.95] text-muted-foreground max-w-[18ch]">
              Ensinado a repetir a forma que já existia.
            </p>
          </Reveal>

          <Reveal>
            <div className="flex justify-end">
              <p className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-[7.5rem] leading-[0.9] text-right text-foreground max-w-[16ch]">
                Mas nem todo mundo foi feito para caber.
              </p>
            </div>
          </Reveal>

          {/* OS QUATRO PILARES DA RUPTURA */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 pt-16 border-t border-border">
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
                "O que sobra da ruptura é matéria-prima. Não existe versão final acabada. Existe transformação contínua.",
              ],
              [
                "04",
                "EVOLUIR",
                "E então recomeça. O ciclo não tem última volta. Quem para no molde aceita ser definido pelos outros.",
              ],
            ].map(([num, title, body], i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div
                  className="border-t border-border pt-6 min-h-[220px] flex flex-col justify-between bg-card/20 p-6"
                  style={{ transform: `rotate(${i % 2 ? 0.3 : -0.3}deg)` }}
                >
                  <div>
                    <span className="tech text-muted-foreground font-mono text-xs">{num} // ETAPA</span>
                    <h2 className="font-display mt-3 text-3xl uppercase md:text-4xl text-foreground">
                      {title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {body}
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-border flex items-center justify-between">
                    <span className="tech text-[0.6rem] text-muted-foreground">CICLO PERMANENTE</span>
                    {title === "EVOLUIR" && (
                      <OuroborosInfinity className="h-4 w-10 opacity-70" />
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* OUROBOROS CENTRAL */}
          <Reveal>
            <div className="relative border border-border p-8 md:p-16 text-center bg-card/20">
              <div className="mx-auto max-w-2xl flex flex-col items-center">
                <div className="relative my-6 h-36 w-36 md:h-48 md:w-48">
                  <Ouroboros variant="intact" className="h-full w-full" />
                </div>

                <p className="display-lg mt-4 max-w-[20ch] text-foreground">
                  Não é sobre o que você veste.{" "}
                  <span className="text-muted-foreground block mt-2">
                    É sobre o que você se torna.
                  </span>
                </p>

                <p className="tech mt-8 max-w-[48ch] text-muted-foreground text-[0.7rem] leading-relaxed">
                  CADA PEÇA É UMA MANIFESTAÇÃO FÍSICA DE UMA IDEIA. CADA DROP É UM CAPÍTULO.
                  QUANDO O CICLO SE FECHA, O QUE RESTA É TRANSFORMAÇÃO.
                </p>
              </div>
            </div>
          </Reveal>

          {/* CONVITES NARRATIVOS */}
          <div className="pt-12 border-t border-border">
            <div className="grid gap-12 md:grid-cols-12 items-center">
              <div className="md:col-span-6 space-y-4">
                <span className="tech text-muted-foreground text-xs">PRÓXIMO PASSO</span>
                <h3 className="display-lg text-foreground">Você quer saber o que é esse universo?</h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  O manifesto é a espinha dorsal de tudo o que produzimos. Conheça as manifestações físicas dessa filosofia.
                </p>
              </div>

              <div className="md:col-span-5 md:col-start-8 flex flex-col gap-4">
                <Link
                  to="/drops/$slug"
                  params={{ slug: "001" }}
                  className="group flex items-center justify-between border border-foreground bg-foreground p-6 text-background transition-all hover:bg-background hover:text-foreground font-bold"
                >
                  <div>
                    <span className="tech block text-[0.65rem] opacity-75">PRIMEIRO CAPÍTULO</span>
                    <span className="font-display text-2xl uppercase tracking-wider">
                      ENTRAR NO CAPÍTULO I →
                    </span>
                  </div>
                  <Ouroboros variant="forming" className="h-6 w-6 transition-transform duration-700 group-hover:rotate-180" />
                </Link>

                <Link
                  to="/universe"
                  className="flex items-center justify-between border border-border p-5 text-foreground transition-colors hover:border-foreground"
                >
                  <div>
                    <span className="tech block text-[0.65rem] text-muted-foreground">FILOSOFIA DA MARCA</span>
                    <span className="tech text-sm tracking-widest uppercase font-bold">
                      EXPLORAR O UNIVERSO →
                    </span>
                  </div>
                  <span className="tech text-muted-foreground">002</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE DO MANIFESTO */}
      <Marquee text="QUESTIONAR — ROMPER — TRANSFORMAR — EVOLUIR — RECOMEÇAR" />
    </div>
  );
}
