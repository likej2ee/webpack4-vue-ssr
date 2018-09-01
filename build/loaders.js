const path = require('path')
const config = require('../config')
const INCLUDE_PATHS = path.resolve(__dirname, './' + config.SOURCE_DIR + '/core')
const devMode = process.env.NODE_ENV === 'development'
const OUT_PUT_STYLE = devMode ? 'nested' : 'compressed'

// vue-loader
exports.vueLoader = {
  loaders: {
    // jsx: 'babel-loader',
    // ts: 'ts-loader',
    // tsx: 'babel-loader!ts-loader!tslint-loader',
    scss: ['vue-style-loader', this.cssLoader, 'postcss-loader', this.scssLoader],
  },
  cssSourceMap: devMode, // 开启webpack的devtool属性配置后此选项设置true才会输出sourcemap，与其他loader是一致的行为
  cacheBusting: true,
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href',
  },
}

// css-loader
exports.cssLoader = {
  loader: 'css-loader',
  options: {
    minimize: true,
    sourceMap: devMode,
  },
}

// scss-loader
exports.scssLoader = {
  loader: 'sass-loader',
  options: {
    outputStyle: OUT_PUT_STYLE,
    includePaths: [INCLUDE_PATHS],
    sourceMap: devMode,
  },
}

// url-loader
exports.urlLoader = {
  loader: 'url-loader',
  options: {
    limit: 8192,
    name: 'staticimg/[name].[hash:7].[ext]',
  },
}

// image-webpack-loader
exports.ImageWebpackLoader = {
  loader: 'image-webpack-loader',
  options: {
    // disable: true, // webpack@2.x and newer
    mozjpeg: {
      progressive: true,
      quality: 75,
    },
    // optipng.enabled: false will disable optipng
    optipng: {
      enabled: false,
    },
    pngquant: {
      quality: '65-90',
      speed: 4,
    },
    gifsicle: {
      interlaced: false,
    },
    // the webp option will enable WEBP
    webp: {
      quality: 75,
    },
  },
}
