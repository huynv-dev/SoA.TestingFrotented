import { clsx } from 'clsx'
import { SITE_METADATA } from '~/data/site-metadata'

export function FooterBottom() {
  return (
    <div
      className={clsx([
        'pt-5 md:my-2',
        'flex flex-col items-center justify-center gap-4 md:flex-row md:justify-center md:gap-16',
        'border-t border-gray-200 dark:border-gray-700',
      ])}
    >
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} {SITE_METADATA.author}. All rights reserved.
      </div>
    </div>
  )
}
