export function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-charcoal-500">{hint}</span>}
    </label>
  );
}

export function Textarea(props) {
  return <textarea {...props} className={`input min-h-[90px] ${props.className || ''}`} />;
}

export function Input(props) {
  return <input {...props} className={`input ${props.className || ''}`} />;
}

export function Select(props) {
  return <select {...props} className={`input ${props.className || ''}`} />;
}
