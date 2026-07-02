'use client';

import { useEffect, useRef, useState } from 'react';

export type Stat = { value: number; prefix?: string; suffix?: string; label: string } | { text: string; label: string };

function isAnimated(s: Stat): s is { value: number; prefix?: string; suffix?: string; label: string } {
  return 'value' in s;
}

/** Números sobem de 0 até o valor final (2s, easing cúbico) ao entrar na viewport. */
export function StatsCounter({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 2000;
        function step(now: number) {
          const k = Math.min(1, (now - start) / duration);
          setProgress(1 - Math.pow(1 - k, 3));
          if (k < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="jg-card-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-dark-border bg-dark-card p-6 transition hover:-translate-y-1 hover:border-brand hover:bg-dark-card-2"
        >
          <div className="font-display text-[32px] font-black leading-none text-white sm:text-[38px]">
            {isAnimated(s) ? `${s.prefix ?? ''}${Math.round(s.value * progress).toLocaleString('pt-BR')}${s.suffix ?? ''}` : s.text}
          </div>
          <div className="mt-2 text-sm font-semibold leading-snug text-white/60">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
