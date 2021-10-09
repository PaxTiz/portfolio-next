import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/', name: 'home', component: () => import('@/pages/Home.vue') },
    { path: '/about', name: 'about', component: () => import('@/pages/About.vue') },
    { path: '/skills', name: 'skills', component: () => import('@/pages/Skills.vue') },
    { path: '/works', name: 'works', component: () => import('@/pages/Works.vue') },
    { path: '/contact', name: 'contact', component: () => import('@/pages/Contact.vue') },
    { path: '/login', name: 'login', component: () => import('@/pages/admin/Login.vue') },
    { path: '/admin', name: 'admin', component: () => import('@/pages/admin/Admin.vue') },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

  export default router