import axios from 'axios'

axios.defaults.timeout = 10000

const base = "http://127.0.0.1:8086/admin"

export default{
	fetchPost(url, params) {
		return axios.post(`${base}${url}`, params).then(res => res.data)
	},
	fetchGet(url, params) {
	    return axios.get(`${base}${url}`, params).then(res => res.data)
	}
} 

