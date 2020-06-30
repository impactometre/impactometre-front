<template>
  <div class="results-detailled-view">
    <div class="results-detailled-view-header">
      <h1>Titre : {{ selected_view }}</h1>
      <button class="close-btn" @click.prevent="hideView">&#10006;</button>
    </div>
    <div class="results-detailled-view-content">
      <div class="results-chart-detailled">
        <ResultsChart
          :chart-data="$store.state.impact_on_spheres_detailled[selected_view]"
          :options="chartOptions"
          :height="50"
        ></ResultsChart>
      </div>
      <p>
        The disability-adjusted life year (DALY) is a measure of overall disease
        burden, expressed as the number of years lost due to ill-health,
        disability or early death.
      </p>
    </div>
  </div>
</template>

<script>
import ResultsChart from "./ResultsChart.js";
import store from "../store/MainStore.js";

export default {
  props: ["selected_view"],
  store,
  components: { ResultsChart },
  methods: {
    hideView() {
      this.$root.$emit("hide_results_detailled_view");
    },
  },
  data() {
    return {
      chartOptions: {
        maintainAspectRatio: true,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{ stacked: true }],
          yAxes: [{ stacked: true }]
        }
      },
    };
  },
};
</script>

<style>
.results-detailled-view {
  display: flex;
  flex-direction: column;
  padding: 30px;
  background: repeating-linear-gradient(
      -45deg,
      rgba(0,0,0,0),
      rgba(0,0,0,0) 10px,
      rgba(0,0,0,0.02) 10px,
      rgba(0,0,0,0.02) 20px
    );
}

/*
 * HEADER
 */

.results-detailled-view-header {
  width: 100%;
}
.results-detailled-view-header .close {
  top: -30px;
  padding-left: 30px;
}

/*
 * CONTENT
 */

.results-detailled-view-content {
  display: block;
  position: relative;
  height: 200px;
}
.results-detailled-view-content p {
  /* font-style: italic; */
}

/*
 * CHARTS
 */
.results-chart-detailled {
  margin-bottom: 25px;
  width: 100%;
}
</style>
