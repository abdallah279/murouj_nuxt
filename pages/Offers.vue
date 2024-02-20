<template>
    <main class="about_page main-padding">
        <div class="container">
            <PageHeader :title="$t('pagesTitle.offers')" margin="mb-5" />

            <div v-if="!loading">
                <OffersCards :offers="offers" v-if="offers.length" />
                <div class="no-data" v-else>
                    <img src="@/assets/imgs/no_data.avif" alt="" class="no-data-img">
                    <div class="no-data-text">{{ $t('noData.offers') }}</div>
                </div>
            </div>

            <!--***** Skeleton *****-->
            <div class="row gy-4" v-if="loading">
                <div class="col-md-6" v-for="i in 2" :key="i">
                    <div class="product_card offer">
                        <Skeleton height="210px" class="rounded-0"></Skeleton>
                        <div class="product_body">
                            <Skeleton width="12rem" height=".7rem" class="mb-3"></Skeleton>
                            <div class="price_con">
                                <Skeleton width="4rem" height=".7rem"></Skeleton>
                                <Skeleton width="4rem" height=".7rem"></Skeleton>
                            </div>
                        </div>
                        <div class="product_footer">
                            <Skeleton width="100%" height="50px" class="rounded-0"></Skeleton>
                            <Skeleton width="100%" height="50px" class="rounded-0"></Skeleton>
                        </div>
                    </div>
                </div>
            </div>

            <!--***** Paginator *****-->
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
import { useGlobalStore } from '~/stores/global';

/*************** DATA *****************/

// Global Store
const globalStore = useGlobalStore();
const { countryLocal, countryID } = storeToRefs(globalStore);

// Store
const store = useAuthStore();
const { token } = storeToRefs(store);

// offers
const offers = ref([]);

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
    await axios.get(`offers?country_id=${countryID.value}&page=${currentPage.value}`, config.value).then(res => {
        if (response(res) == "success") {
            offers.value = res.data.data.data;
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