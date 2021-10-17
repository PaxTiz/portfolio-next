<template>
    <div class="card">
        <div class="card-header">
            <span>Images</span>
            <CustomButton @click='toggle' :text='isOpen ? "-" : "+"' />
        </div>
        <div v-if="isOpen" class="card-body images">
            <div class="grid">
                <div 
                    v-for="folder in items"
                    :key="folder.name"
                    class="card"
                    @click="() => toggleFolderModal(folder)"
                >
                    {{ folder.name }}
                </div>
            </div>
        </div>
    </div>

    <FolderModal
        v-if="showFolderModal"
        :folder="currentFolder"
        @close="toggleFolderModal"
    />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import CustomButton from '@/components/CustomButton.vue'
import FolderModal from '@/components/admin/modals/FolderModal.vue'

const isOpen = ref(false)
const showFolderModal = ref(false)
const currentFolder = ref(null)

const toggleFolderModal = item => {
    if (showFolderModal.value === true) {
        showFolderModal.value = false
        currentFolder.value = null
    } else {
        showFolderModal.value = true
        currentFolder.value = item
    }
}

const toggle = () => isOpen.value = !isOpen.value

defineProps({
    items: {
        type: Array,
        required: true
    }
})
</script>

<style scoped>
.images .card {
    cursor: pointer;
}
</style>
