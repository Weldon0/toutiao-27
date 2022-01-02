import request from '@/utils/request'

/**
 * 获取所有频道
 */
export const getAllChannels = () => {
  return request({ // axios
    method: 'GET',
    url: '/v1_0/channels'
  })
}
