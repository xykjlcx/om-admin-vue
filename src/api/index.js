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
export const addAndEditCourse = (params) => {
  return API.fetchPost('/admin/courses/addAndEditCourse', params)
}

// 课程搜索
export const searchCourses = (params) => {
  return API.fetchPost('/admin/courses/searchCourses', params)
}

// 操作课程是否推荐至轮播
export const operateCourseIsBanner = (params) => {
  return API.fetchPost('/admin/courses/operateCourseToBanner', params)
}

// 操作课程上架/下架
export const operateCourseIsPutAway = (params) => {
  return API.fetchPost('/admin/courses/operateCourseIsPutAway', params)
}

// 删除一条课程
export const deleteCourseItem = (params) => {
  return API.fetchPost('/admin/courses/deleteCourseItem', params)
}


// 获取某一条课程的信息
export const getCourseOneById = (params) => {
  return API.fetchPost('/admin/courses/getCourseOneById', params)
}
