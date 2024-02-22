// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    openWeatherApiKey: "NUXT_OPEN_WEATHER_API_KEY",
    dadataApiKey: "NUXT_DADATA_API_KEY",
    public: {
      useMocks: "NUXT_PUBLIC_USE_MOCKS",
      openWeatherApiUrl: "NUXT_PUBLIC_OPEN_WEATHER_API_URL",
      dadataApiUrl: "NUXT_PUBLIC_DADATA_API_URL",
    },
  },
  modules: ["@pinia/nuxt", "nuxt-primevue", "@nuxt/image", "nuxt-svgo"],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  primevue: {
    components: {
      include: ["AutoComplete", "OverlayPanel", "ProgressSpinner", "Divider"],
    },
  },
  css: [
    "primevue/resources/themes/aura-light-green/theme.css",
    "@/assets/styles/index.scss",
  ],
});
