<template>
    <main class="codeAccount main-padding">
        <div class="container">
            <PageHeader :title="$t('sectionTitle.verificationCode')" margin="mb-5" :desc="$t('sectionDesc.codeForm')" />

            <div class="row justify-content-center">
                <div class="col-lg-6">

                    <form action="" @submit.prevent="verificationCode">

                        <v-otp-input ref="otpInput" v-model:value="bindModal" dir="ltr" class="justify-content-center mb-4"
                            input-classes="otp-input" separator="" :num-inputs="6" :should-auto-focus="true"
                            input-type="letter-numeric" />

                        <div class="d-flex gap-1 justify-content-center c-light">
                            {{ $t('codeForm.text') }}
                            <button type="button" @click="resendCode"
                                class="bg-transparent d-block text-decoration-underline c-main">
                                {{ $t('formBtns.receiveCode') }}
                            </button>
                        </div>

                        <button type="submit" class="main-btn up mx-auto lg mt-4" :disabled="loading">
                            <span v-if="!loading">
                                {{ $t('formBtns.activeCode') }}
                            </span>
                            <div v-if="loading">
                                {{ $t('formBtns.sendLoading') }}
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
import VOtpInput from "vue3-otp-input";

// success response
const { response } = responseApi();

// Toast
const { successToast, errorToast } = toastMsg();

// Axios
const axios = useApi();

// pinia store
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/stores/auth';

/******************* Data *******************/

// Store
const store = useAuthStore();
const { verificationHandler } = store;
const { user, notificationToken } = storeToRefs(store);

const loading = ref(false);
const otpInput = ref(null);
const bindModal = ref("");
const router = useRouter();

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

const verificationCode = async () => {
    loading.value = true;
    const fd = new FormData();

    fd.append('code', bindModal.value);
    fd.append('phone', user.value.phone);
    fd.append('country_code', user.value.country_code);
    // fd.append('device_id', 111);
    fd.append('device_id', notificationToken.value);
    fd.append('device_type', 'web');

    // Get Returned Data From Store
    const res = await verificationHandler(fd);
    res.status == "success" ? successToast(res.msg) : errorToast(res.msg);

    loading.value = false;

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

</script>

<style lang="scss"></style>