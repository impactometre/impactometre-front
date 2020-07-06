<template>
  <div class="results-detailled-view">
    <div class="results-detailled-view-header">
      <h1>{{ title }}</h1>
      <button class="close-btn" @click.prevent="hideView">&#10006;</button>
    </div>
    <div class="results-detailled-view-content">
      <div class="results-chart-detailled" v-if="selectedView">
        <ResultsChart
          :key="re_render_results"
          :chart-data="chartData(selectedView)"
          :options="chartOptions"
          :height="80"
        ></ResultsChart>
      </div>
      <p>
        {{ detailled_results_text }}
      </p>
      <br/>
      <p v-for="eq of equivalents" :key="eq.message">
        {{ eq.text }}
      </p>
    </div>
  </div>
</template>

<script>
import ResultsChart from "./ResultsChart.js";
import store from "../store/MainStore.js";
import { detailled_results_text } from "../options/detailled_results_text.js";

export default {
  props: ["selectedView"],
  store,
  components: { ResultsChart },
  methods: {
    hideView() {
      this.$root.$emit("hide_results_detailled_view");
    },
  },
  data() {
    return {
      re_render_results: false,
      chartOptions: {
        maintainAspectRatio: true,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              ticks: {
                max: 100,
                min: 0,
              },
            },
          ],
          yAxes: [{ stacked: true }],
        },
      },
    };
  },
  computed: {
    chartData: function () {
      return (sphere) => store.state.impact_on_spheres_detailled[sphere];
    },
    title: function () {
      //TODO: clean this function (code redundancy)
      switch(this.selectedView) {
        case "HUMAN_HEALTH": return "Impact sur la santé humaine"
        case "ECOSYSTEM_QUALITY": return "Impact sur la qualité des écosystèmes"
        case "CLIMATE_CHANGE": return "Impact sur le changement climatique"
        case "RESOURCES": return "Impact sur les ressources"
      }
    },
    detailled_results_text: function () {
      return detailled_results_text[this.selectedView];
    },
    equivalents: function () {
      if(store.state.equivalents.hasOwnProperty(this.selectedView)){
        const ret = [];
        const eqs = store.state.equivalents[this.selectedView]["ONE_KM_CAR"]
        for (const equivalent in eqs) {
          if (eqs[equivalent] !== null) {
            ret.push({ text: "Le "+equivalent+" équivaut à "+eqs[equivalent]+"km en voiture thermique."});
          }
        }
        return ret
      }
    }
  },
  mounted() {
    this.$root.$on("re_render_results_detailled", () => {
      // We re-render the component as a workaround to force chart to update
      this.re_render_results = !this.re_render_results;
    });
  },
};
</script>

<style>
.results-detailled-view {
  display: flex;
  flex-direction: column;
  padding: 60px;
  background: repeating-linear-gradient(
    -45deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 10px,
    rgba(0, 0, 0, 0.02) 10px,
    rgba(0, 0, 0, 0.02) 20px
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
}
.results-detailled-view-content p {
  line-height: 25px;
}

/*
 * CHARTS
 */
.results-chart-detailled {
  margin-bottom: 25px;
  width: 100%;
}
</style>
