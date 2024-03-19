<template>
    <div class="d-flex justify-content-center mb-4 flex-sm-nowrap flex-wrap">
        <NuxtLink to="/orders/returnOrders/waiting" class="main-btn light order_tab flex-grow-1">
            {{ $t('order.tabs.pendingOrders') }}
        </NuxtLink>
        <NuxtLink to="/orders/returnOrders/current" class="main-btn order_tab light flex-grow-1">
            {{ $t('order.tabs.currentOrders') }}
        </NuxtLink>
        <NuxtLink to="/orders/returnOrders/finished" class="main-btn order_tab light flex-grow-1">
            {{ $t('order.tabs.finishedOrders') }}
        </NuxtLink>
        <NuxtLink to="/orders/returnOrders/canceled" class="main-btn order_tab light flex-grow-1">
            {{ $t('order.tabs.canceledOrders') }}
        </NuxtLink>
    </div>

    <!-- return Nested Pages -->
    <NuxtPage />
</template>

<script setup>
/******************* Redirect To Waiting Page *******************/
const router = useRouter();

router.push({ path: '/orders/returnOrders/waiting' });

/******************* Import *******************/

/******************* Data *******************/

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>

<style lang="scss"></style>