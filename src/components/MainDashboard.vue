<template>
  <div>
    <v-row id="title-row" justify="center" align="center">
      <p id="title-text">REDs do SIMEC</p>
    </v-row>
    <v-container v-if="loaded">
      <v-row no-gutters>
        <v-col v-for="n in 12" :key="n" cols="12" sm="3">
          <v-select
            background-color="white"
            :label="labels[n - 1].title"
            v-model="selected[n - 1]"
            :items="filters[n - 1]"
            item-text="title"
            outlined
            multiple
            return-object
            style="padding-left: 10px; padding-right: 10px"
          >
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index === 0">
                <span>{{
                  item.title.length > 19
                    ? item.title.substring(0, 15) + "..."
                    : item.title
                }}</span>
              </v-chip>
              <span v-if="index === 1" class="grey--text text-caption">
                (+{{ selected[n - 1].length - 1 }} outros)
              </span>
            </template>
          </v-select>
        </v-col>
      </v-row>
      <v-row align="center" no-gutters>
        <v-col
          cols="6"
          style="background-color: '#ffffff'"
          v-for="(chartConfig, i) in chartConfigs"
          :key="i + 1"
        >
          <chart-card
            class="pa-2"
            :chartConfig="chartConfig"
            :filters="selected"
          >
          </chart-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ChartCard from "./ChartCard.vue";

export default {
  name: "MainDashboard",

  components: { ChartCard },

  data: () => {
    return {
      loaded: 0,
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
        {
          group: "baixado",
          count: "id",
          title: "Selecionado",
        },
      ],
      filters: [],
      selected: [],
      labels: [
        {
          title: "Edital",
          group: "edital",
          count: "id",
        },
        {
          title: "Editora",
          group: "editora",
          count: "id",
        },
        {
          title: "Coleção",
          group: "colecao",
          count: "id",
        },
        {
          title: "Volume",
          group: "volume",
          count: "id",
        },
        {
          title: "Série",
          group: "serie",
          count: "id",
        },
        {
          title: "Componente",
          group: "componente",
          count: "id",
        },
        {
          title: "Exemplar",
          group: "exemplar",
          count: "id",
        },
        {
          title: "Formato",
          group: "formato",
          count: "id",
        },
        {
          title: "Tipo do Recurso",
          group: "tipo",
          count: "id",
        },
        {
          title: "Tipo de Arquivo",
          group: "tipo_arquivo",
          count: "id",
        },
        {
          title: "Nome do Arquivo",
          group: "nome_arquivo",
          count: "id",
        },
        {
          title: "Extensão do Arquivo",
          group: "extensao_arquivo",
          count: "id",
        },
      ],
    };
  },
  async mounted() {
    await this.loadFilters();
  },
  methods: {
    ...mapActions(["groupBy", "count"]),
    loadFilters() {
      this.labels.forEach((label, i) => {
        this.groupBy({
          params: {
            group: label.group,
            count: label.count,
          },
        }).then((response) => {
          this.filters[i] = response.data;
        });
      });
      this.loaded = 1;
    },
  },
};
</script>
<style>
#title-row {
  background-color: rgba(0, 143, 251, 0.85);
  height: 80px;
  /* margin-top: 10px; */
  margin-bottom: 10px;
}
#title-text {
  color: #ffffff;
  margin-bottom: 0px;
  font-size: 30px;
}
.element {
  color: #ffffff;
}
</style>
