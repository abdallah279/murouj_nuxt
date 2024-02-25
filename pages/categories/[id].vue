<template>
    <main class="categories main-padding">
        <div class="container">
            <PageHeader :title="categoryName" v-if="categoryName" class="mb-5" />

            <!--**** Categories ****-->
            <div v-if="!loading">
                <div v-if="categories.length">
                    <div class="categories_items">
                        <Categories @categoryId="getSubCategoryId" :categories="categories" />
                    </div>

                    <form @submit.prevent="filterFunc"
                        class="filter_con d-flex justify-content-between flex-wrap mt-5 gap-4">
                        <div class="item">
                            <div class="main-label">{{ $t('filterForm.sortBy') }}</div>
                            <div class="d-flex gap-3">

                                <div class="check-box form-check-m blue">
                                    <input type="checkbox" name="sort" id="topRated" v-model="topRated">
                                    <label class="check" for="topRated"></label>
                                    <label class="check-anchor fs13 c-black" for="topRated">
                                        {{ $t('filterForm.topRate') }}
                                    </label>
                                </div>
                                <div class="check-box form-check-m blue">
                                    <input type="checkbox" name="sort" id="discountProducts" v-model="has_discount">
                                    <label class="check" for="discountProducts"></label>
                                    <label class="check-anchor fs13 c-black" for="discountProducts">
                                        {{ $t('filterForm.discountedProducts') }}
                                    </label>
                                </div>
                                <div class="check-box form-check-m blue">
                                    <input type="checkbox" name="sort" id="newlyAdded" v-model="sort">
                                    <label class="check" for="newlyAdded"></label>
                                    <label class="check-anchor fs13 c-black" for="newlyAdded">
                                        {{ $t('filterForm.recentlyAdded') }}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="item">
                            <div class="main-label">{{ $t('filterForm.priceRanking') }}</div>
                            <div class="d-flex gap-4">
                                <div class="radio-box">
                                    <input type="radio" v-model="priceFilter" value="highest" id="price1" name="price"
                                        class="input-radio">
                                    <label for="price1" class="label">
                                        {{ $t('filterForm.highestPrice') }}
                                    </label>
                                </div>
                                <div class="radio-box">
                                    <input type="radio" v-model="priceFilter" value="lower" id="price2" name="price"
                                        class="input-radio">
                                    <label for="price2" class="label">
                                        {{ $t('filterForm.lowestPrice') }}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="buttons">
                            <button type="submit" class="main-btn up blue rounded-2">
                                {{ $t('filterForm.filter') }}
                                <span class="spinner-border spinner-border-sm" v-if="loadingFilter" role="status"
                                    aria-hidden="true"></span>
                            </button>
                            <button type="button" @click="clearFilter" class="main-btn up blackRgb rounded-2">
                                {{ $t('filterForm.deleteFilter') }}
                            </button>
                        </div>
                    </form>

                </div>
                <div class="no-data" v-else>
                    <img  loading="lazy" src="@/assets/imgs/no_data.avif" alt="image" class="no-data-img">
                    <div class="no-data-text">{{ $t('noData.subCategories') }}</div>
                </div>
            </div>

            <!--**** Skeleton ****-->
            <div v-if="loading">
                <div class="categories_items">
                    <CategoriesSkeleton />
                </div>
                <div class="d-flex-between flex-wrap mt-5 gap-4">
                    <div class="item" v-for="i in 2" :key="i">
                        <Skeleton width="4rem" height=".7rem" class="mb-3"></Skeleton>
                        <Skeleton width="12rem" height=".7rem"></Skeleton>
                    </div>

                    <div class="buttons">
                        <Skeleton width="9rem" height="3rem"></Skeleton>
                        <Skeleton width="9rem" height="3rem"></Skeleton>
                    </div>
                </div>
            </div>

            <!--************ Products ************-->
            <div v-if="!loadingPro && !loading && categories.length">
                <ProductsCards :products="products" v-if="products.length" class="mt-5" />
                <div class="no-data mt-5" v-if="!products.length">
                    <img  loading="lazy" src="@/assets/imgs/no_data.avif" alt="image" class="no-data-img">
                    <div class="no-data-text">{{ $t('noData.categoryProducts') }}</div>
                </div>
            </div>

            <!--**** Skeleton Products ****-->
            <ProductsSkeleton class="mt-5" v-if="loadingPro || loading" />

            <!--**** Paginator ****-->
            <div v-if="showPaginate">
                <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" class="mt-5" dir="ltr" />
            </div>

            <div v-if="showPaginateSearch">
                <Paginator :rows="pageLimitSearch" @page="onPaginateSearch" :totalRecords="totalPageSearch" class="mt-5"
                    dir="ltr" />
            </div>

        </div>
    </main>
</template>
  
  
<script setup>

/******************* Import *******************/
import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });

// success response
const { response } = responseApi();

// Toast
const { successToast, errorToast } = toastMsg();

// Axios
const axios = useApi();

// pinia store
import { useAuthStore } from '~/stores/auth';
import { useGlobalStore } from '~/stores/global';

/*************** DATA *****************/

// Global Store
const globalStore = useGlobalStore();
const { countryLocal, countryID } = storeToRefs(globalStore);

// Store
const store = useAuthStore();
const { token } = storeToRefs(store);

// route
const route = useRoute();

// sort
const topRated = ref(0);
const has_discount = ref(0);
const sort = ref(0);
const newlyAdded = ref(0);

// priceFilter
const priceFilter = ref('');

// Loading
const loading = ref(false);
const loadingPro = ref(false);
const loadingFilter = ref(false);

// categories
const categories = ref([]);
const categoryName = ref('');
const SubCategoryId = ref(null);

// products
const products = ref([]);

// Paginator
const currentPage = ref(1);
const pageLimit = ref();
const totalPage = ref();

// Search Paginator
const currentPageSearch = ref(1);
const pageLimitSearch = ref();
const totalPageSearch = ref();


/******************* Provide && Inject *******************/
provide('view', false);

/******************* Props *******************/

/******************* Methods *******************/

// get Sub Categories
const getSubCategories = async () => {
    loading.value = true;
    loadingPro.value = true;
    await axios.get(`categories/${categoryId.value}`).then(res => {
        if (response(res) == "success") {
            if (res.data.data.length > 0) {
                categories.value = res.data.data;
                categoryName.value = res.data.data[0].parent_name;
                SubCategoryId.value = res.data.data[0].id;
            }
        }
        loading.value = false;
    }).catch(err => console.log(err));
}

// get Sub Category Id
const getSubCategoryId = (id) => {
    SubCategoryId.value = id;
    getSubCategoryProducts();
    getCurrentCategory();
}

// get Sub Category Products
const getSubCategoryProducts = async () => {
    loadingPro.value = true;
    await axios.get(`sub-category-products/${SubCategoryId.value}?country_id=${countryID.value}&page=${currentPage.value}`, config).then(res => {
        if (response(res) == "success") {
            products.value = res.data.data.data;
            totalPage.value = res.data.data.pagination.total_items;
            pageLimit.value = res.data.data.pagination.per_page;
        }
        loadingPro.value = false;
    }).catch(err => console.log(err));
}

// get Current Category
const getCurrentCategory = () => {
    const currentCategory = categories.value.find((cat) => cat.id == SubCategoryId.value);

    if (categories.value.length > 0 && currentCategory) {
        categories.value.map((cat) => cat.active = false);
        currentCategory.active = true;
    }
}

// Filter Function
const filterFunc = async () => {
    loadingFilter.value = true;
    loadingPro.value = true;
    await axios.get(`search?country_id=${countryID.value}&sub_category_id=${SubCategoryId.value}&highest_rate=${Number(topRated.value)}&has_discount=${Number(has_discount.value)}&sort=${Number(sort.value)}&price=${priceFilter.value}&page=${currentPageSearch.value}`, config.value).then(res => {
        if (response(res) == "success") {
            products.value = res.data.data.data;
            totalPageSearch.value = res.data.data.pagination.total_items;
            pageLimitSearch.value = res.data.data.pagination.per_page;
        } else {
            errorToast(res.data.msg);
        }
        loadingFilter.value = false;
        loadingPro.value = false;
    }).catch(err => console.log(err));
}

// clear Filter
const clearFilter = async () => {
    priceFilter.value = '';
    has_discount.value = 0;
    topRated.value = 0;
    await getCategoryProducts();
}

// Paginate Function
const onPaginate = (e) => {
    currentPage.value = e.page + 1;
    window.scrollTo(0, 0);
    getCategoryProducts();
};

// Search Paginate Function
const onPaginateSearch = (e) => {
    currentPage.value = e.page + 1;
    window.scrollTo(0, 0);
    filterFunc();
};

/******************* Computed *******************/

// categoryId
const categoryId = computed(() => {
    return route.params.id;
});

// Config
const config = computed(() => {
  return token.value ? {
    headers: { Authorization: `Bearer ${token.value}` }
  } : {}
});

// showPaginate
let showPaginate = computed(() => {
    totalPageSearch.value = 0;
    return totalPage.value > pageLimit.value;
});

// showPaginateSearch
let showPaginateSearch = computed(() => {
    totalPage.value = 0;
    return totalPageSearch.value > pageLimitSearch.value;
});

/******************* Watch *******************/

watch(countryLocal, async (newVal) => {
  if (newVal) {
    await getSubCategories();
    await getSubCategoryProducts();
    getCurrentCategory();
  }
});

/******************* Mounted *******************/
onMounted(async () => {
    await getSubCategories();
    await getSubCategoryProducts();
    getCurrentCategory();
});
</script>