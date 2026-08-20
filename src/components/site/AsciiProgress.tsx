import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";

interface AsciiProgressProps {
  totalUnits?: number;
  remainingUnits?: number;
  totalBlocks?: number;
  className?: string;
}

export function AsciiProgress({
  totalUnits = 50,
  remainingUnits = 38,
  totalBlocks = 24,
  className = "",
}: AsciiProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [filledCount, setFilledCount] = useState(0);

  const targetFilled = Math.round((remainingUnits / totalUnits) * totalBlocks);

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
    }, 45);

    return () => clearInterval(interval);
  }, [isInView, targetFilled]);

  const solidBlocks = "█".repeat(filledCount);
  const emptyBlocks = "░".repeat(totalBlocks - filledCount);

  return (
    <div ref={ref} className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="tech text-muted-foreground">TIRAGEM LIMITADA</span>
        <motion.span
          className="tech text-foreground font-bold"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          DROP 001 — CONCEITO
        </motion.span>
      </div>

      <div className="font-mono text-base sm:text-xl text-foreground tracking-widest select-none py-2 border-y border-border flex items-center justify-between overflow-x-auto">
        <span className="text-foreground">{solidBlocks}</span>
        <span className="text-muted-foreground/40">{emptyBlocks}</span>
      </div>

      <div className="flex items-center justify-between text-[0.7rem] text-muted-foreground font-mono">
        <span>{totalUnits} UNIDADES POR PEÇA</span>
        <span className="text-foreground font-semibold">SEM REPOSIÇÃO</span>
      </div>
    </div>
  );
}
