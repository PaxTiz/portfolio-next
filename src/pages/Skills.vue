<template>
    <div class="container section">
        <h1>Ce que je sais faire</h1>
        <Loading v-if="loading" />
        <div v-else-if="skills.length > 0" class="skills">
            <div
                v-for="category in skills"
                :key="category.id"
                class="card"
            >
                <div class="card-body">
                    <h2>{{ category.name }}</h2>
                    <ul>
                        <li
                            v-for="skill in category.skill"
                            :key="skill.id"
                        >
                            {{ skill.name }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <h2 v-else class="error">Oups, il semblerait qu'aucune donnée ne soit disponible :(</h2>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import useLoading from '@/hooks/useLoading'
import supabase from '@/supabase.js'
import CustomButton from '@/components/CustomButton.vue'
import Loading from '../components/Loading.vue'

const [loading, toggleLoading] = useLoading(false)
const skills = ref([])

onMounted(async () => {
    toggleLoading()
    supabase.from('skill_category').select(`
        id, name, en_name, skill (id, name, en_name)
    `).eq('private', false).then(res => {
        if (!res.error) {
            skills.value = res.data
        }
    }).finally(() => {
        toggleLoading()
    })
})
</script>

<style>
.skills, .skills * {
    font-family: "Montserrat", sans-serif !important;
}
.skills {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-2);
}

@media screen and (max-width: 1000px) {
    .skills {
        grid-template-columns: repeat(2, 1fr);
    }
}
@media screen and (max-width: 600px) {
    .skills {
        grid-template-columns: repeat(1, 1fr);
    }
}

.skills h2 {
    font-weight: bold;
}
.skills ul {
    margin-bottom: 0;
}
.skills li {
    line-height: 2em;
    list-style-type: '-     ';
}
</style>
