<template>
    <div class="card admin">
        <div class="card-header">
            <span>Compétences</span>
            <div class="buttons">
                <CustomButton text='Nouveau' />
                <CustomButton @click="toggle" :text="isOpen ? '-' : '+'" />
            </div>
        </div>
        <div class="card-body" v-if="isOpen">
            <div class="table">
                <div class="row row-3 header">
                    <p>Nom</p>
                    <p>Catégorie</p>
                    <p class="actions">Actions</p>
                </div>
                <div 
                    v-for="category in items"
                    :key="category.id"
                    class="row row-3"
                >
                    <p>{{ category.name }}</p>
                    <p>{{ category.category.name }}</p>
                    <div class="actions">
                        <p>Modifier</p>
                        <p>Supprimer</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import CustomButton from '@/components/CustomButton.vue'
import { ref } from '@vue/reactivity'

const isOpen = ref(false)

const toggle = () => {
    isOpen.value = !isOpen.value
}

defineProps({
    items: {
        type: Array,
        required: true
    }
})
</script>
