const SHE3 = require('crypto-js/sha3')
const Base64 = require('crypto-js/enc-base64')
const dataApi = require('./data-api')

const router = {
  data: {},
  add (url, fn) {
    this.data[url] = fn
  },
  get (url, fn)  {
    this.add(url,fn)
  },
  post (url, fn)  {
    this.add(url,fn)
  },
}

router.get('/GetMessage', function (req, res) {
  res.send({
    'status': 200,
    'message': 'ok',
    'result': {}
  })
})

router.post('/login', function (req, res) {
  if (Base64.stringify(SHE3(req.body.key)) === 'pq4qaZ7OIWp5OORSJhjbYWTNbFPe+SA1OCLLqgbn98XCDgOsZdVXqr1rfrJ1d5U+2d6BPufjz93WfpwAJtRuxA==') {
    res.send({
      'code': 0,
      'message': 'ok',
      'result': {}
    })
  } else {
    res.send({
      'code': 1,
      'message': '认证失败',
      'result': {}
    })
  }
})

router.get('/list', function (req, res) {
  dataApi.readMenuFile(function (err, data) {
    if (err) {
      res.send({
        'code': 1,
        'message': err.message
      })
    } else {
      res.send({
        'code': 0,
        'message': 'ok',
        'result': data
      })
    }
  })
})

router.post('/add', function (req, res) {
  dataApi.add(req.body.name, function (err, id) {
    if (err) {
      res.send({
        'code': 1,
        'message': err.message
      })
    } else {
      res.send({
        'code': 0,
        'message': 'ok',
        'result': id
      })
    }
  })
})

router.post('/editName', function (req, res) {
  dataApi.editName(req.body, function (err) {
    if (err) {
      res.send({
        'code': 1,
        'message': err.message
      })
    } else {
      res.send({
        'code': 0,
        'message': 'ok'
      })
    }
  })
})

router.post('/editContent', function (req, res) {
  dataApi.editContent(req.body, function (err) {
    if (err) {
      res.send({
        'code': 1,
        'message': err.message
      })
    } else {
      res.send({
        'code': 0,
        'message': 'ok'
      })
    }
  })
})

router.post('/del', function (req, res) {
  dataApi.del(req.body.id, function (err, id) {
    if (err) {
      res.send({
        'code': 1,
        'message': err.message
      })
    } else {
      res.send({
        'code': 0,
        'message': 'ok',
        'result': id
      })
    }
  })
})

router.get('/getItem', function (req, res) {
  dataApi.getItem(req.query.id, function (err, data) {
    if (err) {
      res.send({
        'code': 1,
        'message': err.message
      })
    } else {
      res.send({
        'code': 0,
        'message': 'ok',
        'result': data
      })
    }
  })
})
router.post('/oldTransfer', function (req, res) {
  dataApi.oldTransfer(req.body.key, function (err) {
    if (err) {
      res.send({
        'code': 1,
        'message': err.message
      })
    } else {
      res.send({
        'code': 0,
        'message': 'ok'
      })
    }
  })
})

module.exports = router