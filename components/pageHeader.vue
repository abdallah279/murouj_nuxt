<template>
    <div :class="margin">
        <img v-if="logo" :src="src || loginLogo" alt="" class="login_logo sm mx-auto mb-4 d-block">
        <h1 class="fs16 ff-d text-center mb-3">{{ title }}</h1>
        <p class="c-black text-center" v-if="desc">{{ desc }}</p>
    </div>
</template>


<script setup>
/******************* Import *******************/

/******************* Data *******************/
import loginLogo from '@/assets/imgs/login_logo.png'

/******************* Props *******************/
const props = defineProps({
    margin: {
        type: String,
    },
    logo: {
        type: Boolean,
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String
    },
    src: {
        type: String
    },
});


/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>

<style></style>