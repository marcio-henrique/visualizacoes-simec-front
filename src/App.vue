<template>
  <v-app :style="{ background: $vuetify.theme.themes['light'].wrapColor }">
    <v-main>
      <main-dashboard/>
    </v-main>
  </v-app>
</template>

<script>
import MainDashboard from './components/MainDashboard';

export default {
  name: 'App',

  components: {
    MainDashboard
  },

  data: () => ({
    //
  }),
};
</script>
