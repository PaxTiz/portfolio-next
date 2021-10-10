<template>
    <div class="container section admin">
        <h1>Administration</h1>

        <Loading v-if="loading" />
        <div v-else>
            <div class="grid">
                <SkillCategories :items="categories" />
                <Skills :items="skills" />
            </div>
            <Works :items="works" />
            <Images :items="images" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import useLoading from '@/hooks/useLoading'
import supabase from '@/supabase'
import CustomButton from '@/components/CustomButton.vue'
import Loading from '@/components/Loading.vue'
import SkillCategories from '@/components/admin/SkillCategories.vue'
import Skills from '@/components/admin/Skills.vue'
import Works from '@/components/admin/Works.vue'
import Images from '@/components/admin/Images.vue'

const router = useRouter()
const [loading, toggleLoading] = useLoading()

const categories = ref([])
const skills = ref([])
const works = ref([])
const images = ref([])

onMounted(() => {
    const user = supabase.auth.user()
    if (user === null) {
        router.push({ name: 'login' })
    }

    toggleLoading()
    Promise.all([
        supabase.from('skill_category').select('id, name, en_name, private'),
        supabase.from('skill').select('id, name, en_name, category (id, name)'),
        supabase.from('works').select('id, title, year, website'),
        supabase.storage.from('projectimages').list()
    ]).then(async responses => {
        let { data, error } = responses[0];
        if (!error) {
            categories.value = data
        }

        let skillsRes = responses[1];
        if (!skillsRes.error) {
            skills.value = skillsRes.data
        }

        let worksRes = responses[2];
        if (!worksRes.error) {
            works.value = worksRes.data
        }

        let imagesRes = responses[3];
        if (!imagesRes.error) {
            imagesRes.data.forEach(async folder => {
                const { data, error } = await supabase.storage
                    .from('projectimages')
                    .list(folder.name)
                if (!error) {
                    images.value.push({ name: folder.name, files: data })
                }
            })
        }
    }).finally(() => {
        toggleLoading()
    })
})
</script>

<style>
.admin .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-2);
}
.admin .card:not(.loader) {
    justify-content: flex-start;
    margin-bottom: var(--spacing-2);
}
.admin .card-header {
    background-color: var(--very-dark);
    padding: var(--spacing-2) var(--spacing-3);
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.admin .card-header .buttons {
    display: flex;
    gap: var(--spacing-2)
}

.admin .row {
    display: grid;
    gap: var(--spacing-2);
    border-bottom: 1px solid var(--dark);
    align-items: center;
}
.admin .row.row-3 {
    grid-template-columns: 2fr 1fr 100px;
}
.admin .row.row-4 {
    grid-template-columns: 1fr 1fr 1fr 100px;
}
.admin .row.header {
    font-weight: bold;
}
.admin .row.header p {
    margin-top: 0;
}

.admin .row p {
    line-height: 1;
}

.admin .actions {
    text-align: right;
}

.admin .works {
    grid-column: 1;
}

.admin .images .card {
    background-color: var(--dark);
}

.admin .error, .admin .success {
    filter: none;
    cursor: pointer;
    text-align: right;
}
.admin .error {
    color: var(--red);
}
.admin .success {
    color: var(--green);
}
</style>