<template>
  <v-container>
    <v-row no-gutters>
      <v-col v-for="n in 12" :key="n" cols="12" sm="3">
        <!-- <v-card class="pa-2" outlined tile> One of three columns </v-card> -->
        <v-select
          :label="labels[n-1]"
          v-model="selected"
          :items="select"
          item-text="value"
          outlined
          multiple
          return-object
          style="padding-right: 20px"
        ></v-select>
      </v-col>
    </v-row>
    <!-- <div class="center">
    <p>The text within the div is centered horizontally.</p>
    </div> -->
    <v-row :align="center" no-gutters>
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
      select: [
        {
          value: "Impresso",
        },
        {
          value: "Digital",
        },
        {
          value: "Audiovisual",
        },
      ],
      selected: [],
      labels: [
        "Edital",
        "Editora",
        "Coleção",
        "Volume",
        "Série",
        "Componente",
        "Exemplar",
        "Formato",
        "Tipo do Recurso",
        "Tipo de Arquivo",
        "Nome do Arquivo",
        "Extensão do Arquivo",
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
