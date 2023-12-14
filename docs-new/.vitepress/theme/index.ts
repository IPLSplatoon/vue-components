// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import Demo from '../components/Demo.vue';
import { IplExpandingSpace } from '../../../src';

import './style.scss'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('Demo', Demo)
    app.component('IplExpandingSpace', IplExpandingSpace)
  }
} satisfies Theme
