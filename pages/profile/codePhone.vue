<template>
    <main class="CodePage main-padding">
        <div class="container">
            <PageHeader :title="$t('sectionTitle.verificationCode')" :logo="true" :src="codeImg" margin="mb-4"
                :desc="$t('sectionDesc.codeForm')" />

            <div class="row justify-content-center">
                <div class="col-lg-6">
                    <form action="" @submit.prevent="verificationCode">

                        <div class="d-flex gap-1 justify-content-center c-black ff-d mb-4">
                            {{ newPhone }}
                            <NuxtLink to="/profile/newPhone"
                                class="bg-transparent d-block text-decoration-underline c-main">
                                {{ $t('formBtns.editBtn') }}
                            </NuxtLink>
                        </div>

                        <v-otp-input ref="otpInput" dir="ltr" v-model:value="bindModal" class="justify-content-center mb-4"
                            input-classes="otp-input" separator="" :num-inputs="6" :should-auto-focus="true"
                            input-type="letter-numeric" />

                        <div class="d-flex gap-1 justify-content-center c-light">
                            {{ $t('codeForm.text') }}
                            <button type="button" @click="resendCode"
                                class="bg-transparent d-block text-decoration-underline c-main">
                                {{ $t('formBtns.receiveCode') }}
                            </button>
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

    <!-- Done Modal -->
    <Dialog id="done" class="xl" v-model:visible="done" modal>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <div class="right_sec">
                    <img src="@/assets/imgs/right_img.gif" alt="" class="right_img mx-auto">
                    <p class="fs14 c-black text-center mb-4">{{ $t('modals.done.changePhone') }}</p>
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

// OTP
import VOtpInput from "vue3-otp-input";

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
const { token, user , newPhone} = storeToRefs(store);

import codeImg from '@/assets/imgs/code.png';

const loading = ref(false);

const bindModal = ref("");
// Modal
const done = ref(false);

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// config
const config = {
    headers: { Authorization: `Bearer ${token.value}` }
};

// newPhone Function
const verificationCode = async () => {
    loading.value = true;
    const fd = new FormData();
    fd.append('code', bindModal.value);

    await axios.post("change-phone-check-code", fd, config).then(res => {
        if (response(res) == "success") {
            done.value = true;
            newPhone.value = null
        } else {
            errorToast(res.data.msg)
        }
        loading.value = false;
    }).catch(err => console.log(err));
}

// resendCode Function
const resendCode = async () => {
    await axios.get(`resend-code?country_code=${user.value.country_code}&phone=${user.value.phone}`).then(res => {
        if (response(res) == "success") {
            successToast(res.data.msg);
        } else {
            errorToast(res.data.msg);
        }
    }).catch(err => console.log(err));
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

/******************* Required Auth *******************/
definePageMeta({
  middleware: 'auth'
});

</script>

<style></style>