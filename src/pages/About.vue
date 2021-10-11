<template>
    <div class="container section">
        <h1>A propos de moi</h1>

        <p>Je m'appelle Valentin Cernuta, j'ai 20 ans et j'habite Bully-Les-Mines.</p>
        <p>Je suis disponible sur les villes de Lens, Arras & Lille.</p>
        <p>Je peux parler en français (langue maternelle) ainsi qu'en anglais (niveau B2).</p>

        <div class="card"></div>

        <h2>CDD - <a target="_blank" class="active-small" href="https://pragmea.fr">Pragmea</a></h2>
        <p>Développement full-stack frontend, backend & mobile de juin 2021 à décembre 2021</p>

        <div class="card"></div>

        <h2>Licence professionnelle Développement Informatique et Outils Collaboratifs</h2>
        <p>Une année à l'IUT de Lens de septembre 2021 à juin 2021</p>

        <div class="card"></div>

        <h2>DUT Informatique</h2>
        <p>Deux années à l'IUT de Lens de 2018 à 2020</p>
    </div>
</template>

<script setup>
import CustomButton from '@/components/CustomButton.vue'
</script>

<style scoped>
.card {
    height: 1px !important;
    padding: 0;
    margin: var(--spacing-3) 0;
}

p {
    line-height: 1.5;
}
</style>