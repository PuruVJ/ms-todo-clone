import { Config } from '@stencil/core';
import { less } from '@stencil/less';

export const config: Config = {
  globalStyle: 'src/global/app.less',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: {
        swSrc: 'src/sw.js',
      },
      baseUrl: 'https://ms-todo.puruvj.dev',
    },
  ],
  plugins: [less({})],
};
