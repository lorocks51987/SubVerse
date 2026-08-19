// CURRENT COMMERCE — Produtos comerciais atuais da SubVerse para geração de caixa
// NÃO misturar com os Drops conceituais (Camada 3).

import img1 from "@/assets/products/current/1d040f67-cabf-46cc-86e2-a4feba5d7d46.jpeg";
import img2 from "@/assets/products/current/34ebb047-9b96-46aa-bc21-71ee16acb684.jpeg";
import img3 from "@/assets/products/current/4333ea2d-b2c0-403b-b025-2e6b6b2065dc.jpeg";
import img4 from "@/assets/products/current/45782495-a474-4e9e-a85a-0535a4da007a.jpeg";
import img5 from "@/assets/products/current/52f5dccc-8ade-4096-8417-9ee499709154.jpeg";
import img6 from "@/assets/products/current/54f2719d-db7a-4690-ab58-e6fbaf5a027e.jpeg";
import img7 from "@/assets/products/current/59aceca9-b33d-40e9-a2ff-de3b3917c885.jpeg";
import img8 from "@/assets/products/current/6516c286-5dfa-4c85-b0ce-dcc9bfa685df.jpeg";
import img9 from "@/assets/products/current/69308469-4b79-406f-866a-7ff31ad073a3.jpeg";
import img10 from "@/assets/products/current/7b83d7ea-bd60-4d98-a431-dc9d8ffa418b.jpeg";
import img11 from "@/assets/products/current/842b794c-a061-4ee7-89b3-69e90eaf23d2.jpeg";
import img12 from "@/assets/products/current/8f8401c0-9d8e-441e-ac58-cb6258f51395.jpeg";

export type Product = {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  price: string;
  rawPrice: number;
  fabric: string;
  weight: string;
  fit: string;
  color: string;
  sizes: string[];
  description: string;
  images: {
    src: string;
    label: string;
  }[];
  featured: boolean;
};

export const currentProducts: Product[] = [
  {
    id: "oversized-eclipse",
    sku: "SV-COMM-001",
    name: "Oversized Eclipse",
    subtitle: "Camiseta Streetwear Premium",
    price: "R$ 149,90",
    rawPrice: 149.9,
    fabric: "100% Algodão Penteado",
    weight: "240g / m²",
    fit: "Oversized Boxy",
    color: "Preto Mineral",
    sizes: ["P", "M", "G", "GG"],
    description:
      "Camiseta com corte boxy amplo, gola canelada grossa de 3cm e costura reforçada de ombro a ombro. Toque macio e caimento pesado estruturado.",
    images: [
      { src: img1, label: "FRENTE" },
      { src: img2, label: "COSTAS" },
      { src: img3, label: "DETALHE / GOLA" },
    ],
    featured: true,
  },
  {
    id: "shadow-suedine",
    sku: "SV-COMM-002",
    name: "Shadow",
    subtitle: "Suedine Heavyweight Tee",
    price: "R$ 169,90",
    rawPrice: 169.9,
    fabric: "Malha Suedine Premium",
    weight: "260g / m²",
    fit: "Oversized Dropped Shoulder",
    color: "Preto Absoluto",
    sizes: ["P", "M", "G", "GG"],
    description:
      "Tecido Suedine com acabamento aveludado e caimento superior. Não desbota, toque aveludado com excelente respirabilidade e resistência.",
    images: [
      { src: img4, label: "FRENTE" },
      { src: img5, label: "COSTAS" },
      { src: img6, label: "DETALHE" },
    ],
    featured: true,
  },
  {
    id: "void-minimal",
    sku: "SV-COMM-003",
    name: "Void",
    subtitle: "Heavyweight Core Tee",
    price: "R$ 139,90",
    rawPrice: 139.9,
    fabric: "100% Algodão 240g",
    weight: "240g / m²",
    fit: "Boxy Relaxed",
    color: "Preto Carvão",
    sizes: ["P", "M", "G", "GG"],
    description:
      "A essência pura da SubVerse. Silhueta limpa, sem estampas frontais exageradas, foco total na qualidade do tecido e no caimento.",
    images: [
      { src: img7, label: "FRENTE" },
      { src: img8, label: "COSTAS" },
      { src: img9, label: "DETALHE" },
    ],
    featured: false,
  },
  {
    id: "black-soul",
    sku: "SV-COMM-004",
    name: "Black Soul",
    subtitle: "Suedine Engineered Tee",
    price: "R$ 179,90",
    rawPrice: 179.9,
    fabric: "Suedine Premium Heavy",
    weight: "260g / m²",
    fit: "Oversized Estruturado",
    color: "Preto",
    sizes: ["M", "G", "GG"],
    description:
      "Desenvolvida com modelagem desenvolvida do zero para manter ombros alinhados mesmo após repetidas lavagens. Peça chave da operação atual.",
    images: [
      { src: img10, label: "FRENTE" },
      { src: img11, label: "DETALHE / COSTURA" },
      { src: img12, label: "COSTAS" },
    ],
    featured: false,
  },
];

export function getProduct(id: string) {
  return currentProducts.find((p) => p.id === id);
}
