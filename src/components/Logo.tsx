import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.png";

type LogoProps = {
  className?: string;
  alt?: string;
};

/**
 * Logotipo oficial SubVerse: Monograma gótico 'SV' com a serpente entrelaçada (PNG Transparente HD).
 */
export function Logo({ className, alt = "SubVerse — Logotipo Oficial SV" }: LogoProps) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center select-none shrink-0",
        className,
      )}
    >
      <img
        src={logoImg}
        alt={alt}
        width={400}
        height={400}
        className="h-full w-full object-contain contrast-110 brightness-110 drop-shadow-[0_0_12px_rgba(255,255,255,0.08)]"
      />
    </div>
  );
}
