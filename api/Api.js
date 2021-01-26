import axios from 'axios'

let BaseApi = axios.create({
    baseURL: 'https://devtomm.herokuapp.com/api'
})

let Api = function() {
    return BaseApi
}

export default Api