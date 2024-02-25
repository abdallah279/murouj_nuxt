<template>
    <section class="subscribe_mail">
        <div class="top py-4">
            <div class="container">
                <h1 class="fs15 mb-4 text-center c-white">{{ $t('subscribeMail.header') }}</h1>
                <div class="row">
                    <div class="col-xl-6 col-lg-8 mx-auto">
                        <form action="" class="footer-form" ref="emailForm" @submit.prevent="addMail">
                            <div class="main-input">
                                <input type="text" class="input-me" name="email" v-model="email"
                                    :placeholder="$t('footer.joinPlaceholder')" />
                            </div>
                            <button type="submit" class="main-btn up">
                                {{ $t('formBtns.send') }}
                                <span class="spinner-border spinner-border-sm" v-if="loading" role="status"
                                    aria-hidden="true"></span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="bottom">
            <div class="container">
                <div class="contact_items">

                    <div class="contact_item">
                        <div class="icon">
                            <i class="pi pi-map-marker"></i>
                        </div>
                        <div class="info">
                            <h5 class="name">{{ $t('subscribeMail.contactItems.location') }}</h5>
                            <p class="text">{{ $t('subscribeMail.contactItems.address') }}</p>
                        </div>
                    </div>

                    <div class="contact_item">
                        <div class="icon">
                            <i class="pi pi-phone"></i>
                        </div>
                        <div class="info">
                            <h5 class="name">{{ $t('subscribeMail.contactItems.phone') }}</h5>
                            <a :href="`tel:${contact_data.phone}`" target="_blank" class="text">{{ contact_data.phone }}</a>
                        </div>
                    </div>

                    <div class="contact_item">
                        <div class="icon">
                            <i class="pi pi-envelope"></i>
                        </div>
                        <div class="info">
                            <h5 class="name">{{ $t('subscribeMail.contactItems.mail') }}</h5>
                            <a :href="`mailto:${contact_data.email}`" target="_blank" class="text">{{ contact_data.email
                            }}</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>


    <footer class="footer">
        <div class="container">
            <div class="row footer-cards gy-4">
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="foot-content">
                        <h3 class="footer-head mb-4">{{ $t('footer.storeName') }}</h3>
                        <p class="footer-info">{{ about }}</p>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 col-12">
                    <div class="foot-content">
                        <h3 class="footer-head mb-4">{{ $t('footer.quickLinks') }}</h3>
                        <div class="footer-links">
                            <NuxtLink to="/" class="link">{{ $t('footer.home') }}</NuxtLink>
                            <NuxtLink to="/cart" class="link">{{ $t('footer.cart') }}</NuxtLink>
                            <NuxtLink to="/orders" class="link">{{ $t('footer.orders') }}</NuxtLink>
                            <NuxtLink to="/favorites" class="link">{{ $t('footer.fav') }}</NuxtLink>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 col-12">
                    <div class="foot-content">
                        <h3 class="footer-head mb-4">{{ $t('footer.helpCenter') }}</h3>
                        <div class="footer-links">
                            <NuxtLink to="/contact" class="link">{{ $t('footer.contact') }}</NuxtLink>
                            <NuxtLink to="/terms" class="link">{{ $t('footer.terms') }}</NuxtLink>
                            <NuxtLink to="/complaints" class="link">{{ $t('footer.suggestions') }}</NuxtLink>
                            <NuxtLink to="/faqs" class="link">{{ $t('footer.faqs') }}</NuxtLink>
                        </div>
                    </div>
                </div>

                <div class="col-lg-2 col-md-6 col-12">
                    <div class="foot-content">
                        <h3 class="footer-head mb-4">{{ $t('footer.download') }}</h3>
                        <div class="footer-links">
                            <a :href="android_link" target="_blank"  class="link mb-3" aria-label="Android Link">
                                <img  loading="lazy" src="@/assets/imgs/google.png" class="app-link" alt="image">
                            </a>
                            <a :href="apple_link" target="_blank"  class="link mb-3" aria-label="Apple Link">
                                <img  loading="lazy" src="@/assets/imgs/app.png" class="app-link" alt="image">
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </footer>

    <section class="copy_sec py-3">
        <div class="container">
            <div class="content">
                <NuxtLink to="/" aria-label="route to home">
                    <img  loading="lazy" src="@/assets/imgs/logo.png" class="logo" alt="image">
                </NuxtLink>

                <div class="center">
                    <div class="social-icons mb-3 justify-content-center">
                        <a :href="social.link" :title="`${social.name} Link`" class="social-ic" target="_blank" v-for="social in socials" :key="social.id">
                            <img  loading="lazy" :src="social.icon" class="ic" alt="image" />
                        </a>
                    </div>

                    <div class="text">{{ $t('footer.rightsReserved') }} {{ fullYear }}</div>
                </div>

                <div class="buy_imgs">
                    <img  loading="lazy" :src="img.icon" v-for="img in buy_imgs" :key="img.id" alt="image" class="buy_img">
                </div>

            </div>
        </div>
    </section>
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

/******************* Data *******************/

// Subscribe Email
const emailForm = ref(null);
const email = ref("");

// loading
const loading = ref(false);

// about
const about = ref('');

// socials
const socials = ref([]);

// contact_data
const contact_data = ref({});

// app links
const android_link = ref('');
const apple_link = ref('');

// fullYear
const fullYear = ref(new Date().getFullYear(2001));

import buy_img1 from '~/assets/imgs/mada.png';
import buy_img2 from '~/assets/imgs/visa.png';
import buy_img3 from '~/assets/imgs/mastercard.png';

// socials
const buy_imgs = ref([
    {
        id: 1,
        icon: buy_img1,
    },
    {
        id: 2,
        icon: buy_img2,
    },
    {
        id: 3,
        icon: buy_img3,
    }
]);


/******************* Props And Inject *******************/

/******************* Methods *******************/
// getSocials
const getSocials = async () => {
    await axios.get(`socials/${countryID.value}`).then(res => {
        if (response(res) == "success") {
            socials.value = res.data.data.socials;
            contact_data.value = res.data.data.contact_data;
            android_link.value = res.data.data.android_link;
            apple_link.value = res.data.data.apple_link;
        }
    }).catch(err => {
        console.error(err)
    });
}

// getAbout
const getAbout = async () => {
    await axios.get(`about/${countryID.value}`).then(res => {
        if (response(res) == "success") {
            about.value = res.data.data;
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}

// // validateEmail
function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true
    } else {
        return false
    }
}

// // addMail
const addMail = async () => {
    const fd = new FormData(emailForm.value);

    if (validateEmail(email.value)) {
        loading.value = true;
        await axios.post('subscribe', fd).then(res => {
            if (response(res) == "success") {
                successToast(res.data.msg);
                email.value = '';
            } else {
                errorToast(res.data.msg);
            }
            loading.value = false;
        }).catch(err => console.log(err));
    } else {
        errorToast(t(`validation.email`));
    }
}

/******************* Computed *******************/
// countryID 
const countryID = computed(() => {
    return '1'
    // return localStorage.getItem('country') ? JSON.parse(localStorage.getItem('country')).id : '1'
});

// /******************* Watch *******************/

// /******************* Mounted *******************/
onMounted(async () => {
    await getSocials();
    await getAbout();
});
</script>

<style scoped></style>