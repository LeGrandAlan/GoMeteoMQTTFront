<template>
  <div class="gaci-card">
    <div class="gaci-card__header">
      <div class="gaci-card__title">
        {{ airport.name }}
        <span>Ville</span>
      </div>
      <div class="gaci-card__summary">
        <div class="gaci-card__summary__item"
             :class="{ '-selected': selected === 'humidity' }"
             @click="selectGraph('humidity')">
          <span class="gaci-card__summary__title -humidity">Humidité</span>
          <span>
          <span class="gaci-card__summary__value">{{ airport.humidity.average }}</span>
          %
        </span>
        </div>
        <div class="gaci-card__summary__item"
             :class="{ '-selected': selected === 'wind' }"
             @click="selectGraph('wind')">
          <span class="gaci-card__summary__title -wind">Vent</span>
          <span>
          <span class="gaci-card__summary__value">{{ airport.wind.average }}</span>
          km/h
        </span>
        </div>
        <div class="gaci-card__summary__item"
             :class="{ '-selected': selected === 'pressure' }"
             @click="selectGraph('pressure')">
          <span class="gaci-card__summary__title -pressure">Pression</span>
          <span>
          <span class="gaci-card__summary__value">{{ airport.pressure.average }}</span>
          unit
        </span>
        </div>
      </div>
    </div>
    <div class="gaci-card__details gaci-mt-1" :class="`-${selected}`" v-if="selected">
      <GChart
        type="LineChart"
        :data="getData(selected, airport[selected].results)"
        :options="getOptions(selected)"
      />
      <!--<div v-for="(item, index) in airport[selected].results" :key="item.date + index">
        {{ item.date.split(' ')[0].split('-').reverse().join('/') }} à
        {{ item.date.split(' ')[1].split(':').slice(0, 2).join(':') }}:
        {{ item.value }}
      </div>-->
    </div>
  </div>
</template>
<script>
import { GChart } from 'vue-google-charts';

export default {
  name: 'card',
  props: {
    airport: Object,
  },
  components: {
    GChart,
  },
  data() {
    return {
      selected: undefined,
      labels: {
        humidity: 'Humidité',
        pressure: 'Pression',
        wind: 'Vent',
      },
      colors: {
        humidity: '#5F9EA0',
        wind: '#3CB371',
        pressure: '#A54748',
      },
    };
  },
  methods: {
    selectGraph(type) {
      this.selected = type === this.selected ? undefined : type;
    },
    getData(type, data) {
      const valueTable = data.map((x) => {
        const date = `${x.date.split(' ')[0].split('-').reverse().join('/')} ${x.date.split(' ')[1].split(':').slice(0, 2).join(':')}`;
        return [date, x.value];
      });
      console.log(valueTable);
      return [
        [Date, this.labels[type]],
        ...valueTable,
      ];
    },
    getOptions(selected) {
      return {
        height: 150,
        legend: 'none',
        colors: [this.colors[selected]],
        pointSize: 5,
        lineWidth: 1,
      };
    },
  },
};
</script>
