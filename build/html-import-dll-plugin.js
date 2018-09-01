const path = require('path')
const fs = require('fs') // 载入fs模块
const config = require('../config/index')

function HtmlImportDllPlugin(options) {
  // Configure your plugin with options...
}

HtmlImportDllPlugin.prototype.apply = function(compiler) {
  compiler.hooks.compilation.tap('HtmlImportDllPlugin', compilation => {
    console.log('The compiler is starting a new compilation...')

    // compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync('HtmlImportDllPlugin', (data, cb) => {
    //   data.html += 'The Magic Footer'
    //   cb(null, data)
    // })

    // 生成html之前
    compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tapAsync('HtmlImportDllPlugin', (data, cb) => {
      const manifestFilename = path.join(compiler.outputPath, config.MANIFEST_DLL)
      let contentText = fs.readFileSync(manifestFilename, 'utf-8')
      let manifestJson = JSON.parse(contentText.toString())

      // 将dll资源写入资源数组
      for (const item in manifestJson) {
        data.assets.js.unshift(manifestJson[item])
      }

      cb(null, data)
    })
  })
}

module.exports = HtmlImportDllPlugin
