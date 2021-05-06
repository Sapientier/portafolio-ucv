import Api from '@/services/Api'

export default {
    request(values) {
        return Api().post('requestservice', values)
    },
    getrequests() {
        return Api().get('getrequests')
    },
    getreportreq(values){
        return Api().post('getreportreq', values)
    }
}