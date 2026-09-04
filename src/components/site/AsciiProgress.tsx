import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";

interface AsciiProgressProps {
  totalUnits?: number;
  remainingUnits?: number;
  totalBlocks?: number;
  label?: string;
  sublabel?: string;
  className?: string;
}

export function AsciiProgress({
  totalUnits,
  remainingUnits,
  totalBlocks = 24,
  label = "TIRAGEM LIMITADA",
  sublabel = "SEM REPOSIÇÃO",
  className = "",
}: AsciiProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [filledCount, setFilledCount] = useState(0);

  const hasRealNumbers = totalUnits !== undefined && totalUnits > 0 && remainingUnits !== undefined;
  const targetFilled = hasRealNumbers
    ? Math.round((remainingUnits / totalUnits) * totalBlocks)
    : Math.round(totalBlocks * 0.7);

  useEffect(() => {
    if (!isInView) return;

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current <= targetFilled) {
        setFilledCount(current);
      } else {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isInView, targetFilled]);

  const solidBlocks = "█".repeat(filledCount);
  const emptyBlocks = "░".repeat(totalBlocks - filledCount);

  return (
    <div ref={ref} className={`space-y-3 border border-border/40 p-6 bg-neutral-950/80 ${className}`}>
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="tech text-muted-foreground">{label}</span>
        <motion.span
          className="tech text-foreground font-bold"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {hasRealNumbers ? `${remainingUnits} RESTANTES` : "PRODUÇÃO RESTRITA"}
        </motion.span>
      </div>

      <div className="font-mono text-base sm:text-xl text-foreground tracking-widest select-none py-3 border-y border-border/40 flex items-center justify-between overflow-x-auto">
        <span className="text-foreground">{solidBlocks}</span>
        <span className="text-muted-foreground/40">{emptyBlocks}</span>
      </div>

      <div className="flex items-center justify-between text-[0.7rem] text-muted-foreground font-mono">
        <span>{hasRealNumbers ? `${totalUnits} UNIDADES TOTAIS` : "EDIÇÃO LIMITADA"}</span>
        <span className="text-foreground font-semibold">{sublabel}</span>
      </div>
    </div>
  );
}

