<template>
    <div class="order_card bb mb-4 pb-4">

        <div class="d-flex-between gap-2 flex-wrap mb-2">
            <span class="c-dark ff-d">{{ $t('order.card.orderNum') }} : #{{ order.order_num }}</span>
            <NuxtLink :to="`/orderDetails/${order.id}`"
                class="c-main text-decoration-underline">
                {{ $t('moreBtn.detailes') }}
            </NuxtLink>
        </div>

        <div class="d-flex-between gap-2 flex-wrap mb-2">
            <span class="c-dark4 ff-d">{{ $t('order.card.orderStatus') }} :</span>
            <span class="status_span" :class="{ finish: (order.status == 7 || order.status == 14) }">
                {{ order.status_text }}
            </span>
        </div>

        <div class="d-flex-between gap-2 flex-wrap mb-2">
            <span class="c-dark ff-d">{{ $t('order.card.orderPrice') }} :</span>
            <span class="c-black">{{ order.total }} {{ order.currency }}</span>
        </div>

        <div class="d-flex-between gap-2 flex-wrap">
            <span class="c-dark ff-d">{{ $t('order.card.orderDate') }} :</span>
            <span class="c-black">{{ order.order_date }}</span>
        </div>

    </div>
</template>

<script setup>
/******************* Import *******************/

/******************* Data *******************/

/******************* Provide && Inject *******************/

/******************* Props *******************/
const props = defineProps({
    order: {
        type: Object
    }
})

/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>

<style lang="scss"></style>