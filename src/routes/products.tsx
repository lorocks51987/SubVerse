import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { currentProducts, type Product } from "@/data/products";
import { Reveal } from "@/components/site/Reveal";
import { Ouroboros } from "@/components/Ouroboros";
import { getWhatsAppAcquireUrl } from "@/lib/whatsapp";
import { SizeGuideModal } from "@/components/site/SizeGuideModal";
import { motion, AnimatePresence } from "motion/react";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Produtos — SUBVERSE" },
      {
        name: "description",
        content:
          "Peças essenciais e catálogo da SubVerse: camisetas pesadas 240g e suedine premium.",
      },
      { property: "og:title", content: "Produtos — SUBVERSE" },
      {
        property: "og:description",
        content: "Camisetas oversized de linha contínua em suedine e algodão pesado.",
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string | null>("M");
  const [activeFilter, setActiveFilter] = useState<string>("TODOS");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const fabrics = ["TODOS", "ALGODÃO", "SUEDINE"];

  const filteredProducts = currentProducts.filter((p) => {
    if (activeFilter === "TODOS") return true;
    if (activeFilter === "ALGODÃO") return p.fabric.toLowerCase().includes("algodão");
    if (activeFilter === "SUEDINE") return p.fabric.toLowerCase().includes("suedine");
    return true;
  });

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setSelectedImageIndex(0);
    setSelectedSize("M");
  };

  const whatsappUrl = selectedProduct
    ? getWhatsAppAcquireUrl({
        pieceName: selectedProduct.name,
        pieceCode: selectedProduct.sku,
        dropName: "CATÁLOGO SUBVERSE",
        size: selectedSize ?? undefined,
      })
    : "#";

  return (
    <div className="concrete-surface pt-28">
      {/* HEADER: TÍTULO VISÍVEL, CLARO E IMPONENTE */}
      <section className="px-5 md:px-8">
        <div className="mx-auto max-w-[1600px] flex flex-wrap items-end justify-between gap-6 border-b border-border/40 pb-8">
          <div>
            <span className="tech text-muted-foreground text-xs font-mono">ARQUIVO COMERCIAL</span>
            <h1 className="font-display text-5xl sm:text-7xl md:text-9xl uppercase text-foreground mt-3 leading-[0.9]">
              Produtos
            </h1>
            <p className="tech mt-3 max-w-[54ch] text-muted-foreground text-xs font-mono">
              MODELAGEM OVERSIZED, ALGODÃO 240G E SUEDINE PREMIUM. PEÇAS DE PRODUÇÃO CONTÍNUA.
            </p>
          </div>

          <div className="text-right font-mono text-xs">
            <p className="tech text-muted-foreground">SÃO PAULO — BRASIL</p>
            <p className="tech text-foreground font-bold mt-0.5">ENTREGA NACIONAL</p>
          </div>
        </div>

        {/* FILTROS DE MATERIAL */}
        <div className="mx-auto max-w-[1600px] flex flex-wrap items-center gap-2 sm:gap-3 pt-6">
          <span className="tech text-muted-foreground mr-2 text-xs font-mono">FILTRAR MATERIAL:</span>
          {fabrics.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`tech border px-3.5 py-2 sm:px-4 sm:py-2 transition-all duration-200 min-h-[40px] flex items-center justify-center cursor-pointer font-mono text-xs ${
                activeFilter === f
                  ? "border-foreground bg-foreground text-background font-bold"
                  : "border-border/60 text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* GRADE DE PRODUTOS */}
      <section className="mt-12 px-5 pb-28 md:px-8">
        <div className="mx-auto max-w-[1600px] grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product, idx) => (
            <Reveal key={product.id} delay={idx * 0.06}>
              <div
                onClick={() => openProductModal(product)}
                className="group cursor-pointer flex flex-col justify-between h-full"
              >
                <div className="relative overflow-hidden aspect-[3/4] bg-neutral-950">
                  <img
                    src={product.images[0]?.src}
                    alt={`${product.name} — ${product.subtitle}`}
                    width={800}
                    height={1066}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover grayscale contrast-110 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="tech bg-background/90 px-2 py-1 text-[0.6rem] text-foreground font-mono font-bold">
                      PEÇA 00{idx + 1}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="tech bg-background/90 px-2 py-1 text-[0.6rem] text-muted-foreground font-mono">
                      {product.weight}
                    </span>
                  </div>
                </div>

                <div className="pt-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-display text-2xl uppercase tracking-wide text-foreground">
                        {product.name}
                      </h3>
                      <span className="font-display text-lg text-foreground font-bold">
                        {product.price}
                      </span>
                    </div>
                    <p className="tech mt-1 text-muted-foreground text-[0.65rem] font-mono">
                      {product.subtitle}
                    </p>
                    <p className="tech mt-2 text-muted-foreground text-[0.65rem] font-mono">
                      MATÉRIA: {product.fabric}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/40">
                    <span className="tech text-foreground font-bold text-xs font-mono">VER PEÇA →</span>
                    <Ouroboros className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-transform duration-500 group-hover:rotate-90" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MODAL DETALHADO */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-4 overflow-y-auto"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl border border-border/80 bg-neutral-950 p-5 sm:p-6 md:p-10 my-auto shadow-2xl max-h-[92vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="tech absolute top-4 right-4 sm:top-6 sm:right-6 border border-border/60 px-3 py-1.5 text-muted-foreground hover:border-foreground hover:text-foreground transition-colors min-h-[38px] flex items-center justify-center cursor-pointer text-xs font-mono"
              >
                FECHAR ✕
              </button>

              <div className="grid gap-8 md:grid-cols-2 mt-8 md:mt-4">
                {/* Galeria Interativa */}
                <div className="space-y-3">
                  <div className="overflow-hidden aspect-[4/5] bg-neutral-950 relative">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={selectedImageIndex}
                        src={selectedProduct.images[selectedImageIndex]?.src}
                        alt={selectedProduct.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="h-full w-full object-cover grayscale contrast-110 absolute inset-0"
                      />
                    </AnimatePresence>
                  </div>

                  {/* Miniaturas */}
                  <div className="grid grid-cols-3 gap-2">
                    {selectedProduct.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImageIndex(i)}
                        className={`aspect-square overflow-hidden p-0.5 transition-all cursor-pointer ${
                          selectedImageIndex === i
                            ? "border border-foreground opacity-100 ring-2 ring-foreground"
                            : "border border-border/40 opacity-50 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img.src}
                          alt={img.label}
                          className="h-full w-full object-cover grayscale"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ficha Técnica & Aquisição */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="tech text-foreground/90 bg-background/90 px-2.5 py-1 text-[0.65rem] font-mono font-bold">
                        {selectedProduct.sku}
                      </span>
                      <span className="tech text-muted-foreground text-[0.65rem] font-mono">
                        COR: {selectedProduct.color}
                      </span>
                    </div>

                    <h2 className="display-lg mt-3 text-foreground">{selectedProduct.name}</h2>
                    <p className="font-display text-3xl sm:text-4xl mt-3 text-foreground font-bold">
                      {selectedProduct.price}
                    </p>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {selectedProduct.description}
                    </p>

                    <dl className="mt-6 space-y-2 border-t border-border/40 pt-4 text-xs font-mono">
                      <div className="flex justify-between">
                        <dt className="tech text-muted-foreground">COMPOSIÇÃO:</dt>
                        <dd className="tech text-foreground">{selectedProduct.fabric}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="tech text-muted-foreground">GRAMATURA:</dt>
                        <dd className="tech text-foreground">{selectedProduct.weight}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="tech text-muted-foreground">CORTE:</dt>
                        <dd className="tech text-foreground">{selectedProduct.fit}</dd>
                      </div>
                    </dl>

                    {/* Seleção de Tamanho */}
                    <div className="mt-6">
                      <div className="flex items-center justify-between">
                        <span className="tech text-muted-foreground text-xs font-mono">
                          SELECIONE A GRADE:
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsSizeGuideOpen(true)}
                          className="tech text-foreground hover:underline text-xs font-mono font-bold cursor-pointer"
                        >
                          TABELA DE MEDIDAS →
                        </button>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedProduct.sizes.map((s) => (
                          <motion.button
                            key={s}
                            whileTap={{ scale: 0.94 }}
                            onClick={() => setSelectedSize(s)}
                            className={`tech border px-4 py-3 sm:px-5 sm:py-3 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer font-mono ${
                              selectedSize === s
                                ? "border-foreground bg-foreground text-background font-bold ring-2 ring-foreground"
                                : "border-border/60 text-muted-foreground hover:border-foreground hover:text-foreground"
                            }`}
                          >
                            {s}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border/40">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tech block w-full bg-foreground py-4 text-center text-background font-bold transition-all hover:bg-background hover:text-foreground border border-foreground min-h-[52px] cursor-pointer"
                    >
                      ADQUIRIR VIA WHATSAPP {selectedSize ? `(${selectedSize})` : ""}
                    </a>

                    <p className="tech mt-3 text-center text-[0.6rem] text-muted-foreground font-mono">
                      ENVIO NACIONAL — PEÇAS DE PRODUÇÃO CONTÍNUA
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Size Guide Modal */}
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </div>
  );
}
