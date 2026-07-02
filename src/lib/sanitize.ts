import sanitizeHtml from 'sanitize-html';

/**
 * O admin (Bloco 7) edita `BlogPost.content` como HTML puro num textarea —
 * sem sanitizar na renderização, isso é XSS armazenado esperando acontecer
 * assim que o CRUD existir. Allowlist de rich text básico, nada de
 * script/iframe/estilos inline/handlers.
 */
export function sanitizePostHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'a', 'ul', 'ol', 'li', 'h2', 'h3', 'h4', 'blockquote', 'img'],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer', target: '_blank' }),
    },
  });
}
