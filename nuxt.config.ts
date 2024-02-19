// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      title: "Murouj site",
      htmlAttrs: {
        lang: "ar",
      },
      meta: [
        {
          name: "description",
          content:
            "شركة مروج الدولي للمعجنات. شركة متخصصة في إنتاج الفطائر وجميع أنواع المعجنات والمخبوزات المميزة بحشوات متعددة، ومتخصصون في إنتاج الكيك والنواشف بأنواعها المت",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
    },
  },
  css: [
    "bootstrap/dist/css/bootstrap.rtl.css",
    "primevue/resources/themes/lara-light-green/theme.css",
    "primeicons/primeicons.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
    "~/assets/css/main.scss",
  ],
  modules: [
    "nuxt-primevue",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  devtools: { enabled: false },
});
