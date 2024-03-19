<template>
    <main class="product_page main-padding">
        <div class="container">

            <div class="main-border res p-lg-4">

                <div v-if="!loading">

                    <div class="product_d_top mb-4">
                        <div class="product_bread">
                            <i class="pi pi-home"></i>
                            <i class="pi pi-angle-left"></i>
                            <div class="product_cat">{{ product.category_name }}</div>
                            <i class="pi pi-angle-left"></i>
                            <div class="product_cat">{{ product.subcategory_name }}</div>
                        </div>

                        <button class="share_btn" @click="shareCopy">
                            <i class="pi pi-share-alt"></i>
                            {{ $t('products.share') }}
                        </button>
                    </div>

                    <div class="row gy-5">

                        <div class="col-lg-6">
                            <div class="product_detailes">
                                <div class="text mb-2 c-black" v-if="product.is_available">
                                    {{ $t('products.available') }}
                                </div>
                                <div class="text mb-2 ff-d fs16 c-black">{{ product.name }}</div>
                                <div class="d-flex align-items-center mb-2 gap-3 c-dark3 cu-pointer w-fit"
                                    @click="rateModal = true">
                                    <Rating v-model="product.avg_rate" class="small gap-1 cu-pointer" readonly
                                        :cancel="false" />
                                    ( {{ product.avg_rate }} )
                                    {{ product.rates_count }}
                                </div>
                                <div class="main-items">
                                    <div class="d-flex justify-content-between gap-3 flex-wrap mb-3">
                                        <span class="fs13 c-black">{{ $t('products.calories') }} :</span>
                                        <span class="fs13 c-black ff-d">{{ product.calories }}
                                            {{ $t('products.unit') }}</span>
                                    </div>
                                    <div class="d-flex justify-content-between gap-3 flex-wrap mb-3">
                                        <span class="fs13 c-black">{{ $t('products.weight') }} :</span>
                                        <span class="fs13 c-black ff-d">{{ product.weight }} {{ $t('products.unit')
                                        }}</span>
                                    </div>
                                    <div class="d-flex justify-content-between gap-3 flex-wrap mb-3">
                                        <span class="fs13 c-black">{{ $t('products.brand') }} :</span>
                                        <span class="fs13 c-black ff-d">{{ product.brand_name }}</span>
                                    </div>

                                    <div class="fs13 d-flex justify-content-end my-3">{{ $t('products.dailyValue') }} %
                                    </div>

                                    <div class="d-flex justify-content-between gap-3 flex-wrap mb-3"
                                        v-for="item in product.detailesItems" :key="item.id">
                                        <span class="fs13 c-black">{{ item.attribute }} {{ item.weight_value }}
                                            {{ $t('products.unit') }}</span>
                                        <span class="fs13 c-black ff-d">{{ item.daily_percentage }} %</span>
                                    </div>

                                    <div class="mt-4">
                                        <span class="fs13 c-black d-block mb-2">{{ $t('products.desc') }} :</span>
                                        <span class="fs13 c-black ff-d">{{ product.description }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <ProductsGalleria :images="product.images" />

                            <div class="d-flex mt-4 gap-2 gap-sm-3 flex-wrap align-items-center">
                                <span class="c-dark3">{{ $t('products.amount') }} :</span>

                                <div class="number-input mx-sm-4">
                                    <span class="plus btn-num" @click="quantity++">
                                        <i class="pi pi-plus"></i>
                                    </span>
                                    <input type="text" :value="quantity" min="1" disabled />
                                    <span class="minus btn-num" @click="quantity > 1 ? quantity-- : false">
                                        <i class="pi pi-minus"></i>
                                    </span>
                                </div>

                                <div class="price_con">
                                    <p class="price" v-if="product.discount_price">{{ product.discount_price }} {{ product.currency }}</p>
                                    <p class="price" :class="{ old: product.discount_price }">{{ product.price }} {{ product.currency }}</p>
                                </div>
                            </div>

                            <div class="d-flex mt-4 gap-3 align-items-center">
                                <button class="main-btn up lg rounded-5" @click="addToCart">
                                    {{ $t('products.addToCart') }}
                                    <span class="spinner-border spinner-border-sm" v-if="loadingCart" role="status"
                                        aria-hidden="true"></span>
                                </button>

                                <div class="fav_icon main lg" @click="toggleFav" :class="{ fav: fav }">
                                    <span v-if="!loadingFav">
                                        <i class="pi pi-heart-fill"></i>
                                    </span>
                                    <span class="spinner-border spinner-border-sm" v-if="loadingFav" role="status"
                                        aria-hidden="true"></span>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                <!--******** Skeleton ********-->
                <div v-if="loading">
                    <div class="product_d_top mb-4">
                        <div class="product_bread">
                            <i class="pi pi-home"></i>
                            <i class="pi pi-angle-left"></i>
                            <Skeleton height=".5rem" width="3rem"></Skeleton>
                            <i class="pi pi-angle-left"></i>
                            <Skeleton height=".5rem" width="3rem"></Skeleton>
                        </div>

                        <button class="share_btn">
                            <i class="pi pi-share-alt"></i>
                            <Skeleton height=".5rem" width="3rem"></Skeleton>
                        </button>
                    </div>

                    <div class="row gy-5">
                        <div class="col-lg-6">
                            <div class="product_detailes">
                                <Skeleton height=".5rem" width="6rem" class=" mb-3"></Skeleton>
                                <Skeleton height=".5rem" width="10rem" class=" mb-3"></Skeleton>
                                <div class="d-flex align-items-center mb-3 gap-3 c-dark3 cu-pointer"
                                    @click="rateModal = true">
                                    <Skeleton height=".5rem" width="6rem"></Skeleton>
                                    <Skeleton height=".5rem" width="2rem"></Skeleton>
                                    <Skeleton height=".5rem" width="2rem"></Skeleton>
                                </div>
                                <div class="main-items">
                                    <div class="d-flex justify-content-between gap-3 flex-wrap mb-3" v-for="i in 3"
                                        :key="i">
                                        <Skeleton height=".5rem" width="6rem"></Skeleton>
                                        <Skeleton height=".5rem" width="6rem"></Skeleton>
                                    </div>

                                    <div class="fs13 d-flex justify-content-end my-3">
                                        <Skeleton height=".5rem" width="8rem"></Skeleton>
                                    </div>

                                    <div class="d-flex justify-content-between gap-3 flex-wrap mb-3" v-for="i in 8"
                                        :key="i">
                                        <Skeleton height=".5rem" width="6rem"></Skeleton>
                                        <Skeleton height=".5rem" width="6rem"></Skeleton>
                                    </div>

                                    <div class="mt-4">
                                        <Skeleton height=".5rem" width="6rem" class=" mb-3"></Skeleton>
                                        <Skeleton height=".5rem" width="100%" class=" mb-2"></Skeleton>
                                        <Skeleton height=".5rem" width="100%" class=" mb-2"></Skeleton>
                                        <Skeleton height=".5rem" width="100%" class=" mb-2"></Skeleton>
                                        <Skeleton height=".5rem" width="80%" class=" mb-2"></Skeleton>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <Skeleton height="450px" width="100%"></Skeleton>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </main>

    <!-- Rate Modal -->
    <Dialog id="rateModal" class="xl" v-model:visible="rateModal" modal>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <div class="right_sec">
                    <p class="fs16 mt-sm-0 mt-3 c-black mb-4 ff-d">{{ $t('modals.rateModal.header') }}</p>

                    <div v-if="productRating.length">
                        <div class="rate_item mb-4" v-for="rateItem in productRating" :key="rateItem.id">
                            <div class="d-flex align-items-center gap-3 mb-2">
                                <div class="d-flex gap-1">
                                    <p class="c-dark3 fs13"> {{ $t('modals.rateModal.text') }}</p>
                                    <p class="c-black fs13">{{ rateItem.user_name }}</p>
                                </div>
                                <div class="c-black fs13">{{ rateItem.date }}</div>
                            </div>
                            <div class="d-flex gap-3 mb-2">
                                <span class="c-dark3 fs13"> {{ $t('modals.rateModal.value') }}</span>
                                <Rating v-model="rateItem.stars" class="small gap-1" readonly :cancel="false" />
                            </div>
                            <p class="fs14 c-black">{{ rateItem.comment }}</p>
                        </div>
                    </div>

                    <div class="no-data sm" v-else>
                        <img  loading="lazy" src="@/assets/imgs/no_data.avif" alt="image" class="no-data-img">
                        <div class="no-data-text">{{ $t('noData.productRate') }}</div>
                    </div>

                    <div class="buttons justify-content-center mt-md-5 mt-4">
                        <button type="button" class="main-btn modal_btn transparent" @click="rateModal = false">
                            {{ $t('modals.rateModal.btn') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>

    <!-- Done Modal -->
    <Dialog id="done" class="xl" v-model:visible="done" modal>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <div class="right_sec">
                    <img  loading="lazy" src="@/assets/imgs/right_img.gif" alt="image" class="right_img mx-auto">
                    <p class="fs14 c-black text-center mb-4 ff-d">{{ $t('modals.done.addDone') }}</p>
                    <div class="buttons justify-content-center">
                        <NuxtLink to="/cart" class="main-btn modal_btn up">{{ $t('modals.done.orderBtn') }}</NuxtLink>
                        <button type="button" class="main-btn modal_btn transparent" @click="done = false">
                            {{ $t('modals.done.scrollBtn') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
</template>

<script setup>
/******************* Import *******************/

import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });

// success response
const { response } = responseApi();

// Toast
const { successToast, errorToast } = toastMsg();

// Axios
const axios = useApi();

// pinia store
import { useAuthStore } from '~/stores/auth';
import { useGlobalStore } from '~/stores/global';

/*************** DATA *****************/

// Global Store
const globalStore = useGlobalStore();
const { countryLocal, countryID, cartChanged } = storeToRefs(globalStore);

// Store
const store = useAuthStore();
const { token } = storeToRefs(store);

// Route
const route = useRoute();

// Modal
const done = ref(false);
const rateModal = ref(false);

// quantity
const quantity = ref(1);

// Fav Status
const fav = ref(0);

// loading
const loading = ref(false);
const loadingFav = ref(false);
const loadingCart = ref(false);

// Product Detailes
const product = ref({
    category_name: '',
    subcategory_name: '',
    is_available: false,
    currency: '',
    name: '',
    avg_rate: 0,
    rates_count: '',
    calories: '',
    weight: '',
    brand_name: '',
    detailesItems: [],
    description: '',
    price: '',
    discount_price: '',
    is_favourite: false,
    offer_id: null,
    has_offer: false,
    images: [],
});

// Product Rating
const productRating = ref([]);

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// getData
const getData = async () => {
    loading.value = true;
    await axios.get(`products/${productId.value}?country_id=${countryID.value}`, config.value).then(res => {
        if (response(res) == "success") {
            product.value.category_name = res.data.data.category_name;
            product.value.subcategory_name = res.data.data.subcategory_name;
            product.value.is_available = res.data.data.is_available;
            product.value.name = res.data.data.name;
            product.value.currency = res.data.data.currency;
            product.value.avg_rate = res.data.data.avg_rate;
            product.value.rates_count = res.data.data.rates_count;
            product.value.calories = res.data.data.calories;
            product.value.weight = res.data.data.weight;
            product.value.brand_name = res.data.data.brand_name;
            product.value.detailesItems = res.data.data.attributes;
            product.value.description = res.data.data.description;
            product.value.price = res.data.data.price;
            product.value.discount_price = res.data.data.discount_price;
            product.value.has_offer = res.data.data.has_offer;
            product.value.offer_id = res.data.data.offer_id;
            fav.value = res.data.data.is_favourite;
            product.value.images = res.data.data.attachments;

            if (res.data.data.has_offer) {
                product.value.price = res.data.data.offer_price;
                product.value.discount_price = null;
            }
        }
        loading.value = false;
    }).catch(err => console.log(err));
}

// get Order
const getProductRate = async () => {
    await axios.get(`get-product-rates/${productId.value}`, config.value).then(res => {
        if (response(res) == "success") {
            productRating.value = res.data.data.data;
        }
    }).catch(err => {
        console.error(err);
    });
}

// Toggle favourite Function
const toggleFav = async () => {
    loadingFav.value = true;

    const fd = new FormData();
    fd.append('product_id', productId.value);

    await axios.post(`toggle-favourite`, fd, config.value).then(res => {
        if (response(res) == "success") {
            fav.value = res.data.data.is_added;
            successToast(res.data.msg);
        } else {
            errorToast(res.data.msg);
        }
        loadingFav.value = false;
    }).catch(err => {
        console.error(err);
    });

}

// Add To Cart
const addToCart = async () => {
    loadingCart.value = true;

    const fd = new FormData();
    product.value.has_offer ? fd.append('offer_id', product.value.offer_id) : fd.append('product_id', productId.value);
    fd.append('quantity', quantity.value);

    await axios.post(`carts`, fd, config.value).then(res => {
        if (response(res) == "success") {
            done.value = true;
            cartChanged.value += 1;
        } else {
            errorToast(res.data.msg);
        }
        loadingCart.value = false;
    }).catch(err => {
        console.error(err);
    });

}

// shareCopy
const shareCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    successToast(t(`validation.copy`));
}

/******************* Computed *******************/
const productId = computed(() => {
    return route.params.id
});

const config = computed(() => {
  return token.value ? {
    headers: { Authorization: `Bearer ${token.value}` }
  } : {}
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
    await getProductRate();
});

// useHead(() => {
//   return {
//     title: product.value.name,
//     meta: [
//       { name: 'description', content: product.value.description }
//     ]
//   }
// });

</script>

<style lang="scss"></style>