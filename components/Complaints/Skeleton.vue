<template>
    <div class="complaint-item sec-border" v-for="i in count" :key="i">
        <Skeleton shape="circle" size="6rem" class="flex-shrink-0"></Skeleton>
        <div class="left-sec">
            
            <div class="item">
                <div class="left-item mb-2">

                    <div class="main-item ff-d">
                        <Skeleton width="8rem" height=".6rem"></Skeleton>
                        <Skeleton width="3rem" height=".6rem"></Skeleton>
                    </div>

                    <Skeleton width="6rem" height=".7rem"></Skeleton>
                </div>
                <Skeleton width="75%" height=".5rem" class="mb-2"></Skeleton>
                <Skeleton width="70%" height=".5rem"></Skeleton>
            </div>
            
            <div class="item">
                <div class="left-item">
                    
                    <div class="status d-flex align-items-center gap-2">
                        <Skeleton width="8rem" height=".6rem"></Skeleton>
                    </div>
                    <Skeleton width="6rem" height=".6rem"></Skeleton>

                </div>
            </div>

        </div>
    </div>
</template>
  
<script setup>
/******************* Import *******************/

/******************* Data *******************/

/******************* Props *******************/
const props = defineProps({
    count:{
        type: Number,
        default: 2
    }
})

/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>
  
<style></style>