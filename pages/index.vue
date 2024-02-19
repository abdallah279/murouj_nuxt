<template>
  <main class="home">

    <!-- Slider One -->
    <HomeSlider :slider="sliderOne" :loading="loading" />


    <!-- Categories -->
    <HomeCategories :categoriesItems="categories" :loading="loading" />

    <!-- Newly Added -->
    <HomeProducts :title="newlyAdded.title" :products="newlyAdded.products" route="/newlyAdded" :loading="loading" />

    <!-- Slider Two -->
    <HomeSlider :slider="sliderTwo" class="my-5" :loading="loading" />

    <!-- All Products -->
    <HomeProducts class="mb-5" v-for="item in categoriesProducts" :key="item.id" :title="item.name"
      :products="item.products" :route="`/categories/${item.id}`" :loading="loading" />

    <!-- Product Skeleton -->
    <div class="container mb-5" v-if="loading">
      <ProductsSkeleton />
    </div>

    <!-- Advantages -->
    <HomeAdvantages />

    <!-- Customers Opinions -->
    <!-- <HomeOpinions /> -->

  </main>

  <!-- Alert Modal -->
  <Dialog id="alert" class="xl alert_modal" v-model:visible="alertModal" modal>
    <img src="@/assets/imgs/alert_img.png" alt="" class="alert_img">
  </Dialog>
</template>

<script setup>
/******************* Plugins *******************/
import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });

// success response
const { response } = responseApi();

// Axios
const axios = useApi();

// pinia store
import { useAuthStore } from '~/stores/auth';
import { useGlobalStore } from '~/stores/global';

/*************** DATA *****************/

// Global Store
const globalStore = useGlobalStore();
const { shippingCount, countryLocal, countryID } = storeToRefs(globalStore);

// Store
const store = useAuthStore();
const { isLoggedIn, token } = storeToRefs(store);

// Route
const route = useRoute();

// alertModal
const alertModal = ref(false);

// Loading
const loading = ref(true);

// Slider One
const sliderOne = ref([]);

// categories
const categories = ref([]);

// Slider Two
const sliderTwo = ref([]);

// newlyAdded
const newlyAdded = ref({
  title: t(`pagesTitle.newlyAdded`),
  products: []
});

// All categories Products
const categoriesProducts = ref([]);

// getData
const getData = async () => {
  loading.value = true;

  await axios.get(`home?country_id=${countryID.value}`, config.value).then(res => {
    if (response(res) == "success") {
      categories.value = res.data.data.categories;
      sliderOne.value = res.data.data.first_banner;
      sliderTwo.value = res.data.data.second_banner;
      newlyAdded.value.products = res.data.data.recently_added;
      categoriesProducts.value = res.data.data.categories_sections;
      shippingCount.value = res.data.data.free_shipping_min_amount;
    }
    loading.value = false;
  }).catch(err => console.log(err));
}

/******************* Computed *******************/

const config = computed(() => {
  return token.value ? {
    headers: { Authorization: `Bearer ${token.value}` }
  } : {}
});

/******************* Watch *******************/

watch(isLoggedIn, () => {
  if (isLoggedIn.value == false) {
    setTimeout(() => {
      alertModal.value = true;
    }, 5000);
  }
});

watch(countryLocal, async (newVal) => {
  if (newVal) {
    await getData();
  }
});

/******************* Mounted *******************/

// Show Alert Modal
onMounted(async () => {
  if (isLoggedIn.value == false) {
    setTimeout(() => {
      alertModal.value = true;
    }, 5000);
  }

  await getData();

});
</script>

<style lang="scss" scoped></style>