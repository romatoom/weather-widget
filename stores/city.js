import { defineStore } from "pinia";

export const useCityStore = defineStore("city", {
  state: () => ({
    currentCity: null,
    placesList: [],
  }),
  getters: {
    citiesList: (state) => {
      return state.placesList.map((place) => {
        place.label = `${place.country}, ${place.region}, ${place.city}`;
        return place;
      });
    },
  },
  actions: {
    async fetchCities(query) {
      this.placesList = await $fetch("/api/dadata/cities", {
        method: "POST",
        body: { query },
      });
    },

    setCurrentCity(city) {
      this.currentCity = city;
      this.placesList = [];
    },
  },
});
