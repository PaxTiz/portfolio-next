<template>
    <Modal :is-loading="loading" @close="closeModal">
        <div class="card-header">
            <span>Images du dossier {{ folder.name }}</span>
            <CustomButton @click='selectFile' text='Ajouter' />
            <input ref="picker" type="file" style="display: none;" />
        </div>
        <div class="card-body">
            <div class="grid grid-3">
                <div
                    v-for="image in images"
                    class="image-container"
                    :key="image.name"
                >
                    <img :src="image.url">
                    <div class="image-actions">
                        <CustomButton 
                            @click='toggleConfirmationModal'
                            :data-name="image.name"
                            variant='danger'
                            text='Supprimer' 
                        />
                    </div>
                </div>
            </div>
        </div>
    </Modal>

    <ConfirmationModal 
        v-if="showConfirmationModal" 
        @close="deleteFile"
        text="Voulez-vous vraiment supprimer cet élément ?"
    />
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import slugify from "slugify"
import useLoading from "@/hooks/useLoading"
import supabase from "@/supabase"
import Modal from "@/components/Modal.vue"
import CustomButton from "@/components/CustomButton.vue"
import ConfirmationModal from '@/components/admin/modals/ConfirmationModal.vue'

const router = useRouter()
const [loading, toggleLoading] = useLoading()

const props = defineProps({
    folder: {
        type: Object,
        required: true
    }
})

const emits = defineEmits(['close'])
const closeModal = val => emits('close', val)

const images = ref([])
const showConfirmationModal = ref(false)
const currentImage = ref(null)
const picker = ref(null)

const toggleConfirmationModal = e => {
    if (showConfirmationModal.value === true) {
        showConfirmationModal.value = false
        currentImage.value = null
    } else {
        showConfirmationModal.value = true
        currentImage.value = e.target.dataset.name
    }
}

const selectFile = () => {
    picker.value.onchange = async e => {
        const file = e.target.files[0]
        const filename = slugify(file.name, {
            lower: true,
            strict: true,
            locale: 'fr',
            trim: true
        })
        toggleLoading()
        const { error } = await supabase
            .storage
            .from('projectimages')
            .upload(`${props.folder.name}/${filename}`, file)

        if (!error) {
            router.go(0)
        } else {
            closeModal(false)
        }
    }
    picker.value.click()
}

const deleteFile = async ok => {
    if (ok) {
        const image = currentImage.value
        toggleConfirmationModal()
        const { error } = await supabase
            .storage
            .from('projectimages')
            .remove([`${props.folder.name}/${image}`])

        if (!error) {
            router.go(0)
        } else {
            closeModal()
        }
    }

    closeModal(false)
}

onMounted(async () => {
    toggleLoading()
    const _images = []
    for (const image of props.folder.files) {
        const {publicURL, error} = await supabase.storage
            .from('projectimages')
            .getPublicUrl(`${props.folder.name}/${image.name}`)

        if (!error) {
            _images.push({
                name: image.name,
                url: publicURL
            })
        }
    }

    images.value = _images
    toggleLoading()
})
</script>

<style scoped>
.image-container {
    position: relative;
}
.image-container .image-actions {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .5);
    opacity: 0;
    transition: all .2s;
}
.image-container:hover .image-actions {
    opacity: 1;
}
img {
    object-fit: cover;
    width: 100%;
    max-height: 100%;
}
</style>
