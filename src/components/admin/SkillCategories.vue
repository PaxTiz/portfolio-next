<template>
    <div class="card admin">
        <div class="card-header">
            <span>Catégories</span>
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
                    <p>Privé</p>
                    <p class="actions">Actions</p>
                </div>
                <div 
                    v-for="category in items"
                    :key="category.id"
                    class="row"
                >
                    <p>{{ category.name }}</p>
                    <p>{{ category.en_name }}</p>
                    <p>{{ isPrivate(category.private) }}</p>
                    <p class="error" @click="() => toggleModal(category)">Supprimer</p>
                </div>
            </div>
        </div>
    </div>

    <CreateCategory 
        v-if="showCreate" 
        @close="toggleCreate" 
    />
    <ConfirmationModal 
        v-if="showModal" 
        @close="deleteItem"
        text="Voulez-vous vraiment supprimer cet élément ?"
    />
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import supabase from '@/supabase'
import CustomButton from '@/components/CustomButton.vue'
import ConfirmationModal from '@/components/admin/modals/ConfirmationModal.vue'
import CreateCategory from '@/components/admin/modals/CreateCategory.vue'

const router = useRouter()

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
const isPrivate = boolean => boolean ? 'Oui' : 'Non'

const deleteItem = async del => {
    if (del) {
        await supabase.from('skill_category')
            .delete({ returning: 'minimal' })
            .match({ id: currentModalItem.value.id })
        router.go(0)
    }

    toggleModal()
}

defineProps({
    items: {
        type: Array,
        required: true
    }
})
</script>

<style scoped>
.row {
    grid-template-columns: 1fr 1fr 1fr 100px;
}
</style>
