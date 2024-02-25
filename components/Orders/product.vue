<template>
    <div class="product_item">

        <div class="product_img_td big_td with_m">

            <!--**** Product Image ****-->
            <div class="p_img">
                <img  loading="lazy" :src="product.image" alt="image" class="img">
            </div>

            <!--**** Product Name ****-->
            <div class="c-black ff-d">{{ product.name }}</div>

            <!--**** Cart Products Count ****-->
            <div class="number-input sec mt-3" v-if="showCount && !returnPro">

                <button type="button" class="plus btn-num" @click="addToCart('plus')">
                    <i class="pi pi-plus" v-if="!loadingCartPlus"></i>
                    <span class="spinner-border spinner-border-sm" v-if="loadingCartPlus" role="status"
                        aria-hidden="true"></span>
                </button>

                <input type="text" :value="product.quantity" min="1" disabled />

                <button type="button" class="minus btn-num" :disabled="product.quantity == 1" @click="addToCart('minus')">
                    <i class="pi pi-minus" v-if="!loadingCartMinus"></i>
                    <span class="spinner-border spinner-border-sm" v-if="loadingCartMinus" role="status"
                        aria-hidden="true"></span>
                </button>

            </div>

            <!--**** Return Products Count ****-->
            <div class="number-input sec mt-3" v-if="showCount && returnPro">

                <button type="button" class="plus btn-num" :disabled="returnQuantity == product.quantity" @click="returnQuantity++">
                    <i class="pi pi-plus"></i>
                </button>

                <input type="number" class="returnQuantity" :value="returnQuantity" :max="product.quantity" min="1" />

                <button type="button" class="minus btn-num" :disabled="product.quantity == 1 || returnQuantity == 1" @click="returnQuantity--">
                    <i class="pi pi-minus"></i>
                </button>

            </div>

        </div>

        <!--**** Product Price ****-->
        <div class="price_con small_td lg justify-content-center">
            <p class="price ff-m fs13" v-if="Number(product.discount_price)">
                {{ product.discount_price }} {{ product.currency }}
            </p>
            <p class="price ff-m fs13" :class="{ 'old c-dark4': Number(product.discount_price) }">
                {{ product.price || product.total }} {{ product.currency }}
            </p>
        </div>

        <!--**** Product Quantity ****-->
        <div class="small_td">
            <span class="sm_btn mx-auto">{{ product.quantity }}</span>
        </div>
        
        <!--**** Product Total Price ****-->
        <div class="small_td c-blue">
            <span v-if="Number(product.discount_price)">
                {{ product.discount_price * product.quantity }} {{ product.currency }}
            </span>
            <span v-else>
                {{ product.price * product.quantity || product.total }} {{ product.currency }}
            </span>
        </div>
        
        <!--**** Product Delete Btn ****-->
        <button type="button" class="delete_btn px-3" v-if="deleteBtn" @click="deleteFromCart">
            <i class="pi pi-trash" v-if="!loading"></i>
            <span class="spinner-border spinner-border-sm" v-if="loading" role="status" aria-hidden="true"></span>
        </button>

    </div>
</template>

<script setup>
/******************* Plugins Or Composables *******************/
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
const { cartChanged } = storeToRefs(globalStore);

// Store
const store = useAuthStore();
const { token } = storeToRefs(store);

// config
const config = {
    headers: { Authorization: `Bearer ${token.value}` }
};

// loading
const loading = ref(false);
const loadingCartPlus = ref(false);
const loadingCartMinus = ref(false);

// return quantity
const returnQuantity = ref(1);

/******************* Provide && Inject *******************/

/******************* Emits *******************/
const emit = defineEmits(['updateProduct']);

/******************* Props *******************/
const props = defineProps({
    product: {
        type: Object
    },
    showCount: {
        type: Boolean
    },
    returnPro: {
        type: Boolean
    },
    deleteBtn: {
        type: Boolean
    }
})

/******************* Methods *******************/

// Add To Cart
const addToCart = async (calc) => {
    let toastMesg = '';

    if (calc == 'plus') {
        props.product.quantity++;
        loadingCartPlus.value = true;
        toastMesg = t("products.increasedQuantity");
    } else {
        props.product.quantity > 1 ? props.product.quantity-- : false;
        loadingCartMinus.value = true;
        toastMesg = t("products.decreasedQuantity");
    }

    const fd = new FormData();
    if (props.product.offer_id) {
        fd.append('offer_id', props.product.offer_id);
    } else {
        fd.append('product_id', props.product.product_id);
    }
    fd.append('quantity', props.product.quantity);

    await axios.post(`carts`, fd, config).then(res => {
        if (response(res) == "success") {
            successToast(toastMesg);
            emit('updateProduct');
            cartChanged.value += 1;
        } else {
            errorToast(res.data.msg);
            if (calc == 'plus') {
                props.product.quantity--;
            } else {
                props.product.quantity > 1 ? props.product.quantity++ : false;
            }
        }
        loadingCartPlus.value = false;
        loadingCartMinus.value = false;
    }).catch(err => {
        console.error(err);
    });

}

// delete Product From Cart
const deleteFromCart = async () => {
    loading.value = true;

    await axios.delete(`carts/${props.product.id}`, config).then(res => {
        if (response(res) == "success") {
            successToast(t("products.removedFromCart"));
            emit('updateProduct');
            cartChanged.value -= 1;
        } else {
            errorToast(res.data.msg);
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });

}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>

<style lang="scss"></style>