import Api from '@/services/Api'

export default {
    insertservices (values) {
        return Api().post('insertservices', values)
    },
    getuniservicebycat (values) {
        return Api().post('getuniservicebycat', values)
    },
    getuniservicebyname (values) {
        return Api().post('getuniservicebyname', values)
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
    suscribeservices (values) {
        return Api().post('suscribeservices', values)
    },
}