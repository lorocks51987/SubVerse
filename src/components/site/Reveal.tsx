import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Reveal: Animação leve e suave de fade-in com deslizamento sutil.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * MaskReveal: Revelação tipográfica limpa através de máscara de overflow.
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
  return (
    <span className={"block overflow-hidden " + (className ?? "")}>
      <motion.span
        className="block"
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * TextReveal: Revelação sutil palavra por palavra com fade suave e elevação leve.
 */
export function TextReveal({
  text,
  className = "",
  delay = 0,
  align = "left",
}: {
  text: string;
  className?: string;
  delay?: number;
  align?: "left" | "center" | "right";
}) {
  const words = text.split(" ");
  const alignClass =
    align === "right"
      ? "justify-end text-right"
      : align === "center"
        ? "justify-center text-center"
        : "justify-start text-left";

  return (
    <motion.span
      className={`inline-flex flex-wrap ${alignClass} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.04,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.24em]"
          variants={{
            hidden: {
              opacity: 0,
              y: 12,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
