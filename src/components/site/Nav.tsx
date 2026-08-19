import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? "border-border/80 bg-background/95 backdrop-blur-md shadow-lg"
          : "border-border/30 bg-background/75 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:px-8">
        <Link to="/" className="group flex items-center gap-3.5">
          <Logo className="h-8 w-8 transition-transform duration-500 group-hover:scale-105" />
          <span className="font-display text-[1.18rem] tracking-[0.24em] uppercase text-foreground">
            Subverse
          </span>
        </Link>

        {/* NAVEGAÇÃO DESKTOP */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/universe"
            className="tech link-underline text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground font-bold" }}
          >
            UNIVERSE
          </Link>
          <Link
            to="/drops/$slug"
            params={{ slug: "001" }}
            className="tech link-underline text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground font-bold" }}
          >
            DROPS
          </Link>
          <Link
            to="/products"
            className="tech link-underline text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground font-bold" }}
          >
            PRODUTOS
          </Link>
          <Link
            to="/archive"
            className="tech link-underline text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground font-bold" }}
          >
            ARCHIVE
          </Link>
          <Link
            to="/manifesto"
            className="tech link-underline text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground font-bold" }}
          >
            MANIFESTO
          </Link>
        </div>

        {/* BOTÃO MOBILE */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="tech text-foreground md:hidden border border-border px-3.5 py-2.5 hover:border-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          aria-label={open ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          aria-expanded={open}
        >
          {open ? "FECHAR" : "MENU"}
        </button>
      </nav>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="border-b border-border bg-background/98 backdrop-blur-xl px-6 py-8 md:hidden shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-5">
            <Link
              to="/universe"
              onClick={() => setOpen(false)}
              className="font-display text-xl sm:text-2xl uppercase tracking-wider text-muted-foreground hover:text-foreground py-3 border-b border-border/40 transition-colors"
              activeProps={{ className: "text-foreground font-bold" }}
            >
              UNIVERSE
            </Link>
            <Link
              to="/drops/$slug"
              params={{ slug: "001" }}
              onClick={() => setOpen(false)}
              className="font-display text-xl sm:text-2xl uppercase tracking-wider text-muted-foreground hover:text-foreground py-3 border-b border-border/40 transition-colors"
              activeProps={{ className: "text-foreground font-bold" }}
            >
              DROPS
            </Link>
            <Link
              to="/products"
              onClick={() => setOpen(false)}
              className="font-display text-xl sm:text-2xl uppercase tracking-wider text-muted-foreground hover:text-foreground py-3 border-b border-border/40 transition-colors"
              activeProps={{ className: "text-foreground font-bold" }}
            >
              PRODUTOS
            </Link>
            <Link
              to="/archive"
              onClick={() => setOpen(false)}
              className="font-display text-xl sm:text-2xl uppercase tracking-wider text-muted-foreground hover:text-foreground py-3 border-b border-border/40 transition-colors"
              activeProps={{ className: "text-foreground font-bold" }}
            >
              ARCHIVE
            </Link>
            <Link
              to="/manifesto"
              onClick={() => setOpen(false)}
              className="font-display text-xl sm:text-2xl uppercase tracking-wider text-muted-foreground hover:text-foreground py-3 transition-colors"
              activeProps={{ className: "text-foreground font-bold" }}
            >
              MANIFESTO
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
