import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@/components': resolve(__dirname, './src/components'),
        '@/stores': resolve(__dirname, './src/stores'),
        '@/utils': resolve(__dirname, './src/utils'),
        '@/types': resolve(__dirname, './src/types'),
      },
    },
    server: {
      port: 3000,
      host: true,
      hmr: env.ALLOWED_HOSTS?.split(',')[1]
        ? { host: env.ALLOWED_HOSTS.split(',')[1] }
        : true,
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      minify: 'esbuild',
    },
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: [],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
          'tests/',
          '**/*.config.{js,ts}',
          '**/types/**',
        ],
      },
    },
  };
});
