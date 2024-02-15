<template>
    <div class="product_card offer">
        <img :src="offer.image" alt="" class="product_img">
        <div class="product_body">
            <NuxtLink :to="`/products/${offer.product_id}`" class="product_name">
                {{ offer.name }}
            </NuxtLink>
            <div class="price_con">
                <p class="price" v-if="offer.discount_price">{{ offer.discount_price }} {{ offer.currency }}</p>
                <p class="price" :class="{ old: offer.discount_price }">{{ offer.price }} {{ offer.currency }}</p>
            </div>
        </div>

        <div class="product_footer">
            <button class="main-btn up" @click="addToCart">
                <i class="pi pi-shopping-bag"></i>
                {{ $t('products.addToCart') }}
                <span class="spinner-border spinner-border-sm" v-if="loading" role="status" aria-hidden="true"></span>
            </button>

            <button class="main-btn red-transparent" @click="toggleFav">
                <i class="pi pi-heart"></i>
                <span v-show="!is_added">
                    {{ $t('products.addToFav') }}
                </span>
                <span v-show="is_added">
                    {{ $t('products.removeToFav') }}
                </span>
                <span class="spinner-border spinner-border-sm" v-if="loadingFav" role="status" aria-hidden="true"></span>
            </button>
        </div>
    </div>
</template>

<script setup>

/******************* Import *******************/
// success response
const { response } = responseApi();

// Toast
const { successToast, errorToast } = toastMsg();

// Axios
const axios = useApi();

/******************* Data *******************/

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

// loading
const loading = ref(false);
const loadingFav = ref(false);


/******************* Props *******************/
const props = defineProps({
    offer: {
        type: Object,
        required: true,
    }
});

// is_added
const is_added = ref(props.offer.is_favourite);

/******************* Methods *******************/

// Add To Cart
const addToCart = async () => {
    loading.value = true;

    const fd = new FormData();
    fd.append('offer_id', props.offer.id);
    fd.append('quantity', 1);

    await axios.post(`carts`, fd, config).then(res => {
        if (response(res) == "success") {
            successToast(res.data.msg);
        } else {
            errorToast(res.data.msg);
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });

}

// Toggle favourite Function
const toggleFav = async () => {
    loadingFav.value = true;

    const fd = new FormData();
    fd.append('offer_id', props.offer.id);

    await axios.post(`toggle-favourite`, fd, config).then(res => {
        if (response(res) == "success") {
            is_added.value = Boolean(res.data.data.is_added);
            successToast(res.data.msg);
        } else {
            errorToast(res.data.msg);
        }
        loadingFav.value = false;
    }).catch(err => {
        console.error(err);
    });

}

/******************* Computed *******************/

// is_added
// const is_added = computed(() => {
//     return props.offer.is_favourite
// })

/******************* Watch *******************/

/******************* Mounted *******************/
</script>

<style></style>