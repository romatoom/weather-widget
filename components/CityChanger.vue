<template>
  <div class="city-changer" @click="toggleChangeCityForm">
    <IconLocation class="icon icon-location" />
    <span class="city-name">{{
      cityStore.currentCity?.city || "Выбрать город"
    }}</span>
  </div>

  <OverlayPanel ref="op">
    <AutoComplete
      v-model="value"
      :suggestions="cityStore.citiesList"
      optionLabel="label"
      placeholder="Введите название города"
      emptySearchMessage="Город не найден"
      :delay="300"
      @complete="search"
      @item-select="select"
    >
      <template #option="slotProps">
        <div>
          <div>{{ slotProps.option.descr }}</div>
          <div class="label">{{ slotProps.option.label }}</div>
        </div>
      </template>
    </AutoComplete>
  </OverlayPanel>
</template>

<script setup>
import IconLocation from "@/assets/icons/icon-location.svg";
const cityStore = useCityStore();

const op = ref();
const value = ref("");

const toggleChangeCityForm = (event) => {
  op.value.toggle(event);
};

const search = async (event) => {
  await cityStore.fetchCities(event.query);
};

const select = (event) => {
  value.value = "";
  cityStore.setCurrentCity(event.value);
  toggleChangeCityForm();
};
</script>

<style lang="scss">
.city-changer {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;
  font-size: 16px;
  font-weight: 400;
  color: var(--primary);
  cursor: pointer;
}

.label {
  font-size: 14px;
  color: var(--dark);
}

.city-name {
  margin-left: 2px;
}

.icon-location {
  width: 12px;
  height: 12px;
}

.p-autocomplete-input {
  width: 230px;
}
</style>
