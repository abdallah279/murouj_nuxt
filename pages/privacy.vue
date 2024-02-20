<template>
    <main class="about_page main-padding">
        <div class="container">
            <pageHeader :title="$t('pagesTitle.privacy')" margin="mb-4" :logo="true" />

            <div v-if="!loading">
                <p class="desc text-center" v-html="privacy"></p>
            </div>

            <div v-if="loading">
                <Skeleton height=".5rem" width="80%" class="rounded-0 mb-2 mx-auto"></Skeleton>
                <Skeleton height=".5rem" width="80%" class="rounded-0 mb-2 mx-auto"></Skeleton>
                <Skeleton height=".5rem" width="80%" class="rounded-0 mb-2 mx-auto"></Skeleton>
                <Skeleton height=".5rem" width="80%" class="rounded-0 mb-2 mx-auto"></Skeleton>
                <Skeleton height=".5rem" width="70%" class="rounded-0 mb-2 mx-auto"></Skeleton>
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

// pinia store
import { useGlobalStore } from '~/stores/global';

/*************** DATA *****************/

// Global Store
const globalStore = useGlobalStore();
const { countryLocal, countryID } = storeToRefs(globalStore);

// privacy
const privacy = ref(``);
const loading = ref(true);

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// getData
const getData = async () => {
    await axios.get(`privacy/${countryID.value}`).then(res => {
        if (response(res) == "success") {
            privacy.value = res.data.data;
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}

/******************* Computed *******************/

/******************* Watch *******************/

watch(countryLocal, async (newVal) => {
  if (newVal) {
    await getData();
  }
});

/******************* Mounted *******************/
onMounted(async () => {
    await getData();
});

</script>

<style lang="scss"></style>