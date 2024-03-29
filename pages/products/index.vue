<template>
    <main class="products_page main-padding">
        <div class="container">
            <PageHeader :title="$t('pagesTitle.products')" margin="mb-5" />

            <div v-if="!loading">
                <ProductsCards :products="products" v-if="products.length" />
                <div class="no-data" v-else>
                    <img  loading="lazy" src="@/assets/imgs/no_data.avif" alt="image" class="no-data-img">
                    <div class="no-data-text">{{ $t('noData.products') }}</div>
                </div>
            </div>
            <ProductsSkeleton v-if="loading" />

            <div v-if="showPaginate">
                <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" class="mt-5" dir="ltr" />
            </div>
        </div>
    </main>
</template>
  
<script setup>
/******************* Import *******************/
// success response
const { response } = responseApi();

// Axios
const axios = useApi();

// pinia store
import { useAuthStore } from '~/stores/auth';
import { useGlobalStore } from '~/stores/global';

/*************** DATA *****************/

// Global Store
const globalStore = useGlobalStore();
const { countryLocal, countryID } = storeToRefs(globalStore);

// Store
const store = useAuthStore();
const { token } = storeToRefs(store);

// Products
const products = ref([]);

// Loading
const loading = ref(false);

// Paginator
const currentPage = ref(1);
const pageLimit = ref();
const totalPage = ref();

/******************* Provide && Inject *******************/
provide('view', true);

/******************* Props *******************/

/******************* Methods *******************/
// getData
const getData = async () => {
    loading.value = true;
    await axios.get(`our-products?country_id=${countryID.value}&page=${currentPage.value}`, config.value).then(res => {
        if (response(res) == "success") {
            products.value = res.data.data.data;
            totalPage.value = res.data.data.pagination.total_items;
            pageLimit.value = res.data.data.pagination.per_page;
        }
        loading.value = false;
    }).catch(err => console.log(err));
}

// Paginate Function
const onPaginate = (e) => {
    loading.value = true;
    currentPage.value = e.page + 1;
    window.scrollTo(0, 0);
    getData();
};

/******************* Computed *******************/
const config = computed(() => {
  return token.value ? {
    headers: { Authorization: `Bearer ${token.value}` }
  } : {}
});

let showPaginate = computed(() => {
    return totalPage.value > pageLimit.value
});


/******************* Watch *******************/

watch(countryLocal, async (newVal) => {
  if (newVal) {
    await getData();
  }
});

/******************* Mounted *******************/
onMounted(async () => {
    await getData();
});

</script>
  
<style lang="scss"></style>