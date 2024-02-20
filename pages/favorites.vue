<template>
    <main class="about_page main-padding">
        <div class="container">
            <PageHeader :title="$t('pagesTitle.favorites')" margin="mb-5" />

            <div v-if="!loading">
                <ProductsCards @remove="removeProduct" :products="products" v-if="products.length" />
                <div class="no-data" v-else>
                    <img src="@/assets/imgs/no_data.avif" alt="" class="no-data-img">
                    <div class="no-data-text">{{ $t('noData.products') }}</div>
                </div>
            </div>
            
            <!--******** Skeleton ********-->
            <ProductsSkeleton v-if="loading" />
            
            <!--******** Paginator ********-->
            <div v-if="showPaginate">
                <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" class="mt-5" dir="ltr" />
            </div>
        </div>
    </main>
</template>

<script setup>
/******************* Plugins *******************/

// success response
const { response } = responseApi();

// Axios
const axios = useApi();

// pinia store
import { useAuthStore } from '~/stores/auth';

/******************* Data *******************/

// Store
const store = useAuthStore();
const { token } = storeToRefs(store);

// Products
const products = ref([]);

// Loading
const loading = ref(false);

// config
const config = {
    headers: { Authorization: `Bearer ${token.value}` }
};

// Paginator
const currentPage = ref(1);
const pageLimit = ref();
const totalPage = ref();


/******************* Provide && Inject *******************/
provide('favPage', true);

/******************* Props *******************/

/******************* Methods *******************/

// getData
const getData = async () => {
    loading.value = true;
    await axios.get(`favourites?page=${currentPage.value}`, config).then(res => {
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

// Remove Product From Array
const removeProduct = (e) => {
    const IdIndex = products.value.findIndex((product) => product.id === e);
    products.value.splice(IdIndex, 1);
}
/******************* Computed *******************/

let showPaginate = computed(() => {
    return totalPage.value > pageLimit.value
});

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getData();
});

/******************* Required Auth *******************/
definePageMeta({
  middleware: 'auth'
});

</script>

<style lang="scss"></style>