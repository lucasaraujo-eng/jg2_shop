/** Fontes e tamanhos permitidos no editor de conteúdo (e aceitos pelo sanitizador). */
export const FONT_FAMILIES = [
  { label: 'Sans-serif (Arial)', value: 'Arial, Helvetica, sans-serif' },
  { label: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
  { label: 'Trebuchet', value: "'Trebuchet MS', Helvetica, sans-serif" },
  { label: 'Serifada (Georgia)', value: 'Georgia, serif' },
  { label: 'Times New Roman', value: "'Times New Roman', Times, serif" },
  { label: 'Monoespaçada', value: "'Courier New', Courier, monospace" },
] as const;

export const FONT_SIZES = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '40px'] as const;
