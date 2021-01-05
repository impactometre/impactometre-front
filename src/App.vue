<template>
<div id="app">
  <div v-show="!hide_warning" id="mobile-warning">
    <p>⚠️ 🖥 ⚠️<br>
      L'ergonomie de cette application a tout d'abord été pensée pour un usage sur ordinateur.
      Pour une meilleure expérience, nous vous recommandons d'utiliser l'impactometre
      sur un support avec une plus grande surface d'affichage :)
      <br><br>
      <a href="#" @click.prevent="hide_warning = true">Continuer tout de même ➡️</a>
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
    <ResultsDetailedView :selectedView="results_detailed_view_choice" v-show="!display_scenarios" :key="re_render_results_detailed_view" />
    <Results />
  </main>
</div>
</template>

<script>
import Header from "./components/Header.vue";
import SinglePage from "./components/SinglePage.vue";
import Results from "./components/Results.vue";
import ResultsDetailedView from "./components/ResultsDetailedView.vue";
import Scenario from "./components/Scenario.vue";

export default {
  name: "App",
  components: {
    Header,
    SinglePage,
    ResultsDetailedView,
    Results,
    Scenario,
  },
  data() {
    return {
      display_scenarios: true,
      results_detailed_view_choice: "",
      re_render_results_detailed_view: false,
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
    this.$root.$on("re_render_results_detailed", () => {
      // We re-render the component as a workaround to force chart to update
      this.re_render_results_detailed_view = !this
        .re_render_results_detailed_view;
    });
    this.$root.$on("display_results_detailed_view", (choice) => {
      this.display_scenarios = false;
      this.results_detailed_view_choice = choice;
    });
    this.$root.$on("hide_results_detailed_view", () => {
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

.scenarios {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
