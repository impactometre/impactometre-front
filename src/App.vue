<template>
<div id="app">
  <div v-show="!hide_warning" id="mobile-warning">
    <p>Cette application n'est pas destinée aux supports mobiles.
      Nous vous recommandons d'utiliser un ordinateur.<br>
      <a href="#" @click.prevent="hide_warning = true">Continuer</a>
    </p>
  </div>
  <Header></Header>
  <main id="main-flexbox">
    <SinglePage :page="displayed_single_page" v-show="display_single_page"></SinglePage>
    <div class="scenarios" v-show="display_scenarios">
      <Scenario title="Scenario A"></Scenario>
      <Scenario title="Scenario B"></Scenario>
      <Scenario title="Scenario C"></Scenario>
    </div>
    <ResultsDetailledView :selectedView="results_detailled_view_choice" class="scenarios" v-show="!display_scenarios" :key="re_render_results_detailled_view" />
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
      hide_warning: false,
    };
  },
  methods: {},
  mounted() {
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
  flex-direction: column;
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

#main-flexbox {
  flex-basis: 90%;
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
