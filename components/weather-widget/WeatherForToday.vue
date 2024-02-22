<template>
  <div
    v-if="props.weatherToday"
    class="weather-today flex-block vertical large-gap align-left"
  >
    <span class="bolder">Погода на сегодня</span>

    <div class="flex-block large-gap">
      <div class="temp">{{ Math.round(temp) }}</div>

      <div class="weather-icon">
        <NuxtImg class="content" :src="iconURL" />
      </div>

      <div class="flex-block vertical align-left small-text">
        <div class="first-upper bolder mb-3">{{ description }}</div>
        <div>
          Ощущается как
          <span class="feels-like">{{ Math.round(feelsLike) }}</span>
        </div>
      </div>
    </div>

    <div class="flex-block large-gap opacity-70">
      <div class="wind-speed flex-block">
        <IconWind class="icon" />
        <span class="value">{{ Math.round(windSpeed) }} м/с</span>
      </div>

      <div class="humidity flex-block">
        <IconHumidity class="icon" />
        <span class="value">{{ humidity }}%</span>
      </div>

      <div class="pressure flex-block">
        <IconPressure class="icon" />
        <span class="value">{{ pressure }} мм рт. ст.</span>
      </div>
    </div>
  </div>
  <div class="weather-today weather-forecast flex-block center" v-else>
    Нет данных
  </div>
</template>

<script>
export default {
  name: "WeatherForToday",
};
</script>

<script setup>
import IconHumidity from "@/assets/icons/icon-humidity.svg";
import IconPressure from "@/assets/icons/icon-pressure.svg";
import IconWind from "@/assets/icons/icon-wind.svg";

const props = defineProps({
  weatherToday: {
    type: [Object],
    required: true,
  },
});

const {
  iconURL,
  humidity,
  temp,
  windSpeed,
  description,
  feelsLike,
  pressure,
  date,
} = props.weatherToday;
</script>

<style lang="scss" scoped>
.value {
  font-size: 12px;
  font-weight: 500;
}

.temp {
  font-size: 48px;
  font-weight: 500;
  color: var(--primary);
}

.feels-like {
  font-weight: 500;
}

.temp,
.feels-like {
  &:after {
    content: "\00B0";
    font-weight: 500;
  }
}

.weather-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  & .content {
    width: 70px;
    height: 70px;
  }
}

.weather-today {
  height: 128px;

  & .feels-like {
    &.span {
      font-weight: 400;
    }
  }
}
</style>
