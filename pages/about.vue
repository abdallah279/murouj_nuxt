<template>
    <main class="about_page main-padding">
        <div class="container">
            <PageHeader :title="$t('pagesTitle.about')" margin="mb-4" :logo="true" />

            <div v-if="!loading">
                <p class="desc text-center" v-html="about"></p>
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

// about
const about = ref(``);
const loading = ref(true);

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// getAbout
const getAbout = async () => {
    await axios.get(`about/${countryID.value}`).then(res => {
        if (response(res) == "success") {
            about.value = res.data.data;
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
    await getAbout();
  }
});

/******************* Mounted *******************/
onMounted(async () => {
    await getAbout();
});

</script>

<style lang="scss"></style>