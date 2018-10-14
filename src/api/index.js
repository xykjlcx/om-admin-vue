import API from './public'

// // 登录
// export const userLogin = (params) => {
//   return API.fetchPost('/manager/user/login ', params)
// }

// // 退出登录
// export const userLogout = (params) => {
//   return API.fetchGet('/manager/user/logout', params)
// }

// // 注册
// export const register = (params) => {
//   return API.fetchPost('/manager/user/register', params)
// }

// //用户信息
// export const userInfo = (params) => {
//   return API.fetchGet('/manager/user/checkLogin', params)
// }

// //推荐板块
// export const recommend = (params) => {
//   return API.fetchGet('/manager/goods/recommend', params)
// }

// //添加收货地址
// export const addAddress = (params) => {
//   return API.fetchPost('/manager/address/addAddress', params)
// }
// //删除地址
// export const delAddress = (params) => {
//   return API.fetchPost('/manager/address/delAddress', params)
// }
// //查询收货地址
// export const addressList = (params) => {
//   return API.fetchPost('/manager/address/addressList', params)
// }
// //更新收货地址
// export const updateAddress = (params) => {
//   return API.fetchPost('/manager/address/updateAddress', params)
// }

// 获取课程列表
export const getAllCourse = (params) => {
  return API.fetchPost('/admin/test', params)
}

// 获取课程分类
export const getAllClassify = (params) => {
  return API.fetchGet('/admin/courses/getAllClassify', params)
}
