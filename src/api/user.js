// request
import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
}

// 获取验证码的接口
export const sendSms = mobile => {
  return request({ // axios 2xx状态吗 成功  不是200-300之间的，走了失败
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取用户自己的信息
 */
export const getUserInfo = () => {
  return request({ // axios
    method: 'GET',
    url: '/v1_0/user'
    // 发送请求头数据
    // headers: {
    //   // 注意：该接口需要授权才能访问
    //   // token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

/**
 * 获取用户自己的信息
 */
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
