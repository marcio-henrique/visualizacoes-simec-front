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
          background: "#fff",
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

      if (this.filters.length > 0) {
        console.log("filters", this.filters);
        this.filters.forEach((filter) => {
          if (filter !== undefined && filter.length > 0) {
            console.log("fifi", filter);

            if (filter.length == 1) {
              console.log(filter[0]);
              params[filter[0].group] = filter[0].title;
            } else {
              params[filter[0].group] = JSON.stringify(
                filter.map((y) => y.title)
              );
            }
          }
        });
      }

      console.log(params);

      this.groupBy({
        params: params,
      }).then((response) => {
        // console.log(response);
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
