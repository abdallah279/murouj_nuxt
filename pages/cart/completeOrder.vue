<template>
    <main class="cart_page main-padding">
        <div class="container">
            <PageHeader :title="$t('pagesTitle.completeOrder')" margin="mb-5" />

            <div class="row">
                <div class="col-xl-10 mx-auto">
                    <div class="row justify-content-between">

                        <div class="col-lg-6">
                            <form ref="confirmForm" action="" @submit.prevent="confirmOrder" id="confirmOrder">

                                <div class="input-g">
                                    <div class="main-input">

                                        <Dropdown v-model="city" :placeholder="$t('createAccountForm.city.placeholder')"
                                            :options="cities" optionLabel="name" class="input-me"
                                            @change="getDeliveryTypes(city.id)">
                                            <template #value="slotProps">
                                                <div v-if="slotProps.value" class="selected">
                                                    {{ slotProps.value.name }}
                                                </div>
                                                <span v-else>
                                                    {{ slotProps.placeholder }}
                                                </span>
                                            </template>
                                            <template #option="slotProps">
                                                <div class="option">
                                                    {{ slotProps.option.name }}
                                                </div>
                                            </template>
                                        </Dropdown>

                                        <i class="pi pi-angle-down main-icon"></i>

                                    </div>
                                </div>

                                <div class="input-g">
                                    <div class="main-input">
                                        <input type="text" @click="mapModal = true" v-model="address"
                                            :placeholder="$t('cart.form.location')" class="input-me">
                                    </div>
                                </div>

                                <div class="mb-3 ff-d c-black">{{ $t('cart.chooseWay') }}</div>

                                <label class="d-flex-between gap-4 cu-pointer p-3 mb-3 bg-light2"
                                    v-for="dtype in deliveryTypes" :key="dtype">
                                    <div class="radio-box radio_del">
                                        <input type="radio" class="input-radio main" name="delivery_type"
                                            v-model="delivery_type" :value="dtype.type">
                                            <span class="radio_box"></span>
                                        <label for="price1" class="label">
                                            {{ dtype.delegate_name }}
                                            ( {{ dtype.delivery_expected_time }} )
                                        </label>
                                    </div>
                                    <div for="price1" class="label">
                                        {{ dtype.delivery_price }} {{ summary.currency }}
                                    </div>
                                </label>

                                <div class="input-g">
                                    <div class="main-input">
                                        <textarea name="notes" :placeholder="$t('cart.form.feedback')"
                                            class="input-me text-area"></textarea>
                                    </div>
                                </div>

                                <div class="main-bb pb-3 mb-3 c-black">{{ $t('cart.choose') }}</div>

                                <div class="payment-items input-g">

                                    <div class="payment-item" v-for="(pay, i) in paymentItems" :key="pay.id">

                                        <input type="radio" name="pay_type" :value="pay.id" v-model="payment"
                                            :id="`payment${i}`" class="payment-input">
                                        <label :for="`payment${i}`" class="payment-label">

                                            <div class="right">
                                                <img loading="lazy" :src="pay.icon" alt="image" class="payment-img">
                                                <div class="content">
                                                    <div class="name">{{ pay.name }}</div>
                                                    <div class="text">{{ pay.desc }}</div>
                                                </div>
                                            </div>

                                            <div class="circle"></div>

                                        </label>

                                    </div>

                                </div>

                                <transition name="slide-fade">
                                    <div v-if="payment == 3">
                                        <div class="input-g">
                                            <div class="main-input">

                                                <Dropdown v-model="bank" :placeholder="$t('cart.form.bank')"
                                                    :options="banks" optionLabel="name" class="input-me">
                                                    <template #value="slotProps">
                                                        <div v-if="slotProps.value" class="selected">
                                                            <div>{{ slotProps.value.name }}</div>
                                                        </div>
                                                        <span v-else>
                                                            {{ slotProps.placeholder }}
                                                        </span>
                                                    </template>
                                                    <template #option="slotProps">
                                                        <div class="option">
                                                            <div>
                                                                {{ slotProps.option.name }}
                                                            </div>
                                                        </div>
                                                    </template>
                                                </Dropdown>

                                                <i class="pi pi-angle-down main-icon"></i>

                                            </div>
                                        </div>
                                    </div>
                                </transition>

                                <div class="input-g">
                                    <div class="check-box form-check-m">
                                        <input type="checkbox" name="recipient" id="recipient" v-model="recipient">
                                        <label class="check" for="recipient"></label>
                                        <label class="check-anchor fs13 c-black" for="recipient">
                                            {{ $t('cart.form.AddRecipient') }}
                                        </label>
                                    </div>
                                </div>

                                <transition name="slide-fade">
                                    <div v-if="recipient">
                                        <div class="input-g">
                                            <div class="main-input">
                                                <input type="text" class="input-me validInputs"
                                                    name="additional_recipient_name" v-model="name"
                                                    :placeholder="$t('cart.form.userName')">
                                            </div>
                                        </div>

                                        <div class="input-g">
                                            <div class="main-input">
                                                <input type="number" class="input-me validInputs"
                                                    name="additional_recipient_phone" v-model="phone"
                                                    :placeholder="$t('cart.form.phone')">

                                                <Dropdown v-model="selectedCountry" :options="countries"
                                                    optionLabel="name" class="main-icon selectedCountry">
                                                    <template #value="slotProps">
                                                        <div v-if="slotProps.value" class="selected">
                                                            <img loading="lazy" v-if="slotProps.value.image"
                                                                :alt="slotProps.value.label"
                                                                :src="slotProps.value.image" class="option-img" />
                                                            <div>{{ slotProps.value.key }}</div>
                                                            <i class="pi pi-angle-down ic"></i>
                                                        </div>
                                                        <span v-else>
                                                            {{ slotProps.placeholder }}
                                                        </span>
                                                    </template>
                                                    <template #option="slotProps">
                                                        <div class="option">
                                                            <img loading="lazy" v-if="slotProps.option.image"
                                                                :alt="slotProps.option.number" class="option-img"
                                                                :src="slotProps.option.image" />
                                                            <div>
                                                                {{ slotProps.option.key }}
                                                            </div>
                                                        </div>
                                                    </template>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>
                                </transition>

                            </form>
                        </div>

                        <div class="col-lg-4" v-if="!loading">
                            <div class="main-border rounded-1 p-3">
                                <h5 class="fs14 ff-d mb-4">{{ $t('cart.sidebar.complete') }}</h5>
                                <form action="" class="mb-4" @submit.prevent="checkCoupon">
                                    <label for="" class="mb-2">{{ $t('cart.sidebar.discountLable') }}</label>
                                    <div class="main-input discount">
                                        <input type="text" v-model='coupon'
                                            :placeholder="$t('cart.sidebar.placeholder')" class="input-me">
                                        <button type="submit" class="main-btn up blue sm">
                                            {{ $t('formBtns.confirm') }}
                                            <span class="spinner-border spinner-border-sm" v-if="loadingCoupon"
                                                role="status" aria-hidden="true"></span>
                                        </button>
                                    </div>
                                </form>
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
                                    <span class="c-blue"> {{ summary.discount_price }} {{ summary.currency
                                        }}</span>
                                </div>
                                <div class="d-flex-between main-bb pb-3 gap-2 ff-d flex-wrap mb-3">
                                    <span class="c-black">{{ $t('cart.sidebar.drivePrice') }}</span>
                                    <span class="c-blue"> {{ summary.shipping_price }} {{ summary.currency }}</span>
                                </div>

                                <div class="d-flex-between gap-2 ff-d flex-wrap mb-3">
                                    <span class="c-black">{{ $t('cart.sidebar.total') }}</span>
                                    <span class="c-blue"> {{ summary.final_total }} {{ summary.currency }}</span>
                                </div>

                                <button type="submit" form="confirmOrder"
                                    class="main-btn mt-3 w-100 shadow-sm mx-auto up">
                                    {{ $t('cart.sidebar.btn') }}
                                    <span class="spinner-border spinner-border-sm" v-if="loadingBtn" role="status"
                                        aria-hidden="true"></span>
                                </button>
                            </div>
                        </div>

                        <div class="col-lg-4" v-if="loading">
                            <div class="main-border rounded-1 p-3">
                                <Skeleton height=".7rem" width="6rem" class="mb-4"></Skeleton>
                                <div class="mb-4">
                                    <Skeleton height=".7rem" width="6rem" class="mb-2"></Skeleton>
                                    <Skeleton height="2.7rem" class="rounded-0"></Skeleton>
                                </div>
                                <div class="d-flex-between gap-2 ff-d flex-wrap mb-3" v-for="i in 5" :key="i">
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

    <!-- Address Modal -->
    <ClientOnly>
        <Dialog id="map" class="xl address" :header="$t('modals.address.header')" v-model:visible="mapModal" modal>
            <div class="modal-form position-relative">
                <div class="address_text"><i class="pi pi-map-marker"></i> {{ address }} </div>
                <GoogleMap apiKey="AIzaSyBNLoYGrbnQI_GMqHt6m0PSN9yA7Zvq7gA" language="ar" :autocomplete="true"
                    @change-address="changeAddress" height=" 360px" />
                <button type="button" @click="mapModal = false" class="main-btn modal_btn up">
                    {{ $t('modals.address.btn') }}
                </button>
            </div>
        </Dialog>
    </ClientOnly>

    <!-- Done Modal -->
    <Dialog id="done" class="xl" v-model:visible="done" modal>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <div class="right_sec">
                    <img loading="lazy" src="@/assets/imgs/right_img.gif" alt="image" class="right_img mx-auto">
                    <p class="fs14 c-black text-center mb-4">{{ $t('modals.done.orderDone') }}</p>
                    <div class="buttons justify-content-center">
                        <NuxtLink to="/" class="main-btn modal_btn up">{{ $t('modals.done.btn') }}</NuxtLink>
                        <NuxtLink :to="`/orderDetails/${order_id}`" class="main-btn modal_btn transparent">
                            {{ $t('modals.done.followBtn') }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
</template>

<script setup>
/******************* Plugins Or Composables *******************/

// Map
import GoogleMap from 'vue-google-maps-ui';

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
const { countryLocal, cityLocal, countryID, cartChanged } = storeToRefs(globalStore);

// Store
const store = useAuthStore();
const { token } = storeToRefs(store);

// Payment Icons
import buy1 from '@/assets/imgs/icons/buy1.png';
import buy2 from '@/assets/imgs/icons/buy2.png';
import buy3 from '@/assets/imgs/icons/buy3.png';
import buy4 from '@/assets/imgs/icons/buy4.png';

// confirmForm
const confirmForm = ref(null);

// City
const city = ref('');
const cities = ref([]);

// Default country
const selectedCountry = ref({});

// countries
const country = ref('');
const countries = ref([]);

// order_id
const order_id = ref('');

// Loading
const loading = ref(false);
const loadingBtn = ref(false);
const loadingCoupon = ref(false);

// Bank
const bank = ref('');
const banks = ref([]);

// PayMent
const payment = ref(0);
const paymentItems = ref([
    {
        id: 1,
        icon: buy1,
        name: t(`payment.cash.name`),
        desc: t(`payment.cash.desc`)
    },
    {
        id: 4,
        icon: buy2,
        name: t(`payment.online.name`),
        desc: t(`payment.online.desc`)
    },
    {
        id: 2,
        icon: buy3,
        name: t(`payment.wallet.name`),
        desc: t(`payment.wallet.desc`)
    },
    {
        id: 3,
        icon: buy4,
        name: t(`payment.bank.name`),
        desc: t(`payment.bank.desc`)
    },
]);

// recipient
const recipient = ref(false);

// phone
const phone = ref('');

// Name
const name = ref('');

// coupon
const coupon = ref('');

// Done Modal
const done = ref(false);

// map
const mapModal = ref(false);
const address = ref('');
const addressLat = ref('');
const addressLng = ref('');

// delivery_type
const delivery_type = ref('');
const deliveryTypes = ref({});

// current location
const currentLat = ref(null);
const currentLng = ref(null);

// summary
const summary = ref({});

// config
const config = {
    headers: { Authorization: `Bearer ${token.value}` }
};

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// changeAddress
const changeAddress = (evt) => {
    address.value = evt.address;
    addressLat.value = evt.info.geometry.location.lat();
    addressLng.value = evt.info.geometry.location.lng();
}

// Get All countries
const getCountries = async () => {
    await axios.get('countries').then(res => {
        if (response(res) == "success") {
            countries.value = res.data.data;
            for (let i = 0; i < countries.value.length; i++) {
                if (countries.value[i].id == 1) {
                    selectedCountry.value = countries.value[i];
                }
            }
        }
    }).catch(err => console.log(err));
}

// Get All Cities
const getCities = async () => {
    await axios.get(`country/${countryID.value}/cities`).then(res => {
        if (response(res) == "success") {
            cities.value = res.data.data;
            city.value = cityLocal.value;
        }
    }).catch(err => console.log(err));
}

// confirm Order
const confirmOrder = async () => {
    loadingBtn.value = true;
    const fd = new FormData(confirmForm.value);
    fd.append('country_id', countryID.value);
    fd.append('city_id', city.value.id);
    fd.append('lat', addressLat.value);
    fd.append('lng', addressLng.value);
    fd.append('map_desc', address.value);

    if (payment.value == 3) {
        fd.append('bank_id', bank.value.id);
    }

    await axios.post('orders', fd, config).then(res => {
        if (response(res) == "success") {
            order_id.value = res.data.data.order_id;
            cartChanged.value += 1;
            done.value = true;
        } else {
            errorToast(res.data.msg);
        }
        loadingBtn.value = false;

    }).catch(err => console.log(err));
}

// get Delivery Types
const getDeliveryTypes = async (cityId) => {
    await axios.get(`delivery-types?city_id=${cityId}`, config).then(res => {
        if (response(res) == "success") {
            deliveryTypes.value = res.data.data.types;
            summary.value = res.data.data.cart_summary;
        } else {
            errorToast(res.data.msg);
        }
    }).catch(err => {
        console.error(err);
    });
}

const getBanks = async () => {
    await axios.get('banks').then(res => {
        if (response(res) == "success") {
            banks.value = res.data.data;
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}

// check Coupon
const checkCoupon = async () => {
    loadingCoupon.value = true;

    const fd = new FormData();
    fd.append('coupon_num', coupon.value);
    fd.append('total_price', summary.value.final_total);

    await axios.post(`check-coupon`, fd, config).then(res => {
        if (response(res) == "success") {
            successToast(res.data.msg);
            summary.value = res.data.data;
        } else {
            errorToast(res.data.msg);
        }
        loadingCoupon.value = false;
    }).catch(err => {
        console.error(err);
    });
}

// getCurrent
const getCurrent = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        currentLat.value = position.coords.latitude;
        currentLng.value = position.coords.longitude;

        console.log(currentLat.value);
        console.log(currentLng.value);
    });
}

/******************* Computed *******************/

/******************* Watch *******************/
watch([countryID, cityLocal], async (newVal) => {
    if (newVal) {
        await getCities();
        await getDeliveryTypes(cityLocal.value.id);
    }
});

/******************* Mounted *******************/
onMounted(async () => {
    await getCountries();
    await getCities();
    await getDeliveryTypes(cityLocal.value.id);
    await getBanks();
});

/******************* Required Auth *******************/
definePageMeta({
    middleware: 'auth'
});

</script>

<style lang="scss"></style>