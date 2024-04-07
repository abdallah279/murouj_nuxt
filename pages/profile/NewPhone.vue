<template>
    <main class="password main-padding">
        <div class="container">
            <PageHeader :title="$t('sectionTitle.changePhone')" :logo="true" :src="codeImg" margin="mb-5"
                :desc="$t('sectionDesc.newPhone')" />

            <div class="row justify-content-center">
                <div class="col-lg-6">
                    <form action="" ref="newPhoneForm" @submit.prevent="newPhone">

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

                        <button type="submit" class="main-btn up lg mt-4 mx-auto" :disabled="loading">
                            <span v-if="!loading">
                                {{ $t('formBtns.changePhone') }}
                            </span>
                            <div v-if="loading">
                                {{ $t('formBtns.confirming') }}
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </div>
                        </button>

                    </form>
                </div>
            </div>
        </div>
    </main>
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

/******************* Data *******************/

// Store
const store = useAuthStore();
const { phoneHandler } = store;
const { token } = storeToRefs(store);

import codeImg from '@/assets/imgs/code.png';

const newPhoneForm = ref(null);
const phone = ref('');
const loading = ref(false);
const router = useRouter();
const errors = ref([]);

// countries
const countries = ref([]);
const selectedCountry = ref({});

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/
// Get All countries
const getCountries = async () => {
    await axios.get('countries').then(res => {
        if (response(res) == "success") {
            countries.value = res.data.data;
            selectedCountry.value = countries.value[0];
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
}

// config
const config = {
    headers: { Authorization: `Bearer ${token.value}` }
};

// newPhone Function
const newPhone = async () => {
    loading.value = true;
    const fd = new FormData(newPhoneForm.value);
    fd.append('country_code', selectedCountry.value.key);

    validate();

    if (errors.value.length) {
        errorToast(errors.value[0]);
        loading.value = false;
        errors.value = [];
    } else {

        loading.value = true;

        // Get Returned Data From Store
        const res = await phoneHandler(fd, phone.value);
        res.status == "success" ? successToast(res.msg) : errorToast(res.msg);

        loading.value = false;
    }
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getCountries();
});

/******************* Required Auth *******************/
definePageMeta({
  middleware: 'auth'
});

</script>

<style></style>