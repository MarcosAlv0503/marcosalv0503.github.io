import type { ReactNode } from 'react';

export default function Timeline({ children }: { children: ReactNode }) {
  return <ol>{children}</ol>;
}
