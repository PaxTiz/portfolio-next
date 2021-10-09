<template>
    <div class="card">
        <div class="container">
            <ul>
                <li v-for="link in links()" :key="link.title">
                    <a :href="link.href" :target="link.blank ? '_blank' : '_self'" class="active-small">
                        {{ link.title }}
                    </a>
                </li>
            </ul>
            <div>
                <p>
                    Site web réalisé avec
                    <a 
                        href="https://vuejs.org"
                        target="_blank" 
                        rel="noreferrer"
                        class="active-small"
                    >
                        Vue.js
                    </a> 
                    et
                    <a 
                        href="https://supabase.io" 
                        target="_blank" 
                        rel="noreferrer"
                        class="active-small"
                    >
                        Supabase
                    </a>
                    , hébergé sur 
                    <a 
                        href="https://digitalocean.com" 
                        target="_blank" 
                        rel="noreferrer"
                        class="active-small"
                    >
                        DigitalOcean
                    </a>
                </p>
                <p>
                    Copyright &copy; {{ year() }} Valentin Cernuta - Tous droits réservés
                </p>
            </div>
        </div>
    </div>    
</template>

<script setup>
const links = () => ([
    { href: '/#/', title: 'Accueil' },
    { href: '/#/about', title: 'A propos' },
    { href: '/#/skills', title: 'Mes compétences' },
    { href: '/#/works', title: 'Mes réalisations' },
    { href: '/#/contact', title: 'Contact' },
    { href: 'https://github.com/PaxTiz', title: 'Github', blank: true },
    { href: '', title: 'LinkedIn', blank: true },
])
const year = () => {
    return new Date().getFullYear()
}
</script>

<style scoped>
ul {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    row-gap: 16px;
}
ul li {
    list-style: none;
}
.card {
    border-radius: 0;
    margin-top: 4em;
}

p, p a {
    line-height: 1.5;
}

.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
@media screen and (max-width: 880px) {
    a {
        line-height: 2;
    }
    .container {
        /* align-items: flex-start; */
        gap: 4em;
    }
}
</style>
