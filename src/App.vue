<template>
  <div id="app">
    <div class="scenarios" v-show="display_scenarios">
      <Scenario title="Scenario A"></Scenario>
      <Scenario title="Scenario B"></Scenario>
      <Scenario title="Scenario C"></Scenario>
    </div>
    <ResultsDetailledView
      :selected_view="display_scenarios_choice"
      class="scenarios"
      v-show="!display_scenarios"
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
      display_scenarios_choice: "",
    };
  },
  methods: {},
  mounted() {
    this.$root.$on("display_results_detailled_view", (choice) => {
      this.display_scenarios = false;
      this.display_scenarios_choice = choice;
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
  flex: 1 1 auto;
}
.scenarios {
  display: flex;
  flex: 1 1 auto;
}
</style>
