<template>
    <ResponsiveTopbar @menu="toggleMenu" class="responsive-topbar" />
    <nav id="menu" class="card mobile" :style="{'display': height}">
        <div class="container">
            <ul>
                <router-link
                    v-for="link in menuLinks"
                    :key="link.path"
                    :class="{'active': link.path === currentItem}"
                    :to="link.path"
                >{{ link.title }}</router-link>
            </ul>
        </div>
    </nav>
</template>

<script setup>
import { computed, ref, watch } from "vue"
import { useRoute } from "vue-router"
import ResponsiveTopbar from './ResponsiveTopbar.vue'
const route = useRoute()

const currentItem = ref('/')
const menuOpen = ref(false)

const menuLinks = computed(() => ([
    { path: '/', title: 'Accueil' },
    { path: '/about', title: 'A propos' },
    { path: '/skills', title: 'Mes compétences' },
    { path: '/works', title: 'Mes réalisations' },
    { path: '/contact', title: 'Contact' },
]))

const height = computed(() => {
    if (document.body.clientWidth <= 740) {
        return menuOpen.value === false ? 'none' : 'block'
    }
    return 'block'
})

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
}

watch(() => route.path, (n) => {
    currentItem.value = n
})

const onResize = () => {
    if (document.body.clientWidth > 740) {
        menuOpen.value = true
        document.getElementById('menu').style.display = 'block'
    }
}
window.onresize = onResize
</script>

<style scoped>
.responsive-topbar {
    display: none;
}
nav {
    padding: 0;
    border-radius: 0;
}

nav ul {
    display: flex;
    padding: 0;
    margin: 0;
}

a {
    display: block;
    padding: 32px;
}

@media screen and (max-width: 925px) {
    .container { width: 90%; }
}
@media screen and (max-width: 921px) {
    .container { width: 100%; }
}
@media screen and (max-width: 740px) {
    .responsive-topbar {
        display: flex;
    }
    nav ul {
        flex-direction: column;
    }

    a {
        padding-top: 16px;
        padding-bottom: 16px;
    }

    a.active {
        box-shadow: inset 5px 0 0 var(--blue);
    }
}
</style>
