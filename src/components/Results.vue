<template>
  <div class="results">
    <div class="results-header">
      Résultats
      <div class="results-header-btn-actions">
        <button
          class="results-header-btn-reload"
          @click.prevent="updateResults"
        >
          Calculer
        </button>
        <button class="results-header-btn-export">Exporter</button>
      </div>
    </div>
    <div class="results-content">
      <div
        class="results-section"
        @click="display_results_detailled_view(section.name)"
        v-for="section in sections_comparatif"
        :key="section.name"
      >
        <h3>{{ section.title }}</h3>
        <div class="results-chart">
          <ResultsChart
            :key="re_render_results"
            :chart-data="chartData(section.name)"
            :options="chartOptions"
            :width="50"
            :height="90"
          ></ResultsChart>
        </div>
      </div>
    </div>
    <div class="results-detailled"></div>
  </div>
</template>

<script>
import ResultsChart from "./ResultsChart.js";
import store from "../store/MainStore.js";
import { sections_comparatif } from "../options/options.js";

export default {
  components: { ResultsChart },
  store: store,
  // TODO: add loaded data to wait for API call to finish.
  data() {
    return {
      re_render_results: false,
      scenarios_json: [],
      sections_comparatif,
      chartOptions: {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        hover: {
          mode: false,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                max: 100,
                min: 0,
              },
            },
          ],
        },
      },
    };
  },
  methods: {
    updateResults() {
      const new_scenarios = [];
      this.$root.$emit("retrieveScenarios", new_scenarios);
      store.commit("updateScenarios", new_scenarios);
      store.dispatch("callAPI").then(() => {
        this.re_render_results = !this.re_render_results;
        this.$root.$emit("re_render_results_detailled");
      });
    },
    display_results_detailled_view(choice) {
      this.$root.$emit("display_results_detailled_view", choice);
      this.$root.$emit("re_render_results_detailled");
    },
  },
  computed: {
    chartData: function () {
      return (sphere) => store.state.impact_on_spheres[sphere];
    },
  },
  mounted() {
    this.updateResults();
    this.$root.$on("renderResults", () => {
      this.re_render_results = !this.re_render_results;
    });
  },
};
</script>

<style>
.results {
  background-color: #f1f1f1;
  flex-basis: 25%;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
}

/*
 * HEADER
 */

.results-header {
  font-weight: bold;
  font-size: 30px;
  line-height: 35px;
  color: #3b3b3b;
  padding-top: 20px;
  padding-left: 40px;
}
.results-header-btn-actions button {
  border: none;
  color: black;
  border-radius: 6px;
  padding: 2px 8px;
  margin-left: 5px;
  position: relative;
  top: -5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}
.results-header button:hover {
  cursor: pointer;
}

.results-header-btn-export {
  background: rgba(58, 104, 224, 0.5);
}
.results-header-btn-export:hover {
  background: rgba(0, 71, 255, 0.58);
}
.results-header-btn-reload {
  background: rgba(85, 235, 52, 0.5);
}
.results-header-btn-reload:hover {
  background: rgba(85, 235, 52, 0.8);
}

.results-header-btn-displayed-view {
  margin-bottom: 10px;
  margin-left: 4px;
}

.results-header-btn-displayed-view input {
  background-color: #3b3b3b;
  max-width: 50%;
  border: none;
  color: white;
  padding: 5px 15px;
  float: left;
  cursor: pointer;
}

.results-header-btn-displayed-view .active {
  background-color: rgba(59, 59, 59, 0.5);
  color: white;
  font-weight: bold;
  padding: 5px 15px;
  float: left;
}

/*
 * RESULTS
 */
.results-content {
  padding-top: 40px;
}
.results-section {
  border-top-style: solid;
  border-color: #bcbcbc;
  border-width: 3px;
  padding-top: 10px;
  padding-left: 40px;
}

.results-section:hover {
  background: rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.results-section h3 {
  color: #3b3b3b;
}

/*
 * CHARTS
 */

.results-chart {
  height: 25%;
  padding-right: 25px;
}
</style>
