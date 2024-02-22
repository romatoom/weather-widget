import { API_URL } from "./settings.js";

export default defineEventHandler(async (event) => {
  const apiKey = useRuntimeConfig().openWeatherApiKey;

  const query = await getQuery(event);

  const options = {
    method: "GET",
    query: {
      ...query,
      appid: apiKey,
      units: "metric",
      lang: "ru",
      cnt: 24,
    },
  };

  try {
    var data = await $fetch(`${API_URL}/forecast`, options);
  } catch (err) {
    console.log("err:", err);
    return null;
  }

  return data;
});
