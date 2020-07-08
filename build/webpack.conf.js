const path = require('path')
const MpxWebpackPlugin = require('@mpxjs/webpack-plugin')

const mainSubDir = ''
function resolveSrc (file) {
  return path.resolve(__dirname, '../src', mainSubDir, file || '')
}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const webpackConf = {
  entry: {
    app: resolveSrc('app.mpx')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'babel-loader',
          'ts-loader'
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/@mpxjs')]
      },
      {
        test: /\.json$/,
        resourceQuery: /__component/,
        type: 'javascript/auto'
      },
      {
        test: /\.(wxs|qs|sjs|filter\.js)$/,
        loader: MpxWebpackPlugin.wxsPreLoader(),
        enforce: 'pre'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: MpxWebpackPlugin.urlLoader({
          name: 'img/[name][hash].[ext]'
        })
      }
    ]
  },
  performance: {
    hints: false
  },
  mode: 'none',
  resolve: {
    extensions: ['.mpx', '.js', '.wxml', '.ts'],
    modules: ['node_modules'],
    alias: {
      // src
      "@": resolve("src"),
      "__SRC__": resolve("src"),
      // 根目录
      "@@": path.resolve(__dirname, ".."),
      "__ROOT__": path.resolve(__dirname, ".."),
    }
  }
}

module.exports = webpackConf
