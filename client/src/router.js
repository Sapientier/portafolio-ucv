import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/admin/Login'
import Services from '@/components/Services'
import UserProfile from '@/components/admin/UserProfile'
import UsersTable from '@/components/admin/UsersTable'
import Reports from '@/components/admin/Reports'
import Credits from '@/components/Credits'
import CustomReport from '@/components/admin/CustomReport'
import NotFound from '@/components/core/NotFound'

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
        },
        {
            path: '/reports',
            name: 'Reports',
            component: Reports
        },
        {
            path: '/credits',
            name: 'Credits',
            component: Credits
        },
        {
            path: '/customreport',
            name: 'CustomReport',
            component: CustomReport
        },
        {
            path: '*',
            name: 'NotFound',
            component: NotFound
        }
    ]
})