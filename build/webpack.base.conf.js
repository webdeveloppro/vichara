const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const poststylus = require('poststylus');
const autoprefixer = require('autoprefixer');
const lintPugConfig = require('../.pug-lintrc.js');

const { NODE_ENV } = process.env;
const buildingForLocal = (NODE_ENV === 'development');
const rootFolder = `${__dirname}/..`;
const nodeModulesFolder = `${__dirname}/../node_modules`;
const env = {
  isStaging: (NODE_ENV === 'development' || NODE_ENV === 'staging'),
  NODE_ENV: `"${NODE_ENV}"`,
};
Object.keys(process.env).forEach((key) => {
  env[key] = JSON.stringify(process.env[key]);
});
const minify = NODE_ENV === 'production';

const extractHTML = new HtmlWebpackPlugin({
  title: 'History Search',
  filename: 'index.html',
  inject: true,
  template: `${rootFolder}/index.html`,
  minify: {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
    html5: true,
    minifyCSS: true,
    removeComments: true,
    removeEmptyAttributes: true,
  },
  environment: NODE_ENV,
  isLocalBuild: buildingForLocal,
  googleTagManagerId: JSON.stringify(process.env.GOOGLE_TAG_MANAGER_ID),
  googleOptimizeAsyncHide: JSON.stringify(process.env.GOOGLE_OPTIMIZE_ID),
  // imgPath: (!buildingForLocal) ? 'assets' : 'src/assets',
});

const config = {
  /**
   * You can use these too for bigger projects. For now it is 0 conf mode for me!
   */
  entry: `${rootFolder}/src/index.js`,
  output: {
    // path: buildingForLocal ? rootFolder : `${rootFolder}/dist`,
  //   this one sets the path to serve
    publicPath: '/',
    filename: buildingForLocal ? 'js/[name].js' : 'js/[name].[hash].js',
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      chunks: 'all', // Taken from https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
    },
  },
  mode: buildingForLocal ? 'development' : 'production',
  devtool: buildingForLocal ? 'source-map' : false,
  devServer: {
    historyApiFallback: true,
    noInfo: false,
  },
  plugins: [
    extractHTML,
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/styles.[hash].css',
      chunkFilename: '[id].css',
    }),
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        stylus: {
          use: [poststylus(['autoprefixer'])],
        },
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-pug-lint-loader',
        enforce: 'pre',
        include: [`${rootFolder}/src`],
        options: lintPugConfig,
      }, {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [`${rootFolder}/src`],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: file => (
          /node_modules/.test(file) && !/\.vue\.js/.test(file)
        ),
        use: [{
          loader: 'babel-loader',
        }],
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.styl[us]*$/,
        loader: 'style-loader!css-loader!stylus-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[ext]?[hash]',
        },
      },
      {
        test: /\.(pdf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: 'docs/[name].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]?[hash]',
        },
      },
    ],
  },
  resolveLoader: {
    modules: [
      nodeModulesFolder,
    ],
  },
  resolve: {
    modules: [
      nodeModulesFolder,
    ],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      Const: `${rootFolder}/const`,
      Api: `${rootFolder}/src/services/api`,
      Components: `${rootFolder}/src/components`,
      Config: `${rootFolder}/src/config`,
      Store: `${rootFolder}/src/store`,
      Helpers: `${rootFolder}/src/helpers`,
      Utils: `${rootFolder}/src/helpers/utils`,
      Models: `${rootFolder}/src/helpers/models`,
      Mixins: `${rootFolder}/src/helpers/mixins`,
      Analytics: `${rootFolder}/src/analytics`,
      '@': `${rootFolder}/src`,
      images: `${rootFolder}/staticdata/img`,
      video: `${rootFolder}/staticdata/video`,
      doc: `${rootFolder}/staticdata/doc`,
    },
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};

if (minify) {
  config.optimization.minimizer = [
    // Enabled by default in production mode if
    // the `minimizer` option isn't overridden.
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
    }),
  ];
}

module.exports = config;
