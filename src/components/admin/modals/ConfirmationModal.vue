<template>
    <div class="modal-wrapper">
        <div class="card">
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
        </div>
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from "vue"

const emits = defineEmits(['close'])
const props = defineProps({
    text: {
        type: String,
        required: true
    }
})

onMounted(async () => {
    document.body.style.overflow = 'hidden'
})

const closeModal = (value) => emits('close', value)

onBeforeUnmount(() => {
    document.body.style.overflow = 'scroll'
})
</script>

<style scoped>
.card {
    position: relative;
    width: 400px;
    max-height: 80%;
    overflow-y: scroll;
}
.card-footer {
    padding: var(--spacing-2) var(--spacing-3);
}
.card-footer * {
    cursor: pointer;
}

@media screen and (max-width: 1200px) { .card { width: 60%; } }
@media screen and (max-width: 1100px) { .card { width: 75%; } }
@media screen and (max-width: 700px) { .card { width: 80%; } }
@media screen and (max-width: 550px) { .card { width: 90%; } }
</style>