// https://vitepress.dev/guide/custom-theme
import { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme-without-fonts';
import Demo from '../components/Demo.vue';
import EventLog from '../components/EventLog.vue';
import { IplExpandingSpace } from '../../../src';
import Layout from './Layout.vue';

import './style.scss';

export default {
    extends: DefaultTheme,
    Layout: Layout,
    enhanceApp({ app }) {
        app.component('Demo', Demo);
        app.component('EventLog', EventLog);
        app.component('IplExpandingSpace', IplExpandingSpace);
    }
} satisfies Theme;
