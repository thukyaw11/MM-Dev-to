import Api from '../Api'

export default {
    view(payload) {
        /*
            payload params = {
                post_id: "",
                post_view: ""
            }
        */
        return Api().post('/increase/view', payload)

    },
    getAllViews() {
        return Api().get('/get/view');
    }
}