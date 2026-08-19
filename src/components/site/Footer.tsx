import { Link } from "@tanstack/react-router";
import { Ouroboros } from "@/components/Ouroboros";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="relative border-t border-border px-5 pt-20 pb-14 md:px-8 bg-neutral-950">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-4">
              <Logo className="h-12 w-12" />
              <div>
                <p className="tech text-muted-foreground text-xs">
                  SUBVERSE // SÃO PAULO // BRASIL
                </p>
                <p className="tech text-foreground font-bold text-xs mt-0.5">IDENTIDADE OFICIAL</p>
              </div>
            </div>
            <h2 className="display-lg drip mt-8 max-w-[14ch]">Você reconhece os seus.</h2>
          </div>

          <div className="flex items-center gap-6">
            <Ouroboros className="spin-slower h-24 w-24 md:h-28 md:w-28 text-foreground/80" />
          </div>
        </div>

        <div className="hairline mt-16 flex flex-col gap-6 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4 sm:gap-8">
            <Link
              to="/universe"
              className="tech text-muted-foreground hover:text-foreground transition-colors text-xs py-1"
            >
              UNIVERSE
            </Link>
            <Link
              to="/drops/$slug"
              params={{ slug: "001" }}
              className="tech text-muted-foreground hover:text-foreground transition-colors text-xs py-1"
            >
              DROPS
            </Link>
            <Link
              to="/products"
              className="tech text-muted-foreground hover:text-foreground transition-colors text-xs py-1"
            >
              PRODUTOS
            </Link>
            <Link
              to="/archive"
              className="tech text-muted-foreground hover:text-foreground transition-colors text-xs py-1"
            >
              ARCHIVE
            </Link>
            <Link
              to="/manifesto"
              className="tech text-muted-foreground hover:text-foreground transition-colors text-xs py-1"
            >
              MANIFESTO
            </Link>
          </div>
          <p className="tech text-muted-foreground text-xs">
            © {new Date().getFullYear()} SUBVERSE — ALL CYCLES CONTINUE
          </p>
        </div>
      </div>
    </footer>
  );
}
