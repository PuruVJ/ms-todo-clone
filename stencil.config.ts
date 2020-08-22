import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  globalStyle: 'src/global/app.scss',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: {
        globPatterns: ['**/*.{png|jpg|jpeg|svg|js|css|html}'],
      },
      baseUrl: 'https://ms-todo.puruvj.dev',
    },
  ],
  plugins: [
    sass({
      includePaths: ['node_modules'],
    }),
  ],
};
