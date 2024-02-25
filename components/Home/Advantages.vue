<template>
    <section class="advantages_sec sec-padding">
        <div class="container">
            <h1 class="fs17 ff-d mb-5 c-blue text-center">{{ $t('sectionHeader.advantages') }}</h1>

            <div v-if="!loading">
                <div class="grid-4 grid-res2" v-if="advantages.length">
                    <div class="advantage_item" v-for="advantage in advantages" :key="advantage.id">
                        <div class="icon">
                            <img :src="advantage.icon" alt="" class="ic">
                        </div>
                        <h4 class="adv_name">{{ advantage.name }}</h4>
                        <p class="adv_desc">{{ advantage.description }}</p>
                    </div>
                </div>

                <div class="no-data" v-else>
                    <img src="@/assets/imgs/no_data.avif" alt="" class="no-data-img">
                    <div class="no-data-text">{{ $t('noData.advantages') }}</div>
                </div>
            </div>

            <!--**** Skeleton ****-->
            <div class="grid-4" v-if="loading">
                <div class="advantage_item" v-for="i in 4" :key="i">
                    <Skeleton shape="circle" size="3.3rem"></Skeleton>
                    <Skeleton width="7rem" height=".7rem"></Skeleton>
                    <Skeleton width="7rem" height=".7rem"></Skeleton>
                </div>
            </div>

        </div>
    </section>
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

// advantages
const advantages = ref([]);

/******************* Props And Inject *******************/

/******************* Methods *******************/
// getData
const getData = async () => {
    loading.value = true;
    await axios.get('store-advantages').then(res => {
        if (response(res) == "success") {
            advantages.value = res.data.data;
        }
        loading.value = false;
    }).catch(err => console.log(err));
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getData();
})
</script>

<style></style>