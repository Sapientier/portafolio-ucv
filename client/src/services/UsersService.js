import Api from '@/services/Api'

export default {
    insertusers (credentials) {
        return Api().post('insertusers', credentials)
    },
    getusers () {
        return Api().get('getusers')
    },
    getuserpass (values) {
        return Api().post('getuserpass', values)
    },
    getuserper (values) {
        return Api().post('getuserper', values)
    },
    updateusers (values) {
        return Api().post('updateusers', values)
    },
    updateuserper (values) {
        return Api().post('updateuserper', values)
    },
    deleteusers (values) {
        return Api().post('deleteusers', values)
    },
    resetpass (values) {
        return Api().post('resetpass', values)
    },
    modpass (values) {
        return Api().post('modpass', values)
    }
}