<template>
    <main class="orderDetailes_page main-padding">
        <div class="container">
            <PageHeader :title="`${$t('pagesTitle.rateOrder')} #${orderNumber}`" margin="mb-5" />

            <form class="row" @submit.prevent="rateOrder" v-if="!loading">
                <div class="col-xl-8 col-lg-10">

                    <div class="input-g" v-for="(product, index) in orderProducts" :key="product.id">
                        <div class="product_table">
                            <OrdersProduct class="mt-0" :product="product" />
                        </div>
                        <Rating v-model="productsStars['proRate' + index]"
                            class="gap-1 md my-4 justify-content-center cu-pointer" dir="ltr" :cancel="false" />
                        <div class="main-input">
                            <textarea name="" v-model="productsComments['proComment' + index]" class="input-me text-area sm"
                                :placeholder="$t('orderDetailes.rateOrder')"></textarea>
                        </div>
                    </div>

                    <div class="buttons mt-4">
                        <button type="submit" class="main-btn up lg">
                            {{ $t('orderDetailes.buttons.addRate') }}
                            <span class="spinner-border spinner-border-sm" v-if="loadingBtn" role="status"
                                aria-hidden="true"></span>
                        </button>
                    </div>

                </div>
            </form>

            <!--******** Skeleton ********-->
            <div class="row" v-if="loading">
                <div class="col-xl-8 col-lg-10">

                    <div v-for="i in 2" :key="i">

                        <div class="table_con">
                            <div class="product_table">
                                <div class="product_item">
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

                        <Skeleton width="6rem" height=".7rem" class="rounded-4 mx-auto my-4"></Skeleton>
                        <Skeleton width="100%" height="7rem" class="rounded-0"></Skeleton>

                    </div>

                </div>
            </div>

        </div>
    </main>

    <!-- Done Modal -->
    <Dialog id="done" class="xl" v-model:visible="done" modal>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <div class="right_sec">
                    <img src="@/assets/imgs/right_img.gif" alt="" class="right_img mx-auto">
                    <p class="fs14 c-black text-center mb-4">{{ responeMsg }}</p>
                    <div class="buttons justify-content-center">
                        <NuxtLink :to="`/orderDetails/${orderId}`" class="main-btn modal_btn up">
                            {{ $t('modals.done.followBtn') }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
</template>

<script setup>
/******************* Plugins *******************/

// success response
const { response } = responseApi();

// Toast
const { successToast, errorToast } = toastMsg();

// Axios
const axios = useApi();

// pinia store
import { useAuthStore } from '~/stores/auth';

/*************** DATA *****************/

// Store
const store = useAuthStore();
const { token } = storeToRefs(store);

const route = useRoute();

// config
const config = {
    headers: { Authorization: `Bearer ${token.value}` }
};

// done
const done = ref(false);

// productsStars
const productsStars = ref({});

// productsStars
const productsComments = ref({});

// productsRates
const productsRates = ref([]);

// loading
const loading = ref(false);

// loadingBtn
const loadingBtn = ref(false);

// Products
const orderProducts = ref([]);

// Order Number
const orderNumber = ref('');

// Order responeMsg
const responeMsg = ref('');

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// get Order
const getOrderDetailes = async () => {
    loading.value = true;
    await axios.get(`orders/${orderId.value}/show`, config).then(res => {
        if (response(res) == "success") {
            orderNumber.value = res.data.data.order_num;
            orderProducts.value = res.data.data.items;
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}

// rate Order
const rateOrder = async () => {

    productsRates.value = [];
    for (let i = 0; i < orderProducts.value.length; i++) {
        productsRates.value.push({
            'order_id': orderId.value,
            'product_id': `${orderProducts.value[i].product_id}`,
            "stars": `${productsStars.value['proRate' + i]}`,
            "comment": `${productsComments.value['proComment' + i]}`,
        });
    }

    loadingBtn.value = true;
    const fd = new FormData();

    fd.append('products', JSON.stringify(productsRates.value));


    await axios.post('add-products-rates', fd, config).then(res => {
        if (response(res) == "success") {
            responeMsg.value = res.data.data;
            done.value = true;
        } else {
            errorToast(res.data.msg);
        }
        loadingBtn.value = false;

    }).catch(err => console.log(err));

}

/******************* Computed *******************/
const orderId = computed(() => {
    return route.params.id
});

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getOrderDetailes();
});

/******************* Required Auth *******************/
definePageMeta({
    middleware: 'auth'
});

</script>

<style lang="scss"></style>