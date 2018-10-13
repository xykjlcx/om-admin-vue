import request from '@/utils/request'

export function getCourses(params) {
  return request({
    url: '/admin/test',
    method: 'get',
    params
  })
}
