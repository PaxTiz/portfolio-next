<template>
    <div class="container section">
        <h1>Quelques unes de mes réalisations</h1>

        <Loading v-if="loading" />
        <div v-else class="works">
            <div
                v-for="work in works"
                :key="work.id"
                class="card"
            >
                <div class="card-header">
                    <img :src="work.image" alt="">
                </div>
                <div class="card-body">
                    <h2 @click="() => openModal(work)" class="active-small">{{ work.year }} - {{ work.title }}</h2>
                    <span>{{ work.company ?? '' }}</span>
                    <p>{{ work.description }}</p>
                </div>
                <div class="card-footer">
                    <a v-if="work.website" :href="work.website" target="_blank" class="card-action">
                        Voir en ligne
                    </a>
                    <a v-if="work.vcs" :href="work.vcs" target="_blank" class="card-action">
                        Sources
                    </a>
                    <a class="card-action" @click="() => openModal(work)">
                        Détails
                    </a>
                </div>
            </div>
        </div>
    </div>

    <WorkDetailsModal v-if="showModal" :id="currentModalItem" @close="closeModal" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import useLoading from '@/hooks/useLoading'
import supabase from '@/supabase'
import CustomButton from '@/components/CustomButton.vue'
import WorkDetailsModal from '@/components/WorkDetailsModal.vue'
import Loading from '@/components/Loading.vue'

const [loading, toggleLoading] = useLoading()

const works = ref([])
const showModal = ref(false)
const currentModalItem = ref(null)

onMounted(async () => {
    toggleLoading()
    supabase.from('works').select(`
        id, title, description, year, company, image, website, vcs
    `).order('created_at', { ascending: false }).then(res => {
        if (!res.error) {
            works.value = res.data
        }
    }).finally(() => {
        toggleLoading()
    })
})

const openModal = (item) => {
    showModal.value = true
    currentModalItem.value = item.id
}
const closeModal = () => {
    showModal.value = false
    currentModalItem.value = null
}
</script>

<style scoped>
.works {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-2);
}

@media screen and (max-width: 750px) {
    .works {
        grid-template-columns: repeat(1, 1fr);
    }
}

h2 {
    cursor: pointer;
    margin-bottom: var(--spacing-1);
}

p {
    line-height: 1.5;
}

img {
    max-width:100%;
    border-top-left-radius: var(--radius);
    border-top-right-radius: var(--radius);
}
</style>