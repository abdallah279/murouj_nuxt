<template>
    <main class="categories main-padding">
        <div class="container">
            <PageHeader :title="$t('sectionTitle.categories')" class="mb-5" />

            <div v-if="!loading">
                <div class="categories_items" v-if="categories.length">
                    <Categories :categories="categories" />
                </div>

                <div class="no-data" v-else>
                    <img src="@/assets/imgs/no_data.avif" alt="" class="no-data-img">
                    <div class="no-data-text">{{ $t('noData.categories') }}</div>
                </div>
            </div>

            <div class="categories_items" v-if="loading">
                <CategoriesSkeleton />
            </div>
        </div>
    </main>
</template>

<script setup>

/******************* Import *******************/
// success response
const { response } = responseApi();

// Axios
const axios = useApi();

/******************* Data *******************/

// Loading
const loading = ref(false);

// categories
const categories = ref([]);

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// getData
const getData = async () => {
    loading.value = true;
    await axios.get('categories').then(res => {
        if (response(res) == "success") {
            categories.value = res.data.data;
        }
        loading.value = false;
    }).catch(err => console.log(err));
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getData();
});
</script>