import { defineStore } from "pinia";


export const useGlobalStore = defineStore("global", {
  state: () => ({
    lang: "ar",
    shippingCount: 0,
    countryLocal: {
      id: null,
      name: "",
    },
    cityLocal: {
      id: null,
      name: "",
    },
    countryChanged: false,
    countryID: 1,
    cartChanged: 0,
  }),
  actions: {},
  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: "strict",
    }),
  },
});
