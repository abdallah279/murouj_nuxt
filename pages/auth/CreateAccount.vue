<template>
    <main class="login main-padding">
        <div class="container">
            <PageHeader :title="$t('pagesTitle.createAccount')" margin="mb-5" />

            <form action="" ref="signUpForm" @submit.prevent="signUp">

                <!-- Photo -->
                <div class="input-g mb-5">
                    <div class="user-photo-con">
                        <div class="user-img">
                            <div class="profile-img">
                                <img  loading="lazy" :src="image" class="img" alt="image">
                            </div>
                            <input type="file" name="image" @change="uploadImage" id="profileImg" accept="image/*"
                                class="hidden-input validInputs">
                            <label for="profileImg" class="user-camera">
                                <i class="pi pi-images"></i>
                            </label>
                        </div>

                    </div>
                </div>

                <div class="row align-items-center position-relative">
                    <div class="col-lg-6">

                        <div class="input-g">
                            <div class="main-input">
                                <input type="number" class="input-me validInputs" valid="phone" name="phone" v-model="phone"
                                    :placeholder="$t('loginForm.phone.placeholder')">

                                <Dropdown v-model="selectedCountry" :options="countries" optionLabel="name"
                                    class="main-icon selectedCountry">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value" class="selected">
                                            <img  loading="lazy" v-if="slotProps.value.image" :alt="slotProps.value.label"
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
                                            <img  loading="lazy" v-if="slotProps.option.image" :alt="slotProps.option.number"
                                                class="option-img" :src="slotProps.option.image" />
                                            <div>
                                                {{ slotProps.option.key }}
                                            </div>
                                        </div>
                                    </template>
                                </Dropdown>
                            </div>
                        </div>

                        <div class="input-g">
                            <div class="main-input">
                                <input type="text" class="input-me validInputs" name="name" v-model="name"
                                    :placeholder="$t('createAccountForm.name.placeholder')">
                            </div>
                        </div>

                        <div class="input-g">
                            <div class="main-input">
                                <input type="email" class="input-me validInputs" name="email" v-model="email"
                                    :placeholder="$t('createAccountForm.email.placeholder')">
                            </div>
                        </div>

                        <div class="input-g">
                            <div class="main-input">

                                <Dropdown v-model="country" @change="getCities"
                                    :placeholder="$t('createAccountForm.country.placeholder')" :options="countries"
                                    optionLabel="name" class="input-me">
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

                        <div class="input-g">
                            <div class="main-input">

                                <Dropdown v-model="city" :placeholder="$t('createAccountForm.city.placeholder')"
                                    :options="cities" optionLabel="name" class="input-me">
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
                                <input type="password" class="input-me validInputs" name="password" v-model="password"
                                    :placeholder="$t('createAccountForm.password.placeholder')">
                                <i class="pi pi-eye main-icon ic" @click="togglePassword"></i>
                            </div>
                        </div>

                        <div class="input-g">
                            <div class="main-input">
                                <input type="password" class="input-me" v-model="confirmPassword" name="confirmPassword"
                                    :placeholder="$t('createAccountForm.confirmPassword.placeholder')">
                                <i class="pi pi-eye main-icon ic" @click="togglePassword"></i>
                            </div>
                        </div>

                        <div class="input-g">
                            <div class="check-box form-check-m">
                                <input type="checkbox" name="terms" id="conditions" v-model="terms">
                                <label class="check" for="conditions"></label>
                                <label class="check-anchor fs13 c-light2" for="conditions">
                                    {{ $t('createAccountForm.agree') }}
                                    <NuxtLink to="/terms" @click="saveData" class="text-decoration-underline c-main">
                                        {{ $t('createAccountForm.terms') }}
                                    </NuxtLink>
                                </label>
                            </div>
                        </div>

                        <button type="submit" class="main-btn mt-4 w-100 up up-xl" :disabled="loading">
                            {{ $t('formBtns.create') }}
                            <span class="spinner-border spinner-border-sm" v-if="loading" role="status"
                                aria-hidden="true"></span>
                        </button>

                        <div class="create-acc mt-3 text-center c-light2">
                            {{ $t('createAccountForm.haveAccount') }}
                            <NuxtLink to="/auth/Login" class="link text-decoration-underline c-main">
                                {{ $t('createAccountForm.login') }}
                            </NuxtLink>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <img  loading="lazy" src="@/assets/imgs/login_logo.png" alt="image" class="login_logo res d-block mx-auto">
                    </div>
                </div>
            </form>
        </div>
    </main>
</template>

<script setup>
/******************* Import *******************/

/******************* Plugins *******************/
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
import proImage from "@/assets/imgs/profile.png";

// Store
const store = useAuthStore();
const { signUpData } = storeToRefs(store);
const { signUpHandler , signUpHandlerData} = store;

const router = useRouter();

const signUpForm = ref(null);
const loading = ref(false);

const image = ref(proImage);
const name = ref('');
const phone = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const terms = ref(false);
const errors = ref([]);
const country = ref('');
const city = ref('');

// countries
const selectedCountry = ref({});

const countries = ref([]);

const cities = ref([]);

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// uploadImage Function
function uploadImage(e) {
    const userImage = e.target.files[0];
    const reader = new FileReader();
    if (userImage) {
        reader.readAsDataURL(userImage);
        reader.onload = e => {
            image.value = e.target.result;
        };
    } else {
        image.value = proImage;
    }
}

// togglePassword
const togglePassword = (e) => {
    let icon = e.currentTarget;
    let input = icon.closest('.main-input').querySelector('input');
    input.type === 'password' ? input.setAttribute('type', 'text') : input.setAttribute('type', 'password');
    icon.classList.contains('pi-eye') ? icon.classList.replace('pi-eye', 'pi-eye-slash') : icon.classList.replace('pi-eye-slash', 'pi-eye');
}

// Get All countries
const getCountries = async () => {
    await axios.get('countries').then(res => {
        if (response(res) == "success") {
            countries.value = res.data.data;
            selectedCountry.value = countries.value[0];
        }
    }).catch(err => console.log(err));
}

// Get All Cities
const getCities = async () => {
    // cities.value = [];
    city.value = '';
    await axios.get(`country/${country.value.id}/cities`).then(res => {
        if (response(res) == "success") {
            cities.value = res.data.data;
        }
    }).catch(err => console.log(err));
}

// Validation Function
function validate() {
    let allInputs = document.querySelectorAll('.validInputs');
    for (let i = 0; i < allInputs.length; i++) {
        if (allInputs[i].value === '') {
            errors.value.push(t(`validation.${allInputs[i].name}`));
        }
    }

    if (password.value !== confirmPassword.value) {
        errors.value.push(t(`validation.confirmPassword`));
    }

    if (!terms.value) {
        errors.value.push(t(`validation.conditions`));
    }
}

// signUp Function
const signUp = async () => {
    const fd = new FormData(signUpForm.value);
    fd.append('country_code', selectedCountry.value.key);
    fd.append('country_id', country.value.id);
    fd.append('city_id', city.value.id);

    validate();
    
    if (errors.value.length) {
        errorToast(errors.value[0]);
        loading.value = false;
        errors.value = [];
    } else {
        loading.value = true;

        // Get Returned Data From Store
        const res = await signUpHandler(fd);
        res.status == "success" ? successToast(res.msg) : errorToast(res.msg);

        loading.value = false;
    }
}

// saveData
const saveData = () => {
    const fd = {
        image: image.value,
        name: name.value,
        phone: phone.value,
        country_code: selectedCountry.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
        country: country.value,
        city: city.value
    };

    signUpHandlerData(fd);
}

// getSavedData from Pinia
const getSavedData = async () => {
    if(signUpData.value){
        // signUpData.value.image ? image.value = signUpData.value.image : image.value = proImage;
        name.value = signUpData.value.name;
        phone.value = signUpData.value.phone;
        signUpData.value.country_code ? selectedCountry.value = signUpData.value.country_code : '';
        email.value = signUpData.value.email;
        password.value = signUpData.value.password;
        confirmPassword.value = signUpData.value.confirmPassword;
        country.value = signUpData.value.country;
        country.value ? await getCities() : '';
        city.value = signUpData.value.city;
    }
}


/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getCountries();
    getSavedData();
});
</script>

<style></style>