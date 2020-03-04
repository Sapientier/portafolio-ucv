import Api from '@/services/Api'

export default {
    insertservices (values) {
        return Api().post('insertservices', values)
    },
    getservices () {
        return Api().get('getservices')
    },
}