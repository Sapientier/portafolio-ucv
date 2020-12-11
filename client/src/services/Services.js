import Api from '@/services/Api'

export default {
    insertservices(values) {
        return Api().post('insertservices', values)
    },
    getuniservicebycat(values) {
        return Api().get('getuniservicebycat', {
            params: {
                category: values
            }
        })
    },
    getuniservicebyname(values) {
        return Api().get('getuniservicebyname', {
            params: {
                name: values
            }
        })
    },
    getuniservicebyapproved(values) {
        return Api().get('getuniservicebyapproved', {
            params: {
                approve: values
            }
        })
    },
    getservices() {
        return Api().get('getservices')
    },
    deleteservices(values) {
        return Api().post('deleteservices', values)
    },
    updateservices(values) {
        return Api().post('updateservices', values)
    },
    getreportserv(values) {
        return Api().post('getreportserv', values)
    }
}