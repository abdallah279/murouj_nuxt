import { defineStore } from "pinia";

// i18n
// import { useI18n } from 'vue-i18n';

// const { locale, t } = useI18n({ useScope: 'global' });

export const useGlobalStore = defineStore("global", {
  state: () => ({
    shippingCount: 0,
    countryLocal: {
      id: 1,
      name: 't("country.country")',
    },
    cityLocal: {
      id: 3,
      name: 't("country.city")',
    },
  }),
  actions: {},
  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: "strict",
    }),
  },
});
