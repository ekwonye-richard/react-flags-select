const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactFlagsSelect',
      externals: {
        react: 'React'
      }
    }
  },
  webpack: {
    styles: false,
    extra: {
      module: {
        rules: [
          {
            test: /\.(sa|sc|c)ss$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              {loader: 'css-loader'},
              {loader: 'sass-loader'}
              ]
          }
        ]
      },
      plugins: [
          new MiniCssExtractPlugin()
      ]
    },
    config: (config) => {
      // include scss file in entry for UMD so it gets processed
      if(config.output.libraryTarget === 'umd' && config.entry.indexOf('./scss/react-flags-select.scss') < 0) {
        config.entry.push('./scss/react-flags-select.scss');
      }

      return config;
    }
  }
};
