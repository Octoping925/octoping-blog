const BLOG = {
  title: "OCTOPING",
  author: "Octoping",
  email: "myc1365@naver.com",
  link: "https://octoping.vercel.app",
  description: "Octoping의 블로그",
  lang: "ko-KR", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES']
  appearance: "auto", // ['light', 'dark', 'auto'],
  font: "sans-serif", // ['sans-serif', 'serif']
  lightBackground: "#ffffff", // use hex value, don't forget '#' e.g #fffefc
  darkBackground: "#18181B", // use hex value, don't forget '#'
  path: "", // leave this empty unless you want to deploy Nobelium in a folder
  since: 2022, // If leave this empty, current year will be used.
  postsPerPage: 7,
  sortByDate: true,
  showAbout: true,
  showArchive: true,
  autoCollapsedNavBar: false, // The automatically collapsed navigation bar
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash
  socialLink: "",
  seo: {
    keywords: ["Blog", "Website", "Notion"],
    googleSiteVerification: "", // Remove the value or replace it with your own google site verification code
  },
  notionPageId: process.env.NOTION_PAGE_ID, // DO NOT CHANGE THIS！！！
  notionAccessToken: process.env.NOTION_ACCESS_TOKEN, // Useful if you prefer not to make your database public
  analytics: {
    provider: "ga", // Currently we support Google Analytics and Ackee, please fill with 'ga' or 'ackee', leave it empty to disable it.
    ackeeConfig: {
      tracker: "", // e.g 'https://ackee.craigary.net/tracker.js'
      dataAckeeServer: "", // e.g https://ackee.craigary.net , don't end with a slash
      domainId: "", // e.g '0e2257a8-54d4-4847-91a1-0311ea48cc7b'
    },
    gaConfig: {
      measurementId: "G-ZXN5RE153E", // e.g: G-XXXXXXXXXX
    },
  },
  comment: {
    utterancesConfig: {
      repo: "Octoping925/octoping-blog",
      "issue-term": "og:title",
      label: "Comment",
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
};
// export default BLOG
module.exports = BLOG;
