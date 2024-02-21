<template>
    <!-- Start Header -->
    <header class="page-header">
        <div class="container">
            <div class="header-content">

                <div class="dropdown">
                    <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="pi pi-globe drop-ic"></i>
                        <span class="lang drop-text">{{ $t('nav.lang') }}</span>
                    </button>

                    <ul class="dropdown-menu drop-lang">
                        <li>
                            <a href="#" class="profile-item" @click="toggleLang('ar')">العربية</a>
                        </li>
                        <li>
                            <a href="#" class="profile-item" @click="toggleLang('en')">English</a>
                        </li>
                    </ul>
                </div>

                <div class="left d-flex gap-4">

                    <button type="button" class="nav_btn" @click="countryModal = true"
                        :aria-controls="countryModal ? 'country' : null" :aria-expanded="countryModal ? true : false">
                        <i class="pi pi-map-marker"></i>
                        {{ countryLocal.name }} , {{ cityLocal.name }}
                    </button>

                    <div class="dropdown" v-if="isLoggedIn">
                        <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <img :src="user.image" alt="" class="profile_img">
                            <span class="drop-text profile">{{ user.name }}</span>
                            <i class="pi pi-angle-down drop-ic"></i>
                        </button>

                        <ul class="dropdown-menu left xl">

                            <li>
                                <NuxtLink to="/profile" class="profile-item">
                                    <div class="rSec">
                                        <div class="profile-ic">
                                            <img src="@/assets/imgs/icons/profile.png" alt="" class="ic">
                                        </div>
                                        <span class="profile-text">{{ $t('nav.profile.profile') }}</span>
                                    </div>
                                    <i class="pi pi-angle-left"></i>
                                </NuxtLink>
                            </li>

                            <li>
                                <NuxtLink to="/financial" class="profile-item">
                                    <div class="rSec">
                                        <div class="profile-ic">
                                            <img src="@/assets/imgs/icons/Financial.png" alt="" class="ic">
                                        </div>
                                        <span class="profile-text">{{ $t('nav.profile.financial') }}</span>
                                    </div>
                                    <i class="pi pi-angle-left"></i>
                                </NuxtLink>
                            </li>

                            <li>
                                <NuxtLink to="/complaints" class="profile-item">
                                    <div class="rSec">
                                        <div class="profile-ic">
                                            <img src="@/assets/imgs/icons/complaint.png" alt="" class="ic">
                                        </div>
                                        <span class="profile-text">{{ $t('nav.profile.complaints') }}</span>
                                    </div>
                                    <i class="pi pi-angle-left"></i>
                                </NuxtLink>
                            </li>

                            <li>
                                <NuxtLink to="/about" class="profile-item">
                                    <div class="rSec">
                                        <div class="profile-ic">
                                            <img src="@/assets/imgs/icons/terms.png" alt="" class="ic">
                                        </div>
                                        <span class="profile-text">{{ $t('nav.profile.about') }}</span>
                                    </div>
                                    <i class="pi pi-angle-left"></i>
                                </NuxtLink>
                            </li>

                            <li>
                                <NuxtLink to="/privacy" class="profile-item">
                                    <div class="rSec">
                                        <div class="profile-ic">
                                            <img src="@/assets/imgs/icons/about.png" alt="" class="ic">
                                        </div>
                                        <span class="profile-text">{{ $t('nav.profile.privacy') }}</span>
                                    </div>
                                    <i class="pi pi-angle-left"></i>
                                </NuxtLink>
                            </li>

                            <li>
                                <NuxtLink to="/faqs" class="profile-item">
                                    <div class="rSec">
                                        <div class="profile-ic">
                                            <img src="@/assets/imgs/icons/faqs.png" alt="" class="ic">
                                        </div>
                                        <span class="profile-text">{{ $t('nav.profile.faq') }}</span>
                                    </div>
                                    <i class="pi pi-angle-left"></i>
                                </NuxtLink>
                            </li>

                            <li>
                                <NuxtLink to="/terms" class="profile-item">
                                    <div class="rSec">
                                        <div class="profile-ic">
                                            <img src="@/assets/imgs/icons/terms.png" alt="" class="ic">
                                        </div>
                                        <span class="profile-text">{{ $t('nav.profile.terms') }}</span>
                                    </div>
                                    <i class="pi pi-angle-left"></i>
                                </NuxtLink>
                            </li>

                            <li>
                                <button class="profile-item" @click="rateModal = true">
                                    <div class="rSec">
                                        <div class="profile-ic">
                                            <img src="@/assets/imgs/icons/star.png" alt="" class="ic">
                                        </div>
                                        <span class="profile-text">{{ $t('nav.profile.rate') }}</span>
                                    </div>
                                    <i class="pi pi-angle-left"></i>
                                </button>
                            </li>

                            <li>
                                <button class="profile-item red" @click="logout">
                                    <div class="rSec">
                                        <div class="profile-ic ">
                                            <img src="@/assets/imgs/icons/logout.png" alt="" class="ic">
                                        </div>
                                        <span class="profile-text">{{ $t('nav.profile.logout') }}</span>
                                    </div>
                                </button>
                            </li>

                        </ul>
                    </div>

                    <NuxtLink to="/auth/Login" class="nav_btn" v-if="!isLoggedIn">
                        <i class="pi pi-user"></i>
                        <span class="text">{{ $t('nav.loginBtn') }}</span>
                    </NuxtLink>

                    <NuxtLink to="/cart" class="nav_btn">
                        <i class="pi pi-shopping-cart"></i>
                        <span class="text">{{ $t('nav.cart') }} <span v-if="cartTotal">- {{ cartTotal }}</span> {{ currency
                        }}</span>
                        <span class="count" v-if="cartCount">{{ cartCount }}</span>
                    </NuxtLink>

                    <NuxtLink to="/Notifications" class="nav_btn">
                        <i class="pi pi-bell"></i>
                        <span class="text">{{ $t('nav.notifications') }}</span>
                        <span class="count" v-if="notCount">{{ notCount }}</span>
                    </NuxtLink>
                </div>

            </div>
        </div>
    </header>
    <!-- End Header -->


    <!-- Start Navbar -->
    <nav class="page-navbar">
        <div class="container">
            <div class="navbar-content">

                <NuxtLink to="/" class="logo">
                    <img src="@/assets/imgs/logo.png" alt="" class="logo-img">
                </NuxtLink>

                <div class="links" :class="{ active: active }">
                    <NuxtLink to="/" class="logo">
                        <img src="@/assets/imgs/logo.png" alt="logo">
                    </NuxtLink>
                    <NuxtLink to="/" class="link">{{ $t('nav.home') }}</NuxtLink>
                    <NuxtLink to="/orders" class="link">{{ $t('nav.orders') }}</NuxtLink>
                    <NuxtLink to="/products" class="link">{{ $t('nav.products') }}</NuxtLink>
                    <NuxtLink to="/wallet" class="link">{{ $t('nav.wallet') }}</NuxtLink>
                    <NuxtLink to="/points" class="link">{{ $t('nav.points') }}</NuxtLink>
                    <NuxtLink to="/about" class="link">{{ $t('nav.about') }}</NuxtLink>
                    <NuxtLink to="/contact" class="link">{{ $t('nav.contact') }}</NuxtLink>
                </div>

                <div class="nav-icons">

                    <button class="nav_btn" @click="search = true" :aria-controls="search ? 'search' : null"
                        :aria-expanded="search ? true : false">
                        <span>{{ $t('nav.search') }}</span>
                        <i class="pi pi-search"></i>
                    </button>

                    <div class="nav-ic side-open" @click="activeFun">
                        <i class="pi pi-bars"></i>
                    </div>

                </div>


            </div>
        </div>
    </nav>
    <!-- End Navbar -->


    <!-- Start Alert -->
    <div class="alert_nav">
        <div class="container">
            <div class="text-center fs13">
                {{ $t('nav.shipping.text') }}
                <img src="@/assets/imgs/icons/smile.png" alt="" class="ic">
                {{ $t('nav.shipping.text2') }} {{ shippingCount }} {{ $t('nav.shipping.text3') }}
            </div>
        </div>
    </div>
    <!-- End Alert -->


    <!-- Search Modal -->
    <Dialog id="search" class="xl" :header="$t('modals.search.header')" v-model:visible="search" modal>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <form action="" ref="searchForm" class="modal-form" @submit.prevent="searchFunc">
                    <div class="main-input my-4">
                        <input class="input-me" name="searchText" v-model="searchText"
                            :placeholder="$t('modals.search.placeholder')" />
                        <i class="pi pi-search main-icon"></i>
                    </div>
                    <div class="buttons justify-content-center">
                        <button type="submit" class="main-btn modal_btn up">{{ $t('modals.search.header') }}</button>
                    </div>
                </form>
            </div>
        </div>
    </Dialog>


    <!-- country Modal -->
    <Dialog id="country" class="xl" :header="$t('modals.country.header')" v-model:visible="countryModal" modal>
        <div class="row">
            <div class="col-lg-10 mx-auto p-0">
                <form action="" class="modal-form" @submit.prevent="countryFunc">
                    <div class="scroll my-4">
                        <div class="radio-box d-flex-b mb-3 pb-2 pb-sm-3" v-for="(country, i) in countries"
                            :key="country.id">
                            <label :for="`country${i}`" class="label">
                                {{ country.name }}
                            </label>
                            <input type="radio" :id="`country${i}`" name="country" class="input-radio" :value="country.id"
                                v-model="countryChecked">
                        </div>
                    </div>
                    <div class="buttons justify-content-center">
                        <button type="submit" class="main-btn modal_btn up">{{ $t('modals.country.btn') }}</button>
                    </div>
                </form>
            </div>
        </div>
    </Dialog>


    <!-- City Modal -->
    <Dialog id="city" class="xl" :header="$t('modals.city.header')" v-model:visible="cityModal" modal>
        <div class="row">
            <div class="col-lg-10 mx-auto p-0">
                <form action="" class="modal-form" @submit.prevent="cityFunc" v-if="cities.length">
                    <div class="scroll my-4">
                        <div class="radio-box d-flex-b mb-3 pb-2 pb-sm-3" v-for="(city, i) in cities" :key="city.id">
                            <label :for="`city${i}`" class="label">
                                {{ city.name }}
                            </label>
                            <input type="radio" :id="`city${i}`" name="city" class="input-radio" :value="city.id"
                                v-model="cityChecked">
                        </div>
                    </div>
                    <div class="buttons justify-content-center">
                        <button type="submit" class="main-btn modal_btn up">{{ $t('modals.city.btn') }}</button>
                    </div>
                </form>

                <div class="modal-form" v-else>
                    <div class="no-data sm">
                        <img src="@/assets/imgs/no_data.avif" alt="" class="no-data-img">
                        <div class="no-data-text">{{ $t('modals.city.noData') }}</div>
                    </div>

                    <div class="buttons justify-content-center mt-4">
                        <button type="button" class="main-btn modal_btn up" @click="returnToCountry">{{
                            $t('modals.city.return') }}</button>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>


    <!-- Map Modal -->
    <ClientOnly>
        <Dialog id="map" class="xl" :header="$t('modals.location.header')" v-model:visible="mapModal" modal>
            <div class="row">
                <div class="col-lg-11 mx-auto">
                    <form action="" class="modal-form" @submit.prevent="saveLocation">
                        <GoogleMap apiKey="AIzaSyBNLoYGrbnQI_GMqHt6m0PSN9yA7Zvq7gA" :location="location" height="290px" />
                        <div class="buttons justify-content-center mt-4">
                            <button type="submit" class="main-btn modal_btn up">{{ $t('modals.location.btn') }}</button>
                        </div>
                    </form>
                </div>
            </div>
        </Dialog>
    </ClientOnly>


    <!-- Rate Modal -->
    <Dialog id="rate" class="xl" :header="$t('modals.rate.header')" v-model:visible="rateModal" modal>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <form action="" class="modal-form" @submit.prevent="rateFunc">
                    <div class="main-input my-4">
                        <textarea class="input-me text-area" name="comment" v-model="rateText"
                            :placeholder="$t('modals.rate.placeholder')">
                        </textarea>
                    </div>
                    <div class="buttons justify-content-center">
                        <button type="submit" class="main-btn modal_btn up">
                            {{ $t('modals.rate.btn') }}
                            <span class="spinner-border spinner-border-sm" v-if="loadingRate" role="status"></span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Dialog>


    <!-- Rate Done Modal -->
    <Dialog id="done" class="xl" v-model:visible="done" modal>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <div class="right_sec">
                    <img src="@/assets/imgs/right_img.gif" alt="" class="right_img mx-auto">
                    <p class="fs14 c-black text-center mb-4">{{ $t('modals.done.rateDone') }}</p>
                    <div class="buttons justify-content-center">
                        <NuxtLink to="/" class="main-btn modal_btn up">{{ $t('modals.done.btn') }}</NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>

    <div class="overlay" :class="{ active: active }" @click="activeFun"></div>
</template>

<script setup>
/******************* Plugins Or Composables *******************/

// Map
import GoogleMap from 'vue-google-maps-ui';

// Translate
import { useI18n } from 'vue-i18n';
const { locale, t } = useI18n({ useScope: 'global' });

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

// Store
const store = useAuthStore();
const globalStore = useGlobalStore();

const { logoutHandler } = store;
const { user, isLoggedIn, token } = storeToRefs(store);
const { shippingCount, cityLocal, countryLocal, countryChanged, countryID, cartChanged, lang } = storeToRefs(globalStore);

// Router
const router = useRouter();

// route
const route = useRoute();

// Active
const active = ref(false);

// Search
const search = ref(false);
const searchForm = ref(null);
const searchText = ref('');

// Cart
const cartTotal = ref(null);
const cartCount = ref(0);

// currency
const currency = ref('');

// notifications
const notCount = ref(0);

// Country
const countryModal = ref(false);
const countryChecked = ref('');
const countries = ref([]);

// city
const cityModal = ref(false);
const cityChecked = ref('');
const cities = ref([]);

// map
const mapModal = ref(false);
const location = { lat: 24.746189966314272, lng: 46.87979429238138 };

// Rate Modal
const rateModal = ref(false);
// const storeRate = ref(0);
const loadingRate = ref(false);
const rateText = ref('');
const done = ref(false);

let config = {
    headers: {
        Authorization: `Bearer ${token.value}`
    }
};

/*************** Computed *****************/

/*************** Props **************** */

/*************** Methods **************** */

// activeFun
const activeFun = () => {
    active.value = !active.value;
};

// Get All countries
const getCountries = async (getCity = false) => {
    await axios.get('countries').then(res => {
        if (response(res) == "success") {
            countries.value = res.data.data;

            if (countryChanged.value == false && getCity) {
                countryLocal.value = res.data.data[0];
                getCities(res.data.data[0].id);
                countryID.value = res.data.data[0].id;
            }
        }
    }).catch(err => console.log(err));
}

// Get All Cities
const getCities = async (countryId = countryChecked.value) => {
    await axios.get(`country/${countryId}/cities`).then(res => {
        if (response(res) == "success") {
            cities.value = res.data.data;

            if (countryChanged.value == false) {
                cityLocal.value = res.data.data[0];
            }
        }
    }).catch(err => console.log(err));
}

// Search Function
const searchFunc = async () => {
    if (searchText.value) {
        search.value = false;
        router.push({
            path: '/search',
            query: { text: searchText.value },
        });
        searchText.value = '';
    } else {
        errorToast(t(`validation.search`))
    }
}

// Rate Function
const rateFunc = () => {

    loadingRate.value = true;

    const fd = new FormData();
    fd.append('comment', rateText.value);

    axios.post('store-rates', fd, config).then(res => {
        if (response(res) == "success") {
            rateText.value = '';
            rateModal.value = false;
            done.value = true;
        } else {
            errorToast(res.data.msg);
        }
        loadingRate.value = false;
    });
}

// country Function
const countryFunc = async () => {
    await getCities();
    countryModal.value = false;
    cityModal.value = true;
}

// City Function
const cityFunc = () => {
    cityModal.value = false;
    mapModal.value = true;
}

// return To Country Function
const returnToCountry = () => {
    countryModal.value = true;
    cityModal.value = false;
}

// saveLocation
const saveLocation = (countryId = countryChecked.value, cityId = cityChecked.value) => {
    for (let i = 0; i < countries.value.length; i++) {
        if (typeof countryId == 'object') {
            countryId = countryChecked.value
        }

        if (countries.value[i].id == countryId) {
            countryLocal.value = countries.value[i];
            countryID.value = countryId;
        }
    }

    for (let i = 0; i < cities.value.length; i++) {
        if (cities.value[i].id == cityId) {
            cityLocal.value = cities.value[i];
        }
    }

    countryChanged.value = true;
    mapModal.value = false;
}

// Get Country And City Location
const getCountryAndCity = (countryId = countryLocal.value.id, cityId = cityLocal.value.id) => {
    countryChecked.value = countryId;
    cityChecked.value = cityId;
}

// toggleLang
function toggleLang(newLang) {
    lang.value = newLang;
    if (lang.value) {
        locale.value = lang.value;
        document.querySelector("html").setAttribute("lang", lang.value);
    }
}

// logout
const logout = async () => {

    // Get Returned Data From Store
    const res = await logoutHandler();
    res.status == "success" ? successToast(res.msg) : errorToast(res.msg);

}

// get notifications Count
const getNotificationsCount = async () => {

    await axios.get('count-notifications', config).then(res => {
        if ((response(res) === "unauthenticated" || response(res) === "blocked") && token.value) {
            logout();
            router.push('/');
        } else {
            notCount.value = res.data.data.count;
        }
    }).catch(err => {
        console.error(err);
    });
}

// get notifications Count
const getCartCount = async () => {

    await axios.get('main-cart-data', config).then(res => {
        if ((response(res) === "unauthenticated" || response(res) === "blocked") && token.value) {
            logout();
            router.push('/');
        } else if (response(res) === "success") {
            cartCount.value = res.data.data.count_cart_items;
            cartTotal.value = res.data.data.total;
            currency.value = res.data.data.currency;
        }
    }).catch(err => {
        console.error(err);
    });
}

/*************** Watch **************** */

watch(route, (newVal) => {
    active.value = false;
    // newVal.name == 'notifications' ? notCount.value = 0 : '';
});

// watch token To Get The New User Data
watch(token, async (newVal) => {
    if (newVal) {
        config = {
            headers: {
                Authorization: `Bearer ${newVal}`
            }
        }

        getCartCount();
        getNotificationsCount();
        await getCities(user.value.country_id);
        getCountryAndCity(user.value.country_id, user.value.city_id);
        saveLocation(user.value.country_id, user.value.city_id);
    } else {
        cartCount.value = 0;
        notCount.value = 0;
        cartTotal.value = 0;
        currency.value = '';
        getCountryAndCity();
        saveLocation();
    }
});

// watch country To Change V-Model in City And Country Modal
watch(countryLocal, async (newVal) => {
    getCountryAndCity();
});

// watch cartChanged To Get The new Data IN Cart
watch(cartChanged, async () => {
    await getCartCount();
});

watch(lang, async (newVal) => {
    await getCountries(true);

    // If User Logged In
    if (isLoggedIn.value) {
        await getCartCount();
        await getNotificationsCount();

        if (countryChanged.value == false) {
            await getCities(user.value.country_id);
            getCountryAndCity(user.value.country_id, user.value.city_id);
            saveLocation(user.value.country_id, user.value.city_id);
        } else {
            getCountryAndCity();
        }
    } else {
        getCountryAndCity();
    }
});

/*************** Mounted **************** */

onMounted(async () => {
    toggleLang(lang.value);
    await getCountries(true);

    // If User Logged In
    if (isLoggedIn.value) {
        await getCartCount();
        await getNotificationsCount();

        if (countryChanged.value == false) {
            await getCities(user.value.country_id);
            getCountryAndCity(user.value.country_id, user.value.city_id);
            saveLocation(user.value.country_id, user.value.city_id);
        } else {
            getCountryAndCity();
        }
    } else {
        getCountryAndCity();
    }

});

</script>

<style lang="scss" scoped></style>