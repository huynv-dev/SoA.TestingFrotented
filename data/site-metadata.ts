export const SITE_METADATA = {
  title: `HUY NGUYEN`,
  author: 'Huy Nguyen',
  headerTitle: `huynguyen.info`,
  description:
    'A stream of thoughts and my programming journey—where I share knowledge, insights, and useful resources for the developer community.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://www.huynguyen.info',
  siteRepo: 'https://github.com/huynv-dev/huynguyen.info.git',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/react.jpeg`,
  email: 'huynv.job@gmail.com',
  github: 'https://github.com/huynv-dev',
  x: 'https://x.com/hta218_',
  facebook: 'https://www.facebook.com/huybka1996',
  // youtube: 'https://www.youtube.com/@hta218_',
  // linkedin: 'https://www.linkedin.com/in/hta218',
  // threads: 'https://www.threads.net/hta218_',
  instagram: 'https://www.instagram.com/bk.huy',
  locale: 'en-US',
  stickyNav: true,
  imdbRatingsList: 'https://www.imdb.com/user/ur154483197/ratings/?view=grid',
  analytics: {
    umamiAnalytics: {
      websiteId: process.env.NEXT_UMAMI_ID,
      shareUrl: 'https://analytics.huynguyen.info/share/c9ErglxqzY5CQJ8g/huynguyen.info',
    },
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus, beehive
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
  comments: {
    giscusConfigs: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO!,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID!,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY!,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!,
      mapping: 'title', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'en',
    },
  },
  search: {
    kbarConfigs: {
      // path to load documents to search
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
  support: {
    buyMeACoffee: 'https://www.buymeacoffee.com/huynguyen.info',
    paypal: 'https://paypal.me/hta218?country.x=VN&locale.x=en_US',
    kofi: 'https://ko-fi.com/hta218',
  },
}
