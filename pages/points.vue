<template>
    <main class="points_page main-padding">
        <div class="container">
            <PageHeader :title="$t('pagesTitle.points')" margin="mb-5" />

            <div class="row">
                <div class="col-xl-10 mx-auto">

                    <div class="row gy-5" v-if="!loading">
                        <div class="col-lg-5">
                            <div class="gradient_box">
                                <h2 class="text">{{ $t('points.title') }}</h2>
                                <div class="num">{{ points }}</div>
                                <div class="text">{{ $t('points.point') }}</div>
                            </div>
                            <p class="fs15 c-blue mt-3 ff-d text-center">
                                {{ $t('points.all') }} {{ loyalty_points_count }} {{ $t('points.text') }} {{
                                    loyalty_points_balance }} {{ $t('nav.currency') }}
                            </p>
                            <button class="main-btn up up-xl rounded-2 w-100 lg fs14 mt-3" @click="loyaltyToBalance">
                                {{ $t('points.convertBtn') }}
                                <span class="spinner-border spinner-border-sm" v-if="loadingCharge" role="status"
                                    aria-hidden="true"></span>
                            </button>
                        </div>
                        <div class="col-lg-7">
                            <img :src="pointsImg" class="wallet_img" alt="">
                        </div>
                    </div>

                    <!--********** Skeleton **********-->
                    <div class="row gy-5" v-if="loading">
                        <div class="col-lg-5">
                            <Skeleton width="100%" height="15rem" class="mb-3"></Skeleton>
                            <Skeleton width="100%" class="mb-3"></Skeleton>
                            <Skeleton width="100%" height="3.2rem"></Skeleton>
                        </div>
                        <div class="col-lg-7">
                            <Skeleton width="100%" height="21.3rem" class="mb-3"></Skeleton>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </main>
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

const pointsImg = ref(pointIMage);
const points = ref(0);
const loyalty_points_count = ref(0);
const loyalty_points_balance = ref(0);

// Loading
const loading = ref(false);
const loadingCharge = ref(false);

// config
const config = {
    headers: { Authorization: `Bearer ${token.value}` }
};


/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// points Data
const pointsData = async () => {
    loading.value = true;
    await axios.get('loyalty-points', config).then(res => {
        if (response(res) == "success") {
            points.value = res.data.data.loyalty_points;
            loyalty_points_count.value = res.data.data.loyalty_points_count;
            loyalty_points_balance.value = res.data.data.loyalty_points_balance;
            pointsImg.value = res.data.data.loyalty_image;
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}

// Convert Loyalty To Balance
const loyaltyToBalance = async () => {
    loadingCharge.value = true;
    await axios.get('loyalty-points-to-balance', config).then(res => {
        if (response(res) == "success") {
            successToast(res.data.msg);
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
    await pointsData();
});

/******************* Required Auth *******************/
definePageMeta({
  middleware: 'auth'
});

</script>

<style lang="scss"></style>