<template>
    <div class="table_con">
        <div class="product_table">
            <div class="main-bb d-flex head">
                <div class="item big_td">
                    <Skeleton width="6rem" height=".5rem"></Skeleton>
                </div>
                <div class="item small_td lg">
                    <Skeleton width="4rem" height=".5rem" class="mx-auto"></Skeleton>
                </div>
                <div class="item small_td">
                    <Skeleton width="4rem" height=".5rem" class="mx-auto"></Skeleton>
                </div>
                <div class="item small_td">
                    <Skeleton width="4rem" height=".5rem" class="mx-auto"></Skeleton>
                </div>
            </div>

            <div class="product_item" v-for="i in 3" :key="i">
                <div class="product_img_td big_td with_m d-flex flex-column justify-content-between">
                    <div class="p_img without_after">
                        <Skeleton class="img"></Skeleton>
                    </div>
                    <Skeleton width="4rem" height=".5rem"></Skeleton>
                    <Skeleton width="6rem" height=".5rem" class="rounded-4"></Skeleton>
                </div>
                <div class="small_td lg">
                    <Skeleton width="4rem" height=".5rem" class="mx-auto"></Skeleton>
                </div>
                <div class="small_td">
                    <Skeleton shape="circle" size="2.3rem" class="mx-auto"></Skeleton>
                </div>
                <div class="small_td">
                    <Skeleton width="4rem" height=".5rem" class="mx-auto"></Skeleton>
                </div>
                <Skeleton height="1.2rem" width=".8rem" class="mx-auto"></Skeleton>
            </div>
        </div>
    </div>
</template>
  
<script setup>
/******************* Plugins Or Composables *******************/

/******************* DATA *******************/

/******************* Props *******************/

/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>
  
<style></style>