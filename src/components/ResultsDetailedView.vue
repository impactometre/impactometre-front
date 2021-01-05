<template>
  <div class="results-detailed-view">
    <div class="results-detailed-view-header">
      <h1>{{ title }}</h1>
      <button class="close-btn" @click.prevent="hideView">&#10006;</button>
    </div>
    <div class="results-detailed-view-content">
      <div class="results-chart-detailed" v-if="selectedView">
        <ResultsChart
          :key="re_render_results"
          :chart-data="chartData(selectedView)"
          :options="chartOptions"
          :height="80"
        ></ResultsChart>
      </div>
      <p>
        {{ detailed_results_text }}
      </p>
      <br/>
      <p>
        Sur le plan de l'{{ title }} :
      </p>
      <p v-for="eq of equivalents" :key="eq.message">
        {{ eq.text }}
      </p>
    </div>
  </div>
</template>

<script>
import ResultsChart from "./ResultsChart.js";
import store from "../store/MainStore.js";
import { detailed_results_text } from "../options/detailed_results_text";

//register custom tooltip positioner for chart
Chart.Tooltip.positioners.custom = function(elements, position) {
  //debugger;
  return {
    x: position.x,
    y: position.y,
  }
}

export default {
  props: ["selectedView"],
  store,
  components: { ResultsChart },
  methods: {
    hideView() {
      this.$root.$emit("hide_results_detailed_view");
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
        hover: {
           mode: 'nearest',
           intersect: true
         },
         tooltips: {
          mode: 'point',
          position: 'custom',
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              ticks: {
                max: 100,
                min: 0,
                callback: function(value, index, values) {
                    return (value + ' %');
                }
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
      return (sphere) => store.state.impact_on_spheres_detailed[sphere];
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
    detailed_results_text: function () {
      return detailed_results_text[this.selectedView];
    },
    equivalents: function () {
      if(store.state.equivalents.hasOwnProperty(this.selectedView)){
        const ret = [];
        const eqs = store.state.equivalents[this.selectedView]["ONE_KM_CAR"]
        for (const equivalent in eqs) {
          if (eqs.hasOwnProperty(equivalent) && eqs[equivalent] !== null) {
            ret.push({ text: "Le "+equivalent+" équivaut à l'impact de "+eqs[equivalent]+" km réalisés dans une voiture thermique."});
          }
        }
        return ret
      }
    }
  },
  mounted() {
    this.$root.$on("re_render_results_detailed", () => {
      // We re-render the component as a workaround to force chart to update
      this.re_render_results = !this.re_render_results;
    });
  },
};
</script>

<style>
.results-detailed-view {
  padding: 60px;
  background: repeating-linear-gradient(
    -45deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 10px,
    rgba(0, 0, 0, 0.02) 10px,
    rgba(0, 0, 0, 0.02) 20px
  );
  overflow: hidden;
}

/*
 * HEADER
 */

.results-detailed-view-header {
  width: 100%;
}
.results-detailed-view-header .close {
  top: -30px;
  padding-left: 30px;
}

/*
 * CONTENT
 */

.results-detailed-view-content p {
  line-height: 25px;
}

/*
 * CHARTS
 */
.results-chart-detailed {
  margin-bottom: 25px;
  width: 100%;
}
</style>
