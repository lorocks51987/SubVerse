import { Link } from "@tanstack/react-router";
import { motion, useSpring, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Ouroboros } from "@/components/Ouroboros";
import { Logo } from "@/components/Logo";
import { Reveal, ClipReveal } from "@/components/site/Reveal";

export function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const footerRef = useRef<HTMLElement>(null);

  // Mouse tracking ultra-sutil — apenas desktop, máximo ±5px e ±2deg
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const springX = useSpring(mouseOffset.x, { stiffness: 30, damping: 25 });
  const springY = useSpring(mouseOffset.y, { stiffness: 30, damping: 25 });
  const springRot = useSpring(mouseOffset.x * 0.15, { stiffness: 30, damping: 25 });

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const footer = footerRef.current;
    if (!footer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = footer.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Máximo ±5px
      const x = ((e.clientX - cx) / rect.width) * 10;
      const y = ((e.clientY - cy) / rect.height) * 10;
      setMouseOffset({ x, y });
    };

    footer.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => footer.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion]);

  return (
    <footer
      ref={footerRef}
      className="relative border-t border-border px-5 pt-20 pb-14 md:px-8 bg-neutral-950"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal y={10} delay={0}>
              <div className="flex items-center gap-4">
                <Logo className="h-12 w-12" />
                <div>
                  <p className="tech text-muted-foreground text-xs">
                    SUBVERSE — SÃO PAULO — BRASIL
                  </p>
                  <p className="tech text-foreground font-bold text-xs mt-0.5">IDENTIDADE OFICIAL</p>
                </div>
              </div>
            </Reveal>
            {/* Texto principal — entra com presença */}
            <ClipReveal delay={0.1}>
              <h2 className="display-lg drip mt-8 max-w-[14ch]">Você reconhece os seus.</h2>
            </ClipReveal>
          </div>

          {/* Ouroboros com mouse tracking ultra-sutil */}
          <motion.div
            className="flex items-center gap-6"
            style={{
              x: shouldReduceMotion ? 0 : springX,
              y: shouldReduceMotion ? 0 : springY,
              rotate: shouldReduceMotion ? 0 : springRot,
            }}
          >
            <Ouroboros className="spin-slower h-24 w-24 md:h-28 md:w-28 text-foreground/80" />
          </motion.div>
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
