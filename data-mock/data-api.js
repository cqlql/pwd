const fs = require('fs')
const path = require('path')
const uuidv1 = require('uuid/v1')
const dataPath = path.resolve(__dirname, './')
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

const dataApi = {
  menuFilePath,
  add (name, cb) {
    this.list(function (err, data) {
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
  list (cb) {
    readMenuFile(function (err, data) {
      if (err) {
        cb(err)
      } else {
        cb(err, data)
      }
    })
  },
  del (id, cb) {
    readMenuFile(function (err, data) {
      if (err) {
        cb(err)
      } else {
        let notFound = true
        data.some((d, i) => {
          if (d.id === id) {
            notFound = false
            data.splice(i, 1)
            return true
          }
        })
        if (notFound) {
          cb(new Error('id 没有找到'))
          return
        }
        writeMenuFile(data, function (err) {
          if (err) {
            cb(err)
            return
          }

          fs.unlink(listPath + '/' + id, function (err) {
            cb(err)
          })
        })
      }
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
  }
}

module.exports = dataApi
