<template>
  <div class="gaci-mx-1 gaci-my-2">
    <div>
      <h2>Affiner par prériode</h2>
      <label>
        <input class="gaci-input gaci-mr-1"
               v-model="searchParams.period.start"
               type="date"
               :max="searchParams.period.end">
      </label>
      <label>
        <input class="gaci-input gaci-mr-1"
               v-model="searchParams.period.end"
               type="date"
               :min="searchParams.period.start"
               :max="today">
      </label>
      <button class="gaci-button">Trier</button>
    </div>
    <div class="gaci-mt-15 gaci-text--blue gaci-text--bold">{{ airports.length }} résultats</div>
    <div class="gaci-card__container">
      <card v-for="item in airports" :key="item.id" :airport="item"/>
    </div>
  </div>
</template>

<script>
import card from '../components/card.vue';

export default {
  name: 'Home',
  components: {
    card,
  },
  data() {
    return {
      today: undefined,
      searchParams: {
        period: {
          start: '2017-08-04',
          end: '2017-08-04',
        },
      },
      airports: [
        {
          id: 'ABC',
          name: 'Aéroport Charles de Gaulle',
          wind: {
            average: 22.5,
            results: [
              { value: 15.0, date: '2020-02-17 15:44:56' },
              { value: 30.0, date: '2020-02-17 17:44:56' },
              { value: 35.0, date: '2020-02-17 19:44:56' },
            ],
          },
          pressure: {
            average: 1.5,
            results: [
              { value: 2.4, date: '2020-02-17 15:44:56' },
              { value: 0.6, date: '2020-02-17 17:44:56' },
            ],
          },
          humidity: {
            average: 60,
            results: [
              { value: 80, date: '2020-02-17 15:44:56' },
              { value: 40, date: '2020-02-17 17:44:56' },
            ],
          },
        },
        {
          id: 'DEF',
          name: 'Aéroport Charles de Gaulle',
          wind: {
            average: 22.5,
            results: [
              { value: 15.0, date: '2020-02-17 15:44:56' },
              { value: 30.0, date: '2020-02-17 17:44:56' },
            ],
          },
          pressure: {
            average: 1.5,
            results: [
              { value: 2.4, date: '2020-02-17 15:44:56' },
              { value: 0.6, date: '2020-02-17 17:44:56' },
            ],
          },
          humidity: {
            average: 60,
            results: [
              { value: 80, date: '2020-02-17 15:44:56' },
              { value: 40, date: '2020-02-17 17:44:56' },
            ],
          },
        },
        {
          id: 'GHI',
          name: 'Aéroport Charles de Gaulle',
          wind: {
            average: 22.5,
            results: [
              { value: 15.0, date: '2020-02-17 15:44:56' },
              { value: 30.0, date: '2020-02-17 17:44:56' },
            ],
          },
          pressure: {
            average: 1.5,
            results: [
              { value: 2.4, date: '2020-02-17 15:44:56' },
              { value: 0.6, date: '2020-02-17 17:44:56' },
            ],
          },
          humidity: {
            average: 60,
            results: [
              { value: 80, date: '2020-02-17 15:44:56' },
              { value: 40, date: '2020-02-17 17:44:56' },
            ],
          },
        },
        {
          id: 'JKL',
          name: 'Aéroport Charles de Gaulle',
          wind: {
            average: 22.5,
            results: [
              { value: 15.0, date: '2020-02-17 15:44:56' },
              { value: 30.0, date: '2020-02-17 17:44:56' },
            ],
          },
          pressure: {
            average: 1.5,
            results: [
              { value: 2.4, date: '2020-02-17 15:44:56' },
              { value: 0.6, date: '2020-02-17 17:44:56' },
            ],
          },
          humidity: {
            average: 60,
            results: [
              { value: 80, date: '2020-02-17 15:44:56' },
              { value: 40, date: '2020-02-17 17:44:56' },
            ],
          },
        },
      ],
    };
  },
  mounted() {
    this.today = new Date();
    const dd = String(this.today.getDate()).padStart(2, '0');
    const mm = String(this.today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = this.today.getFullYear();
    this.today = `${yyyy}-${mm}-${dd}`;
    this.searchParams.period.start = `${yyyy}-${mm}-01`;
    this.searchParams.period.end = this.today;
  },
};
</script>
