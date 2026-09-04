/**
 * SUBVERSE — Configuração e utilitários de contato & canais oficiais
 * Centraliza WhatsApp, Instagram e futura Loja para permitir trocas de canal sem reestruturar a UI.
 */

// Contatos Oficiais (Configuração única da marca)
export const SUBVERSE_WHATSAPP_NUMBER = ""; // Preencher com o número internacional oficial (ex: "5511999999999")
export const SUBVERSE_INSTAGRAM_URL = "https://instagram.com/subverse.cc";
export const SUBVERSE_SHOP_URL = ""; // Reservado para futura loja/e-commerce próprio

export type AcquireChannel = "whatsapp" | "instagram" | "shop";

export type AcquireOptions = {
  pieceName: string;
  pieceCode?: string | undefined;
  size?: string | undefined;
  dropName?: string | undefined;
  price?: string | number | undefined;
  channel?: AcquireChannel;
};

/**
 * Gera a URL oficial de aquisição/contato baseada no canal desejado (padrão: WhatsApp)
 */
export function getWhatsAppAcquireUrl({
  pieceName,
  pieceCode,
  size,
  dropName = "DROP 001 — MOLDADOS",
  price,
  channel = "whatsapp",
}: AcquireOptions): string {
  if (channel === "instagram") {
    return SUBVERSE_INSTAGRAM_URL;
  }

  if (channel === "shop" && SUBVERSE_SHOP_URL) {
    return SUBVERSE_SHOP_URL;
  }

  // Montagem da mensagem estruturada para o WhatsApp
  const formattedPrice =
    typeof price === "number"
      ? `R$ ${price.toFixed(2).replace(".", ",")}`
      : price;

  const lines = [
    `Olá, SubVerse. Gostaria de adquirir o artefato:`,
    `• Coleção: ${dropName}`,
    `• Peça: ${pieceName}${pieceCode ? ` (${pieceCode})` : ""}`,
    formattedPrice ? `• Valor: ${formattedPrice}` : "",
    size ? `• Tamanho selecionado: ${size}` : "",
  ].filter(Boolean);

  const message = encodeURIComponent(lines.join("\n"));

  if (!SUBVERSE_WHATSAPP_NUMBER) {
    return `https://wa.me/?text=${message}`;
  }

  return `https://wa.me/${SUBVERSE_WHATSAPP_NUMBER}?text=${message}`;
}

