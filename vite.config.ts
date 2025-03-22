import { defineConfig } from 'vite';
import vuePlugin from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { RootNode, TemplateChildNode } from '@vue/compiler-core';

function removeDevelopmentVueNodeAttributes(node: RootNode | TemplateChildNode) {
    const attributesToRemove = [
        'data-test',
        ':data-test',
        'v-bind:data-test'
    ];
    if (node.type === 1) { // ELEMENT
        node.props = node.props.filter(function (prop) {
            if (prop.type === 6) { // ATTRIBUTE
                const attributeName = prop.name;
                return !attributesToRemove.includes(attributeName);
            }
            if (prop.name === 'bind' && prop.arg.type === 4) { // SIMPLE_EXPRESSION
                const attributeName = prop.arg?.content;
                return !attributesToRemove.includes(attributeName);
            }
            return true;
        });
    }
}

export default defineConfig({
    plugins: [
        vuePlugin({
            template: {
                compilerOptions: {
                    nodeTransforms: [removeDevelopmentVueNodeAttributes]
                }
            }
        })
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: '@iplsplatoon/vue-components',
            fileName: 'index',
            formats: ['es', 'umd']
        },
        rollupOptions: {
            external: [
                'vue',
                '@fortawesome/fontawesome-svg-core',
                '@fortawesome/free-solid-svg-icons',
                '@fortawesome/vue-fontawesome'
            ],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
});
