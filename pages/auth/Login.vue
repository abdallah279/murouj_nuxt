<template>
    <main class="login main-padding">
        <div class="container">
            <PageHeader :title="$t('sectionTitle.login')" margin="mb-5" />

            <div class="row align-items-center position-relative">

                <div class="col-lg-6">
                    <form action="" ref="loginForm" @submit.prevent="login">
                        <h3 class="form-title mb-2">{{ $t('loginForm.customers') }}</h3>
                        <p class="form-info mb-4">{{ $t('loginForm.signAddress') }}</p>
                        <div class="input-g">
                            <div class="main-input">
                                <input type="number" class="input-me validInputs" valid="phone" name="phone"
                                    v-model="account" :placeholder="$t('loginForm.phone.placeholder')">

                                <Dropdown v-model="selectedCountry" :options="countries" optionLabel="name"
                                    class="main-icon selectedCountry">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value" class="selected">
                                            <img v-if="slotProps.value.image" :alt="slotProps.value.label"
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
                                            <img v-if="slotProps.option.image" alt=""
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
                                <input :type="passwordType" class="input-me validInputs" valid="password" name="password"
                                    v-model="password" :placeholder="$t('loginForm.password.placeholder')">
                                <i class="pi main-icon ic" :class="classPassword" @click="togglePassword"></i>
                            </div>
                        </div>

                        <div class="form-pass ">
                            <NuxtLink to="/auth/ForgetPassword" class="link h-main">
                                {{ $t('loginForm.forgetPassword') }}
                            </NuxtLink>
                        </div>

                        <div class="buttons mt-4 justify-content-center">
                            <button type="submit" class="main-btn up lg" :disabled="loading">
                                {{ $t('formBtns.login') }}
                                <span class="spinner-border spinner-border-sm" v-if="loading" role="status"
                                    aria-hidden="true"></span>
                            </button>
                        </div>

                        <div class="mt-3 text-center">
                            {{ $t('loginForm.haveAccount') }}
                        </div>

                        <div class="buttons mt-3 justify-content-center">
                            <NuxtLink to="/auth/CreateAccount" class="main-btn transparent lg">
                                {{ $t('loginForm.createAccount') }}
                            </NuxtLink>
                        </div>
                    </form>
                </div>

                <div class="col-lg-6">
                    <img src="@/assets/imgs/login_logo.png" alt="" class="login_logo res d-block mx-auto">
                </div>

            </div>

        </div>
    </main>
</template>

<script setup>
/******************* Plugins *******************/
import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });

// success response
const { response } = responseApi();

// Toast
const { successToast, errorToast } = toastMsg();

// Axios
const axios = useApi();

/*************** DATA **************** */

// Store
const store = useAuthStore();
const { signInHandler } = store;
const { notificationToken } = storeToRefs(store);

// Router
const router = useRouter();

const account = ref('');
const loginForm = ref(null);
const password = ref('');
const passwordType = ref('password');
const loading = ref(false);
const errors = ref([]);

// countries
const selectedCountry = ref({})
const countries = ref([]);

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// togglePassword
const togglePassword = () => {
    passwordType.value = passwordType.value === 'password' ? 'text' : 'password';
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

// validation Function
function validate() {
    let allInputs = document.querySelectorAll('.validInputs');
    for (let i = 0; i < allInputs.length; i++) {
        if (allInputs[i].value === '') {
            errors.value.push(t(`validation.${allInputs[i].getAttribute('valid')}`));
        }
    }
}

// login Function
const login = async () => {
    loading.value = true;
    const fd = new FormData(loginForm.value);
    fd.append('country_code', selectedCountry.value.key);
    fd.append('device_id', notificationToken.value);
    // fd.append('device_id', 111);
    fd.append('device_type', 'web');

    validate();

    if (errors.value.length) {
        errorToast(errors.value[0]);
        loading.value = false;
        errors.value = [];
    } else {

        loading.value = true;

        // Get Returned Data From Store
        const res = await signInHandler(fd);
        res.status == "success" ? successToast(res.msg) : errorToast(res.msg);

        loading.value = false;
    }
}

/******************* Computed *******************/
const classPassword = computed(() => ({
    'pi-eye-slash': passwordType.value === 'text',
    'pi-eye': passwordType.value === 'password'
}))

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getCountries();
})
</script>

<style></style>