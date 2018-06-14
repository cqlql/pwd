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
  // userId: '',
  // userName: '',
  login (key) {
    return ajax.post('/login', {key}).then(() => {
      this.token = key
      localStorage.setItem('token', key)
    })
  },
  list () {
    return ajax.get('/list')
  },
  getExam (data) {
    return ajax.post('/Data/GetExam', data)
  },
  submit () {
    // console.log('提交的数据', answer.submit)
    // return ajax.post('/Data/Submit', {
    //   userId: this.userId,
    //   userName: this.userName,
    //   examId: answer.examId,
    //   results: answer.submit,
    //   campusId: '4973983044197569754'
    // })
  }
}

if (!api.token) {
  api.token = localStorage.getItem('token')
}

export default api
