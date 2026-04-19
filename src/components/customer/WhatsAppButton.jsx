function sanitize(phone) {
  return String(phone ?? '').replace(/[^\d]/g, '');
}

export function whatsappHref(phone, message = '') {
  const num = sanitize(phone);
  const q = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${num}${q}`;
}

export default function WhatsAppButton({ phone, message, className = 'btn-primary', children }) {
  return (
    <a
      href={whatsappHref(phone, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.52 3.48A11.94 11.94 0 0012.02 0C5.42 0 .06 5.36.06 11.96c0 2.11.55 4.16 1.6 5.97L0 24l6.2-1.63a11.95 11.95 0 005.81 1.48h.01c6.6 0 11.96-5.36 11.96-11.96 0-3.2-1.25-6.2-3.46-8.41zM12.02 21.8h-.01a9.86 9.86 0 01-5.03-1.38l-.36-.21-3.68.97.98-3.58-.24-.37a9.86 9.86 0 01-1.51-5.27c0-5.45 4.43-9.88 9.88-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 012.89 6.98c0 5.46-4.43 9.84-9.91 9.84zm5.42-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z"/>
      </svg>
      {children ?? 'Order on WhatsApp'}
    </a>
  );
}
