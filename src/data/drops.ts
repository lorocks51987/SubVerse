import heroEditorial from "@/assets/hero-editorial.jpg";
import artifactFront from "@/assets/artifact-front.jpg";
import artifactDetail from "@/assets/artifact-detail.jpg";

export type Drop = {
  slug: string;
  number: string;
  name: string;
  status: "ACTIVE" | "ARCHIVED";
  period: string;
  concept: string;
  story: string;
  symbol: string;
  ouroboros: string;
  process: string[];
  edition: { made: number; remaining: number };
  artifact: {
    code: string;
    name: string;
    fabric: string;
    fit: string;
    price: string;
    sizes: string[];
  };
  images: { src: string; label: string }[];
  cover: string;
};

export const drops: Drop[] = [
  {
    slug: "001",
    number: "001",
    name: "MOLDADOS",
    status: "ACTIVE",
    period: "2026 — CAPÍTULO I",
    concept:
      "Ninguém chega inteiro. O primeiro capítulo da SubVerse trata do momento em que a forma imposta racha e algo próprio começa a aparecer no lugar.",
    story:
      "Registrado em concreto, marquise e madrugada. As peças foram fotografadas nos mesmos lugares onde a pixação decide o que a cidade lê. Nada foi limpo, nada foi corrigido: a mancha faz parte do documento.",
    symbol:
      "A estampa é uma escrita quebrada — letra condensada, traço de spray, tinta escorrendo. Ela não pede leitura imediata. Quem reconhece, reconhece.",
    ouroboros:
      "Aqui o Ouroboros aparece incompleto: a boca ainda não encontrou a cauda. Ciclo em formação. O símbolo se fecha nos capítulos seguintes.",
    process: [
      "Rabiscos em papel de padaria, digitalizados sem tratamento",
      "Tinta preta sobre cópia xerox, refotografada três vezes",
      "Malha pesada 240g lavada para perder o brilho de fábrica",
      "Serigrafia com rachadura proposital na cura",
    ],
    edition: { made: 50, remaining: 12 },
    artifact: {
      code: "SUBVERSE / DROP 001 / ARTIFACT 007",
      name: "MOLDADOS TEE",
      fabric: "100% ALGODÃO 240G / LAVAGEM ENZIMÁTICA",
      fit: "OVERSIZED / OMBRO CAÍDO / CORPO BOXY",
      price: "R$ 349",
      sizes: ["P", "M", "G", "GG"],
    },
    images: [
      { src: heroEditorial, label: "EDITORIAL / 01" },
      { src: artifactFront, label: "FRENTE / 02" },
      { src: artifactDetail, label: "DETALHE / 03" },
    ],
    cover: heroEditorial,
  },
  {
    slug: "000",
    number: "000",
    name: "PRÓLOGO",
    status: "ARCHIVED",
    period: "2025 — CAPÍTULO ZERO",
    concept:
      "Antes do nome existir, existiam trinta peças sem etiqueta entregues à mão. O capítulo zero não foi anunciado — foi distribuído.",
    story:
      "Nenhuma foto oficial. Nenhuma campanha. O registro que sobrou são fotos de quem estava lá.",
    symbol: "Apenas um círculo aberto, riscado à mão em cada peça.",
    ouroboros: "O círculo aberto é o Ouroboros antes de existir.",
    process: ["Trinta peças", "Nenhuma etiqueta", "Entrega em mãos"],
    edition: { made: 30, remaining: 0 },
    artifact: {
      code: "SUBVERSE / DROP 000 / ARTIFACT 000",
      name: "PRÓLOGO TEE",
      fabric: "100% ALGODÃO 220G",
      fit: "REGULAR",
      price: "ESGOTADO",
      sizes: [],
    },
    images: [{ src: artifactDetail, label: "ARQUIVO / 01" }],
    cover: artifactDetail,
  },
];

export const activeDrop = drops[0]!;

export function getDrop(slug: string) {
  return drops.find((d) => d.slug === slug);
}
