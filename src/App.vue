<template>
<div id="app">
  <div v-show="!hide_warning" id="mobile-warning">
    <p>Cette application n'est pas destinée aux supports mobiles.
      Nous vous recommandons d'utiliser un ordinateur.<br>
      <a href="#" @click.prevent="hide_warning = true">Continuer</a>
    </p>
  </div>
  <Header></Header>
  <main id="main-container">
    <SinglePage :page="displayed_single_page" v-show="display_single_page"></SinglePage>
    <div class="scenarios" v-show="display_scenarios">
      <Scenario ref="scenario0" id=0 title="Scenario A"></Scenario>
      <Scenario ref="scenario1" id=1 title="Scenario B"></Scenario>
      <Scenario ref="scenario2" id=2 title="Scenario C"></Scenario>
    </div>
    <ResultsDetailledView :selectedView="results_detailled_view_choice" v-show="!display_scenarios" :key="re_render_results_detailled_view" />
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
      hide_warning: false,
    };
  },
  methods: {},
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
}

@media only screen and (min-width: 800px) {
  #mobile-warning {
    display: none;
  }
}

#mobile-warning {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1;
}

#mobile-warning p {
  text-align: center;
  margin-left: 25%;
  width: 50%;
  margin-top: 20%;
  color: white;
}

#mobile-warning a {
  color: white;
  font-weight: bold;
}

#main-container {
  display: grid;
  grid-template-columns: 3fr 1fr;
  height: 92vh;
}

main {
}

.scenarios {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
