<template>
    <main class="orderDetailes_page main-padding">
        <div class="container">

            <div class="row">

                <div class="col-xl-10 mx-auto">

                    <div v-if="!loading">
                        <PageHeader :title="`${$t('pagesTitle.retUrnOrderDetailes')} #${order.order_num}`" margin="mb-5"
                            v-if="order.type == 1" />
                        <PageHeader :title="`${$t('pagesTitle.orderDetailes')} #${order.order_num}`" margin="mb-5"
                            v-if="order.type == 0" />

                        <div v-if="order.status != 7">

                            <!--*** Return Order Steps ***-->
                            <div class="progress-container mb-5" v-if="order.type == 1">

                                <!--**** تم التسليم ****-->
                                <div class="progress-item" v-if="order.status == 14"
                                    :class="{ active: order.status == 14 }">
                                    <div class="circle">
                                        <i class="pi pi-check"></i>
                                    </div>
                                    <span class="text">{{ order.status_text }}</span>
                                </div>

                                <!--**** تم التسليم ****-->
                                <div class="progress-item" :class="{ active: (order.status == 14 || order.status == 13) }">
                                    <div class="circle">
                                        <i class="pi pi-check"></i>
                                    </div>
                                    <span class="text">{{ $t('orderDetailes.steps.step4') }}</span>
                                </div>

                                <!--**** تم استلام الطلب ****-->
                                <div class="progress-item" v-if="order.status == 12"
                                    :class="{ active: order.status == 12 }">
                                    <div class="circle">
                                        <i class="pi pi-check"></i>
                                    </div>
                                    <span class="text">{{ order.status_text }}</span>
                                </div>

                                <!--**** فى الطريق ****-->
                                <div class="progress-item" :class="{ active: order.status == 11 }">
                                    <div class="circle">
                                        <i class="pi pi-check"></i>
                                    </div>
                                    <span class="text">{{ $t('orderDetailes.steps.step6') }}</span>
                                </div>

                                <!--**** تم التسليم لشركة الشحن ****-->
                                <div class="progress-item" v-if="order.status == 10"
                                    :class="{ active: order.status == 10 }">
                                    <div class="circle">
                                        <i class="pi pi-check"></i>
                                    </div>
                                    <span class="text">{{ order.status_text }}</span>
                                </div>

                                <!--**** تم الموافقة ****-->
                                <div class="progress-item" v-if="order.status == 5" :class="{ active: order.status == 5 }">
                                    <div class="circle">
                                        <i class="pi pi-check"></i>
                                    </div>
                                    <span class="text">{{ order.status_text }}</span>
                                </div>

                                <!--**** قيد الموافقة ****-->
                                <div class="progress-item" :class="{ active: order.status == 4 }">
                                    <div class="circle">
                                        <i class="pi pi-check"></i>
                                    </div>
                                    <span class="text">{{ $t('orderDetailes.steps.step5') }}</span>
                                </div>
                            </div>

                            <!--*** Order Steps ***-->
                            <div class="progress-container mb-5" v-else>

                                <!--**** تم التسليم ****-->
                                <div class="progress-item" :class="{ active: order.status == 14 }">
                                    <div class="circle">
                                        <i class="pi pi-check"></i>
                                    </div>
                                    <span class="text">{{ $t('orderDetailes.steps.step4') }}</span>
                                </div>

                                <!--**** تم استلام الطلب ****-->
                                <div class="progress-item" v-if="order.status == 12"
                                    :class="{ active: order.status == 12 }">
                                    <div class="circle">
                                        <i class="pi pi-check"></i>
                                    </div>
                                    <span class="text">{{ order.status_text }}</span>
                                </div>

                                <!--**** جارى الشحن ****-->
                                <div class="progress-item"
                                    v-if="order.status != 10 && order.status != 1 && order.status != 4 && order.status != 2"
                                    :class="{ active: (order.status == 11 || order.status == 12 || order.status == 13) }">
                                    <div class="circle">
                                        <i class="pi pi-check"></i>
                                    </div>
                                    <span class="text">{{ $t('orderDetailes.steps.step3') }}</span>
                                </div>

                                <!--**** تم التسليم لشركة الشحن ****-->
                                <div class="progress-item" v-if="order.status == 10"
                                    :class="{ active: order.status == 10 }">
                                    <div class="circle">
                                        <i class="pi pi-check"></i>
                                    </div>
                                    <span class="text">{{ order.status_text }}</span>
                                </div>

                                <!--**** تم التجهيز ****-->
                                <div class="progress-item" :class="{ active: order.status == 9 }">
                                    <div class="circle">
                                        <i class="pi pi-check"></i>
                                    </div>
                                    <span class="text">{{ $t('orderDetailes.steps.step2') }}</span>
                                </div>

                                <!--**** جاري التجهيز ****-->
                                <div class="progress-item" v-if="order.status != 12" :class="{ active: order.status == 8 }">
                                    <div class="circle">
                                        <i class="pi pi-check"></i>
                                    </div>
                                    <span class="text">{{ $t('orderDetailes.steps.step1') }}</span>
                                </div>

                                <!--**** تم الموافقة على الحوالة ****-->
                                <div class="progress-item" v-if="order.status == 2" :class="{ active: order.status == 2 }">
                                    <div class="circle">
                                        <i class="pi pi-check"></i>
                                    </div>
                                    <span class="text">{{ order.status_text }}</span>
                                </div>

                                <!--**** بانتظار الموافقة على الحوالة ****-->
                                <div class="progress-item" v-if="order.status == 1" :class="{ active: order.status == 1 }">
                                    <div class="circle">
                                        <i class="pi pi-check"></i>
                                    </div>
                                    <span class="text">{{ order.status_text }}</span>
                                </div>

                                <!--**** قيد الموافقة ****-->
                                <div class="progress-item" v-if="order.status == 4" :class="{ active: order.status == 4 }">
                                    <div class="circle">
                                        <i class="pi pi-check"></i>
                                    </div>
                                    <span class="text">{{ order.status_text }}</span>
                                </div>

                            </div>
                        </div>

                        <!--*** تفاصيل الطلب ***-->
                        <div class="detailes mb-4">
                            <h5 class="fs14 ff-d mb-3 c-white2">{{ $t('orderDetailes.detailes') }}</h5>

                            <div class="d-flex-between gap-2 flex-wrap mb-3">
                                <span class="c-dark3">{{ $t('orderDetailes.ordertimeDate') }} :</span>
                                <span class="c-black">{{ order.created_at }}</span>
                            </div>

                            <div class="d-flex-between gap-2 flex-wrap mb-3">
                                <span class="c-dark3">{{ $t('orderDetailes.deliverytimeDate') }} :</span>
                                <span class="c-black">{{ order.delivery_expected_time }}</span>
                            </div>

                            <div class="d-flex-between gap-2 flex-wrap mb-3">
                                <span class="c-dark3">{{ $t('orderDetailes.orderAddress') }} :</span>
                                <span class="c-black">{{ order.map_desc }}</span>
                            </div>

                            <div class="d-flex-between gap-2 flex-wrap">
                                <span class="c-dark3">{{ $t('orderDetailes.payWay') }} :</span>
                                <span class="c-black">{{ order.pay_type_text }}</span>
                            </div>
                        </div>

                        <!--*** تفاصيل الدفع ***-->
                        <div class="detailes mb-4">
                            <h5 class="fs14 ff-d mb-3 c-white2">{{ $t('orderDetailes.paymentInfo') }}</h5>

                            <div class="d-flex-between gap-2 flex-wrap mb-3">
                                <span class="c-dark3">{{ $t('orderDetailes.discountPrice') }} :</span>
                                <span class="c-blue">{{ order.discount_amount }} {{ order.currency }}</span>
                            </div>

                            <div class="d-flex-between gap-2 flex-wrap mb-3">
                                <span class="c-dark3">{{ $t('orderDetailes.shippingPrice') }} :</span>
                                <span class="c-blue">{{ order.shipping_price }} {{ order.currency }}</span>
                            </div>

                            <div class="d-flex-between gap-2 flex-wrap mb-3">
                                <span class="c-dark3">{{ $t('orderDetailes.taxPrice') }} :</span>
                                <span class="c-blue">{{ order.vat_amount }} {{ order.currency }}</span>
                            </div>

                            <div class="d-flex-between gap-2 flex-wrap mb-2 pb-2 main-bb">
                                <span class="c-dark3">{{ $t('orderDetailes.productsPrice') }} :</span>
                                <span class="c-blue">{{ order.products_price }} {{ order.currency }}</span>
                            </div>

                            <div class="d-flex-between gap-2 flex-wrap">
                                <span class="c-dark3">{{ $t('orderDetailes.totalPrice') }} :</span>
                                <span class="c-blue">{{ order.final_total }} {{ order.currency }}</span>
                            </div>
                        </div>

                        <!--*** صورة الحوالة ***-->
                        <div class="detailes mb-4" v-if="order.pay_type == 3 && order.status == 1">
                            <h5 class="fs14 mb-3 c-white2">{{ $t('orderDetailes.bankTransfer') }}</h5>

                            <form class="input-g" ref="transferForm" @submit.prevent="addBankTransferImage">
                                <div class="d-flex gap-3 flex-wrap align-items-end">
                                    <label for="uploadImgs" class="upload-label blue">
                                        <input id="uploadImgs" name="bank_transfer_image" type="file" accept="image/*"
                                            class="hidden-input" @change="uploadImgs">
                                        <i class="pi pi-image"></i>
                                        <span class="fs12">{{ $t('orderDetailes.buttons.img') }}</span>
                                    </label>

                                    <div class='hidden-img' v-for="(img, i) in images" :key="img.name">
                                        <img  loading="lazy" src='' :class="`img${i}`" :alt="img.name" />

                                        <span class='remove-img' @click="removeImage(i)">
                                            <i class="pi pi-times"></i>
                                        </span>
                                    </div>

                                    <button type="submit" class="main-btn up xs" v-if="images.length">
                                        {{ $t('orderDetailes.buttons.confirm') }}
                                        <span class="spinner-border spinner-border-sm" v-if="loadingImg" role="status"
                                            aria-hidden="true"></span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        <!--*** تم الالغاء ***-->
                        <h5 class="fs14 ff-d mb-4 c-red text-decoration-underline" v-if="order.status == 7">
                            {{ $t('orderDetailes.Cancelled') }}
                        </h5>

                        <!--*** سبب الالغاء ***-->
                        <div class="detailes mb-4" v-if="order.cancel_reason && order.status == 7">
                            <h5 class="fs14 mb-2 c-dark4">{{ $t('orderDetailes.cancelledReason') }}</h5>

                            <p class="c-black">{{ order.cancel_reason }}</p>
                        </div>

                        <!--*** صور الارجاع ***-->
                        <div class="detailes mb-4" v-if="order.type">
                            <h5 class="fs14 mb-3 c-white2">{{ $t('orderDetailes.photoReturnOrder') }}</h5>

                            <div class="d-flex gap-3 flex-wrap">
                                <div class='hidden-img border' v-for="img in order.attachments" :key="img.id">
                                    <Image :src="img.file" alt="Image" class="fancyImg" preview />
                                </div>
                            </div>
                        </div>

                        <!--*** سبب الارجاع ***-->
                        <div class="detailes mb-4" v-if="order.type">
                            <h5 class="fs14 mb-2 c-dark4">{{ $t('orderDetailes.reasonReturn') }}</h5>

                            <p class="c-black">{{ order.notes }}</p>
                        </div>

                        <!--*** الملاحظات ***-->
                        <div class="detailes mb-4" v-if="order.notes && order.type == 0">
                            <h5 class="fs14 mb-2 c-dark4">{{ $t('orderDetailes.feedback') }}</h5>

                            <p class="c-black">{{ order.notes }}</p>
                        </div>

                        <!--*** المنتجات ***-->
                        <div class="row align-items-center position-relative">
                            <div class="col-lg-8">
                                <div class="table_con" v-if="orderProducts.length">
                                    <div class="product_table">
                                        <div class="main-bb d-flex head">
                                            <div class="item big_td">{{ $t('cart.table.product') }}</div>
                                            <div class="item small_td lg">{{ $t('cart.table.price') }}</div>
                                            <div class="item small_td">{{ $t('cart.table.amount') }}</div>
                                            <div class="item small_td">{{ $t('cart.table.totalPrice') }}</div>
                                        </div>
                                        <OrdersProduct v-for="product in orderProducts" :product="product" :key="product.id" />
                                    </div>
                                </div>

                                <div class="alert alert-danger text-center fs13 mt-3" role="alert" v-else>
                                    {{ $t('noData.orderProduct') }}
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <img  loading="lazy" src="@/assets/imgs/favicon.png" alt="image"
                                    class="login_logo opacity-75 sm res d-block mx-auto">
                            </div>
                        </div>

                        <div class="buttons mt-5" v-if="order.type === 1">
                            <button type="button" class="main-btn up red lg" v-if="order.status === 4"
                                @click="cancelModal = true">
                                {{ $t('orderDetailes.buttons.cancel') }}
                            </button>
                            <button type="button" class="main-btn up lg" v-if="order.status === 12" @click="receivedFunc">
                                {{ $t('orderDetailes.buttons.received') }}
                                <span class="spinner-border spinner-border-sm" v-if="loadingImg" role="status"
                                    aria-hidden="true"></span>
                            </button>
                        </div>

                        <div class="buttons mt-5" v-if="order.type === 0">
                            <button type="button" class="main-btn up red lg"
                                v-if="order.status === 8 || order.status === 1 || order.status === 2"
                                @click="cancelModal = true">
                                {{ $t('orderDetailes.buttons.cancel') }}
                            </button>
                            <!-- <button type="button" class="main-btn up lg" v-if="order.status === 12" @click="receivedFunc">
                                {{ $t('orderDetailes.buttons.received') }}
                                <span class="spinner-border spinner-border-sm" v-if="loadingImg" role="status"
                                    aria-hidden="true"></span>
                            </button> -->
                        </div>

                        <div class="buttons mt-4 justify-content-center" v-if="order.status === 14 && order.type === 0">
                            <NuxtLink :to="`/orderDetails/${orderId}/return`"
                                v-if="order.can_retrieve && checkReturnedQuantity()" type="button"
                                class="main-btn transparent lg">
                                {{ $t('orderDetailes.buttons.returnProducts') }}
                            </NuxtLink>
                            <NuxtLink :to="`/orderDetails/${orderId}/rate`" type="button"
                                class="main-btn up lg">
                                {{ $t('orderDetailes.buttons.addRate') }}
                            </NuxtLink>
                        </div>
                    </div>

                    <!--******** Skeleton ********-->
                    <div v-if="loading">
                        <div class="product_detailes">
                            <div class="main-items">

                                <Skeleton height=".5rem" width="8rem" class="mx-auto mb-5"></Skeleton>

                                <div class="progress-container mb-5">
                                    <div class="progress-item" v-for="i in 4" :key="i">
                                        <div class="circle mb-3">
                                            <i class="pi pi-check"></i>
                                        </div>
                                        <Skeleton height=".5rem" width="4rem"></Skeleton>
                                    </div>
                                </div>

                                <div v-for="i in 3" :key="i">
                                    <div class="fs13 d-flex my-3">
                                        <Skeleton height=".5rem" width="8rem"></Skeleton>
                                    </div>

                                    <div class="d-flex justify-content-between gap-3 flex-wrap mb-3" v-for="i in 4"
                                        :key="i">
                                        <Skeleton height=".5rem" width="6rem"></Skeleton>
                                        <Skeleton height=".5rem" width="6rem"></Skeleton>
                                    </div>
                                </div>

                                <div class="row align-items-center position-relative mb-5">
                                    <div class="col-lg-8">
                                        <OrdersProductSkeleton />
                                    </div>
                                    <div class="col-lg-4">
                                        <Skeleton shape="circle" size="8rem" class="mx-auto"></Skeleton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    </main>

    <!-- Cancel Order Modal -->
    <Dialog id="cancelOrder" class="xl" :header="$t('modals.reason.header')" v-model:visible="cancelModal" modal>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <form action="" class="modal-form" ref="cancelForm" @submit.prevent="cancelFunc">
                    <div class="scroll my-4">
                        <div class="radio-box mb-3 " v-for="(reason, i) in reasons" :key="reason.id">
                            <input type="radio" :id="`reason${i}`" name="cancel_reason_id" class="input-radio main"
                                :value="reason.id" v-model="cancelledReason">
                            <label :for="`reason${i}`" class="label">
                                {{ reason.name }}
                            </label>
                        </div>
                    </div>
                    <div class="buttons justify-content-center pt-3">
                        <button type="submit" class="main-btn modal_btn up">
                            {{ $t('modals.reason.confirmBtn') }}
                            <span class="spinner-border spinner-border-sm" v-if="loadingImg" role="status"
                                aria-hidden="true"></span>
                        </button>
                        <button type="button" @click="cancelModal = false" class="main-btn modal_btn transparent">
                            {{ $t('modals.reason.btn') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Dialog>

    <!-- Done Modal -->
    <Dialog id="done" class="xl" v-model:visible="done" modal>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <div class="right_sec">
                    <img  loading="lazy" src="@/assets/imgs/right_img.gif" alt="image" class="right_img mx-auto">
                    <p class="fs14 c-black text-center mb-4">{{ $t('modals.done.cancelDone') }}</p>
                    <div class="buttons justify-content-center">
                        <NuxtLink to="/" class="main-btn modal_btn up">{{ $t('modals.done.btn') }}</NuxtLink>
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

// route
const route = useRoute();

// config
const config = {
    headers: { Authorization: `Bearer ${token.value}` }
};

// images
const images = ref([]);

// transferForm
const transferForm = ref(null);

// cancelForm
const cancelForm = ref(null);

// loading
const loading = ref(false);
const loadingImg = ref(false);

// cancelled Reason
const cancelModal = ref(false);
const cancelledReason = ref('');
const reasons = ref([]);

// done
const done = ref(false);

// Order Detailes
const order = ref({});
const orderProducts = ref([]);

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/


// Upload Imgs
const uploadImgs = (e) => {
    images.value = [];
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

// getOrders
const getOrderDetailes = async (load) => {
    load ? loading.value = true : loading.value = false;
    await axios.get(`orders/${orderId.value}/show`, config).then(res => {
        if (response(res) == "success") {
            order.value = res.data.data;
            orderProducts.value = res.data.data.items;
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}

// getOrders
const getReasons = async () => {
    await axios.get(`cancel-reasons`, config).then(res => {
        if (response(res) == "success") {
            reasons.value = res.data.data;
        }
    }).catch(err => {
        console.error(err);
    });
}

// add-bank-transfer-image
const addBankTransferImage = async () => {
    loadingImg.value = true;
    const fd = new FormData(transferForm.value);
    fd.append('order_id', orderId.value);

    await axios.post(`add-bank-transfer-image`, fd, config).then(res => {
        if (response(res) == "success") {
            successToast(res.data.msg);
            // getOrderDetailes();
        } else {
            errorToast(res.data.msg);
        }
        loadingImg.value = false;
    }).catch(err => {
        console.error(err);
    });
}

// Cancel Order
const cancelFunc = async () => {
    loadingImg.value = true;
    const fd = new FormData(cancelForm.value);
    fd.append('order_id', orderId.value);

    if (order.value.type == 1) {

        // الغاء طلب الارجاع
        await axios.post(`cancel-retrieval-order`, fd, config).then(res => {
            if (response(res) == "success") {
                cancelModal.value = false;
                done.value = true;
                getOrderDetailes();
            } else {
                errorToast(res.data.msg);
            }
            loadingImg.value = false;
        }).catch(err => {
            console.error(err);
        });

    } else {

        // الغاء طلب الشراء
        await axios.post(`cancel-order`, fd, config).then(res => {
            if (response(res) == "success") {
                cancelModal.value = false;
                done.value = true;
                getOrderDetailes();
            } else {
                errorToast(res.data.msg);
            }
            loadingImg.value = false;
        }).catch(err => {
            console.error(err);
        });

    }
}

// receivedFunc
const receivedFunc = async () => {
    loadingImg.value = true;
    const fd = new FormData();
    fd.append('order_id', orderId.value);

    if (order.value.type == 1) {

        // انهاء طلب الارجاع
        await axios.post(`finish-retrieval-order`, fd, config).then(res => {
            if (response(res) == "success") {
                successToast(res.data.msg);
                getOrderDetailes();
            } else {
                errorToast(res.data.msg);
            }
            loadingImg.value = false;
        }).catch(err => {
            console.error(err);
        });

    } else {

        // انهاء طلب الشراء
        await axios.post(`finish-order`, fd, config).then(res => {
            if (response(res) == "success") {
                successToast(res.data.msg);
                getOrderDetailes();
            } else {
                errorToast(res.data.msg);
            }
            loadingImg.value = false;
        }).catch(err => {
            console.error(err);
        });

    }
}

// check if returnedQuantity more than orderQuantity
const checkReturnedQuantity = () => {

    // all quantity in order
    const allQuantity = orderProducts.value.map(product => product.quantity);

    // all retrieved quantity in order
    const allRetrievedQuantity = orderProducts.value.map(product => product.retrieved_quantity);

    // Sum of all quantity
    const allQuantitySum = allQuantity.reduce((a, b) => a + b, 0);

    // Sum of all retrieved quantity
    const allRetrievedQuantitySum = allRetrievedQuantity.reduce((a, b) => a + b, 0);

    return allRetrievedQuantitySum > allQuantitySum ? false : true;
};


/******************* Computed *******************/
const orderId = computed(() => {
    return route.params.id
});

// check if returnedQuantity more than orderQuantity
// const checkReturnedQuantity = computed(() => {
//     return (returnedQuantity.value > orderQuantity.value) ? true : false
// });

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getOrderDetailes(true);
    await getReasons();
});

/******************* Required Auth *******************/
definePageMeta({
    middleware: ['auth'],
  requierdAuth: true
});

</script>

<style lang="scss"></style>