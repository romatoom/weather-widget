import { defineStore } from "pinia";

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    loadingWeatherToday: true,
    loadingWeatherForecast: true,
    weatherToday: null,
    weatherForecast: null,
  }),
  getters: {
    loading: (state) => {
      return state.loadingWeatherToday || state.loadingWeatherForecast;
    },
  },
  actions: {
    async fetchWeather({ lat, lon }) {
      this.loadingWeatherToday = true;

      try {
        const data = await $fetch("/api/openweather/weatherToday", {
          method: "GET",
          query: {
            lat,
            lon,
          },
        });

        this.weatherToday = data
          ? {
              temp: data.main.temp,
              feelsLike: data.main.feels_like,
              humidity: data.main.humidity,
              windSpeed: data.wind.speed,
              iconURL: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
              description: data.weather[0].description,
              pressure: data.main.pressure,
              isNight: data.weather[0].icon.includes("n"),
            }
          : null;
      } catch (err) {
        return null;
      } finally {
        this.loadingWeatherToday = false;
      }
    },

    async fetchWeatherForecast({ lat, lon, cnt }) {
      this.loadingWeatherForecast = true;

      try {
        const data = await $fetch("/api/openweather/weatherForecast", {
          method: "GET",
          query: {
            lat,
            lon,
            cnt,
          },
        });

        this.weatherForecast = data?.list
          ? data.list.map((d) => ({
              tempMin: Math.round(d.main.temp_min),
              tempMax: Math.round(d.main.temp_max),
              temp: Math.round(d.main.temp),
              dt: d.dt,
              iconURL: `https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`,
              description: d.weather[0].description,
              date: formatDate(new Date(d.dt * 1000)),
            }))
          : null;
      } catch (err) {
        return null;
      } finally {
        this.loadingWeatherForecast = false;
      }
    },
  },
});
