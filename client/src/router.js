import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Services from '@/components/Services'
import UserProfile from '@/components/UserProfile'
import UsersTable from '@/components/UsersTable'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/services',
            name: 'Services',
            component: Services
        },
        {
            path: '/userprofile',
            name: 'UserProfile',
            component: UserProfile
        },
        {
            path: '/userstable',
            name: 'UsersTable',
            component: UsersTable
        }
    ]
})