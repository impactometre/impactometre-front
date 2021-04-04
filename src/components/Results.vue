<template>
  <div class="results">
    <div class="results-header">Résultats</div>
    <div class="results-header-btn-actions">
      <button
          class="results-header-btn-reload"
          @click.prevent="updateResults"
      >
        Calculer 🔄
      </button>
      <button
          class="results-header-btn-export"
          @click.prevent="exportResults"
      >
        Exporter ⬇️
      </button>
    </div>
    <div class="results-content">
      <div
        class="results-section"
        @click="display_results_detailed_view(section.name)"
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
  </div>
</template>

<script>
import jsPDF from "jspdf";

import ResultsChart from "./ResultsChart.js";
import store from "../store/MainStore.js";
import { sections_comparatif, journey_options } from "../options/options.js";
import { detailed_results_text } from "../options/detailed_results_text.js";
import { exportResults } from "../functions/export_results.js"

export default {
  components: { ResultsChart },
  store: store,
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
                callback: function (value, index, values) {
                  // Show "%" at the first and last axis elements (i.e "0 %" and "100 %")
                  return (index === 0 || index === values.length - 1) ? value + " %" : value;
                },
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
        this.$root.$emit("re_render_results_detailed");
      });
    },
    exportResults,
    display_results_detailed_view(choice) {
      this.$root.$emit("display_results_detailed_view", choice);
      this.$root.$emit("re_render_results_detailed");
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
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  height: 100%;
  display: flex;
  flex-direction: column;
}

/*
 * 1 - HEADER
 */

.results-header {
  flex-basis: 8vh;
  color: #3b3b3b;
  font-size: 30px;
  font-weight: bold;
  padding-top: 20px;
  padding-left: 40px;
}

/*
 * 2 - BUTTONS
 */

.results-header-btn-actions {
  flex-basis: 8vh;
  width: 100%;
  color: blueviolet;
  bottom: 0;
  padding: 0;
  margin: 0;
}
.results-header-btn-actions button{
  height: 100%;
  width: 50%;
  border: none;
}
button:hover {
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

/*
 * 3 - RESULTS
 */

.results-content {
  flex-basis: 100%;
  flex-grow: 4;
  max-height: 84vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.results-section {
  flex-basis: 25%;
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
  font-size: 16px;
}

/*
 * CHARTS
 */

.results-chart {
  height: 25%;
  padding-right: 25px;
}
</style>
