import 'css/tailwind.css'
import 'css/twemoji.css'
import 'css/custom.css'
import 'styles/fonts.css'
import 'react-medium-image-zoom/dist/styles.css'
import 'remark-github-blockquote-alert/alert.css'

import clsx from 'clsx'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { SITE_METADATA } from '~/data/site-metadata'
import { HEADER_NAV_LINKS, FOOTER_NAV_LINKS } from '~/data/navigation'

const FONT_POPPINS = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_METADATA.siteUrl),
  title: {
    default: SITE_METADATA.title,
    template: `%s | ${SITE_METADATA.title}`,
  },
  description: SITE_METADATA.description,
  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    url: './',
    siteName: SITE_METADATA.title,
    images: [SITE_METADATA.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${SITE_METADATA.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
    },
  },
  twitter: {
    title: SITE_METADATA.title,
    card: 'summary_large_image',
    images: [SITE_METADATA.socialBanner],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  let basePath = process.env.BASE_PATH || ''

  const menuItems = HEADER_NAV_LINKS.map(link => link.title)

  const footerLinks = FOOTER_NAV_LINKS.map(link => ({
    name: link.title,
    url: link.href
  }))

  const address = {
    name: SITE_METADATA.title,
    location: '123 Example Street, City, Country',
    phone: '+1 234 567 890'
  }

  return (
    <html
      lang={SITE_METADATA.language}
      className={clsx(
        'scroll-smooth',
        FONT_POPPINS.variable
      )}
      suppressHydrationWarning
    >
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={`${basePath}/static/favicons/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${basePath}/static/favicons/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${basePath}/static/favicons/favicon-16x16.png`}
      />
      <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${basePath}/static/favicons/safari-pinned-tab.svg`}
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#000000" />
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      <body>
        <main className="relative flex min-h-screen flex-col">
          {children}
        </main>
      </body>
    </html>
  )
}
