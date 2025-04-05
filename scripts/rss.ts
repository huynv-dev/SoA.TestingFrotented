import path from 'path'
import { SITE_METADATA } from '~/data/site-metadata'
import { escape } from '~/utils/html-escaper'

const RSS_PAGE = 'feed.xml'

function generateRssItem(item) {
  let { siteUrl, email, author } = SITE_METADATA
  return `
		<item>
			<guid>${siteUrl}/writing/${item.slug}</guid>
			<title>${escape(item.title)}</title>
			<link>${siteUrl}/writing/${item.slug}</link>
			${item.summary && `<description>${escape(item.summary)}</description>`}
			<pubDate>${new Date(item.date).toUTCString()}</pubDate>
			<author>${email} (${author})</author>
			${item.tags && item.tags.map((t) => `<category>${t}</category>`).join('')}
		</item>
	`
}

// function generateRss(items: (Writing | Note)[], page = RSS_PAGE) {
//   let { title, siteUrl, description, language, email, author } = SITE_METADATA
//   return `
// 		<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
// 			<channel>
// 				<title>${escape(title)}</title>
// 				<link>${siteUrl}/Writing</link>
// 				<description>${escape(description)}</description>
// 				<language>${language}</language>
// 				<managingEditor>${email} (${author})</managingEditor>
// 				<webMaster>${email} (${author})</webMaster>
// 				<lastBuildDate>${new Date(items[0].date).toUTCString()}</lastBuildDate>
// 				<atom:link href="${siteUrl}/${page}" rel="self" type="application/rss+xml"/>
// 				${items.map((item) => generateRssItem(item)).join('')}
// 			</channel>
// 		</rss>
// 	`
// }

export async function generateRssFeed() {
//   let publishPosts = Writings.filter((post) => post.draft !== true)
//   let publishNotes = Notes.filter((post) => post.draft !== true)
//   // RSS for Writing post & Note
//   if (publishPosts.length > 0 || publishNotes.length > 0) {
//     let rss = generateRss(sortPosts([...publishPosts, ...publishNotes]))
//     writeFileSync(`./public/${RSS_PAGE}`, rss)
//   }

//   if (publishPosts.length > 0 || publishNotes.length > 0) {
//     // RSS for tags
//     for (let tag of Object.keys(tagData)) {
//       let rss = generateRss([...filteredPosts, ...filteredNotes], `tags/${tag}/feed.xml`)
//       let rssPath = path.join('public', 'tags', tag)
//       mkdirSync(rssPath, { recursive: true })
//       writeFileSync(path.join(rssPath, RSS_PAGE), rss)
//     }
//   }
  console.log('🗒️. RSS feed generated.')
}
