import { defineConfig } from 'vitepress';
import { demoPlugin } from './DemoMarkdownPlugin';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'IPL Vue Components',
    description: 'Vue components for internal Inkling Performance Labs projects',
    themeConfig: {
        sidebar: [
            {
                text: 'Introduction',
                link: '/introduction'
            },
            {
                text: 'Editing Documentation',
                link: '/editing-docs'
            },
            {
                text: 'Components',
                items: [
                    { text: 'Button', link: '/ipl-button' },
                    { text: 'Data Row', link: '/ipl-data-row' },
                    { text: 'Dialog Title', link: '/ipl-dialog-title' },
                    { text: 'Space', link: '/ipl-space' },
                    { text: 'Expanding Space', link: '/ipl-expanding-space' },
                    { text: 'Expanding Space Group', link: '/ipl-expanding-space-group' },
                    { text: 'Message', link: '/ipl-message' },
                    { text: 'Input', link: '/ipl-input' },
                    { text: 'Textarea', link: '/ipl-textarea' },
                    { text: 'Radio', link: '/ipl-radio' },
                    { text: 'Select', link: '/ipl-select' },
                    { text: 'Multi-Select', link: '/ipl-multi-select' },
                    { text: 'File Upload', link: '/ipl-upload' },
                    { text: 'Progress Bar', link: '/ipl-progress-bar' },
                    { text: 'Toggles', link: '/toggles' },
                    { text: 'Loading Spinner', link: '/ipl-spinner' },
                    { text: 'Sidebar', link: '/ipl-sidebar' }
                ]
            }
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/IPLSplatoon/vue-components' }
        ]
    },

    head: [
        [
            'script',
            { },
            `window.addEventListener('drop', e => {
                e.preventDefault();
            });
            window.addEventListener('dragover', e => {
                e.preventDefault();
            });`
        ]
    ],

    markdown: {
        config: md => {
            demoPlugin(md);
        }
    }
});
