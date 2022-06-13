<template>
  <div>
    <apexchart
      ref="chart"
      type="bar"
      :options="optionsChart"
      :series="seriesChart"
      class="mt-3"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { mapActions } from "vuex";

export default {
  name: "ChartCard",
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    // chartType: {
    //   type: String,
    //   required: true,
    // },
    chartConfig: {
      required: true,
    },
    filters: {
      required: true,
    },
  },
  data: () => {
    return {
      optionsChart: {
        chart: {
          type: "bar",
          height: 350,
          // stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
          title: {
            align: "center",
            offsetX: 0,
            text: "",
          },
        },
      },
      chartData: {},
      seriesChart: [],
    };
  },
  async mounted() {
    await this.loadChartData();
  },

  methods: {
    ...mapActions(["groupBy", "count"]),

    loadChartData() {
      let params = {
        group: this.chartConfig.group,
        count: this.chartConfig.count,
      };

      if (Object.keys(this.filters).length > 0) {
        for (const [key, value] of Object.entries(this.filters)) {
          if (Array.isArray(value)) {
            value.forEach((item) => {
              console.log(item);
              //TODO filters
              // console.log(encodeURIComponent(JSON.stringify(['sad', 'dsa', 'weqw', 'sd'])));
            });
          } else {
            params[key] = value;
          }
        }
      }

      // const { data } = this.groupBy({
      this.groupBy({
        params: params,
      }).then((response) => {
        console.log(response);
        this.chartData = response.data;
        this.updateOptionsChart();
        this.updateSeriesChart();
      });
    },

    updateOptionsChart() {
      this.optionsChart = {
        ...{
          labels: this.chartData.map((y) => y.title),
        },
      };

      this.optionsChart.title = {
        text: this.chartConfig.title,
        align: "center",
        offsetX: 0,
      };
    },

    updateSeriesChart() {
      console.log("gmmm");
      this.seriesChart = [];

      this.seriesChart.push({
        name: "Valor",
        data: this.chartData.map((y) => y.value),
      });
    },
  },
  watch: {
    chartConfig() {
      this.loadChartData();
    },
    filters() {
      this.loadChartData();
    },
  },
};
</script>
