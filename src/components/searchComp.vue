<script>
export default {
    emits: ['update:modelValue'],
    props: {
        icon: {
        type: String,
        default: undefined,
        required: false,
        },
        modelValue: {
        type: String,
        default: '',
        required: false,
        }
    },
    methods: {

    }
}
</script>
<template>
    <v-text-field
    variant="solo"
    hide-details
    placeholder="Поиск.."
    :density="'compact'"
    :value="$props.modelValue"
    @update:model-value="(value) => $emit('update:modelValue', value)"
    >
        <template #append-inner>
            <v-icon color="grey-darken-1" :icon="$props.icon"></v-icon>
        </template>
    </v-text-field>
</template>
<style scoped>
    
</style>