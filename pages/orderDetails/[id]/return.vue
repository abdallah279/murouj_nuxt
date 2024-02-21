<template>
    <main class="orderDetailes_page main-padding">
        <div class="container">
            <PageHeader :title="`${$t('pagesTitle.returnOrder')} #${orderNumber}`" margin="mb-5" />

            <form class="row" ref="returnForm" @submit.prevent="returnOrder">
                <div class="col-xl-8 col-lg-10">
                    <div class="fs15 c-black mb-5">{{ $t('orderDetailes.returndetailes') }}</div>

                    <!--*** سبب الارجاع ***-->
                    <div class="input-g">
                        <div class="main-input">
                            <textarea v-model="retrieval_reason" valid="retrieval_reason" class="input-me validInputs text-area sm"
                                :placeholder="$t('orderDetailes.reasonReturn')"></textarea>
                        </div>
                    </div>

                    <!--*** طريقة التوصيل ***-->
                    <!-- <div class="mb-3 ff-d c-black">{{ $t('cart.chooseWay') }}</div>

                    <label class="d-flex-between gap-4 cu-pointer p-3 mb-3 bg-light2" v-for="dtype in deliveryTypes"
                        :key="dtype">
                        <div class="radio-box">
                            <input type="radio" class="input-radio main" name="delivery_type" v-model="delivery_type"
                                :value="dtype.type">
                            <label for="price1" class="label">
                                {{ dtype.delegate_name }}
                                ( {{ dtype.delivery_expected_time }} )
                            </label>
                        </div>
                        <div for="price1" class="label">
                            {{ dtype.delivery_price }} {{ $t('nav.currency') }}
                        </div>
                    </label> -->

                    <!--*** الصور ***-->
                    <div class="input-g">
                        <label class="main-label fs13">{{ $t('orderDetailes.photoReturnOrder') }}</label>
                        <div class="d-flex gap-3 flex-wrap">
                            <label for="uploadImgs" class="upload-label light">
                                <input id="uploadImgs" type="file" multiple accept="image/*" class="hidden-input"
                                    @change="uploadImgs">
                                <i class="pi pi-upload"></i>
                            </label>

                            <div class='hidden-img' v-for="(img, i) in images" :key="img.name">
                                <img src='' :class="`img${i}`" :alt="img.name" />

                                <span class='remove-img' @click="removeImage(i)">
                                    <i class="pi pi-times"></i>
                                </span>
                            </div>
                        </div>
                    </div>

                    <!--*** المنتجات ***-->
                    <div class="table_con mb-4">
                        <div class="coll_head mb-2 rounded-1 ff-d">
                            <span>{{ $t('orderDetailes.products') }}</span>
                            <i class="pi pi-sort-down"></i>
                        </div>
                        <div class="product_table" v-if="!loading">
                            <div class="main-bb d-flex head">
                                <div class="item small_td"></div>
                                <div class="item big_td">{{ $t('cart.table.product') }}</div>
                                <div class="item small_td lg">{{ $t('cart.table.price') }}</div>
                                <div class="item small_td">{{ $t('cart.table.amount') }}</div>
                                <div class="item small_td">{{ $t('cart.table.totalPrice') }}</div>
                            </div>
                            <div class="d-flex align-items-center mt-4" v-for="product in orderProducts"
                                :key="product.product_id" :id="`product${product.product_id}`">
                                <div class="check-box mb-0 circle item small_td ts">
                                    <input type="checkbox" name="return" :id="`return${product.product_id}`"
                                        @change="addProductId($event, product.product_id)">
                                    <label class="check" :for="`return${product.product_id}`"></label>
                                </div>
                                <OrdersProduct class="mt-0" :product="product" :showCount="true" :returnPro="true" />
                            </div>
                        </div>
                    </div>

                    <!--******** Skeleton ********-->
                    <OrdersProductSkeleton class="mb-4" v-if="loading" />

                    <div class="input-g">
                        <div class="check-box form-check-m">
                            <input type="checkbox" name="conditions" id="conditions" v-model="terms">
                            <label class="check" for="conditions"></label>
                            <label class="check-anchor fs13 c-light2" for="conditions">
                                {{ $t('createAccountForm.agree2') }}
                                <router-link to="/terms" class="text-decoration-underline c-main">
                                    {{ $t('nav.profile.terms') }}
                                </router-link>
                            </label>
                        </div>
                    </div>

                    <div class="buttons mt-4">
                        <button type="submit" class="main-btn up lg">
                            {{ $t('orderDetailes.buttons.returnOrder') }}
                            <span class="spinner-border spinner-border-sm" v-if="loadingBtn" role="status"
                                aria-hidden="true"></span>
                        </button>
                    </div>

                </div>
            </form>

        </div>
    </main>

    <!-- Done Modal -->
    <Dialog id="done" class="xl" v-model:visible="done" modal>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <div class="right_sec">
                    <img src="@/assets/imgs/right_img.gif" alt="" class="right_img mx-auto">
                    <p class="fs14 c-black text-center mb-4">{{ $t('modals.done.returnDone') }}</p>
                    <div class="buttons justify-content-center">
                        <NuxtLink to="/" class="main-btn modal_btn up">{{ $t('modals.done.btn') }}</NuxtLink>
                        <NuxtLink to="/orders/purchaseOrders/waiting" class="main-btn modal_btn transparent">
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

// Translate
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

/*************** DATA *****************/

// Store
const store = useAuthStore();
const { token } = storeToRefs(store);

const route = useRoute();

// config
const config = {
    headers: { Authorization: `Bearer ${token.value}` }
};

// returnForm
const returnForm = ref(null);

// retrieval_reason
const retrieval_reason = ref('');

// images
const images = ref([]);

// loading
const loading = ref(false);
const loadingBtn = ref(false);

// terms
const terms = ref(false);

// errors
const errors = ref([]);

// productIds
const productIds = ref([]);

// Return items
const returnItems = ref([]);

// delivery_type
const delivery_type = ref('');
const deliveryTypes = ref({});

// done
const done = ref(false);

// Products
const orderProducts = ref([]);

// Order Number
const orderNumber = ref('');

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// Upload Imgs
function uploadImgs(e) {
    // images.value = [];
    var selectedImgs = e.target.files;
    for (let i = 0; i < selectedImgs.length; i++) {
        images.value.push(selectedImgs[i]);
    }

    for (let i = 0; i < images.value.length; i++) {
        let reader = new FileReader();
        reader.addEventListener('load', function () {
            document.querySelector(`.img${i}`).src = reader.result
        }.bind(this), false);

        reader.readAsDataURL(images.value[i]);
    }
}

// Remove Img
function removeImage(index) {
    images.value.splice(index, 1);
}

// add Product Id
const addProductId = (e, id) => {
    const index = productIds.value.indexOf(id);
    e.target.checked ? productIds.value.push(id) : productIds.value.splice(index, 1);
}

// Add Return Product
const addReturnProduct = (id) => {
    let productQuantity = document.querySelector(`#product${id} .returnQuantity`).value;
    returnItems.value.push({ "product_id": id, "quantity": productQuantity });
}

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

// get Delivery Types
const getDeliveryTypes = async () => {
    await axios.get(`delivery-types`, config).then(res => {
        if (response(res) == "success") {
            deliveryTypes.value = res.data.data;
        } else {
            errorToast(res.data.msg);
        }
    }).catch(err => {
        console.error(err);
    });
}

// Validation Function
function validate() {
    let allInputs = document.querySelectorAll('.validInputs');
    for (let i = 0; i < allInputs.length; i++) {
        if (allInputs[i].value === '') {
            errors.value.push(t(`validation.${allInputs[i].getAttribute('valid')}`));
        }
    }

    if (images.value.length === 0) {
        errors.value.push(t(`validation.returnImg`));
    }

    if (returnItems.value.length === 0) {
        errors.value.push(t(`validation.products`));
    }

    if (!terms.value) {
        errors.value.push(t(`validation.conditions`));
    }
}


// return Order
const returnOrder = async () => {

    returnItems.value = [];
    for (let id of productIds.value) {
        addReturnProduct(id);
    }

    const fd = new FormData();
    
    fd.append('order_id', orderId.value);
    fd.append('retrieval_reason', retrieval_reason.value);
    // fd.append('delivery_type', delivery_type.value);
    fd.append('items', JSON.stringify(returnItems.value));

    for (let img of images.value) {
        fd.append('attachments[]', img);
    }
    
    validate();
    
    if (errors.value.length) {
        errorToast(errors.value[0]);
        loading.value = false;
        errors.value = [];
    } else {
        loadingBtn.value = true;
        await axios.post('retrieval-orders', fd, config).then(res => {
            if (response(res) == "success") {
                done.value = true;
            } else {
                errorToast(res.data.msg);
            }
            loadingBtn.value = false;
        }).catch(err => console.log(err));
    }
}

/******************* Computed *******************/

const orderId = computed(() => {
    return route.params.id
});

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getOrderDetailes();
    // await getDeliveryTypes();
});

</script>

<style lang="scss"></style>