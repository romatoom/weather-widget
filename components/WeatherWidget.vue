<template>
  <div class="weather-widget" :class="{ dark: isNight }">
    <!--<button @click="toggle">GO</button>-->
    <transition name="fade">
      <div v-if="!weatherStore.loading">
        <CityChanger />
        <WeatherForToday
          :weatherToday="weatherStore.weatherToday"
        ></WeatherForToday>
        <Divider class="opacity-70" />
        <WeatherForecast
          :weatherForecast="weatherStore.weatherForecast"
        ></WeatherForecast>
      </div>
    </transition>

    <div v-if="weatherStore.loading" class="progress-spinner-wrapper">
      <ProgressSpinner />
    </div>
  </div>
</template>

<script setup></script>

<script>
import WeatherForToday from "@/components/weather-widget/WeatherForToday.vue";
import WeatherForecast from "@/components/weather-widget/WeatherForecast.vue";

export default {
  name: "WeatherWidget",

  components: {
    WeatherForToday,
    WeatherForecast,
  },
};
</script>

<script setup>
import { ref, watch, onMounted } from "vue";

const show = ref(true);

const toggle = () => {
  show.value = !show.value;
};

const cityStore = useCityStore();
const weatherStore = useWeatherStore();

const isNight = computed(() => weatherStore.weatherToday?.isNight);

watch(
  () => cityStore.currentCity,
  async (newValue) => {
    await Promise.allSettled([
      weatherStore.fetchWeather({ lat: newValue.lat, lon: newValue.lon }),
      weatherStore.fetchWeatherForecast({
        lat: newValue.lat,
        lon: newValue.lon,
      }),
    ]);
  },
  { deep: true }
);

onMounted(async () => {
  await cityStore.fetchCities("Тюмень");
  cityStore.setCurrentCity(cityStore.citiesList[0]);
});
</script>

<style lang="scss" scoped>
.weather-widget {
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
  font-weight: 200;
  color: var(--dark);
  background-color: var(--light);
  max-width: 400px;
  height: 265px;
  border-radius: 12px;
  border: 1px solid var(--gray-light);
  transition: background-color 0.6s ease;

  &.dark {
    background-color: var(--dark);
    border-color: var(--dark);
    color: white;
  }
}

.progress-spinner-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fade-leave-active,
.fade-enter-active {
  transition: opacity 0.2s;
}

.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}
</style>
