type TagProps = { children: string };

export default function Tag({ children }: TagProps) {
  return (
    <li className="rounded-md border border-border bg-surface px-2 py-1 font-mono text-xs text-fg-muted">
      {children}
    </li>
  );
}
