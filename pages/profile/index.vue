<template>
    <main class="login main-padding">
        <div class="container">
            <PageHeader :title="$t('pagesTitle.userAccount')" margin="mb-5" />

            <form action="" ref="editAccountForm" @submit.prevent="editAccount">

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

                <div class="row align-items-center position-relative gy-4">
                    <div class="col-lg-6">

                        <div class="input-g">
                            <div class="main-input">
                                <input type="text" class="input-me validInputs" name="name" v-model="name"
                                    :placeholder="$t('createAccountForm.name.placeholder')">
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

                        <div class="input-g disabled">
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

                        <div class="form-pass mb-4">
                            <NuxtLink to="/profile/changePhone" class="link c-main h-main">
                                {{ $t('createAccountForm.changePhone') }}
                            </NuxtLink>
                        </div>

                        <div class="input-g">
                            <div class="main-input">
                                <input type="email" class="input-me validInputs" name="email" v-model="email"
                                    :placeholder="$t('createAccountForm.email.placeholder')">
                            </div>
                        </div>

                        <div class="mt-5 mx-auto c-red cu-pointer w-fit" @click="deleteAcc = true">
                            {{ $t('formBtns.delete') }}
                        </div>

                        <div class="buttons mt-4 justify-content-center">
                            <button type="button" @click="passwordModal = true" class="main-btn transparent lg">
                                {{ $t('formBtns.changePass') }}
                            </button>
                        </div>

                        <button type="submit" class="main-btn mt-4 mx-auto up lg" :disabled="loading">
                            <span v-if="!loading">
                                {{ $t('formBtns.edit') }}
                            </span>
                            <div v-if="loading">
                                {{ $t('formBtns.saveLoading') }}
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </div>
                        </button>
                    </div>

                    <div class="col-lg-6">
                        <img  loading="lazy" src="@/assets/imgs/login_logo.png" alt="image" class="login_logo res d-block mx-auto">
                    </div>
                </div>
            </form>
        </div>
    </main>

    <!-- Delete Modal -->
    <Dialog id="done" class="xl" :header="$t('modals.deleteAccount.header')" v-model:visible="deleteAcc" modal>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <div class="right_sec">
                    <img  loading="lazy" src="@/assets/imgs/delete.png" alt="image" class="right_img mx-auto">
                    <p class="fs14 c-black text-center mb-4">{{ $t('modals.deleteAccount.text') }}</p>
                    <div class="buttons justify-content-center">
                        <button type="button" @click="deleteAcc = false" class="main-btn modal_btn up">
                            {{ $t('modals.deleteAccount.returnBtn') }}
                        </button>

                        <button type="button" @click="deleteAccount" class="main-btn modal_btn light"
                            :disabled="loadingDelete">
                            <span v-if="!loadingDelete">
                                {{ $t('modals.deleteAccount.deleteBtn') }}
                            </span>
                            <div v-if="loadingDelete">
                                {{ $t('formBtns.delteLoading') }}
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>

    <!-- change Password Modal -->
    <Dialog id="password" class="xl" v-model:visible="passwordModal" modal>
        <h2 class="fs15 ff-d mb-5 c-black text-center">{{ $t('formBtns.changePass') }}</h2>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <form action="" class="modal-form" ref="changePasswordForm" @submit.prevent="changePassword">
                    <div class="input-g">
                        <div class="main-input">
                            <input type="password" class="input-me validInputsPassword" name="old_password"
                                v-model="oldPassword" :placeholder="$t('changePhoneForm.currentPassword.text')" />
                            <i class="pi pi-eye main-icon ic" @click="togglePassword"></i>
                        </div>
                    </div>
                    <div class="input-g">
                        <div class="main-input">
                            <input type="password" class="input-me validInputsPassword" name="password" v-model="password"
                                :placeholder="$t('restorePasswordForm.newPassword.text')" />
                            <i class="pi pi-eye main-icon ic" @click="togglePassword"></i>
                        </div>
                    </div>
                    <div class="input-g">
                        <div class="main-input">
                            <input type="password" class="input-me validInputsPassword" name="confirmPassword"
                                v-model="confirmPassword"
                                :placeholder="$t('restorePasswordForm.confirmNewPassword.text')" />
                            <i class="pi pi-eye main-icon ic" @click="togglePassword"></i>
                        </div>
                    </div>

                    <div class="buttons justify-content-center">
                        <button type="submit" class="main-btn modal_btn up" :disabled="loading">
                            <span v-if="!loadingPass">
                                {{ $t('formBtns.save') }}
                            </span>
                            <div v-if="loadingPass">
                                {{ $t('formBtns.saveLoading') }}
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Dialog>

    <!-- Done Modal -->
    <Dialog id="done" class="xl" :header="$t('formBtns.changePass')" v-model:visible="done" modal>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <div class="right_sec">
                    <img  loading="lazy" src="@/assets/imgs/right_img.gif" alt="image" class="right_img mx-auto">
                    <p class="fs14 c-black text-center mb-4">{{ $t('modals.done.changePass') }}</p>
                    <div class="buttons justify-content-center">
                        <NuxtLink to="/" class="main-btn modal_btn up">{{ $t('modals.done.btn') }}</NuxtLink>
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

/******************* Data *******************/

// Store
const store = useAuthStore();
const globalStore = useGlobalStore();

const { profileHandler, deleteAccountHandler } = store;
const { token } = storeToRefs(store);
const { shippingCount, cityLocal, countryLocal, countryChanged, countryID } = storeToRefs(globalStore);

import proImage from "@/assets/imgs/profile.png";

// Router
const router = useRouter();

// Forms Ref
const editAccountForm = ref(null);
const changePasswordForm = ref(null);

const loading = ref(false);
const loadingPass = ref(false);
const loadingDelete = ref(false);
const errors = ref([]);

// Profile data
const image = ref(proImage);
const name = ref('');
const phone = ref('');
const email = ref('');

// Modal
const deleteAcc = ref(false);

// Change Password
const passwordModal = ref(false);
const oldPassword = ref('');
const password = ref('');
const confirmPassword = ref('');
const done = ref(false);

// Country
const country = ref(null);
const country_id = ref(null);

// City
const city = ref(null);
const city_id = ref(null);
const cities = ref([]);

// countries
const countries = ref([]);
const selectedCountry = ref({});
const country_code = ref(null);

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/
// togglePassword
const togglePassword = (e) => {
    let icon = e.currentTarget;
    let input = icon.closest('.main-input').querySelector('input');
    input.type === 'password' ? input.setAttribute('type', 'text') : input.setAttribute('type', 'password');
    icon.classList.contains('pi-eye') ? icon.classList.replace('pi-eye', 'pi-eye-slash') : icon.classList.replace('pi-eye-slash', 'pi-eye');
}

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
        image.value = require('@/assets/imgs/profile.png');
    }
}

// Validation Function
function validate() {
    let allInputs = document.querySelectorAll('.validInputsPassword');
    for (let i = 0; i < allInputs.length; i++) {
        if (allInputs[i].value === '') {
            errors.value.push(t(`validation.${allInputs[i].name}`));
        }
    }

    if (password.value !== confirmPassword.value) {
        errors.value.push(t(`validation.confirmPassword`));
    }
}

// config
const config = {
    headers: { Authorization: `Bearer ${token.value}` }
};

// Get All countries
const getCountries = async () => {
    await axios.get('countries').then(res => {
        if (response(res) == "success") {
            countries.value = res.data.data;
            // selectedCountry.value = countries.value[0];
            for (let i = 0; i < countries.value.length; i++) {
                if (countries.value[i].id == country_id.value) {
                    country.value = countries.value[i];
                }

                if(countries.value[i].key.includes(country_code.value)) {
                    selectedCountry.value = countries.value[i];
                }
            }
        }
    }).catch(err => console.log(err));
}


// Get All Cities
const getCities = async () => {
    await axios.get(`country/${country.value.id}/cities`).then(res => {
        if (response(res) == "success") {
            cities.value = res.data.data;
            city.value = null;
            for (let i = 0; i < cities.value.length; i++) {
                if (cities.value[i].id == city_id.value) {
                    city.value = cities.value[i];
                }
            }
        }
    }).catch(err => console.log(err));
}

// saveLocation
const saveLocation = (country, city) => {
    countryLocal.value = country;
    countryID.value = country.id;
    cityLocal.value = city;
}

// profile Function
const profile = async () => {
    await axios.get('profile', config).then(res => {
        image.value = res.data.data.image;
        name.value = res.data.data.name;
        phone.value = res.data.data.phone;
        email.value = res.data.data.email;
        country_id.value = res.data.data.country_id;
        city_id.value = res.data.data.city_id;
        country_code.value = res.data.data.country_code;
    }).catch(err => console.log(err));
}

// editAccount Function
const editAccount = async () => {
    loading.value = true;
    const fd = new FormData(editAccountForm.value);
    fd.append('country_code', selectedCountry.value.key);
    fd.append('country_id', country.value.id);

    if (city.value) {
        fd.append('city_id', city.value.id);
    }

    loading.value = true;

    // Get Returned Data From Store
    const res = await profileHandler(fd);

    if (res.status == "success") {
        successToast(res.msg);
        saveLocation(country.value, city.value);
    } else {
        errorToast(res.msg);
    }

    loading.value = false;

}

// Delete Account
const deleteAccount = async () => {
    loadingDelete.value = true;

    // Get Returned Data From Store
    const res = await deleteAccountHandler();

    if(res.status == "success"){
        router.push('/');
        successToast(res.msg)
    } else{
        errorToast(res.msg)
    }

    loadingDelete.value = false;
}

// changePassword
const changePassword = async () => {
    loadingPass.value = true;
    const fd = new FormData(changePasswordForm.value);

    validate();

    if (errors.value.length) {
        errorToast(errors.value[0]);
        loadingPass.value = false;
        errors.value = [];
    } else {
        await axios.post('update-passward?_method=patch', fd, config).then(res => {
            if (response(res) == "success") {

                passwordModal.value = false;
                done.value = true;
                oldPassword.value = '';
                password.value = '';
                confirmPassword.value = '';

            } else {
                errorToast(res.data.msg);
            }
            loadingPass.value = false;
        }).catch(err => console.log(err));
    }
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await profile();
    await getCountries();
    if (country.value.id) {
        await getCities();
    }
});

/******************* Required Auth *******************/
definePageMeta({
    middleware: ['auth'],
  requierdAuth: true
});

</script>

<style></style>