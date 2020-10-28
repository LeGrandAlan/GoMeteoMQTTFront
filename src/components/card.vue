<template>
  <div class="gaci-card">
    <div class="gaci-card__header">
      <div class="gaci-card__title">
        {{ airport.Name }}
        <span>{{ airport.City }}</span>
      </div>
      <div class="gaci-card__summary" v-if="dates !== undefined && captors !== undefined">
        <div class="gaci-card__summary__item"
             :class="{ '-selected': selected === 'temperature' }"
             @click="selectGraph('temperature')">
          <span class="gaci-card__summary__title -humidity">Température</span>
          <span>
          <span class="gaci-card__summary__value">{{ captors.temperature.average }}</span>
          °C
        </span>
        </div>
        <div class="gaci-card__summary__item"
             :class="{ '-selected': selected === 'wind' }"
             @click="selectGraph('wind')">
          <span class="gaci-card__summary__title -wind">Vent</span>
          <span>
          <span class="gaci-card__summary__value">{{ captors.wind.average }}</span>
          km/h
        </span>
        </div>
        <div class="gaci-card__summary__item"
             :class="{ '-selected': selected === 'pressure' }"
             @click="selectGraph('pressure')">
          <span class="gaci-card__summary__title -pressure">Pression</span>
          <span>
          <span class="gaci-card__summary__value">{{ captors.pressure.average }}</span>
          hPa
        </span>
        </div>
      </div>
      <button class="gaci-button -inverted -small"
              @click="getCaptors(dates)"
              v-else>
        <template v-if="loading">Chargement...</template>
        <template v-else>Afficher les relevés</template>
      </button>
    </div>
    <div class="gaci-card__details gaci-mt-1" :class="`-${selected}`" v-if="selected">
      <GChart
        type="LineChart"
        :data="getData(selected, captors[selected].results)"
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
import api from '../api/api';

export default {
  name: 'card',
  props: {
    airport: Object,
    dates: Object,
  },
  components: {
    GChart,
  },
  data() {
    return {
      loading: false,
      selected: undefined,
      captors: undefined,
      labels: {
        temperature: 'temperature',
        pressure: 'Pression',
        wind: 'Vent',
      },
      colors: {
        temperature: '#5F9EA0',
        wind: '#3CB371',
        pressure: '#A54748',
      },
    };
  },
  watch: {
    dates: {
      immediate: true,
      handler() {
        this.captors = undefined;
      },
    },
  },
  methods: {
    selectGraph(type) {
      this.selected = type === this.selected ? undefined : type;
    },
    getCaptors(dates) {
      if (!this.loading) {
        this.loading = true;
        const searchParams = JSON.parse(JSON.stringify(dates));
        searchParams.airportId = this.airport.Id;
        api.getCaptors(searchParams)
          .then((response) => {
            const wind = response.filter((x) => x.Type === 'wind').map((x) => ({ value: x.Value, date: x.Date }));
            const aWind = (wind.reduce((acc, current) => acc + current.value, 0)
              / wind.length).toFixed(1);
            const pressure = response.filter((x) => x.Type === 'pressure').map((x) => ({ value: x.Value, date: x.Date }));
            const aPressure = (pressure.reduce((acc, current) => acc + current.value, 0)
              / pressure.length).toFixed(2);
            const temperature = response.filter((x) => x.Type === 'temperature').map((x) => ({ value: x.Value, date: x.Date }));
            const aTemperature = (temperature.reduce((acc, current) => acc + current.value, 0)
              / temperature.length).toFixed(2);
            this.captors = {
              wind: { average: aWind, results: wind },
              pressure: { average: aPressure, results: pressure },
              temperature: { average: aTemperature, results: temperature },
            };
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    getData(type, data) {
      const valueTable = data.map((x) => {
        const date = `${x.date.split('T')[0].split('-').reverse().join('/')} ${x.date.split('T')[1].split(':').slice(0, 2).join(':')}`;
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
