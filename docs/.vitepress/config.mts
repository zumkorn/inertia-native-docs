import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Inertia × Hotwire Native',
  description:
    'Drive Inertia.js navigation and bridge components from Hotwire Native (iOS & Android).',
  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'API', link: '/reference/api' },
      {
        text: 'Links',
        items: [
          { text: 'npm package', link: 'https://www.npmjs.com/package/inertia-hotwire-native' },
          { text: 'Web demo', link: 'https://github.com/zumkorn/inertia-native-demo' },
          { text: 'iOS demo', link: 'https://github.com/zumkorn/inertia-native-ios-demo' },
          { text: 'Android demo', link: 'https://github.com/zumkorn/inertia-native-android-demo' },
        ],
      },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/guide/introduction' },
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Navigation', link: '/guide/navigation' },
        ],
      },
      {
        text: 'Bridge components',
        items: [
          { text: 'Overview', link: '/components/overview' },
          { text: 'Alert', link: '/components/alert' },
          { text: 'Button', link: '/components/button' },
          { text: 'Haptic', link: '/components/haptic' },
        ],
      },
      {
        text: 'Native apps',
        items: [
          { text: 'iOS', link: '/native/ios' },
          { text: 'Android', link: '/native/android' },
        ],
      },
      {
        text: 'Reference',
        items: [{ text: 'API', link: '/reference/api' }],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zumkorn/inertia-hotwire-native' },
    ],

    editLink: {
      pattern: 'https://github.com/zumkorn/inertia-native-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    search: { provider: 'local' },
  },
})
