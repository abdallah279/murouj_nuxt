import axios from "axios";

// pinia store
import { useGlobalStore } from '~/stores/global';
// import { storeToRefs } from 'pinia';
// const globalStore = useGlobalStore();
// const { lang } = storeToRefs(globalStore);

// const myLang = useGlobalStore().$state.lang;
// import { useStore } from 'pinia';

// import { defineNuxtPlugin } from 'nuxt';

// export default defineNuxtPlugin((context) => {
//   const myState = useGlobalStore(context.$pinia).$state.myState;
//   // Use myState as needed
// });
// console.log(useGlobalStore);

export const useApi = () => {
  // const globalStore = useGlobalStore();
  const baseURL = "https://backend.murouj.aait-sa.com/api/";
  // axios.defaults.headers.lang = lang.value;

  return axios.create({
    baseURL,
  });
};
