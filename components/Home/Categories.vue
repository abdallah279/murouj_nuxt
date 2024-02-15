<template>
    <section class="categories_sec main-padding">
        <div class="container">
            <div class="categories_items" v-if="!loading">
                <CategoriesItem :item="offers" routeName="offers" />
                <CategoriesItem :item="mostSelling" routeName="mostSelling" />

                <Categories :categories="categoriesItems" />

                <NuxtLink to="/categories" class="category_item">
                    <div class="category_img">
                        <img src="@/assets/imgs/favicon.png" alt="" class="category_img sm">
                    </div>
                    <h5 class="category_name">{{ $t('moreBtn.more') }}</h5>
                </NuxtLink>
            </div>

            <div class="categories_items" v-if="loading">
                <CategoriesSkeleton />
            </div>
        </div>
    </section>
</template>

<script setup>
/******************* Plugins *******************/
import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });

// success response
const { response } = responseApi();

// Axios
const axios = useApi();

/*************** DATA **************** */

import offersImg from '@/assets/imgs/cat1.png';
import mostSellingImg from '@/assets/imgs/cat2.png';

// Offer
const offers = ref({
    id: 1,
    image: offersImg,
    name: t(`pagesTitle.offers`)
});

// bestSeller
const mostSelling = ref({
    id: 2,
    image: mostSellingImg,
    name: t(`pagesTitle.mostSelling`)
});

/******************* Props *******************/
const props = defineProps({
    categoriesItems: {
        type: Object,
        required: true
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