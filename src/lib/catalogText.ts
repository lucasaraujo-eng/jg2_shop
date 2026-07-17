/** Segue a lógica de artigo gramatical do protótipo de referência. */
const ARTICLE_BY_CATEGORY: Record<string, string> = {
  Todos: 'das',
  'Cadeados de Bloqueio': 'dos',
  'Etiquetas e Placas': 'das',
  'Garras de Bloqueio': 'das',
  'Caixas e Estações': 'das',
  'Bloqueio de Válvulas': 'do',
  'Bloqueios Elétricos': 'dos',
  'Kits de Bloqueio': 'dos',
  'Malas e Bolsas': 'das',
  'Dispositivos de Treinamento': 'dos',
  'Mãos Seguras': 'das',
  'Extensores Industriais': 'dos',
  'Proteção de Impacto': 'da',
  'Fixação e Ajuste': 'da',
  'Movimentação e Transporte': 'da',
  'Armazenamento Seguro': 'do',
};

const ARTICLE_BY_PRODUCT_FIRST_WORD: Record<string, string> = {
  Cadeado: 'do',
  Cadeados: 'dos',
  Etiqueta: 'da',
  Etiquetas: 'das',
  Placa: 'da',
  Placas: 'das',
  Garra: 'da',
  Garras: 'das',
  Caixa: 'da',
  Caixas: 'das',
  Estação: 'da',
  Estações: 'das',
  Bloqueio: 'do',
  Bloqueios: 'dos',
  Dispositivo: 'do',
  Dispositivos: 'dos',
  Kit: 'do',
  Kits: 'dos',
  Mala: 'da',
  Malas: 'das',
  Bolsa: 'da',
  Bolsas: 'das',
  Maquete: 'da',
};

export function categorySupportTitle(categoryName: string): string {
  const article = ARTICLE_BY_CATEGORY[categoryName] ?? 'dos';
  const key = categoryName === 'Todos' ? 'soluções de Bloqueio e Etiquetagem' : categoryName;
  return `A importância ${article} ${key} para a segurança na indústria`;
}

export function productSupportTitle(productName: string): string {
  const firstWord = productName.trim().split(' ')[0] ?? '';
  const article = ARTICLE_BY_PRODUCT_FIRST_WORD[firstWord] ?? 'do';
  return `A importância ${article} ${productName} para a segurança na indústria`;
}
