// https://vitepress.dev/guide/custom-theme
import { Theme } from 'vitepress';
import Demo from '../components/Demo.vue';
import EventLog from '../components/EventLog.vue';
import { IplExpandingSpace } from '../../../src';
import Layout from './Layout.vue';

// Vitepress broke some of my styles, so I just resolved to... taking the bits that I didn't want out and importing
// everything piecemeal. It works for now.
import 'vitepress/dist/client/theme-default/styles/vars.css';
import 'vitepress/dist/client/theme-default/styles/base.css';
import 'vitepress/dist/client/theme-default/styles/utils.css';
import 'vitepress/dist/client/theme-default/styles/components/custom-block.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-code.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-code-group.css';
import './vp-doc.css';
import 'vitepress/dist/client/theme-default/styles/components/vp-sponsor.css';
import './style.scss';

export default {
    Layout: Layout,
    enhanceApp({ app }) {
        app.component('Demo', Demo);
        app.component('EventLog', EventLog);
        app.component('IplExpandingSpace', IplExpandingSpace);
    }
} satisfies Theme;
