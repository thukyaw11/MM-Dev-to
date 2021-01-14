import axios from 'axios'

let BaseApi = axios.create({
    baseURL: 'http://localhost:8000/api'
})

let Api = function() {
    return BaseApi
}

export default Api