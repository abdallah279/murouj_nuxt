<template>
    <main class="cart_page main-padding">
        <div class="container">
            <PageHeader :title="$t('pagesTitle.cart')" margin="mb-5" />

            <div class="row">
                <div class="col-xl-10 mx-auto">

                    <div v-if="!loading">
                        <div class="row gy-4" v-if="orderProducts.length">

                            <div class="col-lg-8">
                                <div class="coll_head mb-2 rounded-1 ff-d">
                                    <span>{{ $t('cart.products') }}</span>
                                    <i class="pi pi-sort-down"></i>
                                </div>
                                <div class="table_con">
                                    <div class="product_table">
                                        <div class="main-bb d-flex head">
                                            <div class="item big_td">{{ $t('cart.table.product') }}</div>
                                            <div class="item small_td lg">{{ $t('cart.table.price') }}</div>
                                            <div class="item small_td">{{ $t('cart.table.amount') }}</div>
                                            <div class="item small_td">{{ $t('cart.table.totalPrice') }}</div>
                                        </div>
                                        <OrdersProduct @updateProduct="getCart(false)" v-for="product in orderProducts"
                                            :product="product" :deleteBtn="true" :showCount="true" :key="product.id" />
                                    </div>
                                </div>

                                <div v-if="showPaginate">
                                    <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" class="mt-4"
                                        dir="ltr" />
                                </div>
                            </div>

                            <div class="col-lg-4">
                                <div class="main-border rounded-1 p-3">
                                    <h5 class="fs14 ff-d mb-4">{{ $t('cart.sidebar.complete') }}</h5>
                                    <div class="d-flex-between gap-2 ff-d flex-wrap mb-3">
                                        <span class="c-black">{{ $t('cart.sidebar.orderPrice') }}</span>
                                        <span class="c-blue"> {{ summary.total_price }} {{ summary.currency }}</span>
                                    </div>
                                    <div class="d-flex-between gap-2 ff-d flex-wrap mb-3">
                                        <span class="c-black">{{ $t('cart.sidebar.extraPrice') }}</span>
                                        <span class="c-blue"> {{ summary.vat_amount }} {{ summary.currency }}</span>
                                    </div>
                                    <div class="d-flex-between gap-2 ff-d flex-wrap mb-3">
                                        <span class="c-black">{{ $t('cart.sidebar.discountPrice') }}</span>
                                        <span class="c-blue">
                                            {{ summary.discount_price }} {{ summary.currency }}
                                        </span>
                                    </div>
                                    <div class="d-flex-between main-bb pb-3 gap-2 ff-d flex-wrap mb-3">
                                        <span class="c-black">{{ $t('cart.sidebar.drivePrice') }}</span>
                                        <span class="c-blue">
                                            {{ summary.shipping_price }} {{ summary.currency }}
                                        </span>
                                    </div>

                                    <div class="d-flex-between gap-2 ff-d flex-wrap mb-3">
                                        <span class="c-black">{{ $t('cart.sidebar.total') }}</span>
                                        <span class="c-blue"> {{ summary.final_total }} {{ summary.currency }}</span>
                                    </div>
                                    <NuxtLink to="/cart/completeOrder" class="main-btn mt-3 w-100 shadow-sm mx-auto up">
                                        {{ $t('cart.sidebar.complete') }}
                                    </NuxtLink>
                                </div>
                            </div>

                        </div>

                        <div class="no-data" v-if="!orderProducts.length">
                            <img src="@/assets/imgs/no_data.avif" alt="" class="no-data-img">
                            <div class="no-data-text">{{ $t('noData.cart') }}</div>
                        </div>

                    </div>

                    <!--**** Skeleton ****-->
                    <div class="row gy-4" v-if="loading">

                        <div class="col-lg-8">
                            <Skeleton height="3rem" class="rounded-0 mb-2"></Skeleton>
                            <OrdersProductSkeleton />
                        </div>

                        <div class="col-lg-4">
                            <div class="main-border rounded-1 p-3">
                                <Skeleton height=".7rem" width="6rem" class="mb-4"></Skeleton>
                                <div class="mb-4">
                                    <Skeleton height=".7rem" width="6rem" class="mb-2"></Skeleton>
                                    <Skeleton height="2.7rem" class="rounded-0"></Skeleton>
                                </div>
                                <div class="d-flex-between gap-2 ff-d flex-wrap mb-3" v-for="i in 4" :key="i">
                                    <Skeleton height=".5rem" width="6rem" class="mb-2"></Skeleton>
                                    <Skeleton height=".5rem" width="6rem" class="mb-2"></Skeleton>
                                </div>
                                <Skeleton height="2.7rem" class="rounded-0"></Skeleton>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    </main>
</template>

<script setup>
/******************* Plugins Or Composables *******************/

// success response
const { response } = responseApi();

// Toast
const { errorToast } = toastMsg();

// Axios
const axios = useApi();

// pinia store
import { useAuthStore } from '~/stores/auth';

/******************* DATA *******************/

// Store
const store = useAuthStore();
const { token } = storeToRefs(store);

// orderProducts
const orderProducts = ref([]);

// summary
const summary = ref({});

// config
const config = {
    headers: { Authorization: `Bearer ${token.value}` }
};

// loading
const loading = ref(false);

// Paginator
const currentPage = ref(1);
const pageLimit = ref();
const totalPage = ref();

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// getCart
const getCart = async (load) => {
    load ? loading.value = true : loading.value = false;
    await axios.get(`carts?page=${currentPage.value}`, config).then(res => {
        if (response(res) == "success") {
            orderProducts.value = res.data.data.data;
            summary.value = res.data.data.summary;
            totalPage.value = res.data.data.pagination.total_items;
            pageLimit.value = res.data.data.pagination.per_page;
        } else {
            errorToast(res.data.msg);
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
    getCart();
};

/******************* Computed *******************/
let showPaginate = computed(() => {
    return totalPage.value > pageLimit.value
});

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getCart(true);
});

definePageMeta({
  middleware: 'auth'
})

</script>

<style lang="scss"></style>