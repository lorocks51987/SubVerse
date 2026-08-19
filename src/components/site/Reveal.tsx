import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Easing editorial padrão da SubVerse.
 * Curva analógica — entrada acelerada, chegada suave.
 */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Reveal: Fade-in + deslizamento vertical sutil.
 * Uso: textos de suporte, parágrafos, metadados.
 */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * MaskReveal: Revelação tipográfica por máscara de overflow.
 * Sensação de texto sendo descoberto por baixo de uma superfície.
 * Uso: títulos principais, frases de manifesto.
 */
export function MaskReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <span className={"block overflow-hidden " + (className ?? "")}>
      <motion.span
        className="block will-change-transform"
        initial={
          shouldReduceMotion
            ? { opacity: 0 }
            : { y: "105%", opacity: 0 }
        }
        whileInView={
          shouldReduceMotion ? { opacity: 1 } : { y: "0%", opacity: 1 }
        }
        viewport={{ once: true, margin: "-6% 0px" }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * LateralReveal: Entrada lateral subliminar.
 * Representa ruptura — o elemento vem de fora da composição.
 * Uso: segunda frase do manifesto, elementos de contraste.
 */
export function LateralReveal({
  children,
  delay = 0,
  x = 40,
  className,
}: {
  children: ReactNode;
  delay?: number;
  x?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ClipReveal: Revelação por corte — sensação de impressão física.
 * Uso: títulos de seção, cabeçalhos editoriais.
 */
export function ClipReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { clipPath: "inset(0 0 100% 0)", opacity: 0, y: 8 }
      }
      whileInView={
        shouldReduceMotion
          ? { opacity: 1 }
          : { clipPath: "inset(0 0 0% 0)", opacity: 1, y: 0 }
      }
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ImageReveal: Entrada fotográfica analógica.
 * Scale controlado + opacidade — sensação de revelação de filme.
 * Uso: fotografias editoriais, imagens de produto.
 */
export function ImageReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={"overflow-hidden " + (className ?? "")}
      initial={
        shouldReduceMotion ? { opacity: 0 } : { scale: 1.04, opacity: 0 }
      }
      whileInView={shouldReduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * LineReveal: Linha horizontal sendo desenhada da esquerda para a direita.
 * Sensação de traço físico, impresso, analógico.
 * Uso: divisores de seção, separadores de hierarquia.
 */
export function LineReveal({
  delay = 0,
  className,
  fromRight = false,
}: {
  delay?: number;
  className?: string;
  fromRight?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={"h-px bg-border " + (className ?? "")}
      initial={
        shouldReduceMotion ? { opacity: 0 } : { scaleX: 0, opacity: 1 }
      }
      whileInView={
        shouldReduceMotion ? { opacity: 1 } : { scaleX: 1, opacity: 1 }
      }
      viewport={{ once: true, margin: "-6% 0px" }}
      style={{ transformOrigin: fromRight ? "right" : "left" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    />
  );
}

/**
 * FadeIn: Fade simples sem translação.
 * Uso: elementos de suporte, badges, microtextos, Ouroboros em entrada.
 */
export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: shouldReduceMotion ? 0.3 : 0.9, delay }}
    >
      {children}
    </motion.div>
  );
}
