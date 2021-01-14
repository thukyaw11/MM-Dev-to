import axios from 'axios'
export default {
    getIp() {
        return axios.get('https://api.ipify.org?format=json');
    }
}