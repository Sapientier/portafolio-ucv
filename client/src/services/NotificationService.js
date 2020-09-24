import Api from '@/services/Api'

export default {
    getnotifications (values) {
        return Api().post('getnotifications', values)
    },
}