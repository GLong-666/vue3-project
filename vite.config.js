import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
    if (mode === 'development') { // development
        return {
            plugins: [vue()],
            server: {
                host: '0.0.0.0',
                port: '8080',
                proxy: {
                    '/api': {
                        // target: 'http://192.168.1.20:9999',
                        // rewrite: path => path.replace(/^\/api/, ''),
                        changeOrigin: true
                    }
                }
            },

            resolve: {
                alias: {
                    '@': fileURLToPath(new URL('./src', import.meta.url))
                }
            }

        };
    } else { // production
        return {
            plugins: [vue()],

            resolve: {
                alias: {
                    '@': fileURLToPath(new URL('./src', import.meta.url))
                }
            },

            build: {
                outDir: './dist'
            },

            base: '/'
        };
    }
});
