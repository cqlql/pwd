const SHE3 = require('crypto-js/sha3')
const Base64 = require('crypto-js/enc-base64')
const express = require('express')

const router = express.Router()

router.get('/GetMessage', function (req, res) {
  res.send({
    'status': 200,
    'message': 'ok',
    'result': {}
  })
})

router.post('/login', function (req, res) {
  // log(Base64.stringify(SHE3(req.body.key)))
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

module.exports = router
