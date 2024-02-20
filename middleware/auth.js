// pinia store
import { useAuthStore } from '~/stores/auth';

// Store
const store = useAuthStore();
const { isLoggedIn } = storeToRefs(store);

// Toast
// const { errorToast } = toastMsg();

export default defineNuxtRouteMiddleware((to, from) => {

  if (isLoggedIn.value === false && to.meta.middleware == "auth") {
    return navigateTo("/");
    // errorToast("يجب عليك تسجيل الدخول");
  }
});
