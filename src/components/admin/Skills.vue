<template>
    <div class="card admin">
        <div class="card-header">
            <span>Compétences</span>
            <div class="buttons">
                <CustomButton @click="toggleCreate" text='Nouveau' />
                <CustomButton @click="toggle" :text="isOpen ? '-' : '+'" />
            </div>
        </div>
        <div class="card-body" v-if="isOpen">
            <div class="table">
                <div class="row header">
                    <p>Nom</p>
                    <p>Nom anglais</p>
                    <p>Catégorie</p>
                    <p class="actions">Actions</p>
                </div>
                <div 
                    v-for="category in items"
                    :key="category.id"
                    class="row"
                >
                    <p>{{ category.name }}</p>
                    <p>{{ category.en_name }}</p>
                    <p>{{ category.category.name }}</p>
                    <p class="error" @click="() => toggleModal(category)">Supprimer</p>
                </div>
            </div>
        </div>
    </div>

    <CreateSkill 
        v-if="showCreate"
        :categories="categories"
        @close="toggleCreate" 
    />
    <ConfirmationModal 
        v-if="showModal" 
        @close="deleteItem"
        text="Voulez-vous vraiment supprimer cet élément ?"
    />
    
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import supabase from '@/supabase'
import CustomButton from '@/components/CustomButton.vue'
import ConfirmationModal from '@/components/admin/modals/ConfirmationModal.vue'
import CreateSkill from '@/components/admin/modals/CreateSkill.vue'
const router = useRouter()

defineProps({
    items: {
        type: Array,
        required: true
    },
    categories: {
        type: Array,
        required: true
    }
})

const showModal = ref(false)
const showCreate = ref(false)
const currentModalItem = ref(null)
const isOpen = ref(false)

const toggleModal = item => {
    if (showModal.value === true) {
        showModal.value = false
        currentModalItem.value = null
    } else {
        showModal.value = true
        currentModalItem.value = item
    }
}
const toggle = () => isOpen.value = !isOpen.value
const toggleCreate = () => showCreate.value = !showCreate.value

const deleteItem = async ok => {
    if (ok) {
        await supabase.from('skill')
            .delete({ returning: 'minimal' })
            .eq('id', currentModalItem.value.id)
        router.go(0)
    }
    toggleModal()
}
</script>

<style scoped>
.row {
    grid-template-columns: 1fr 1fr 1fr 100px;
}
</style>
