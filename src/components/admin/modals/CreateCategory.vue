<template>
    <Modal>
        <div class="card-body">
            <h2>Ajouter une catégorie</h2>
            <form method="post" @submit="create">
                <label for="name">
                    Nom de la catégorie
                    <input
                        v-model="form.name"
                        :class="{'error': errors.name}"
                        type="text" 
                        name="name" 
                        placeholder="Nom de la catégorie"
                    >
                </label>
                <label for="en_name">
                    Nom en anglais
                    <input 
                        v-model="form.en"
                        :class="{'error': errors.en}"
                        type="text" 
                        name="en_name" 
                        placeholder="Nom en anglais"
                    >
                </label>
                <label for="private">
                    Afficher ?
                    <input 
                        v-model="form.checked"
                        type="checkbox" 
                        name="private" 
                    >
                </label>
            </form>
        </div>
        <div class="card-footer">
            <a @click="() => closeModal(false)">
                Annuler
            </a>
            <a class="success" @click="create">
                Valider
            </a>
        </div>
    </Modal>
</template>

<script setup>
import { reactive, watch } from "vue"
import { v4 as uuidv4 } from "uuid"
import Modal from "@/components/Modal.vue"
import supabase from "@/supabase"

const form = reactive({
    name: '',
    en: '',
    checked: true
})
const errors = reactive({
    name: false,
    en: false,
})
const emits = defineEmits(['close'])
const closeModal = (val) => emits('close', val)

watch(form, () => {
    Object.keys(errors).forEach(e => errors[e] = false)
})

const create = () => {
    if (form.name.length === 0) {
        errors.name = true
    }
    if (form.en.length === 0) {
        errors.en = true
    }

    if (Object.values(errors).every(e => e === false)) {
        supabase.from('skill_category').insert({
            name: form.name,
            en_name: form.en,
            private: form.checked,
            id: uuidv4()
        }, { returning: 'minimal' }).then(({ error }) => {
            if (!error) {
                closeModal(true)
            }
        })

        closeModal(false)
    }
}
</script>

<style scoped>
.card-footer {
    padding: var(--spacing-2) var(--spacing-3);
}
.card-footer * {
    cursor: pointer;
}

h2 {
    margin-bottom: var(--spacing-3);
}
input {
    margin-bottom: var(--spacing-2);
}

.error {
    font-weight: normal !important;
    text-align: left !important;
}
</style>