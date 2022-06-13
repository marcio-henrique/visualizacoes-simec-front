<template>
  <v-container>
    <v-row
        :align="center"
        no-gutters
      >
      <v-col cols="5" v-for="(chartConfig, i) in chartConfigs" :key="i + 1">
        <chart-card class="pa-2" :chartConfig="chartConfig" :filters="filters">
        </chart-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import ChartCard from "./ChartCard.vue";

export default {
  name: "MainDashboard",

  components: { ChartCard },

  data: () => {
    return {
      filters: [],
      chartConfigs: [
        {
          group: "edital",
          count: "id",
          title: "Edital",
        },
        {
          group: "exemplar",
          count: "id",
          title: "Exemplar",
        },
        {
          group: "formato",
          count: "id",
          title: "Formato",
        },
        {
          group: "tipo_arquivo",
          count: "id",
          title: "Tipo do Arquivo",
        },
        {
          group: "extensao_arquivo",
          count: "id",
          title: "Extensão do Arquivo",
        },
      ],
    };
  },
  async mounted() {
    await this.loadCharts();
  },
  methods: {
    ...mapActions(["groupBy", "count"]),
    loadCharts() {
      const { data } = this.groupBy({
        params: {
          group: "tipo_arquivo",
          count: "id",
        },
      });
      console.log(data);
    },
  },
};
</script>
