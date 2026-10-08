import { useTranslation } from 'react-i18next';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { CheckIcon, CopyIcon } from './icons';

type CopyButtonProps = { text: string };

export default function CopyButton({ text }: CopyButtonProps) {
  const { t } = useTranslation();
  const { status, copy } = useCopyToClipboard();
  const copied = status === 'copied';

  return (
    <div>
      <button
        type="button"
        onClick={() => void copy(text)}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-sm transition-colors hover:border-fg-muted hover:bg-surface"
      >
        {copied ? <CheckIcon className="size-4 text-accent" /> : <CopyIcon className="size-4" />}
        {copied ? t('contact.copied') : t('contact.copyEmail')}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? t('contact.copied') : ''}
      </span>
      {status === 'failed' && (
        <p role="alert" className="mt-2 text-sm text-fg-muted">
          {t('contact.copyFailed')}
        </p>
      )}
    </div>
  );
}
