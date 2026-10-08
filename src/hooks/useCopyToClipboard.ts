import { useCallback, useEffect, useRef, useState } from 'react';

export type CopyStatus = 'idle' | 'copied' | 'failed';

export function useCopyToClipboard(resetAfterMs = 2000) {
  const [status, setStatus] = useState<CopyStatus>('idle');
  const timeout = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setStatus('copied');
      } catch {
        setStatus('failed');
      }
      window.clearTimeout(timeout.current);
      timeout.current = window.setTimeout(() => setStatus('idle'), resetAfterMs);
    },
    [resetAfterMs],
  );

  return { status, copy };
}
