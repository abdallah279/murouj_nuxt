<template>
    <div class="complaint-item sec-border">
        <img :src="complaint.image" class="complaint-img" title="complaint-img" alt="order-img">
        <div class="left-sec">

            <div class="item">
                <div class="left-item">

                    <div class="main-item ff-d">
                        <span class="c-black">{{ $t('complaint.card.complaintNum') }}:</span>
                        <span class="c-black">{{ complaint.number }}</span>
                    </div>

                    <span class="c-light3">{{ complaint.created_at }}</span>
                </div>
                <p class="fs13 c-black mt-2">{{ complaint.title }}</p>
            </div>

            <div class="item">
                <div class="left-item">

                    <div class="status d-flex align-items-center gap-2">
                        <img src="@/assets/imgs/icons/complaint_ic.png" alt="" class="main_ic">
                        <span class="c-blue ff-d fs13">
                            {{ $t('complaint.card.status') }} : {{ complaint.status }}
                        </span>
                    </div>
                    <NuxtLink :to="`/complaints/${complaint.id}`"
                        class="c-main d-flex gap-1 align-items-center" v-if="!noRoute">
                        {{ $t('moreBtn.more') }} <i class="pi pi-angle-left"></i>
                    </NuxtLink>

                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
/******************* Import *******************/

/******************* Data *******************/
const loading = ref(false);

/******************* Provide && Inject *******************/

/******************* Props *******************/
const props = defineProps({
    complaint: Object,
    noRoute: Boolean
})

/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>

<style lang="scss"></style>