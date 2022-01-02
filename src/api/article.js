import request from '@/utils/request'

export function getArticles (params) {
  // axios({})
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params: params
  })
}
