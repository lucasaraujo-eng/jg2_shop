import sanitizeHtml from 'sanitize-html';
import { FONT_SIZES } from '@/lib/rich-text-fonts';

const FONT_SIZE_PATTERN = new RegExp(`^(${FONT_SIZES.map((s) => s.replace('px', '')).join('|')})px$`);
// Aceita apenas nomes de fonte simples (letras, espaços, vírgulas, aspas e hífens).
const FONT_FAMILY_PATTERN = /^[\w\s,'"-]{1,120}$/;

export function sanitizePostHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'a', 'ul', 'ol', 'li', 'h2', 'h3', 'h4', 'blockquote', 'img', 'span'],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt'],
      span: ['style'],
    },
    allowedStyles: {
      span: {
        'font-family': [FONT_FAMILY_PATTERN],
        'font-size': [FONT_SIZE_PATTERN],
      },
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer', target: '_blank' }),
    },
  });
}
