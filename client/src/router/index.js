import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Hello
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
})