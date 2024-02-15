<template>
    <main class="about_page main-padding">
        <div class="container">
            <PageHeader :title="$t('pagesTitle.financial')" margin="mb-5" />

            <div class="row">
                <div class="col-xxl-9 col-xl-10 mx-auto">

                    <div v-if="!loading">
                        <div class="row gy-4" v-if="financialItems.length">
                            <div class="col-lg-6" v-for="item in financialItems" :key="item.bank_account_number">

                                <div class="financial_item">

                                    <div class="icon">
                                        <font-awesome-icon :icon="['fas', 'building-columns']" />
                                    </div>
                                    <div class="left">
                                        <div class="name ff-d">{{ item.name }}</div>
                                        <div class="d-flex gap-3 align-items-center mb-2">
                                            <span class="c-dark3">{{ $t('bank.name') }} :</span>
                                            <span class="c-dark3">{{ item.bank_account_number }}</span>
                                        </div>
                                        <div class="d-flex gap-3 align-items-center mb-2">
                                            <span class="c-dark3 flex-shrink-0">{{ $t('bank.iban') }} :</span>
                                            <span class="c-dark3 text-break iban">{{ item.iban_number }}</span>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div class="no-data" v-else>
                            <img src="@/assets/imgs/no_data.avif" alt="" class="no-data-img">
                            <div class="no-data-text">{{ $t('noData.bank') }}</div>
                        </div>
                    </div>

                    <div v-if="loading">
                        <div class="row gy-4">
                            <div class="col-lg-6" v-for="i in 3" :key="i">
                                <div class="financial_item">

                                    <Skeleton shape="circle" size="4rem"></Skeleton>
                                    <div class="left">
                                        <Skeleton width="8rem" height=".7rem" class="mb-4"></Skeleton>
                                        <div class="d-flex gap-3 align-items-center mb-2">
                                            <Skeleton width="8rem" height=".6rem" class="mb-2"></Skeleton>
                                            <Skeleton width="8rem" height=".6rem" class="mb-2"></Skeleton>
                                        </div>
                                        <div class="d-flex gap-3 align-items-center mb-2">
                                            <Skeleton width="8rem" height=".6rem" class="mb-2"></Skeleton>
                                            <Skeleton width="8rem" height=".6rem" class="mb-2"></Skeleton>
                                        </div>
                                    </div>

                                </div>
                            </div>
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

// Axios
const axios = useApi();

/******************* Data *******************/

// financialItems
const financialItems = ref([]);

// Loading
const loading = ref(true);

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/
const getBanks = async () => {
    await axios.get('banks').then(res => {
        if (response(res) == "success") {
            financialItems.value = res.data.data;
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}
/******************* Computed *******************/


/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getBanks();
})

</script>

<style lang="scss"></style>