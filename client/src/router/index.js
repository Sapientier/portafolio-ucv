import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from '@/components/HelloWorld'
import Register from '@/components/Register'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: Hello
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        }
    ]
})