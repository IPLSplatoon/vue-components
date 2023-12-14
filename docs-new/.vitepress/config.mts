import { defineConfig } from 'vitepress'
import { demoPlugin } from './DemoMarkdownPlugin';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "IPL Vue Components",
  description: "Vue components for internal Inkling Performance Labs projects",
  themeConfig: {
    sidebar: [
      {
        text: 'Components',
        items: [
          { text: 'Button', link: '/ipl-button' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/IPLSplatoon/vue-components' }
    ]
  },

  markdown: {
    config: md => {
      demoPlugin(md)
    }
  }
})
