<template>
  <Pie
    :chart-options="chartOptions"
    :chart-data="{
      labels: noSymbol ? ['None'] : getDataByKey('symbol'),
      datasets: [
        {
          backgroundColor: noSymbol
            ? ['#D9D9D9']
            : ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
          data: noSymbol ? [100] : getDataByKey('lastPrice')
        }
      ]
    }"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { mapGetters } from "vuex";
import { Pie } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: "PieChart",
  components: {
    Pie
  },
  props: {
    chartId: {
      type: String,
      default: "pie-chart"
    },
    datasetIdKey: {
      type: String,
      default: "label"
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: "",
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  computed: mapGetters(["noSymbol", "getDataByKey"])
};
</script>
