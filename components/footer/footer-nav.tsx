import { ExternalLink } from 'lucide-react'
import { Fragment } from 'react'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Link } from '~/components/ui/link'
import { FOOTER_NAV_LINKS } from '~/data/navigation'

export function FooterNav() {
  return (
    <div className="flex flex-col gap-4 px-1 md:flex-row md:justify-end md:gap-24 md:px-0 md:text-right">
      Footer
    </div>
  )
}

function FooterLink({ link }: { link: (typeof FOOTER_NAV_LINKS)[0] }) {
  let { href, title } = link
  let isExternal = href.startsWith('http')
  return (
    <Link href={href}>
      <GrowingUnderline
        data-umami-event={`footer-nav-${href.replace('/', '')}`}
        className="inline-flex items-center"
      >
        {title}
        {isExternal && <ExternalLink className="-mt-1 ml-1.5" size={18} strokeWidth={1.5} />}
      </GrowingUnderline>
    </Link>
  )
}
