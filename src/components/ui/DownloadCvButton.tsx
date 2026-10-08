import { useTranslation } from 'react-i18next';
import { profile } from '@/data/profile';
import type { Locale } from '@/data/types';
import { ButtonLink } from './Button';
import { DownloadIcon } from './icons';

type DownloadCvButtonProps = { variant?: 'primary' | 'ghost'; compact?: boolean };

export default function DownloadCvButton({
  variant = 'primary',
  compact = false,
}: DownloadCvButtonProps) {
  const { t, i18n } = useTranslation();
  const locale: Locale = i18n.resolvedLanguage === 'en' ? 'en' : 'es';

  return (
    <ButtonLink
      href={profile.cv[locale]}
      download={t('cv.fileName')}
      variant={variant}
      aria-label={compact ? t('cv.download') : undefined}
      size={compact ? 'sm' : 'md'}
    >
      <DownloadIcon className={compact ? 'size-4 max-[359px]:hidden' : 'size-4'} />
      {compact ? t('cv.short') : t('cv.download')}
    </ButtonLink>
  );
}
