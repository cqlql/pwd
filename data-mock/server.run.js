// 数据模拟
var getIPAdress = require('../build/get-ip-adress')
var express = require('express')
var bodyParser = require('body-parser')
var router = require('./router')
const opn = require('opn')
// 自动获取端口
const portfinder = require('portfinder')

var app = express()

app.use(bodyParser.json()) // for parsing application/json
// app.use('/Content', express.static('E:\\_work\\sd.pi\\src\\sd.pi.wxweb\\Content')) // 静态资源
app.use('/', express.static('./public')) // 静态资源
app.use('/api/v1', router)

portfinder.basePort = 3000
portfinder.getPort((err, port) => {
  if (err) {
    return console.error(err)
  }
  var server = app.listen(port, getIPAdress(), function () {
    var host = server.address().address
    var port = server.address().port
    opn(`http://${host}:${port}`, {app: ['chrome']})
    console.log('Example app listening at http://%s:%s', host, port)
  })
})
