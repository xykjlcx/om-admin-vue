import axios from 'axios'

axios.defaults.timeout = 10000

const base = "http://139.199.212.202:8086/admin"

export default{
	fetchPost(url, params) {
		return axios.post(`${base}${url}`, params).then(res => res.data)
	},
	fetchGet(url, params) {
	    return axios.get(`${base}${url}`, params).then(res => res.data)
	}
} 

