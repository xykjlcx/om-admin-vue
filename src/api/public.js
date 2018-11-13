import axios from 'axios'

axios.defaults.timeout = 10000

const base = "https://www.oceanmooc.com:8086/api/admin"

export default{
	fetchPost(url, params) {
	    return axios.post(`${base}${url}`, params).then(res => res.data)
	},
	fetchGet(url, params) {
	    return axios.get(`${base}${url}`, params).then(res => res.data)
	}
} 

