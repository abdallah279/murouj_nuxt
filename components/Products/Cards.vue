<template>
    <div class="grid-4 grid-res">
        <ProductsCard v-for="product in products" @toggleFavId="removeFromFav" :key="product.id" :product="product" />
    </div>
</template>

<script setup>

/******************* Import *******************/

/******************* Data *******************/

/******************* Emits *******************/
const emit = defineEmits(['remove']);

/******************* Props And Inject *******************/
const props = defineProps({
    products: {
        type: Array,
        required: true,
    }
});

/******************* Methods *******************/

// Send Product Id To Favourite Page
const removeFromFav = (e)=>{
    emit('remove', e);
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
</script>

<style>
</style>