import Api from '@/services/Api'

export default {
    insertusers (credentials) {
        return Api().post('insertusers', credentials)
    },
    getusers () {
        return Api().get('getusers')
    },
    updateusers (values) {
        return Api().post('updateusers', values)
    },
    deleteusers (values) {
        return Api().post('deleteusers', values)
    },
    resetpass (values) {
        return Api().post('resetpass', values)
    }
}