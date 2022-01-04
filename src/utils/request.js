import axios from 'axios'
import store from '@/store'

import jsonBig from 'json-bigint'

const jsonObj = '{"art_id": 9007199254740995, "name": "黑马"}'

console.log(jsonBig.parse(jsonObj).art_id.toString())

const request = axios.create({
  baseURL: 'http://weldon.net.cn:8000',
  transformResponse: [function (data) {
    try {
      return jsonBig.parse(data)
    } catch (e) {
      return data
    }
  }]
})

// console.log(jsonObj)

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
