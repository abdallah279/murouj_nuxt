<template>
    <section class="slider">

        <div v-if="!loading">
            <div>
                <Carousel :value="slider" :numVisible="1" :showNavigators="false" :numScroll="1" circular
                    :autoplayInterval="3000" class="dir-slider">
                    <template #item="slotProps">
                        <img  loading="lazy" :src="slotProps.data.image" alt="slider-img" class="slider-img" />
                    </template>
                </Carousel>
            </div>
            <!-- <div class="no-data" v-else>
                <img  loading="lazy" src="@/assets/imgs/no_data.avif" alt="image" class="no-data-img">
                <div class="no-data-text">{{ $t('noData.imgs') }}</div>
            </div> -->
        </div>

        <div class="" v-if="loading">
            <Skeleton width="100%" height="480px" class="slider-img rounded-0"></Skeleton>
            <img  loading="lazy" src="@/assets/imgs/login_logo.png" alt="image" class="login_logo sm position">
        </div>
    </section>
</template>


<script setup>
/******************* Import *******************/

/******************* Data *******************/

/******************* Props *******************/
const props = defineProps({
    slider: {
        type: Array,
        required: true
    },
    loading: {
        type: Boolean,
        default: false,
    },
});

/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>