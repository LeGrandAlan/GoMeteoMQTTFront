<template>
  <div id="app">
    <navbar style="margin-bottom: 1rem"/>
    <router-view/>
  </div>
</template>
<script>
import navbar from './components/navbar.vue';

export default {
  name: 'app',
  components: {
    navbar,
  },
};
</script>
