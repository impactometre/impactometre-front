<template>
  <div id="app">
    <Header></Header>
    <main id="main-flexbox">
      <SinglePage
        :page="displayed_single_page"
        v-show="display_single_page"
      ></SinglePage>
      <div class="scenarios" v-show="display_scenarios">
        <Scenario ref="scenario0" id=0 title="Scenario A"></Scenario>
        <Scenario ref="scenario1" id=1 title="Scenario B"></Scenario>
        <Scenario ref="scenario2" id=2 title="Scenario C"></Scenario>
      </div>
      <ResultsDetailledView
        :selectedView="results_detailled_view_choice"
        class="scenarios"
        v-show="!display_scenarios"
        :key="re_render_results_detailled_view"
      />
      <Results />
    </main>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import SinglePage from "./components/SinglePage.vue";
import Results from "./components/Results.vue";
import ResultsDetailledView from "./components/ResultsDetailledView.vue";
import Scenario from "./components/Scenario.vue";

export default {
  name: "App",
  components: {
    Header,
    SinglePage,
    ResultsDetailledView,
    Results,
    Scenario,
  },
  data() {
    return {
      display_scenarios: true,
      results_detailled_view_choice: "",
      re_render_results_detailled_view: false,
      display_single_page: false,
      displayed_single_page: null,
      activeScenarios: [],
    };
  },
  mounted() {
    this.$root.$on("scenario-status-update", ([scenario, value]) =>{
      this.activeScenarios[scenario] = value;

      this.$refs.scenario0.updateActiveScenarios(this.activeScenarios);
      this.$refs.scenario1.updateActiveScenarios(this.activeScenarios);
      this.$refs.scenario2.updateActiveScenarios(this.activeScenarios);

      this.$refs.scenario0.reRenderCopyButtons();
      this.$refs.scenario1.reRenderCopyButtons();
      this.$refs.scenario2.reRenderCopyButtons();
    });
    this.$root.$on("show_single_page", (page) => {
      this.display_single_page = true;
      this.displayed_single_page = page;
    });
    this.$root.$on("hide_single_page", () => {
      this.display_single_page = false;
    });
    this.$root.$on("re_render_results_detailled", () => {
      // We re-render the component as a workaround to force chart to update
      this.re_render_results_detailled_view = !this
        .re_render_results_detailled_view;
    });
    this.$root.$on("display_results_detailled_view", (choice) => {
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
  height: 100%;
  display: flex;
  flex-direction: column;
}

#main-flexbox {
  flex-basis:90%;
  display: flex;
  width: 100%;
}
main {
  /* height: 100%; */
}
.scenarios {
  display: flex;
  flex-basis: 75%;
}
</style>
