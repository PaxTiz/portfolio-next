<template>
    <Modal :is-loading="loading" @close="closeModal">
        <div class="card-header">
            <Carousel>
                <Slide v-for="image in item.work_images" :key="image.image">
                    <img :src="image.image" class="carousel__item" />
                </Slide>
                <template #addons>
                    <Navigation />
                </template>
            </Carousel>
        </div>
        <div class="card-body">
            <h2>{{ item.year }} - {{ item.title }}</h2>
            <span v-if="item.company">Projet réalisé pour l'entreprise {{ item.company ?? '' }}</span>

            <p>
                <span v-for="tech in item.technologies" :key="tech" class="technology">
                    {{ tech }}
                </span>
            </p>
            <p class="content">{{ item.content }}</p>

            <div class="buttons">
                <CustomButton v-if="item.website" @click="openWebsite" text="Voir en ligne" />
                <CustomButton v-if="item.vcs" @click="openVCS" text="Sources" />
            </div>
        </div>
    </Modal>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import CustomButton from "./CustomButton.vue"
import Modal from "./Modal.vue"
import useLoading from "@/hooks/useLoading"
import supabase from '@/supabase'

const emits = defineEmits(['close'])
const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const [loading, toggleLoading] = useLoading()

const item = ref({})

onMounted(async () => {
    toggleLoading()
    supabase.from('works').select(`
        title, content, year, company, website, vcs, technologies, work_images (image)
    `).eq('id', props.id).single().then(res => {
        if (!res.error) {
            item.value = res.data
        }
    }).finally(() => {
        toggleLoading()
    })
})

const closeModal = () => emits('close')
const openLink = (link) => window.open(link, '_blank')
const openWebsite = () => openLink(item.value.website)
const openVCS = () => openLink(item.value.vcs)
</script>

<style scoped>
img {
    max-width:100%;
    border-top-left-radius: var(--radius);
    border-top-right-radius: var(--radius);
}

.technology {
    padding: var(--spacing-1) var(--spacing-2);
    font-size: calc(var(--spacing-1) + var(--spacing-1) / 2);
    background-color: var(--dark);
    border-radius: var(--radius);
    margin-right: var(--spacing-2);
}

.content {
    margin: var(--spacing-3) 0;
    text-align: justify;
}

.buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
}

:deep(.carousel__prev) {
    margin-left: var(--spacing-3);
}
:deep(.carousel__next) {
    margin-right: var(--spacing-3);
}
</style>