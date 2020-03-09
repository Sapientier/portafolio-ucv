import Api from '@/services/Api'

export default {
    insertservices (values) {
        return Api().post('insertservices', values)
    },
    getservices () {
        return Api().get('getservices')
    },
    deleteservices (values) {
        return Api().post('deleteservices', values)
    },
    updateservices (values) {
        return Api().post('updateservices', values)
    },
}