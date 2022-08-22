<template>
  <div style="background-color: '#ffffff'">
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
        legend: {
          show: false,
        },
        // theme: {
        //   mode: "light",
        //   palette: "palette1",
        //   monochrome: {
        //     enabled: true,
        //     color: "#008ffbd9",
        //     shadeTo: "light",
        //     shadeIntensity: 0.65,
        //   },
        // },
        colors: [
          "#008ffbd9",
          "#00e396d9",
          "#feb019d9",
          "#ff4560d9",
          "#775dd0d9",
          "#546e7ad9",
          "#26a69ad9",
          "#d10ce8d9",
          "#f9a3a4",
        ],
        // colors: [
        //   "#33b2df",
        //   "#546E7A",
        //   "#d4526e",
        //   "#13d8aa",
        //   "#A5978B",
        //   "#2b908f",
        //   "#f9a3a4",
        //   "#90ee7e",
        //   "#f48024",
        //   "#69d2e7",
        // ],
        chart: {
          type: "bar",
          background: "#fff",
          height: 350,
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
        stroke: {
          width: [0, 4],
        },

        xaxis: {
          labels: {
            formatter: function (value) {
              return value;
            },
            trim: true,
            maxHeight: 70,
            rotate: -45,
          },
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "top", // top, center, bottom
            },
            distributed: true,
          },
        },
        dataLabels: {
          enabled: true,
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#00000099"],
          },
        },
        tooltip: {
          enabled: true,
          enabledOnSeries: undefined,
          intersect: false,
          inverseOrder: false,
          custom: undefined,

          style: {
            fontSize: "12px",
            fontFamily: undefined,
          },
          onDatasetHover: {
            highlightDataSeries: false,
          },
          x: {
            show: true,
          },
          items: {
            display: "none",
          },
          fixed: {
            position: "topRight",
            offsetX: 0,
            offsetY: 0,
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

      let loader = this.$loading.show({
          container: null,
          canCancel: false,
          onCancel: this.onCancel,
          opacity: 0.15
          // is-full-page: true
      });

      if (this.filters.length > 0) {
        this.filters.forEach((filter) => {
          if (filter !== undefined && filter.length > 0) {
            if (filter.length == 1) {
              params[filter[0].group] = filter[0].title;
            } else {
              params[filter[0].group] = JSON.stringify(
                filter.map((y) => y.title)
              );
            }
          }
        });
      }

      this.groupBy({
        params: params,
      }).then((response) => {
        this.chartData = response.data;
        loader.hide();
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
        style: {
          fontSize: "18px",
          color: "#00000099",
        },
      };
    },

    updateSeriesChart() {
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
