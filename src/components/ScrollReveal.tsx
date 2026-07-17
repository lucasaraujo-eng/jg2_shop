'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Sem marcação manual em cada seção: toda <section> dentro de <main> ganha
 * fade+translateY ao entrar na tela, e todo grid marcado com .jg-card-grid
 * ganha stagger nos filhos. CSS trata prefers-reduced-motion — aqui só
 * alternamos classes.
 */
export function ScrollReveal() {
  const pathname = usePathname();
  const processed = useRef<WeakSet<Element>>(new WeakSet());

  useEffect(() => {
    const seen = processed.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('jg-in');
            sectionObserver.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -7% 0px' },
    );

    const cardObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('jg-in');
            cardObserver.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -4% 0px' },
    );

    document.querySelectorAll('main section').forEach((el) => {
      if (seen.has(el)) return;
      seen.add(el);
      if (reducedMotion) return;
      el.classList.add('jg-reveal');
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.92) {
        el.classList.add('jg-in');
      } else {
        sectionObserver.observe(el);
      }
    });

    document.querySelectorAll('.jg-card-grid').forEach((grid) => {
      Array.from(grid.children).forEach((card, i) => {
        if (seen.has(card)) return;
        seen.add(card);
        if (reducedMotion) return;
        card.classList.add('jg-card-rev');
        (card as HTMLElement).style.transitionDelay = `${Math.min(i, 10) * 70}ms`;
        cardObserver.observe(card);
      });
    });

    return () => {
      sectionObserver.disconnect();
      cardObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
