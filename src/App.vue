<template>
  <div id="app">
    <div class="scenarios" v-show="display_scenarios">
      <Scenario title="Scenario A"></Scenario>
      <Scenario title="Scenario B"></Scenario>
      <Scenario title="Scenario C"></Scenario>
    </div>
    <ResultsDetailledView
      :selectedView="results_detailled_view_choice"
      class="scenarios"
      v-if="!display_scenarios"
      :key="re_render_results_detailled_view"
    />
    <Results />
  </div>
</template>

<script>
import Scenario from "./components/Scenario.vue";
import Results from "./components/Results.vue";
import ResultsDetailledView from "./components/ResultsDetailledView.vue";

export default {
  name: "App",
  components: {
    Scenario,
    Results,
    ResultsDetailledView,
  },
  data() {
    return {
      display_scenarios: true,
      results_detailled_view_choice: "",
      re_render_results_detailled_view: false,
    };
  },
  methods: {},
  mounted() {
    this.$root.$on("display_results_detailled_view", (choice) => {
      // We re-render the component as a workaround to force chart to update
      this.re_render_results_detailled_view = !this
        .re_render_results_detailled_view;
      this.display_scenarios = false;
      this.results_detailled_view_choice = choice;
    });
    this.$root.$on("hide_results_detailled_view", () => {
      this.display_scenarios = true;
    });
  },
};
</script>

<style>
#app {
  display: flex;
  height: 100%;
}
.scenarios {
  display: flex;
  flex-basis: 75%;
}
</style>
