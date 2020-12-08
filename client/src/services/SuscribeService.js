import Api from '@/services/Api'

export default {
    suscribe(values) {
        return Api().post('suscribeservices', values)
    },
    getsuscribers() {
        return Api().get('getsuscribers')
    },
    getreportsusc(values){
        return Api().get('getreportsusc', values)
    }
}