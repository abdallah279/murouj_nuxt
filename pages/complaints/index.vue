<template>
    <main class="about_page main-padding">
        <div class="container">
            <PageHeader :title="$t('pagesTitle.suggestions')" :desc="$t('sectionDesc.complaints')" margin="mb-4" />

            <NuxtLink to="/complaints/create" class="main-btn mx-auto lg mb-5 up">
                {{ $t('formBtns.addComplaints') }}
            </NuxtLink>

            <div class="row">
                <div class="col-xl-8 col-lg-10 mx-auto">
                    <div v-if="!loading">
                        <div v-if="complaints.length">
                            <ComplaintsCard :complaint="complaint" v-for="complaint in complaints"
                                :key="complaint.id" />
                        </div>

                        <div class="no-data" v-else>
                            <img loading="lazy" src="@/assets/imgs/no_data.avif" alt="image" class="no-data-img">
                            <div class="no-data-text">{{ $t('noData.complaint') }}</div>
                        </div>
                    </div>

                    <div v-if="loading">
                        <ComplaintsSkeleton />
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
const { token, notificationToken } = storeToRefs(store);

// loading
const loading = ref(false);

// complaints
const complaints = ref([]);

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// get complaints
const getComplaints = async () => {
    loading.value = true;

    let device;

    if (!token.value) {
        device = `?device_id=${notificationToken.value}&device_type=web`;
    } else {
        device = '';
    }

    await axios.get(`get-complaints${device}`, config.value).then(res => {
        if (response(res) == "success") {
            complaints.value = res.data.data.data;
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}

/******************* Computed *******************/

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