<template>
    <button @click="click" :class="variant">
        {{ props.text }}
    </button>
</template>

<script setup>
const emit = defineEmits(['click'])
const props = defineProps({
    text: {
        type: String,
        required: true
    },
    variant: {
        type: String,
        default: () => 'primary'
    }
})

const click = e => {
    emit('click', e)
}
</script>

<style scoped>
button {
    width: fit-content;
    padding: 8px 32px;
    font-weight: bold;
    border-radius: var(--radius);
    border: none;
    font-size: 1em;
    cursor: pointer;
}

.primary {
    background-color: var(--light-blue);
    color: var(--blue);
}
</style>
