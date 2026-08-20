/**
 * SUBVERSE — Configuração e utilitários de contato via WhatsApp
 * Centraliza o fluxo de aquisição e contato sem checkout falso ou alerts.
 */

// Placeholder para o número oficial (formato internacional sem caracteres especiais: ex: 5511999999999)
export const SUBVERSE_WHATSAPP_NUMBER = ""; // Preencher com o número definitivo quando disponível

export type WhatsAppAcquireOptions = {
  pieceName: string;
  pieceCode?: string | undefined;
  size?: string | undefined;
  dropName?: string | undefined;
};

/**
 * Gera a URL oficial de redirecionamento para o WhatsApp
 */
export function getWhatsAppAcquireUrl({
  pieceName,
  pieceCode,
  size,
  dropName = "DROP 001 — MOLDADOS",
}: WhatsAppAcquireOptions): string {
  const lines = [
    `Olá, SubVerse. Gostaria de informações para aquisição da peça:`,
    `• Coleção: ${dropName}`,
    `• Peça: ${pieceName}${pieceCode ? ` (${pieceCode})` : ""}`,
    size ? `• Tamanho de interesse: ${size}` : "",
  ].filter(Boolean);

  const message = encodeURIComponent(lines.join("\n"));

  if (!SUBVERSE_WHATSAPP_NUMBER) {
    // Retorna link direto para a API do WhatsApp com mensagem pronta (quando o número for preenchido, direciona diretamente ao chat)
    return `https://wa.me/?text=${message}`;
  }

  return `https://wa.me/${SUBVERSE_WHATSAPP_NUMBER}?text=${message}`;
}
