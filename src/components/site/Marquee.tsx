import { Ouroboros } from "@/components/Ouroboros";

export function Marquee({
  text,
  items = 6,
  className,
}: {
  text: string;
  items?: number;
  className?: string;
}) {
  const row = Array.from({ length: items });
  return (
    <div
      className={`relative overflow-hidden border-y border-border py-3.5 bg-background select-none ${className ?? ""}`}
    >
      <div className="flex w-max animate-[marquee_34s_linear_infinite] items-center gap-10 hover:[animation-play-state:paused]">
        {row.concat(row).map((_, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-sm md:text-base uppercase tracking-[0.2em] text-foreground/80 whitespace-nowrap">
              {text}
            </span>
            <Ouroboros className="h-4 w-4 shrink-0 text-foreground/60" />
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}
