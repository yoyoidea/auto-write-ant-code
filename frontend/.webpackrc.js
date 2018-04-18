const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [
    'transform-decorators-legacy',
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
  ],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
      define: {
        API: 'http://127.0.0.1:8080',
        // API: 'http://10.12.128.252:9090',
      },
    },
    production: {
      define: {
        API: 'http://10.12.128.252:9090',
        //API: 'http://cmdb.bkjk-inc.com',
      },
    },
  },
  alias: {
    'components': path.resolve(__dirname, 'src/components/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  publicPath: '/',
  disableDynamicImport: true,
  hash: true,
};
