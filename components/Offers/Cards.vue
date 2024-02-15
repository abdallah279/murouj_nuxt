<template>
    <div class="row gy-4">
        <div class="col-md-6" v-for="offer in offers" :key="offer.id" >
            <offersCard :offer="offer" />
        </div>
    </div>
</template>

<script setup>

/******************* Import *******************/

/******************* Data *******************/

/******************* Props And Inject *******************/
const props = defineProps({
    offers: {
        type: Array,
        required: true,
    }
});

/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
</script>

<style>
</style>