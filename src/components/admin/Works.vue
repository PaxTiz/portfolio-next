<template>
    <div class="card admin">
        <div class="card-header">
            <span>Projets</span>
            <div class="buttons">
                <CustomButton text='Nouveau' />
                <CustomButton @click="toggle" :text="isOpen ? '-' : '+'" />
            </div>
        </div>
        <div class="card-body" v-if="isOpen">
            <div class="table">
                <div class="row row-4 header">
                    <p>Titre</p>
                    <p>Année</p>
                    <p>Site web</p>
                    <p class="actions">Actions</p>
                </div>
                <div 
                    v-for="work in items"
                    :key="work.id"
                    class="row row-4"
                >
                    <p>{{ work.title }}</p>
                    <p>{{ work.year }}</p>
                    <p v-if="work.website">
                        <a class="active-small" target="_blank" :href="work.website">{{ work.website }}</a>
                    </p>
                    <p v-else>-</p>
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
import { onMounted } from '@vue/runtime-core'

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
