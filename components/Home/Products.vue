<template>
    <section class="products_sec">
        <div class="container">
            <div class="section_top mb-5">
                <h1 class="sec_title">{{ title }}</h1>
                <span class="line"></span>
                <NuxtLink :to="route || '/'" class="more_link">{{ $t('moreBtn.all') }}</NuxtLink>
            </div>

            <div v-if="!loading">
                <ProductsCards :products="products" v-if="products.length" />
                <div class="no-data" v-else>
                    <img loading="lazy" src="@/assets/imgs/no_data.avif" alt="image" class="no-data-img">
                    <div class="no-data-text">{{ $t('noData.products') }}</div>
                </div>
            </div>
            <ProductsSkeleton v-if="loading" />

        </div>
    </section>
</template>

<script setup>

/******************* Plugins *******************/

/******************* DATA *******************/

/******************* Props *******************/
const props = defineProps({
    title: {
        type: String
    },
    route: {
        type: String
    },
    products: {
        type: Object
    },
    loading: {
        type: Boolean,
        default: false,
    },
})

/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
</script>

<style></style>