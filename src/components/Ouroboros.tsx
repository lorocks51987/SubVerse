import { cn } from "@/lib/utils";
import ouroborosImg from "@/assets/ouroboros-official.png";

export type OuroborosVariant = "intact" | "fragmented" | "forming" | "deteriorated";

type OuroborosProps = {
  className?: string;
  strokeWidth?: number;
  progress?: number;
  variant?: OuroborosVariant;
  alt?: string;
};

/**
 * The SubVerse signature: Ouroboros mascote oficial da marca.
 * Preserva a integridade e beleza visual da ilustração em todas as páginas.
 */
export function Ouroboros({
  className,
  variant = "intact",
  alt = "Ouroboros — SubVerse",
}: OuroborosProps) {
  if (variant === "deteriorated") {
    return (
      <div className={cn("relative inline-flex items-center justify-center select-none", className)}>
        <img
          src={ouroborosImg}
          alt={alt}
          width={500}
          height={500}
          className="h-full w-full object-contain contrast-125 opacity-40 grayscale"
        />
      </div>
    );
  }

  if (variant === "forming") {
    return (
      <div className={cn("relative inline-flex items-center justify-center select-none", className)}>
        <img
          src={ouroborosImg}
          alt={alt}
          width={500}
          height={500}
          className="h-full w-full object-contain contrast-125 brightness-110 opacity-90 transition-transform duration-700"
        />
      </div>
    );
  }

  // Intact & Fragmented (sem cortes de clip-path deformadores)
  return (
    <div className={cn("relative inline-flex items-center justify-center select-none", className)}>
      <img
        src={ouroborosImg}
        alt={alt}
        width={500}
        height={500}
        className={cn(
          "h-full w-full object-contain contrast-125 brightness-110 drop-shadow-[0_0_12px_rgba(255,255,255,0.05)]",
          variant === "fragmented" && "opacity-85"
        )}
      />
    </div>
  );
}
