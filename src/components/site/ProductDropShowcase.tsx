import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { DropPiece } from "@/data/drops";
import { getWhatsAppAcquireUrl } from "@/lib/whatsapp";
import { Ouroboros } from "@/components/Ouroboros";

interface ProductDropShowcaseProps {
  pieces: DropPiece[];
  onOpenSizeGuide: () => void;
  dropName?: string;
}

export function ProductDropShowcase({
  pieces,
  onOpenSizeGuide,
  dropName = "DROP 001 — MOLDADOS",
}: ProductDropShowcaseProps) {
  const [activePieceIndex, setActivePieceIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("M");

  const currentPiece = pieces[activePieceIndex] ?? pieces[0];

  if (!currentPiece) return null;

  // Garante lista de imagens com fallback
  const images = currentPiece.images && currentPiece.images.length > 0
    ? currentPiece.images
    : [{ src: currentPiece.image, label: "FRENTE" }];

  const currentImgSrc = images[activeImageIndex]?.src ?? currentPiece.image;

  const handleSelectPiece = (index: number) => {
    setActivePieceIndex(index);
    setActiveImageIndex(0);
    const newPiece = pieces[index];
    if (newPiece && newPiece.sizes.length > 0) {
      setSelectedSize(newPiece.sizes.includes("M") ? "M" : newPiece.sizes[0] ?? "M");
    }
  };

  const handlePrevPiece = () => {
    const nextIdx = (activePieceIndex - 1 + pieces.length) % pieces.length;
    handleSelectPiece(nextIdx);
  };

  const handleNextPiece = () => {
    const nextIdx = (activePieceIndex + 1) % pieces.length;
    handleSelectPiece(nextIdx);
  };

  // Formatação de Preço Provisório / Definitivo
  const formattedPrice =
    currentPiece.price === undefined || currentPiece.price === null || currentPiece.price === ""
      ? "PREÇO A DEFINIR"
      : typeof currentPiece.price === "number"
      ? `R$ ${currentPiece.price.toFixed(2).replace(".", ",")}`
      : currentPiece.price;

  const whatsappUrl = getWhatsAppAcquireUrl({
    pieceName: currentPiece.name,
    pieceCode: currentPiece.code,
    size: selectedSize,
    dropName,
    price: currentPiece.price ? formattedPrice : undefined,
  });


  return (
    <div className="w-full">
      {/* SELETOR DE PEÇAS / NAVEGADOR DO DROP */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-5">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {pieces.map((p, idx) => {
            const isActive = idx === activePieceIndex;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPiece(idx)}
                className={`tech px-3.5 py-2 text-xs font-mono transition-all duration-200 cursor-pointer flex items-center gap-2 shrink-0 ${
                  isActive
                    ? "bg-foreground text-background font-bold ring-1 ring-foreground"
                    : "border border-border/60 text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                <span>0{idx + 1}</span>
                <span className="hidden xs:inline uppercase">{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* NAVEGAÇÃO ANTERIOR / PRÓXIMO */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-mono">
          <span className="tech text-muted-foreground">
            PEÇA 0{activePieceIndex + 1} / 0{pieces.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevPiece}
              aria-label="Peça anterior"
              className="tech border border-border/60 p-2 hover:border-foreground hover:text-foreground transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
            >
              ←
            </button>
            <button
              onClick={handleNextPiece}
              aria-label="Próxima peça"
              className="tech border border-border/60 p-2 hover:border-foreground hover:text-foreground transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* VITRINE PROTAGONISTA: FOTO + INFORMAÇÕES COMERCIAIS */}
      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12 items-start">
        {/* COLUNA ESQUERDA: FOTO PROTAGONISTA & MACRO/DETALHES */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative overflow-hidden bg-neutral-950 aspect-[3/4] sm:aspect-[4/5] border border-border/40 group">
            <AnimatePresence mode="wait">
              <motion.img
                key={`${currentPiece.id}-${activeImageIndex}`}
                src={currentImgSrc}
                alt={`${currentPiece.name} — SubVerse`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full object-cover grayscale contrast-110"
              />
            </AnimatePresence>

            {/* Badges de Identificação na Foto */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="tech bg-background/90 px-3 py-1.5 text-xs text-foreground font-mono font-bold">
                {currentPiece.code}
              </span>
              {currentPiece.isHero && (
                <span className="tech bg-foreground text-background px-2.5 py-1.5 text-[0.65rem] font-mono font-bold tracking-wider">
                  HERO PIECE
                </span>
              )}
            </div>

            {/* Botões rápidos de slide dentro da imagem (mobile-friendly) */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 pointer-events-none sm:hidden">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevPiece();
                }}
                className="pointer-events-auto bg-background/80 text-foreground p-2 text-xs font-mono backdrop-blur-sm border border-border/40 active:scale-95"
              >
                ←
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextPiece();
                }}
                className="pointer-events-auto bg-background/80 text-foreground p-2 text-xs font-mono backdrop-blur-sm border border-border/40 active:scale-95"
              >
                →
              </button>
            </div>
          </div>

          {/* MINIATURAS PARA FOTOS COMPLEMENTARES / MACRO */}
          {images.length > 1 && (
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="tech text-muted-foreground text-[0.65rem] font-mono mr-1">
                ÂNGULOS / MACRO:
              </span>
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-square w-14 sm:w-16 overflow-hidden border transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? "border-foreground opacity-100 ring-2 ring-foreground"
                      : "border-border/40 opacity-50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="h-full w-full object-cover grayscale"
                  />
                  <span className="tech absolute bottom-0.5 right-0.5 bg-background/90 px-1 text-[0.55rem] font-mono">
                    0{idx + 1}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* COLUNA DIREITA: HIERARQUIA COMERCIAL LIMPA & OBJETIVA */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:pl-4">
          {/* 1. NOME & CÓDIGO */}
          <div>
            <div className="flex items-center gap-2">
              <span className="tech text-muted-foreground text-xs font-mono">
                {currentPiece.edition}
              </span>
              <span className="text-muted-foreground/40">•</span>
              <span className="tech text-foreground font-mono text-xs font-bold">
                {currentPiece.editionUnits ?? "SEM REPOSIÇÃO"}
              </span>
            </div>

            <h3 className="display-lg text-foreground text-3xl sm:text-4xl md:text-5xl mt-2 leading-[0.95]">
              {currentPiece.name}
            </h3>

            <p className="tech text-muted-foreground text-xs font-mono mt-1">
              {currentPiece.subtitle}
            </p>
          </div>

          {/* 2. PREÇO EM DESTAQUE */}
          <div className="border-t border-border/40 pt-4">
            <span className="tech text-muted-foreground text-[0.65rem] font-mono block">
              VALOR DO ARTEFATO
            </span>
            <p className="font-display text-4xl sm:text-5xl text-foreground font-bold mt-1">
              {formattedPrice}
            </p>
          </div>

          {/* 3. SELEÇÃO DE GRADE / TAMANHOS */}
          <div className="border-t border-border/40 pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="tech text-foreground text-xs font-mono font-bold">
                GRADE DISPONÍVEL:
              </span>
              <button
                type="button"
                onClick={onOpenSizeGuide}
                className="tech text-foreground hover:underline text-xs font-mono font-bold cursor-pointer"
              >
                TABELA DE MEDIDAS →
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {currentPiece.sizes.map((s) => {
                const isSelected = selectedSize === s;
                return (
                  <motion.button
                    key={s}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setSelectedSize(s)}
                    className={`tech border px-4 py-3 sm:px-5 sm:py-3.5 transition-all duration-200 min-h-[44px] min-w-[48px] flex items-center justify-center cursor-pointer font-mono text-sm ${
                      isSelected
                        ? "border-foreground bg-foreground text-background font-bold ring-2 ring-foreground"
                        : "border-border/60 text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {s}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* 4. ESPECIFICAÇÕES ESSENCIAIS (MATÉRIA / MODELAGEM / TIRAGEM) */}
          <dl className="border-t border-border/40 pt-4 space-y-2.5 text-xs font-mono">
            <div className="flex justify-between items-baseline">
              <dt className="tech text-muted-foreground">MATÉRIA:</dt>
              <dd className="tech text-foreground font-bold">{currentPiece.fabric}</dd>
            </div>
            <div className="flex justify-between items-baseline">
              <dt className="tech text-muted-foreground">MODELAGEM:</dt>
              <dd className="tech text-foreground">{currentPiece.fit}</dd>
            </div>
            <div className="flex justify-between items-baseline">
              <dt className="tech text-muted-foreground">TIRAGEM:</dt>
              <dd className="tech text-foreground font-bold">
                {currentPiece.remaining !== undefined && currentPiece.remaining > 0
                  ? `${currentPiece.remaining} UNIDADES RESTANTES`
                  : currentPiece.editionUnits ?? "EDIÇÃO LIMITADA // SEM REPOSIÇÃO"}
              </dd>
            </div>
          </dl>


          {/* 5. CTA PRINCIPAL: AQUISIÇÃO DIRETA VIA WHATSAPP */}
          <div className="pt-4 border-t border-border/40 space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-foreground px-6 py-4 sm:py-5 text-background font-bold transition-all hover:bg-background hover:text-foreground border border-foreground w-full min-h-[54px] cursor-pointer"
            >
              <span className="tech text-xs sm:text-sm tracking-wider">
                ADQUIRIR VIA WHATSAPP {selectedSize ? `(${selectedSize})` : ""}
              </span>
              <span className="tech text-sm transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            <div className="flex items-center justify-between text-[0.65rem] text-muted-foreground font-mono">
              <span>ENVIO NACIONAL COM RASTREIO</span>
              <div className="flex items-center gap-1.5">
                <Ouroboros className="h-3 w-3 text-muted-foreground" />
                <span>EDIÇÃO LIMITADA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
