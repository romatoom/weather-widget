import uniqWith from "lodash/uniqWith.js";

import { API_URL } from "./settings.js";

const equalPlaces = (place1, place2) =>
  place1.city === place2.city &&
  place1.lat === place2.lat &&
  place1.lon === place2.lon;

export default defineEventHandler(async (event) => {
  const token = useRuntimeConfig().dadataApiKey;

  const { query } = await readBody(event);

  /*if (useRuntimeConfig().public.useMocks) {
    return getMockCities();
  }*/

  const options = {
    method: "POST",
    body: { query },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + token,
      mode: "cors",
    },
  };

  let data;
  try {
    data = await $fetch(API_URL, options);
  } catch (err) {
    console.log("err:", err);
    return [];
  }

  const citiesStartsWithQuery =
    data.suggestions?.length > 0
      ? data.suggestions
          .filter(
            (d) =>
              d.data.city?.toUpperCase().startsWith(query.toUpperCase()) &&
              d.data.geo_lat &&
              d.data.geo_lon
          )
          .map((c) => ({
            country: c.data.country,
            region: c.data.region_with_type,
            city: c.data.city,
            descr: c.value,
            lat: c.data.geo_lat,
            lon: c.data.geo_lon,
          }))
      : [];

  return uniqWith(citiesStartsWithQuery, equalPlaces);
});
