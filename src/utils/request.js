import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  const user = store.state.user
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
//  统一添加token
//  判断用户是否有token
}, err => {
  console.log(err)
  return Promise.reject(err)
})

// request.interceptors.response.use(function (data) {
//   return data.data
// })

export default request
