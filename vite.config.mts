import react from '@vitejs/plugin-react';
import million from 'million/compiler';
import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [million.vite({ auto: true }), react(), viteTsconfigPaths(), svgrPlugin()],
  server: {
    port: 3000,
    open: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['node_modules', 'src'],
      },
    },
  },
});
