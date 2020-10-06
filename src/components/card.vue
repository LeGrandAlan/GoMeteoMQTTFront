<template>
  <div class="gaci-card">
    <div class="gaci-card__title">{{ airport.name }}</div>
    <div class="gaci-card__summary">
      <div class="gaci-card__summary__item"
           :class="{ '-selected': selected === 'humidity' }"
           @click="selected = 'humidity'">
        <span class="gaci-card__summary__title -humidity">Humidité</span>
        <span>
          <span class="gaci-card__summary__value">{{ airport.humidity.average }}</span>
          %
        </span>
      </div>
      <div class="gaci-card__summary__item"
           :class="{ '-selected': selected === 'wind' }"
           @click="selected = 'wind'">
        <span class="gaci-card__summary__title -wind">Vent</span>
        <span>
          <span class="gaci-card__summary__value">{{ airport.wind.average }}</span>
          km/h
        </span>
      </div>
      <div class="gaci-card__summary__item"
           :class="{ '-selected': selected === 'pressure' }"
           @click="selected = 'pressure'">
        <span class="gaci-card__summary__title -pressure">Pression</span>
        <span>
          <span class="gaci-card__summary__value">{{ airport.pressure.average }}</span>
          unit
        </span>
      </div>
    </div>
    <div class="gaci-card__details gaci-mt-1" :class="`-${selected}`">
      <div v-for="(item, index) in airport[selected].results" :key="item.date + index">
        {{ item.date.split(' ')[0].split('-').reverse().join('/') }} à
        {{ item.date.split(' ')[1].split(':').slice(0, 2).join(':') }}:
        {{ item.value }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'card',
  props: {
    airport: Object,
  },
  data() {
    return {
      selected: 'humidity',
    };
  },
};
</script>
