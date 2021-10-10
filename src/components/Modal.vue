<template>
    <div class="modal-wrapper">
        <div @click="closeModal" class="modal-close">X</div>
        <Loading v-if="isLoading" />
        <div v-else class="card">
            <slot  />
        </div>
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from "vue"
import Loading from "./Loading.vue"

const emits = defineEmits(['close'])
const props = defineProps({
    isLoading: {
        type: Boolean,
        default: () => false
    }
})

onMounted(async () => {
    document.body.style.overflow = 'hidden'
})

const closeModal = () => emits('close')

onBeforeUnmount(() => {
    document.body.style.overflow = 'scroll'
})
</script>

<style scoped>
.card {
    position: relative;
    width: 50%;
    max-height: 80%;
    overflow-y: scroll;
}

@media screen and (max-width: 1200px) { .card { width: 60%; } }
@media screen and (max-width: 1100px) { .card { width: 75%; } }
@media screen and (max-width: 700px) { .card { width: 80%; } }
@media screen and (max-width: 550px) { .card { width: 90%; } }

.modal-close {
    position: absolute;
    z-index: 100000;
    right: calc(25% - var(--spacing-3) * 2);
    top: var(--spacing-3);
    right: var(--spacing-3);
    color: #fff;
    font-size: 2em;
    font-weight: bold;
    cursor: pointer;
}
</style>