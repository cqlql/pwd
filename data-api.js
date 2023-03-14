
const fs = require('fs')
// const path = require('path')
const {v1:uuidv1} = require('uuid')
const AES = require('crypto-js/aes')
// const enc = require('crypto-js/enc-utf8')
// const dataPath = path.resolve(__dirname, './')
const dataPath = 'E:\\Dropbox\\pwd'
const menuFilePath = dataPath + '/menu.json'
const listPath = dataPath + '/list'

// 初始创建空的菜单文件
if (!fs.existsSync(menuFilePath)) {
  fs.writeFile(menuFilePath, '[]', 'utf8', function (err) {
    if (err) {
      console.error(err)
    }
  })
}
// 创建 list
if (!fs.existsSync(listPath)) {
  fs.mkdirSync(listPath)
}

function readMenuFile (cb) {
  fs.readFile(menuFilePath, 'utf8', function (err, data) {
    if (err) {
      cb(err)
    } else {
      cb(err, JSON.parse(data))
    }
  })
}

function writeMenuFile (data, cb) {
  fs.writeFile(menuFilePath, JSON.stringify(data), 'utf8', function (err) {
    cb(err)
  })
}

function findMenuItem (id, cb) {
  readMenuFile(function (err, data) {
    if (err) {
      cb(err)
      return
    }
    let notFound = true
    data.some((d, i) => {
      if (d.id === id) {
        notFound = false
        cb(err, data, i)
        return true
      }
    })
    if (notFound) {
      cb(new Error('id 没有找到'))
    }
  })
}

const dataApi = {
  menuFilePath,
  add (name, cb) {
    readMenuFile(function (err, data) {
      if (err) {
        cb(err)
        return
      }
      const id = uuidv1()
      data.unshift({
        id,
        name
      })
      writeMenuFile(data, function (err) {
        if (err) {
          cb(err)
          return
        }

        fs.writeFile(listPath + '/' + id, '', 'utf8', function (err) {
          cb(err, id)
        })
      })
    })
  },
  editName ({id, name}, cb) {
    findMenuItem(id, function (err, data, index) {
      if (err) {
        cb(err)
        return
      }
      data[index].name = name
      writeMenuFile(data, cb)
    })
  },
  editContent ({id, content}, cb) {
    fs.writeFile(listPath + '/' + id, content, 'utf8', function (err) {
      cb(err)
    })
  },
  del (id, cb) {
    findMenuItem(id, function (err, data, index) {
      if (err) {
        cb(err)
        return
      }
      data.splice(index, 1)
      writeMenuFile(data, function (err) {
        if (err) {
          cb(err)
          return
        }

        fs.unlink(listPath + '/' + id, function (err) {
          cb(err)
        })
      })
    })
  },
  getItem (id, cb) {
    fs.readFile(listPath + '/' + id, 'utf8', function (err, data) {
      if (err) {
        cb(err)
      } else {
        cb(err, data)
      }
    })
  },
  oldTransfer (key, cb) {
    this.token = key
    fs.readFile('E:\\github\\cqlql.github.io\\demo\\20170307_password\\data.json', 'utf8', (err, data) => {
      if (err) {
        cb(err)
      } else {
        data = JSON.parse(data)
        let excu = () => {
          let d = data.shift()
          if (!d) return
          dataApi.add(this.encrypt(d.name), (err, id) => {
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
        cb()
      }
    })
  },
  encrypt (text) {
    return AES.encrypt(text, this.token).toString()
  },
  readMenuFile
}

module.exports = dataApi
