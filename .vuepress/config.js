const path = require('path')

module.exports = {
  title: `Hansonの备忘录`,
  description: '',
  head: [
    ['link', { name: 'icon', href: '/favicon.ico' }],
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
        text: '主页',
        link: '/',
        icon: 'reco-home',
      },
      {
        text: '时间线',
        link: '/timeline/',
        icon: 'reco-date',
      },
      {
        text: '联系我',
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
        text: '分类',
      },
      tag: {
        location: 3,
        text: '标签',
      },
    },
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: '最近更新时间',
    author: 'Hanson',
    authorAvatar: '/avatar.jpg',
    startYear: '2021',
  },
  markdown: {
    lineNumbers: true,
  },
}
