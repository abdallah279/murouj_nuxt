<template>
    <div class="order_cards">
        <OrdersBox v-for="order in orders" :key="order.id" :order="order" />
    </div>
</template>

<script setup>
/******************* Import *******************/

/******************* Data *******************/

/******************* Provide && Inject *******************/

/******************* Props *******************/
const props = defineProps({
    orders: {
        type: Object
    }
})

/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>

<style lang="scss"></style>