import Api from '@/services/Api'

export default {
    getusers () {
        return Api().get('getusers')
    },
    updateusers (values) {
        return Api().post('updateusers', values)
    },
    deleteusers (values) {
        return Api().post('deleteusers', values)
    }
}