<template>
    <main class="codeAccount main-padding">
        <div class="container">
            <ClientOnly>
                <PageHeader :title="$t('sectionTitle.verificationCode')" margin="mb-5" :desc="$t('sectionDesc.codeForm')" />
            </ClientOnly>

            <div class="row justify-content-center">
                <div class="col-lg-6">

                    <form action="" @submit.prevent="verificationCode">

                        <v-otp-input ref="otpInput" dir="ltr" v-model:value="bindModal" class="justify-content-center mb-4"
                            input-classes="otp-input" separator="" :num-inputs="6" :should-auto-focus="true"
                            input-type="letter-numeric" />

                        <div class="d-flex gap-1 justify-content-center c-light">
                            {{ $t('codeForm.text') }}
                            <button type="button" :disabled="disabledBtn" @click="resendCode"
                                class="bg-transparent d-block text-decoration-underline c-main">
                                {{ $t('formBtns.receiveCode') }}
                            </button>
                        </div>
                        
                        <div class="mt-3 text-center">{{ counterText }}</div>

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

// counter
const counterNum = ref(60);
const counterText = ref('');

// disabledBtn
const disabledBtn = ref(false);

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

const verificationCode = async () => {
    loading.value = true;
    const fd = new FormData();

    fd.append('code', bindModal.value);
    fd.append('phone', user.value.phone);
    fd.append('country_code', user.value.country_code);
    fd.append('device_id', notificationToken.value);
    fd.append('device_type', 'web');

    // Get Returned Data From Store
    const res = await verificationHandler(fd);
    res.status == "success" ? successToast(res.msg) : errorToast(res.msg);

    loading.value = false;

}

// resendCode Function
const resendCode = async () => {
    disabledBtn.value = true;
    await axios.get(`resend-code?country_code=${user.value.country_code}&phone=${user.value.phone}`).then(res => {
        if (response(res) == "success") {
            successToast(res.data.msg);
            counterNum.value = 60;
            codeCounter();
        } else {
            errorToast(res.data.msg);
        }
    }).catch(err => console.log(err));
}

let counter;
function codeCounter() {
    disabledBtn.value = true;

    counter = setInterval(function () {
        counterNum.value--;
        if (counterNum.value < 60) {
            counterText.value = `${counterNum.value} : 00`;
        }

        if (counterNum.value > 60) {
            counterText.value = `00 : ${counterNum.value}`;
        }

        if (counterNum.value < 10) {
            counterText.value = `0${counterNum.value} : 00`;
        }

        if (counterNum.value == 0) {
            clearInterval(counter);
            disabledBtn.value = false;
        }
    }, 1000);
}


/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(() => {
    codeCounter();
});

</script>

<style lang="scss"></style>