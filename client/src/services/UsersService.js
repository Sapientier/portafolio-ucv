import Api from '@/services/Api'

export default {
    getusers() {
        return Api().get('getusers')
    },
    getuserper(values) {
        return Api().get('getuserper', {
            params: {
                _id: values
            }
        })
    },
    getuserpass(values) {
        return Api().post('getuserpass', values)
    },
    insertusers(credentials) {
        return Api().post('insertusers', credentials)
    },
    updateusers(values) {
        return Api().post('updateusers', values)
    },
    updateuserper(values) {
        return Api().post('updateuserper', values)
    },
    updateusernoti(values) {
        return Api().post('updateusernoti', values)
    },
    deleteusers(values) {
        return Api().post('deleteusers', values)
    },
    resetpass(values) {
        return Api().post('resetpass', values)
    },
    modpass(values) {
        return Api().post('modpass', values)
    },
    getreportsuser(values) {
        return Api().post('getreportsuser', values)
    }
}