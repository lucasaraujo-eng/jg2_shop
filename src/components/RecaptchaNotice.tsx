const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export function RecaptchaNotice({ className = '' }: { className?: string }) {
  if (!SITE_KEY) return null;
  return (
    <p className={className}>
      Este site é protegido pelo reCAPTCHA e se aplicam a{' '}
      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
        Política de Privacidade
      </a>{' '}
      e os{' '}
      <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
        Termos de Serviço
      </a>{' '}
      do Google.
    </p>
  );
}
