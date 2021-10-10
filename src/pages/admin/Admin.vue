<template>
    <div class="container section">
        <h1>Administration</h1>

        <CustomButton @click='logout' text='Logout' />
    </div>
</template>

<script setup>
import CustomButton from '@/components/CustomButton.vue'
import supabase from '@/supabase'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
    const user = supabase.auth.user()
    if (user === null) {
        router.push({ name: 'login' })
    }
})

const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error === null) {
        router.push({ name: 'login' })
    }
}
</script>