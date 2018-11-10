import API from './public'

// 获取课程分类
export const getHomeData = (params) => {
  return API.fetchGet('/home/getHomeData', params)
}

// 获取课程列表
export const getAllCourse = (params) => {
  return API.fetchPost('/courses/getAllCourses', params)
}

// 获取课程分类
export const getAllClassify = (params) => {
  return API.fetchGet('/courses/getAllClassify', params)
}

// 获取课程分类（树形结构）
export const getAllClassifyTree = (params) => {
  return API.fetchGet('/courses/getAllClassifyTree', params)
}

// 添加或修改分类（树形结构）
export const addAndEditClassify = (params) => {
  return API.fetchPost('/courses/addAndEditClassify', params)
}

// 删除分类（树形结构）
export const deleteClassify = (params) => {
  return API.fetchPost('/courses/deleteClassify', params)
}

// 添加课程
export const addAndEditCourse = (params) => {
  return API.fetchPost('/courses/addAndEditCourse', params)
}

// 课程搜索
export const searchCourses = (params) => {
  return API.fetchPost('/courses/searchCourses', params)
}

// 操作课程是否推荐至轮播
export const operateCourseIsBanner = (params) => {
  return API.fetchPost('/courses/operateCourseToBanner', params)
}

// 操作课程上架/下架
export const operateCourseIsPutAway = (params) => {
  return API.fetchPost('/courses/operateCourseIsPutAway', params)
}

// 删除一条课程
export const deleteCourseItem = (params) => {
  return API.fetchPost('/courses/deleteCourseItem', params)
}


// 获取某一条课程的信息
export const getCourseOneById = (params) => {
  return API.fetchPost('/courses/getCourseOneById', params)
}

// 获取课程章节
export const getCourseChapterAndSection = (params) => {
  return API.fetchPost('/courses/getCourseChapterAndSection', params)
}

// 新增课程章节
export const addChapterAndSection = (params) => {
  return API.fetchPost('/courses/addChapterAndSection', params)
}

// 编辑课程章节
export const editChapterAndSection = (params) => {
  return API.fetchPost('/courses/editChapterAndSection', params)
}

// 删除课程章节
export const deleteChapterAndSection = (params) => {
  return API.fetchPost('/courses/deleteChapterAndSection', params)
}

// 获取所有评论
export const getAllComment = (params) => {
  return API.fetchPost('/courses/getAllComment', params)
}

// 删除一条评论
export const deleteComment = (params) => {
  return API.fetchPost('/courses/deleteComment', params)
}

// 获取用户列表
export const getAllUserInfo = (params) => {
  return API.fetchPost('/user/getAllUserInfo', params)
}

// 删除某个用户
export const deleteUser = (params) => {
  return API.fetchPost('/user/deleteUser', params)
}


// 操作改变用户状态
export const operateUserStatus = (params) => {
  return API.fetchPost('/user/operateUserStatus', params)
}

// 登录
export const login = (params) => {
  return API.fetchPost('/user/login', params)
}

//用户信息
export const checkLogin = (params) => {
	return API.fetchPost('/user/checkLogin',params)
}

//退出登录
export const logout = (params) => {
	return API.fetchPost('/user/logout',params)
}

