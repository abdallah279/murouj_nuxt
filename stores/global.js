import { defineStore } from "pinia";

// i18n
// import { useI18n } from 'vue-i18n';

// const { locale, t } = useI18n({ useScope: 'global' });

export const useGlobalStore = defineStore("global", {
  state: () => ({
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
  }),
  actions: {},
  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: "strict",
    }),
  },
});
