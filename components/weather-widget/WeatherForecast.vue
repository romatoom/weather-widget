<template>
  <div v-if="props.weatherForecast" class="weather-forecast">
    <div v-dragscroll.x class="weather-items grabbable">
      <div
        class="item"
        v-for="weatherItem in props.weatherForecast"
        :key="weatherItem.dt"
      >
        <span class="time">{{ weatherItem.date }}</span>
        <div class="weather-icon">
          <NuxtImg class="content" :src="weatherItem.iconURL" />
        </div>
        <span class="temp">{{ weatherItem.temp }}</span>
      </div>
    </div>
  </div>
  <div class="weather-forecast flex-block center" v-else>Нет данных</div>
</template>

<script setup>
const props = defineProps({
  weatherForecast: {
    type: [Object, null],
    required: true,
  },
});
</script>

<script>
export default {
  name: "WeatherForecast",
};
</script>

<style lang="scss">
.weather-forecast {
  height: 50px;
}

.weather-items {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  gap: 10px;

  & .item {
    min-width: 65px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.weather-icon {
  margin-bottom: -12px;
  margin-top: -9px;
}

.temp {
  font-size: 14px;
  font-weight: 400;
}

.time {
  font-size: 12px;
}

.temp,
.feels-like {
  &:after {
    content: "\00B0";
    font-weight: 400;
  }
}
</style>
