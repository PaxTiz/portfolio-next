import { createRouter, createWebHashHistory } from 'vue-router'
import supabase from './supabase'

const routes = [
    { path: '/', name: 'home', component: () => import('@/pages/Home.vue') },
    { path: '/about', name: 'about', component: () => import('@/pages/About.vue') },
    { path: '/skills', name: 'skills', component: () => import('@/pages/Skills.vue') },
    { path: '/works', name: 'works', component: () => import('@/pages/Works.vue') },
    { path: '/contact', name: 'contact', component: () => import('@/pages/Contact.vue') },
    { path: '/login', name: 'login', component: () => import('@/pages/admin/Login.vue') },
    { 
        path: '/admin', 
        name: 'admin', 
        meta: {
            requiresAuth: true
        },
        component: () => import('@/pages/admin/Admin.vue') 
    },
    { path: '/:catchAll(.*)', name: '404', component: () => import('@/pages/404.vue') },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const { $cookies } = router.app.config.globalProperties
    const isAuth = supabase.auth.user() !== null
    if (to.name === 'login' && isAuth) {
        return next({ name: 'home' })
    }
    if (to.meta.requiresAuth && !isAuth) {
        return next({ name: 'login' })
    }

    return next()
})

export default router