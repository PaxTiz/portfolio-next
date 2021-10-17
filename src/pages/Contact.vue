<template>
    <div class="container section">
        <h1>Comment me contacter ?</h1>

        <div class="grid">
            <ul>
                <li>
                    Email : <a class="active-small" href="mailto:vcernuta@protonmail.com">vcernuta@protonmail.com</a>
                </li>
                <li>
                    Téléphone : <a class="active-small" href="tel:+33668087552">+33668087552</a>
                </li>
                <li>
                    Github : <a target="_blank" class="active-small" href="https://github.com/PaxTiz">PaxTiz</a>
                </li>
                <li>
                    LinkedIn : <a target="_blank" class="active-small" href="https://www.linkedin.com/in/valentin-cernuta/">Valentin Cernuta</a>
                </li>
                <li>
                    Adresse : <a target="_blank" class="active-small" href="https://goo.gl/maps/vLUy3WDbyLwzsjqY9">0 rue Robert Defosse, 62160 Bully-Les-Mines, Pas de Calais, France</a>
                </li>
            </ul>
            <form class="form" @submit.prevent="submit">
                <div class="row">
                    <label for="firstname">
                        Prénom
                        <input 
                            v-model="form.firstname"
                            :class="{'error': errors.firstname}"
                            type="text" 
                            name="firstname" 
                            placeholder="Votre prénom" 
                        >
                    </label>
                    <label for="lastname">
                        Nom de famille
                        <input 
                            v-model="form.lastname"
                            :class="{'error': errors.lastname}"
                            type="text" 
                            name="lastname" 
                            placeholder="Votre nom de famille" 
                        >
                    </label>
                </div>
                <div class="row">
                    <label for="email">
                        Email
                        <input 
                            v-model="form.email"
                            :class="{'error': errors.email}"
                            type="email" 
                            name="email" 
                            placeholder="Votre adresse email" 
                        >
                    </label>
                    <label for="subject">
                        Objet
                        <input 
                            v-model="form.object"
                            :class="{'error': errors.object}"
                            type="text" 
                            name="subject" 
                            placeholder="L'objet de votre message" 
                        >
                    </label>
                </div>

                <div class="row message">
                    <label for="content">
                        Message
                        <textarea 
                            v-model="form.content"
                            :class="{'error': errors.content}"
                            name="content" 
                            placeholder="Le contenu de votre message" 
                        ></textarea>
                    </label>
                </div>

                <CustomButton @click.prevent="submit" text='Envoyer' />
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import CustomButton from '@/components/CustomButton.vue'

const form = reactive({
    firstname: '',
    lastname: '',
    email: '',
    object: '',
    content: ''
})
const errors = reactive({
    firstname: false,
    lastname: false,
    email: false,
    object: false,
    content: false
})

watch(form, () => {
    Object.keys(errors).forEach(e => errors[e] = false)
})

const submit = () => {
    if (form.firstname.length === 0) {
        errors.firstname = true
    }
    if (form.lastname.length === 0) {
        errors.lastname = true
    }
    if (
        form.email.length === 0 || 
        form.email.indexOf('@') === -1 || 
        form.email.indexOf('.') < form.email.indexOf('@')
    ) {
        errors.email = true
    }
    if (form.object.length === 0) {
        errors.object = true
    }
    if (form.content.length === 0) {
        errors.content = true
    }

    if (Object.values(errors).every(e => e === false)) {
        // TODO: Send a mail
    }
}
</script>

<style scoped>
.grid, .row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
.grid {
    gap: 4em;
}
.row {
    gap: var(--spacing-2);
}
.row:first-child label {
    margin-top: 0;
}
.row.message {
    grid-template-columns: repeat(1, 1fr);
}
.row.message textarea {
    height: 200px;
}

button {
    margin-top: var(--spacing-2);
}

ul {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    padding: 0;
    margin: 0;
}
li {
    list-style: '-';
    line-height: 1.5;
    padding-left: var(--spacing-3);
    margin-left: var(--spacing-1);
}

@media screen and (max-width: 1100px) {
    .row {
        grid-template-columns: repeat(1, 1fr);
        gap: 0;
    }
    .row:first-child label:last-child {
        margin-top: var(--spacing-2);
    }
}

@media screen and (max-width: 815px) {
    .grid {
        grid-template-columns: repeat(1, 1fr);
    }
}
</style>