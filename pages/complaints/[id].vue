<template>
    <main class="complaint_page main-padding">
        <div class="container">
            <PageHeader :title="$t('pagesTitle.suggestions')" margin="mb-4" />

            <div class="row">
                <div class="col-xl-8 col-lg-10 mx-auto">
                    <div v-if="!loading">
                        <ComplaintsCard :complaint="complaintDetailes" :noRoute="true" />

                        <div class="complaint_item">
                            <h4 class="c-dark4 mb-3 fs13">{{ $t('complaint.card.complaintNum') }}</h4>
                            <p class="c-black">{{ complaintDetailes.id }}</p>
                        </div>

                        <div class="complaint_item">
                            <h4 class="c-dark4 mb-3 fs13">{{ $t('complaint.detailes.date') }}</h4>
                            <p class="c-black">{{ complaintDetailes.created_at }}</p>
                        </div>

                        <div class="complaint_item">
                            <h4 class="c-dark4 mb-3 fs13">{{ $t('complaint.detailes.info') }}</h4>
                            <p class="c-black">{{ complaintDetailes.content }}</p>
                        </div>

                        <div class="complaint_item" v-if="complaintDetailes.reply">
                            <h4 class="c-dark4 mb-3 fs13">{{ $t('complaint.detailes.responding') }}</h4>
                            <p class="c-black">{{ complaintDetailes.reply }}</p>
                        </div>

                        <div class="complaint_item">
                            <h4 class="c-dark4 mb-3 fs13">{{ $t('complaint.detailes.images') }}</h4>

                            <div class="d-flex align-items-center flex-wrap gap-2" v-if="complaintDetailes.attachments.length">
                                <div class='hidden-img' v-for="img in complaintDetailes.attachments" :key="img.id">
                                    <Image :src="img.file" alt="Image" class="fancyImg" preview />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div v-if="loading">
                        <ComplaintsSkeleton :count="1" />

                        <div class="complaint_item" v-for="i in 3" :key="i">
                            <Skeleton width="6rem" height=".6rem" class="mb-3"></Skeleton>
                            <Skeleton width="8rem" height=".6rem"></Skeleton>
                        </div>

                        <div class="complaint_item">
                            <Skeleton width="6rem" height=".6rem" class="mb-3"></Skeleton>
                            <div class="d-flex align-items-center flex-wrap gap-2">
                                <div class='hidden-img' v-for="i in 3" :key="i">
                                    <Skeleton size="8rem"></Skeleton>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
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

// pinia store
import { useAuthStore } from '~/stores/auth';

/******************* Data *******************/

// Store
const store = useAuthStore();
const { token , notificationToken} = storeToRefs(store);

const route = useRoute();

// Loading
const loading = ref(true);

// Complaint Detailes
const complaintDetailes = ref({});

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/
// get complaints
const getComplaints = async () => {

    let device;

    if (!token.value) {
        device = `?device_id=${notificationToken.value}&device_type=web`;
    } else {
        device = '';
    }

    await axios.get(`complaint-details/${complaintId.value}${device}`, config.value).then(res => {
        if (response(res) == "success") {
            complaintDetailes.value = res.data.data;
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}

/******************* Computed *******************/
const complaintId = computed(() => {
    return route.params.id
});

// config
const config = computed(() => {
    return token.value ? {
        headers: { Authorization: `Bearer ${token.value}` }
    } : {}
});

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getComplaints();
});

/******************* Required Auth *******************/
</script>

<style lang="scss"></style>