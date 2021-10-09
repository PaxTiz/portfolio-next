<template>
    <div class="container section">
        <h1>Ah désolé, je ne peux pas vous laisser continuer :(</h1>

        <div class="card">
            <form method="post" @submit.prevent="login">
                <label for="email">
                    Email
                    <input 
                        v-model="form.email"
                        :class="{'error': errors.email}"
                        name="email" 
                        type="text" 
                        placeholder="Email"
                    >
                </label>

                <label for="password">
                    Mot de passe
                    <input 
                        v-model="form.password"
                        :class="{'error': errors.password}"
                        name="password" 
                        type="password" 
                        placeholder="Mot de passe"
                    >
                </label>

                <CustomButton @click.prevent="login" text="Connexion" />
            </form>
        </div>
    </div>
</template>

<script setup>
import CustomButton from '@/components/CustomButton.vue'
import supabase from '@/supabase'
import { inject, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const cookies = inject('cookies')
const router = useRouter()
const form = reactive({
    email: '',
    password: ''
})
const errors = reactive({
    email: false,
    password: false
})

watch(form, () => {
    Object.keys(errors).forEach(e => errors[e] = false)
})

const login = async () => {
    if (Object.values(errors).every(e => e === false)) {
        errors.email = false
        errors.password = false

        supabase.auth.signIn({
            email: form.email,
            password: form.password
        }).then(({ user, session, e }) => {
            if (e) {
                errors.email = true
                errors.password = true
            } else {
                cookies.set('user', user, session.expires_in)
                cookies.set('access_token', session.access_token, session.expires_in)
                cookies.set('refresh_token', session.access_token, session.expires_in)
                router.push({ name: 'admin' })
            }
        }).catch(() => {
            errors.email = true
            errors.password = true
        })
    }
}
</script>

<style scoped>
.container {
    width: 40%;
}

@media screen and (max-width: 1000px) { .container { width: 60%; } }
@media screen and (max-width: 600px) { .container { width: 80%; } }

h1 {
    text-align: center;
}

input {
    margin-bottom: var(--spacing-2);
}
</style>