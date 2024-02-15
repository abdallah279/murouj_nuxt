<template>
    <main class="about_page main-padding">
        <div class="container">
            <PageHeader :title="$t('pagesTitle.mostSelling')" margin="mb-5" />

            <div v-if="!loading">
                <ProductsCards :products="products" v-if="products.length" />
                <div class="no-data" v-else>
                    <img src="@/assets/imgs/no_data.avif" alt="" class="no-data-img">
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
/******************* Plugins *******************/

// success response
const { response } = responseApi();

// Axios
const axios = useApi();

/******************* Data *******************/

// Products
const products = ref([]);

// Loading
const loading = ref(false);

// Paginator
const currentPage = ref(1);
const pageLimit = ref();
const totalPage = ref();

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// getData
const getData = async () => {
    loading.value = true;
    await axios.get(`most-selling-products?country_id=${countryID.value}&page=${currentPage.value}`, config.value).then(res => {
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
    return localStorage.getItem('token') ? {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    } : {}
});

let showPaginate = computed(() => {
    return totalPage.value > pageLimit.value
});

// countryID 
const countryID = computed(() => {
    return localStorage.getItem('country') ? JSON.parse(localStorage.getItem('country')).id : '1'
});

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getData();
});
</script>
  
<style lang="scss"></style>