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

/******************* DATA *******************/

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
// countryID 
const countryID = computed(() => {
    return '1'
    // return localStorage.getItem('country') ? JSON.parse(localStorage.getItem('country')).id : '1'
});

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getAbout();
});

</script>

<style lang="scss"></style>