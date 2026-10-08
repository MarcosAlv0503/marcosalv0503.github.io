import type { AnchorHTMLAttributes } from 'react';

type Variant = 'primary' | 'ghost';
type Size = 'sm' | 'md';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-accent-fg hover:brightness-110',
  ghost: 'border border-border text-fg hover:border-fg-muted hover:bg-surface',
};

const sizes: Record<Size, string> = {
  sm: 'min-h-9 px-4',
  md: 'min-h-11 px-5',
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
};

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-[background-color,border-color,filter] ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
