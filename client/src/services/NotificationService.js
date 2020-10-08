import Api from '@/services/Api'

export default {
    getnotifications (values) {
        return Api().post('getnotifications', values)
    },
    insertnotifications (values) {
        return Api().post('insertnotifications', values)
    },
    deletenotifications (values) {
        return Api().post('deletenotifications', values)
    }
}