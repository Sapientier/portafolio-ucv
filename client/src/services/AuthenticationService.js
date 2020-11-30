import Api from '@/services/Api'

export default {
    login(credentials) {
        return Api().post('login', credentials)
    },
    resetpass(values) {
        return Api().post('resetpassLogin', values)
    }
}

