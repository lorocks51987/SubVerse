import { motion, AnimatePresence } from "motion/react";
import { Ouroboros } from "@/components/Ouroboros";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  const measurements = [
    { size: "P", chest: "56 cm", length: "72 cm", sleeve: "23 cm" },
    { size: "M", chest: "58 cm", length: "75 cm", sleeve: "24 cm" },
    { size: "G", chest: "61 cm", length: "78 cm", sleeve: "25 cm" },
    { size: "GG", chest: "64 cm", length: "81 cm", sleeve: "26 cm" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl border border-border/80 bg-neutral-950 p-6 sm:p-8 md:p-10 shadow-2xl text-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-border/60 pb-5">
              <div>
                <span className="tech text-muted-foreground text-xs font-mono block">
                  ESPECIFICAÇÃO DE CORTE
                </span>
                <h3 className="font-display text-2xl sm:text-3xl uppercase mt-1 text-foreground">
                  Tabela de Medidas
                </h3>
                <p className="tech text-muted-foreground text-xs font-mono mt-1">
                  MODELAGEM BOXY OVERSIZED — MEDIDAS EM CENTÍMETROS
                </p>
              </div>
              <button
                onClick={onClose}
                className="tech text-muted-foreground hover:text-foreground text-xs font-bold border border-border/60 hover:border-foreground px-3 py-1.5 transition-colors cursor-pointer"
              >
                FECHAR ✕
              </button>
            </div>

            {/* Tabela */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-border/60 text-muted-foreground">
                    <th className="pb-3 pr-4 font-bold">GRADE</th>
                    <th className="pb-3 px-4 font-bold">TÓRAX / LARGURA</th>
                    <th className="pb-3 px-4 font-bold">COMPRIMENTO</th>
                    <th className="pb-3 pl-4 font-bold">MANGA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {measurements.map((row) => (
                    <tr key={row.size} className="hover:bg-neutral-900/60 transition-colors">
                      <td className="py-3.5 pr-4 font-bold text-foreground">{row.size}</td>
                      <td className="py-3.5 px-4 text-neutral-300">{row.chest}</td>
                      <td className="py-3.5 px-4 text-neutral-300">{row.length}</td>
                      <td className="py-3.5 pl-4 text-neutral-300">{row.sleeve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Dica de Caimento */}
            <div className="mt-6 pt-5 border-t border-border/40 flex items-center justify-between text-muted-foreground text-xs">
              <p className="font-mono">
                Recomendamos escolher o seu tamanho usual para caimento oversized autêntico.
              </p>
              <Ouroboros variant="forming" className="h-6 w-6 shrink-0 text-foreground/40 hidden sm:block" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
