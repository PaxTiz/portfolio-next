<template>
    <div class="background">
        <div class="container">
            <h1>Bienvenue, moi c'est<br> Valentin Cernuta</h1>
            <p>
                Après avoir réalisé une licence professionnelle Développement
                Informatique et Outils Collaboratifs, je suis désormais développeur full-stack web & mobile.
            </p>

            <CustomButton @click="aboutPage" text="En savoir plus" />
        </div>

        <div class="home-img"></div>
    </div>
</template>

<script setup>
import CustomButton from '@/components/CustomButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const aboutPage = () => {
    router.push({ name: 'about' })
}
</script>

<style scoped>
.background {
    position: relative;
    width: 100vw;
    margin: 4em 0;
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 700px !important;
    margin-left: 10%;
}

.home-img {
    position: absolute;
    top: -.5em;
    right: 8em;
    background-image: url('../assets/images/home.svg');
    width: 350px;
    height: 350px;
}


h1 {
    font-size: 3em;
}
p {
    font-size: 1.5em;
    font-family: 'Montserrat', serif;
    line-height: 1.5;
    margin-top: 0;
    margin-bottom: var(--spacing-3);
}

@media screen and (max-width: 1260px) {
    .container { width: 600px !important; }
    h1 { font-size: 2.5em; }
    p { font-size: 1.2em; }
}
@media screen and (max-width: 1130px) {
    .container { width: 500px !important; }
    .home-img { width: 300px; height: 300px; }
    h1 { font-size: 2em; }
    p { font-size: 1em; }
}
@media screen and (max-width: 1000px) {
    .container { width: 400px !important; }
    .home-img { width: 250px; height: 250px; }
}
@media screen and (max-width: 850px) {
    .container { margin-left: 5% !important; }
    .home-img { right: 2em; }
}
@media screen and (max-width: 850px) {
    h1 { font-size: 1.5em; }
}
@media screen and (max-width: 700px) {
    .container { width: 80% !important; margin: 0 auto; }
    .home-img { display: none; }
}
</style>