const fs = require('fs')
const path = require('path')
// const AES = require('crypto-js/aes')
// const enc = require('crypto-js/enc-utf8')
// const uuidv1 = require('uuid/v1')
const dataApi = require('./data-api')
const dataPath = path.resolve(__dirname, './')
const menuFilePath = dataPath + '/old-data.json'
// const listPath = dataPath + '/list'

fs.readFile(menuFilePath, 'utf8', function (err, data) {
  if (err) {
    console(err)
  } else {
    data = JSON.parse(data)

    let excu = function () {
      let d = data.shift()
      if (!d) return
      dataApi.add(d.name, (err, id) => {
        if (err) {
          console.log(err)
          return
        }

        dataApi.editContent({
          id,
          content: `${d.des}\n\n$$$${d.pw}$$$`
        }, () => {})
        excu()
      })
    }

    excu()

    // data.forEach(d => {
    //   dataApi.add(d.name, (err, id) => {
    //     if (err) {
    //       console.log(err)
    //       return
    //     }

    //     dataApi.editContent({
    //       id,
    //       content: `$$$${d.pw}$$$\n${d.des}`
    //     }, () => {})
    //   })
    // })
  }
})
