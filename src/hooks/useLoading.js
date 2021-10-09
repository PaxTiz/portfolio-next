import { ref, readonly } from "vue"

export default (initialState) => {
    const state = ref(initialState)

    const toggle = () => {
        state.value = !state.value
    }

    return [readonly(state), toggle]
}