<template>
    <main class="about_page main-padding">
        <div class="container">
            <PageHeader :title="$t('pagesTitle.faqs')" margin="mb-5" />

            <div class="row">
                <div class="col-lg-10 mx-auto">

                    <div v-if="!loading">
                        <Accordion :activeIndex="0" v-if="questions.length">
                            <AccordionTab v-for="tab in questions" :key="tab.question" :header="tab.question">
                                <p class="p-accordion-answer-text">{{ tab.answer }}</p>
                            </AccordionTab>
                        </Accordion>

                        <div class="no-data" v-else>
                            <img  loading="lazy" src="@/assets/imgs/no_data.avif" alt="image" class="no-data-img">
                            <div class="no-data-text">{{ $t('noData.faqs') }}</div>
                        </div>
                    </div>

                    <div v-if="loading">
                        <div class="notification-items">
                            <Skeleton height="4rem" class="rounded-3 mb-4" v-for="i in 4" :key="i"></Skeleton>
                        </div>
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

/******************* DATA *******************/

// questions
const questions = ref([]);

// loading
const loading = ref(false);

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// getFaqs
const getFaqs = async () => {
    loading.value = true;
    await axios.get('fqss').then(res => {
        if(response(res) == "success"){
            questions.value = res.data.data;
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
    await getFaqs();
})

</script>

<style lang="scss"></style>