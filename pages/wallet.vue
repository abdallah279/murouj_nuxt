<template>
    <main class="about_page main-padding">
        <div class="container">
            <PageHeader :title="$t('pagesTitle.wallet')" margin="mb-5" />

            <div class="row">
                <div class="col-xl-10 mx-auto">

                    <div class="row gy-5" v-if="!loading">
                        <div class="col-lg-5">
                            <div class="gradient_box">
                                <h2 class="text">{{ $t('wallet.currentCredit') }}</h2>
                                <div class="num">{{ walletBalance }}</div>
                                <div class="text">{{ $t('wallet.currency') }}</div>
                            </div>
                            <button class="main-btn transparent rounded-2 w-100 lg fs14 mt-4" @click="wallet = true">
                                {{ $t('wallet.withdrawBtn') }}
                            </button>
                            <button class="main-btn up up-xl rounded-2 w-100 lg fs14 mt-4" @click="chargeModal = true">
                                {{ $t('wallet.addBtn') }}
                            </button>
                        </div>
                        <div class="col-lg-7">
                            <img :src="walletImg" class="wallet_img" alt="">
                        </div>
                    </div>

                    <!--********** Skeleton **********-->
                    <div class="row gy-5" v-if="loading">
                        <div class="col-lg-5">
                            <Skeleton width="100%" height="13rem" class="mb-3"></Skeleton>
                            <Skeleton width="100%" height="3.2rem" class="mb-3"></Skeleton>
                            <Skeleton width="100%" height="3.2rem"></Skeleton>
                        </div>
                        <div class="col-lg-7">
                            <Skeleton width="100%" height="21.5rem" class="mb-3"></Skeleton>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </main>

    <!-- bankAccount Modal -->
    <Dialog id="bankAccount" class="xl" v-model:visible="wallet" modal>
        <h2 class="fs17 ff-d mb-2 c-black text-center">{{ $t('modals.bankAccount.header') }}</h2>
        <p class="c-light fs13 text-center ff-m mb-4">{{ $t('modals.bankAccount.text') }}</p>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <form action="" ref="requestForm" class="modal-form" @submit.prevent="withdrawalRequest">
                    <div class="input-g">
                        <div class="main-input">
                            <input type="text" class="input-me" name="bank_account_name"
                                :placeholder="$t('modals.bankAccount.form.name')" />
                        </div>
                    </div>
                    <div class="input-g">
                        <div class="main-input">
                            <input type="text" class="input-me" name="bank_name"
                                :placeholder="$t('modals.bankAccount.form.bankName')" />
                        </div>
                    </div>
                    <div class="input-g">
                        <div class="main-input">
                            <input type="number" class="input-me" name="bank_account_number"
                                :placeholder="$t('modals.bankAccount.form.accountNum')" />
                        </div>
                    </div>
                    <div class="input-g">
                        <div class="main-input">
                            <input type="number" class="input-me" name="iban_number"
                                :placeholder="$t('modals.bankAccount.form.ibanNum')" />
                        </div>
                    </div>
                    <div class="input-g">
                        <div class="main-input">
                            <input type="number" class="input-me" name="amount"
                                :placeholder="$t('modals.bankAccount.form.amount')" />
                        </div>
                    </div>
                    <div class="buttons justify-content-center">
                        <button type="submit" class="main-btn modal_btn up">
                            {{ $t('modals.bankAccount.btn') }}
                            <span class="spinner-border spinner-border-sm" v-if="loadingCharge" role="status"
                                aria-hidden="true">
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Dialog>

    <!-- chargeWallet Modal -->
    <Dialog id="chargeModal" class="xl" v-model:visible="chargeModal" modal>
        <h2 class="fs17 ff-d mb-2 c-black text-center">{{ $t('modals.chargeModal.header') }}</h2>
        <p class="c-light fs13 text-center ff-m mb-4">{{ $t('modals.chargeModal.text') }}</p>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <form action="" ref="requestForm" class="modal-form" @submit.prevent="chargeWallet">

                    <div class="input-g">
                        <div class="main-input">
                            <input type="number" class="input-me" v-model="chargeAmount"
                                :placeholder="$t('modals.bankAccount.form.amount')" />
                        </div>
                    </div>
                    <div class="buttons justify-content-center">
                        <button type="submit" class="main-btn modal_btn up">
                            {{ $t('modals.bankAccount.btn') }}
                            <span class="spinner-border spinner-border-sm" v-if="loadingCharge" role="status"
                                aria-hidden="true">
                            </span>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    </Dialog>

    <!-- Done Modal -->
    <Dialog id="done" class="xl" :header="chargeText ? false : $t('modals.done.header')" v-model:visible="done" modal>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <div class="right_sec">
                    <img src="@/assets/imgs/right_img.gif" alt="" class="right_img mx-auto">
                    <p class="fs14 c-black text-center mb-4">{{ doneText }}</p>
                    <div class="buttons justify-content-center">
                        <NuxtLink to="/" class="main-btn modal_btn up">{{ $t('modals.done.btn') }}</NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
</template>

<script setup>
/******************* Plugins *******************/

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
const { token } = storeToRefs(store);

import pointIMage from '@/assets/imgs/wallet.png';

// Wallet Data
const walletImg = ref(pointIMage);
const walletBalance = ref(0);
const chargeAmount = ref();

// Modal
const wallet = ref(false);
const chargeModal = ref(false);
const requestForm = ref(null);
const chargeText = ref(false);
const done = ref(false);

// Loading
const loading = ref(false);
const loadingCharge = ref(false);

// doneText
const doneText = ref('');

// config
const config = {
    headers: { Authorization: `Bearer ${token.value}` }
};

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// wallet Data
const walletData = async () => {
    loading.value = true;
    await axios.get('wallet', config).then(res => {
        if (response(res) == "success") {
            walletBalance.value = res.data.data.wallet_balance;
            walletImg.value = res.data.data.wallet_image;
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}

// Charge Wallet شحن رصيد
const chargeWallet = async () => {
    loadingCharge.value = true;

    const fd = new FormData();
    fd.append('amount', chargeAmount.value);

    await axios.post(`charge-wallet`, fd, config).then(res => {
        if (response(res) == "success") {
            doneText.value = res.data.msg;
            chargeText.value = true;
            chargeModal.value = false;
            chargeAmount.value = '';
            done.value = true;
            walletData();
        } else {
            errorToast(res.data.msg);
        }
        loadingCharge.value = false;
    }).catch(err => {
        console.error(err);
    });
}

// Withdrawal Request سحب رصيد
const withdrawalRequest = async () => {
    loadingCharge.value = true;

    const fd = new FormData(requestForm.value);

    await axios.post(`withdrawal-request`, fd, config).then(res => {
        if (response(res) == "success") {
            doneText.value = res.data.msg;
            chargeText.value = false;
            wallet.value = false;
            done.value = true;
        } else {
            errorToast(res.data.msg);
        }
        loadingCharge.value = false;
    }).catch(err => {
        console.error(err);
    });
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await walletData();
});

/******************* Required Auth *******************/
definePageMeta({
  middleware: 'auth'
});

</script>

<style lang="scss"></style>