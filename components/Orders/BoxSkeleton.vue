<template>
    <div class="order_card bb mb-4 pb-4" v-for="i in 2" :key="i">

        <div class="d-flex-between gap-2 flex-wrap mt-3" v-for="i in 4" :key="i">
            <Skeleton width="8rem" height=".5rem"></Skeleton>
            <Skeleton width="5rem" height=".5rem"></Skeleton>
        </div>

    </div>
</template>
  
<script setup>
/******************* Import *******************/

/******************* Data *******************/

/******************* Props *******************/

/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>
  
<style></style>