<template>
    <div v-if="!loading">
        <div v-if="orders.length">
            <OrdersBoxs :orders="orders" />
        </div>
        <div class="no-data" v-if="!orders.length">
            <img  loading="lazy" src="@/assets/imgs/no_data.avif" alt="image" class="no-data-img">
            <div class="no-data-text">{{ $t(`noData.${noData}`) }}</div>
        </div>
    </div>

    <div v-if="loading">
        <OrdersBoxSkeleton />
    </div>

    <div v-if="showPaginate">
        <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" class="mt-4" dir="ltr" />
    </div>
</template>

<script setup>
/******************* Import *******************/

// success response
const { response } = responseApi();

// Toast
const { errorToast } = toastMsg();

// Axios
const axios = useApi();

// pinia store
import { useAuthStore } from '~/stores/auth';

/******************* Data *******************/

// Store
const store = useAuthStore();
const { token } = storeToRefs(store);

// config
const config = {
    headers: { Authorization: `Bearer ${token.value}` }
};

// loading
const loading = ref(false);

// orders
const orders = ref([]);

// Paginator
const currentPage = ref(1);
const pageLimit = ref();
const totalPage = ref();

/******************* Provide && Inject *******************/

/******************* Props *******************/

const props = defineProps({
    ordersName: {
        type: String,
        required: true
    },
    noData: {
        type: String,
        required: true
    }
});

/******************* Methods *******************/

// getOrders
const getOrders = async () => {
    loading.value = true;
    await axios.get(`${props.ordersName}?page=${currentPage.value}`, config).then(res => {
        if (response(res) == "success") {
            orders.value = res.data.data.data;
            totalPage.value = res.data.data.pagination.total_items;
            pageLimit.value = res.data.data.pagination.per_page;
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}

// Paginate Function
const onPaginate = (e) => {
    loading.value = true;
    currentPage.value = e.page + 1;
    window.scrollTo(0, 0);
    getOrders();
};

/******************* Computed *******************/
let showPaginate = computed(() => {
    return totalPage.value > pageLimit.value;
});

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getOrders();
});

</script>

<style lang="scss"></style>