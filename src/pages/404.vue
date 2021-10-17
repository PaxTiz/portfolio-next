<template>
    <div class="container section">
        <h1>Désolé, cette page n'existe pas :(</h1>

        <CustomButton @click="redirect" text="Retourner sur la page d'accueil" />
    </div>
</template>

<script setup>
import CustomButton from '@/components/CustomButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const redirect = () => {
    router.push({ name: 'home' })
}
</script>

<style scoped>

</style>