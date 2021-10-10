<template>
    <Modal>
        <div class="card-body">
            <h2>{{ text }}</h2>
        </div>
        <div class="card-footer">
            <a @click="() => closeModal(false)">
                Annuler
            </a>
            <a class="error" @click="() => closeModal(true)">
                Valider
            </a>
        </div>
    </Modal>
</template>

<script setup>
import Modal from "@/components/Modal.vue"

const emits = defineEmits(['close'])
const props = defineProps({
    text: {
        type: String,
        required: true
    }
})

const closeModal = (value) => emits('close', value)
</script>

<style scoped>
.card-footer {
    padding: var(--spacing-2) var(--spacing-3);
}
.card-footer * {
    cursor: pointer;
}
</style>