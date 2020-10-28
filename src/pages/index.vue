<template>
  <div class="gaci-mx-1 gaci-my-2">
    <div>
      <h2>Affiner par prériode</h2>
      <label>
        <input class="gaci-input gaci-mr-1"
               v-model="searchParams.startDate"
               type="date"
               :max="searchParams.endDate">
      </label>
      <label>
        <input class="gaci-input gaci-mr-1"
               v-model="searchParams.endDate"
               type="date"
               :min="searchParams.startDate"
               :max="today">
      </label>
      <button class="gaci-button" @click="searchAirports(searchParams)">Trier</button>
    </div>
    <div class="gaci-mt-15 gaci-text--blue gaci-text--bold">{{ airports.length }} résultats</div>
    <div class="gaci-card__container">
      <card v-for="item in airports" :key="item.Id" :airport="item" :dates="actualDates"/>
    </div>
  </div>
</template>

<script>
import card from '../components/card.vue';
import api from '../api/api';

export default {
  name: 'Home',
  components: {
    card,
  },
  data() {
    return {
      today: undefined,
      searchParams: {
        startDate: '2017-08-04',
        endDate: '2017-08-04',
      },
      actualDates: undefined,
      airports: [],
    };
  },
  methods: {
    getCaptors(searchParams) {
      this.actualDates = JSON.parse(JSON.stringify(searchParams));
    },
  },
  mounted() {
    this.today = new Date();
    const dd = String(this.today.getDate()).padStart(2, '0');
    const mm = String(this.today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = this.today.getFullYear();
    this.today = `${yyyy}-${mm}-${dd}`;
    this.searchParams.startDate = `${yyyy}-${mm}-01`;
    this.searchParams.endDate = this.today;
    this.actualDates = JSON.parse(JSON.stringify(this.searchParams));
    api.getAirports()
      .then((response) => {
        this.airports = response;
      });
    /* api.getSensor()
      .then((data) => {
        const aiports = new Set();
        const captors = new Set();
        data.forEach((x) => {
          aiports.add(x.AirportId);
          captors
        });
        console.log();
      }); */
  },
};
</script>
