<template>
  <WeatherWidget :days="3"></WeatherWidget>
</template>

<script>
import WeatherWidget from "@/components/WeatherWidget.vue";
export default {
  components: { WeatherWidget },
};
</script>

<script setup></script>

<style></style>
