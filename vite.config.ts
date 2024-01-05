import { defineConfig } from 'vite';
import vuePlugin from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
    plugins: [vuePlugin()],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: '@iplsplatoon/vue-components',
            fileName: 'index',
            formats: ['es', 'umd']
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
});
