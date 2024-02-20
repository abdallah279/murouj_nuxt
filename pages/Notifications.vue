<template>
    <main class="about_page main-padding">
        <div class="container">
            <PageHeader :title="$t('pagesTitle.notifications')" margin="mb-5" />

            <div class="row">
                <div class="col-xl-9 col-lg-10 mx-auto">

                    <div v-if="!loading">
                        <div class="notification-items" v-if="notifications.length">
                            <NotificationsItem @removeNotId="removeNotification" v-for="notItem in notifications"
                                :key="notItem.id" :notItem="notItem" />
                        </div>

                        <div class="no-data" v-if="!notifications.length">
                            <img src="@/assets/imgs/no_data.avif" alt="" class="no-data-img">
                            <div class="no-data-text">{{ $t('noData.notifications') }}</div>
                        </div>
                    </div>

                    <div v-if="loading">
                        <div class="notification-items">

                            <div class="not-item" v-for="i in 5" :key="i">
                                <div class="right">
                                    <Skeleton shape="circle" size="4rem"></Skeleton>
                                    <div class="not_body">
                                        <div class="time mb-3">
                                            <Skeleton height=".6rem" width="4rem"></Skeleton>
                                        </div>
                                        <Skeleton height=".6rem" width="14rem"></Skeleton>
                                    </div>
                                </div>
                                <Skeleton height="1.2rem" width=".8rem"></Skeleton>
                            </div>

                        </div>
                    </div>

                    <div v-if="showPaginate">
                        <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" class="mt-5" dir="ltr" />
                    </div>
                </div>
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
import { useAuthStore } from '~/stores/auth';

/******************* Data *******************/

// Store
const store = useAuthStore();
const { token } = storeToRefs(store);

// loading
const loading = ref(false);

// notifications
const notifications = ref([]);

// Paginator
const currentPage = ref(1);
const pageLimit = ref();
const totalPage = ref();

// config
const config = {
    headers: { Authorization: `Bearer ${token.value}` }
};

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// Get notifications
const getNotifications = async () => {
    loading.value = true;
    await axios.get(`notifications?page=${currentPage.value}`, config).then(res => {
        if (response(res) == "success") {
            notifications.value = res.data.data.notifications.data;
            totalPage.value = res.data.data.notifications.pagination.total_items;
            pageLimit.value = res.data.data.notifications.pagination.per_page;
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}

// Paginate Function
const onPaginate = (e) => {
    loading.value = true;
    currentPage.value = e.page + 1;
    window.scrollTo(0, 0);
    getNotifications();
};

// Remove notification Item From notifications Array
const removeNotification = (id) => {
    const IdIndex = notifications.value.findIndex((not) => not.id === id);
    notifications.value.splice(IdIndex, 1);
}

/******************* Computed *******************/
let showPaginate = computed(() => {
    return totalPage.value > pageLimit.value
});


/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getNotifications();
});

/******************* Required Auth *******************/
definePageMeta({
  middleware: 'auth'
});

</script>

<style lang="scss"></style>