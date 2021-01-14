import Api from '../Api'

export default {
    subscribe(payload) {
        /*
            payload params = {
                name: "",
                email: "",
                ip: ""
            }
        */
        return Api().post('/subscribe/email', payload)

    }
}