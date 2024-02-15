<template>
    <div class="product_card">
        <div class="fav_icon" v-if="!view" @click="toggleFav" :class="{ fav: fav }">
            <span v-if="!loading">
                <i class="pi pi-heart-fill"></i>
            </span>
            <span class="spinner-border spinner-border-sm" v-if="loading" role="status" aria-hidden="true"></span>
        </div>
        <img :src="product.image" alt="" class="product_img">
        <div class="product_body">
            <router-link v-if="!view" :to="`/products/${productId}`" class="product_name">
                <i class="pi pi-arrow-left c-main"></i>
                {{ product.name }}
            </router-link>
            <h3 v-if="view" class="product_name">{{ product.name }}</h3>
            <Rating v-if="!view" v-model="product.avg_rate" class="my-2 small" readonly :cancel="false" />
            <div class="price_con" v-if="!view">
                <p class="price" v-if="product.discount_price">{{ product.discount_price }} {{ product.currency }}</p>
                <p class="price" :class="{ old: product.discount_price }">{{ product.price }} {{ product.currency }}</p>
            </div>
        </div>
        <button class="main-btn up" v-if="!view" @click="addToCart">
            <i class="pi pi-shopping-bag"></i>
            {{ $t('products.addToCart') }}
            <span class="spinner-border spinner-border-sm" v-if="loadingCart" role="status" aria-hidden="true"></span>
        </button>
    </div>
</template>

<script setup>

/******************* Import *******************/
import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });

// Toast
const { successToast, errorToast } = toastMsg();

// success response
const { response } = responseApi();

// Axios
const axios = useApi();


/******************* Data *******************/

// Fav
const fav = ref(0);

// loading
const loading = ref(false);
const loadingCart = ref(false);

/******************* Provide && Inject *******************/
const view = inject('view', false);
const favPage = inject('favPage', false);

/******************* Emits *******************/
const emit = defineEmits(['toggleFavId']);

/******************* Props *******************/
const props = defineProps({
    product: {
        type: Object,
        required: true,
    }
})

/******************* Methods *******************/

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

// Toggle favourite Function
const toggleFav = async () => {
    loading.value = true;

    const fd = new FormData();
    if (props.product.offer_id) {
        fd.append('offer_id', productId.value);
    } else {
        fd.append('product_id', productId.value);
    }

    await axios.post(`toggle-favourite`, fd, config).then(res => {
        if (response(res) == "success") {
            fav.value = res.data.data.is_added;
            successToast(res.data.msg);

            // Send Product Id To Products component
            if (favPage) {
                emit('toggleFavId', props.product.id);
            }

        } else {
            errorToast(res.data.msg);
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });

}

// Add To Cart
const addToCart = async () => {
    loadingCart.value = true;

    const fd = new FormData();
    fd.append('product_id', productId.value);
    fd.append('quantity', 1);

    await axios.post(`carts`, fd, config).then(res => {
        if (response(res) == "success") {
            successToast(t("products.addedToCart"));
        } else {
            errorToast(res.data.msg);
        }
        loadingCart.value = false;
    }).catch(err => {
        console.error(err);
    });

}

/******************* Computed *******************/
const productId = computed(() => {
    return props.product.offer_id ? props.product.offer_id : props.product.product_id ? props.product.product_id : props.product.id
});

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(() => {
    fav.value = props.product.is_favourite;
});
</script>

<style></style>