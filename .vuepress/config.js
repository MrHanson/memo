const path = require('path')

module.exports = {
  title: `Hanson's Memo`,
  description: '',
  dest: 'public',
  head: [
    ['link', { name: 'icon', href: '/avatar.jpg' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no',
      },
    ],
  ],
  theme: 'reco',
  themeConfig: {
    type: 'HomePage',
    modePicker: false,
    nav: [
      {
        text: 'Home',
        link: '/',
        icon: 'reco-home',
      },
      {
        text: 'TimeLine',
        link: '/timeline/',
        icon: 'reco-date',
      },
      {
        text: 'Contact',
        icon: 'reco-message',
        items: [
          {
            text: 'GitHub',
            link: 'https://github.com/mrhanson',
            icon: 'reco-github',
          },
          {
            text: 'bilibili',
            link: 'https://space.bilibili.com/40467270',
            icon: 'reco-bilibili',
          },
        ],
      },
    ],
    sidebar: 'auto',
    blogConfig: {
      category: {
        location: 2,
        text: 'Category',
      },
      tag: {
        location: 3,
        text: 'Tag',
      },
    },
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: 'Last Updated',
    author: 'Hanson',
    authorAvatar: '/avatar.jpg',
    startYear: '2021',
  },
  markdown: {
    lineNumbers: true,
  },
  plugins: [
    [
      '@vuepress/plugin-register-components',
      {
        components: [
          {
            name: 'reco-home-page',
            path: path.resolve(__dirname, './components/HomePage.vue'),
          },
        ],
      },
    ],
  ],
}
