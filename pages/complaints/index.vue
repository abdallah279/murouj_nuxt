<template>
    <main class="about_page main-padding">
        <div class="container">
            <PageHeader :title="$t('pagesTitle.suggestions')" :desc="$t('sectionDesc.complaints')" margin="mb-4" />

            <router-link to="/complaints/create" class="main-btn mx-auto lg mb-5 up">
                {{ $t('formBtns.addComplaints') }}
            </router-link>

            <div class="row">
                <div class="col-xl-8 col-lg-10 mx-auto">
                    <div v-if="!loading">
                        <div v-if="complaints.length">
                            <ComplaintsCard :complaint="complaint" v-for="complaint in complaints" :key="complaint.id" />
                        </div>

                        <div class="no-data" v-else>
                            <img src="@/assets/imgs/no_data.avif" alt="" class="no-data-img">
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

/******************* Data *******************/

// loading
const loading = ref(false);

// complaints
const complaints = ref([]);

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// get complaints
const getComplaints = async () => {
    loading.value = true;
    await axios.get('get-complaints', config).then(res => {
        if (response(res) == "success") {
            complaints.value = res.data.data.data;
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getComplaints();
});
</script>

<style lang="scss"></style>