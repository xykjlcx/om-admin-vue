import API from './public'

// 获取课程列表
export const getAllCourse = (params) => {
  return API.fetchPost('/admin/courses/getAllCourses', params)
}

// 获取课程分类
export const getAllClassify = (params) => {
  return API.fetchGet('/admin/courses/getAllClassify', params)
}

// 添加课程
export const addCourse = (params) => {
  return API.fetchPost('/admin/courses/addCourse', params)
}

// 课程搜索
export const searchCourses = (params) => {
  return API.fetchPost('/admin/courses/searchCourses', params)
}

// 操作课程是否推荐至轮播
export const operateCourseIsBanner = (params) => {
  return API.fetchPost('/admin/courses/operateCourseToBanner', params)
}
