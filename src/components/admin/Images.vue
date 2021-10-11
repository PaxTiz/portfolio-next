<template>
    <div class="card">
        <div class="card-header">
            <span>Images</span>
            <CustomButton text='+' />
        </div>
        <div class="card-body images">
            <div class="grid">
                <div 
                    v-for="folder in items"
                    :key="folder.name"
                    class="card"
                >
                    {{ folder.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import CustomButton from '@/components/CustomButton.vue'

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
