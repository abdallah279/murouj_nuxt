// pinia store
import { useAuthStore } from "~/stores/auth";

// Store
const store = useAuthStore();
const { isLoggedIn } = storeToRefs(store);

// Toast
const { errorToast } = toastMsg();

// Translate
const nuxtApp = useNuxtApp();

// get i18n t
const t = nuxtApp.vueApp.config.globalProperties.$t;

export default defineNuxtRouteMiddleware((to, from) => {
  if (isLoggedIn.value === false && to.meta.middleware == "auth") {
    errorToast(t('validation.requiresAuth'));
    return abortNavigation("Insufficient permissions.");
  }
});
