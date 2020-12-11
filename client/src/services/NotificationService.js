import Api from '@/services/Api'

export default {
    getnotifications(values) {
        return Api().get('getnotifications', {
            params: {
                email: values
            }
        })
    },
    insertnotifications(values) {
        return Api().post('insertnotifications', values)
    },
    deletenotifications(values) {
        return Api().post('deletenotifications', values)
    },
    getreportsnoti(values) {
        return Api().post('getreportsnoti', values)
    }
}