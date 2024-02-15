<template>
    <button @click="routeFunc" class="category_item" :class="{'active': item.active}">
        <img :src="item.image" alt="" class="category_img">
        <h5 class="category_name">{{ item.name }}</h5>
    </button>
</template>

<script setup>
/******************* Plugins *******************/

/******************* DATA *******************/
const router = useRouter();

/******************* Provide && Inject *******************/
const view = inject('view', true);

/******************* Emits *******************/
const emit = defineEmits(['categoryId']);

/******************* Props *******************/
const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
    routeName: {
        type: String,
        required: false,
    }
});


/******************* Methods *******************/
const routeFunc = () => {
    if(view) {
        router.push(route.value);
    } else{
        emit('categoryId', props.item.id);
    }
}

/******************* Computed *******************/
const route = computed(() => {
    return props.routeName ? { path: `/${props.routeName}` } : { path: `categories/${props.item.id}` }
})
/******************* Watch *******************/

/******************* Mounted *******************/

</script>

<style></style>