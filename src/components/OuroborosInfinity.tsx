import { cn } from "@/lib/utils";
import infinityImg from "@/assets/ouroboros-infinity.png";

type OuroborosInfinityProps = {
  className?: string;
  alt?: string;
};

/**
 * Ouroboros Infinito: A serpente entrelaçada no formato do símbolo do infinito (∞).
 * Representa o ciclo eterno sem fim da SubVerse.
 * Estático, sem rotação.
 */
export function OuroborosInfinity({
  className,
  alt = "Ouroboros Infinito — SubVerse",
}: OuroborosInfinityProps) {
  return (
    <div className={cn("relative inline-flex items-center justify-center select-none shrink-0", className)}>
      <img
        src={infinityImg}
        alt={alt}
        width={600}
        height={300}
        className="h-full w-full object-contain contrast-110 brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.06)]"
      />
    </div>
  );
}
