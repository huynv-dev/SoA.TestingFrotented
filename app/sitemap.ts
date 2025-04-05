
import type { MetadataRoute } from 'next'
import { SITE_METADATA } from '~/data/site-metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  let siteUrl = SITE_METADATA.siteUrl
  let routes = ['', 'Writing', 'Notes', 'Projects', 'About', 'Tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes]
}
