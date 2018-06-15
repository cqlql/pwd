import AES from 'crypto-js/aes'
import enc from 'crypto-js/enc-utf8'
import Ajax from './ajax'
// import AjaxApp from './app'
// import answer from '@/views/ques/com/answer'

// let Ajax = AjaxApp
// if (process.env.NODE_ENV !== 'production') {
//   Ajax = window.AjaxWeb
// }

const ajax = new Ajax(function (data) {
  if (data.code === 0) {
    return data.result
  }
  return new Error(data.message)
})

const api = {
  token: '',
  itemId: '',
  oldTransfer () {
    return ajax.post('/oldTransfer', {key: this.token})
  },
  login (key) {
    return ajax.post('/login', {key}).then(() => {
      this.token = key
      sessionStorage.setItem('token', key)
    })
  },
  list () {
    return ajax.get('/list')
  },
  add (name) {
    return ajax.post('/add', {name})
  },
  del (id) {
    return ajax.post('/del', {id})
  },
  editName (data) {
    return ajax.post('/editName', data)
  },
  editContent (content) {
    return ajax.post('/editContent', {
      id: this.itemId,
      content
    })
  },
  getItem (id) {
    return ajax.get('/getItem', {params: {id}})
  },
  encrypt (text) {
    return AES.encrypt(text, this.token).toString()
  },
  decrypt (ciphertext) {
    return AES.decrypt(ciphertext, this.token).toString(enc)
  }
}

if (!api.token) {
  api.token = sessionStorage.getItem('token')
}

export default api
