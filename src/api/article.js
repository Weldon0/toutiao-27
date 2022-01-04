import request from '@/utils/request'

export function getArticles (params) {
  // axios({})
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params: params
  })
}
/**
 * 根据 id 获取指定文章
 */
export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`
  })
}
