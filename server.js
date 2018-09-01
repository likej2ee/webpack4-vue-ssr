const fs = require('fs')
const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync('./src/public/index.template.html', 'utf-8'),
})
// const app = require('./src/public/app.vue')

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url,
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`,
    // render: h => h(app),
  })
  const context = {
    title: 'hello',
    meta: `
      <meta name="keywords" content="网页关键词">
      <meta name="description" content="网页描述">
    `,
  }

  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})

server.listen(8080)
