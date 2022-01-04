/**
 * 用户相关请求模块
 */
import request from '@/utils/request'

export const getSearchSuggestions = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 获取搜索结果
 */
export function getSearchResult (params) { // {page: 1, per_page:20, q: '关键字'}
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params: params
  })
}
