'use client'
import { Container } from '~/components/ui/container'
import { FooterBottom } from './footer-bottom'
import { SITE_METADATA } from '~/data/site-metadata'
import { Link } from '~/components/ui/link'

const QUICK_LINKS = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Tags', href: '/tags' },
  { title: 'Projects', href: '/project' },
  { title: 'Notes', href: '/note' },
  { title: 'Resume', href: '/resume' },
]

export function Footer() {
  return (
    <Container
      as="footer"
      className="bg-background border-t border-gray-300 px-4 dark:border-gray-700"
    >
      <div className="flex flex-col items-center pt-6 text-sm text-gray-500 dark:text-gray-400">
        {/* Quick Links */}
        <div className="mb-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
          {QUICK_LINKS.map(({ title, href }) => (
            <Link key={href} href={href} className="hover:underline">
              {title}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p>
          © {new Date().getFullYear()} {SITE_METADATA.author}. All rights reserved.
        </p>
      </div>
    </Container>
  )
}
