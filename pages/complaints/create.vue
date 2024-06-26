<template>
    <main class="contact_page main-padding">
        <div class="container">
            <PageHeader :title="$t('pagesTitle.addComplaints')" margin="mb-5" />

            <div class="row justify-content-center">

                <div class="col-lg-6">

                    <form action="" ref="complaintForm" @submit.prevent="addComplaints">
                        <div class="input-g">
                            <div class="main-input">
                                <input type="text" class="input-me validInputs" valid="name" name="name" v-model="name"
                                    :placeholder="$t('addComplaintsForm.name')">
                            </div>
                        </div>

                        <div class="input-g">
                            <div class="main-input">
                                <input type="number" class="input-me validInputs" valid="phone" name="phone" v-model="phone"
                                    :placeholder="$t('addComplaintsForm.phone')">

                                    <Dropdown v-model="selectedCountry" :options="countries" optionLabel="name"
                                    class="main-icon selectedCountry">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value" class="selected">
                                            <img  loading="lazy" v-if="slotProps.value.image" :alt="slotProps.value.label"
                                                :src="slotProps.value.image" class="option-img" />
                                            <div>{{ slotProps.value.key }}</div>
                                            <i class="pi pi-angle-down ic"></i>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                    <template #option="slotProps">
                                        <div class="option">
                                            <img  loading="lazy" v-if="slotProps.option.image" :alt="slotProps.option.number"
                                                class="option-img" :src="slotProps.option.image" />
                                            <div>
                                                {{ slotProps.option.key }}
                                            </div>
                                        </div>
                                    </template>
                                </Dropdown>
                            </div>
                        </div>

                        <div class="radio-boxs d-flex gap-4 input-g">
                            <label for="" class="c-black ff-d">{{ $t('addComplaintsForm.type') }}</label>
                            <div class="d-flex gap-3">
                                <label for="elc" class="radio-box">
                                    <input type="radio" class="input-radio" value="complaint" name="type" id="elc">
                                    <span class="fs-15 c-black cu-pointer">{{ $t('addComplaintsForm.complaint') }}</span>
                                </label>

                                <label for="bank" class="radio-box">
                                    <input type="radio" class="input-radio" value="suggession" name="type" id="bank">
                                    <span class="fs-15 c-black cu-pointer">{{ $t('addComplaintsForm.suggestion') }}</span>
                                </label>
                            </div>
                        </div>

                        <div class="input-g">
                            <div class="main-input">
                                <input type="text" class="input-me validInputs" valid="title" name="title" v-model="title"
                                    :placeholder="$t('addComplaintsForm.title')">
                            </div>
                        </div>

                        <ClientOnly>
                            <div class="input-g">
                                <div class="main-input">
                                    <textarea class="input-me text-area validInputs" valid="message" name="content"
                                        v-model="message" :placeholder="$t('addComplaintsForm.message')">
                                    </textarea>
                                </div>
                            </div>
                        </ClientOnly>

                        <div class="input-g d-flex gap-3 flex-wrap">
                            <label for="uploadImgs" class="upload-label">
                                <input id="uploadImgs" type="file" accept="image/*" class="hidden-input" multiple
                                    @change="uploadImgs">
                                <i class="pi pi-cloud-upload"></i>
                                <span>{{ $t('addComplaintsForm.img') }}</span>
                            </label>

                            <div class='hidden-img' v-for="(img, i) in images" :key="img.name">
                                <img  loading="lazy" src='' :class="`img${i}`" :alt="img.name" />

                                <span class='remove-img' @click="removeImage(i)">
                                    <i class="pi pi-times"></i>
                                </span>
                            </div>
                        </div>

                        <div class="buttons mt-4 justify-content-center">
                            <button type="submit" class="main-btn up lg" :disabled="loading">
                                <span v-if="!loading">
                                    {{ $t('formBtns.send') }}
                                </span>
                                <div v-if="loading">
                                    {{ $t('formBtns.sendLoading') }}
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                </div>
                            </button>
                        </div>
                    </form>

                </div>
            </div>

        </div>
    </main>

    <!-- Done Modal -->
    <Dialog id="done" class="xl" v-model:visible="done" modal>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <div class="right_sec">
                    <img  loading="lazy" src="@/assets/imgs/right_img.gif" alt="image" class="right_img mx-auto">
                    <p class="fs14 c-black text-center mb-4">{{ $t('modals.done.text') }}</p>
                    <div class="buttons justify-content-center">
                        <NuxtLink to="/complaints" class="main-btn modal_btn up">{{ $t('nav.profile.complaints') }}</NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
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

/******************* Data *******************/

// Store
const store = useAuthStore();
const { token, notificationToken } = storeToRefs(store);


// Form
const complaintForm = ref(null);

// Name
const name = ref('');
// Phone
const phone = ref('');
// Title
const title = ref('');
// Message
const message = ref('');

// Errors
const errors = ref([])

// Loading
const loading = ref(false);

// Modal
const done = ref(false);

// countries
const selectedCountry = ref({});
const countries = ref([]);

// images
const images = ref([]);

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// Upload Imgs
function uploadImgs(e) {

    var selectedImgs = e.target.files;
    for (let i = 0; i < selectedImgs.length; i++) {
        images.value.push(selectedImgs[i]);
    }

    for (let i = 0; i < images.value.length; i++) {
        let reader = new FileReader();
        reader.addEventListener('load', function () {
            document.querySelector(`.img${i}`).src = reader.result
        }.bind(this), false);

        reader.readAsDataURL(images.value[i]);
    }
}

// Remove Img
function removeImage(index) {
    images.value.splice(index, 1);
}


// Get All countries
const getCountries = async () => {
    await axios.get('countries').then(res => {
        if (response(res) == "success") {
            countries.value = res.data.data;
            selectedCountry.value = countries.value[0];
        }
    }).catch(err => console.log(err));
}

// Validation Function
function validate() {
    let allInputs = document.querySelectorAll('.validInputs');
    for (let i = 0; i < allInputs.length; i++) {
        if (allInputs[i].value === '') {
            errors.value.push(t(`validation.${allInputs[i].name}`));
        }
    }
}


// contactUs Function
const addComplaints = async () => {
    loading.value = true;
    const fd = new FormData(complaintForm.value);
    fd.append('country_code', selectedCountry.value.key);

    for (let img of images.value) {
        fd.append('attachments[]', img);
    }

    if(!token.value){
        fd.append('device_id', notificationToken.value);
        fd.append('device_type', 'web');
    }

    validate();

    if (errors.value.length) {
        errorToast(errors.value[0]);
        loading.value = false;
        errors.value = [];
    } else {
        await axios.post('add-complaint', fd, config.value).then(res => {
            if (response(res) == "success") {

                done.value = true;
                complaintForm.value.reset();

            } else {
                errorToast(res.data.msg);
            }
            loading.value = false;
        }).catch(err => console.log(err));
    }
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
onMounted(async ()=>{
    await getCountries();
});

/******************* Required Auth *******************/

</script>

<style lang="scss"></style>