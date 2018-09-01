const path = require('path')
const fs = require('fs') // 载入fs模块
const opn = require('opn')
const colors = require('colors')
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')

const config = require('./config/index')
const webpackDevConfig = require('./build/webpack.config.dev')
const devServerOptions = Object.assign({}, webpackDevConfig.devServer, {
  open: true, // 不知道为啥 node 运行时不起作用，所以使用opn插件替代
  host: 'localhost',
  port: 3000,
  stats: {
    colors: true,
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
})

// 将dll文件写入webpack编译内存
// https://www.npmjs.com/package/memory-fs
function writeDllFiles(compiler) {
  // 创建内存目录
  compiler.outputFileSystem.mkdirpSync(compiler.outputPath)

  // 读取dll资源映射清单
  let manifestFilename = path.join(compiler.outputPath, config.MANIFEST_DLL)
  let contentText = fs.readFileSync(manifestFilename, 'utf-8')
  let manifestJson = JSON.parse(contentText.toString())
  let filename = ''

  for (const item in manifestJson) {
    filename = manifestJson[item]
    filename = filename.replace(config.development.assetsDomain, '') // 修正路径
    filename = path.join(compiler.outputPath, filename)

    // 将dll资源写入内存
    fs.readFile(filename, (err, data) => {
      if (err) {
        console.error(filename + '文件未找到')
        return
      }
      compiler.outputFileSystem.writeFile(filename, data, (err, data) => {
        if (err) {
          console.error((filename + '文件写入内存失败').bold.red)
          return
        }
        console.log((filename + '文件写入内存成功').bold.green)
      })
    })
  }
}

webpackDevServer.addDevServerEntrypoints(webpackDevConfig, devServerOptions)
const compiler = webpack(webpackDevConfig)
const server = new webpackDevServer(compiler, devServerOptions)
writeDllFiles(compiler)

server.listen(devServerOptions.port, devServerOptions.host, () => {
  let uri = 'http://' + devServerOptions.host + ':' + devServerOptions.port
  console.log('Starting server on ' + uri)

  opn(uri)
})
