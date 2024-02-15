<template>
    <CategoriesItem @categoryId="sendToParent" v-for="category in categories" :key="category.id" :item="category" />
</template>

<script setup>

/******************* Import *******************/

/******************* Data *******************/

/******************* Props *******************/
const props = defineProps({
    categories: {
        type: Array,
        required: true,
    }
});

/******************* Emits *******************/
const emit = defineEmits(['categoryId']);

/******************* Methods *******************/
const sendToParent = (id) => {
    emit('categoryId', id);
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>

<style></style>