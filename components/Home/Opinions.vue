<template>
    <section class="advantages_sec sec-padding">
        <div class="container">
            <h1 class="fs17 ff-d mb-4 c-blue text-center">{{ $t('sectionHeader.opinions') }}</h1>


            <div v-if="!loading">
                <div v-if="customerOpinions.length">
                    <CarouselCard class="pb-4" ref="carouselCardRef" :interval="5000" :autoplay="true" arrow="never"
                        indicator-position="none" type="card">
                        <CarouselCardItem v-for="opinion in customerOpinions" :key="opinion.id" :name="`cc_${opinion.id}`">
                            <div class="customer_item">
                                <img  loading="lazy" src="@/assets/imgs/icons/qoute.png" alt="image" class="qoute qoute1">
                                <img  loading="lazy" src="@/assets/imgs/icons/qoute.png" alt="image" class="qoute qoute2">
                                <img  loading="lazy" :src="opinion.user_image" alt="image" class="img">
                                <p class="text">{{ opinion.comment }}</p>
                            </div>
                        </CarouselCardItem>
                        <div class="arrow_btns">
                            <button @click="prev" class="arrow prev up" title="Prev Button"><font-awesome-icon :icon="['fas', 'right-long']" /></button>
                            <button @click="next" class="arrow next up" title="Next Button"><font-awesome-icon :icon="['fas', 'left-long']" /></button>
                        </div>
                    </CarouselCard>
                </div>

                <!--************ No Data ************-->
                <div class="no-data" v-else>
                    <img  loading="lazy" src="@/assets/imgs/no_data.avif" alt="image" class="no-data-img">
                    <div class="no-data-text">{{ $t('noData.comments') }}</div>
                </div>
            </div>

            <!--************ Skeleton ************-->
            <CarouselCard class="pb-4" v-if="loading" ref="carouselCardRef" :interval="5000" :autoplay="true" arrow="never"
                indicator-position="none" type="card">
                <CarouselCardItem v-for="i in 3" :key="i" :name="`cc_${i}`">
                    <div class="customer_item">
                        <img  loading="lazy" src="@/assets/imgs/icons/qoute.png" alt="image" class="qoute qoute1">
                        <img  loading="lazy" src="@/assets/imgs/icons/qoute.png" alt="image" class="qoute qoute2">
                        <Skeleton shape="circle" size="5rem"></Skeleton>
                        <Skeleton width="100%" height=".5rem"></Skeleton>
                        <Skeleton width="100%" height=".5rem"></Skeleton>
                        <Skeleton width="90%" height=".5rem"></Skeleton>
                        <Skeleton width="80%" height=".5rem"></Skeleton>
                    </div>
                </CarouselCardItem>
            </CarouselCard>

        </div>
    </section>
</template>

<script setup>

/******************* Import *******************/
import { CarouselCard, CarouselCardItem } from 'vue-carousel-card'
import 'vue-carousel-card/styles/index.css';

// success response
const { response } = responseApi();

// Axios
const axios = useApi();

/******************* Data *******************/
const carouselCardRef = ref(null);

// loading
const loading = ref(false);

// customer Opinions
const customerOpinions = ref([]);

/******************* Props And Inject *******************/

/******************* Methods *******************/

// Next
const next = () => {
    carouselCardRef.value.next()
}

// prev
const prev = () => {
    carouselCardRef.value.prev()
}

// getData
const getData = async () => {
    loading.value = true;
    await axios.get('store-rates').then(res => {
        if (response(res) == "success") {
            customerOpinions.value = res.data.data;
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

<style scoped></style>