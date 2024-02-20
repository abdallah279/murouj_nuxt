<template>
    <main class="complaint_page main-padding">
        <div class="container">
            <PageHeader :title="$t('pagesTitle.orders')" margin="mb-5" />

            <div class="row">
                <div class="col-xl-6 xol-lg-8 mx-auto">
                    <div class="d-flex justify-content-center mb-4">
                        <NuxtLink to="/orders/purchaseOrders" class="main-btn light order_tab flex-grow-1">
                            {{ $t('order.tabs.purchaseOrders') }}
                        </NuxtLink>
                        <NuxtLink to="/orders/returnOrders" class="main-btn order_tab light flex-grow-1">
                            {{ $t('order.tabs.returnOrders') }}
                        </NuxtLink>
                    </div>

                    <!-- Nested Pages -->
                    <NuxtPage />
                </div>
            </div>

        </div>
    </main>
</template>

<script setup>
/******************* Redirect To Waiting Page *******************/
navigateTo("/orders/purchaseOrders");

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