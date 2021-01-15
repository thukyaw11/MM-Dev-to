import axios from 'axios'

let BaseApi = axios.create({
    baseURL: 'https://devtomm.unionpowerpac.com.mm/api'
})

let Api = function() {
    return BaseApi
}

export default Api