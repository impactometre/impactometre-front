<template>
  <div id="app">
    <Header></Header>
    <main id="main-flexbox">
      <SinglePage
        :page="displayed_single_page"
        v-show="display_single_page"
      ></SinglePage>
      <div class="scenarios" v-show="display_scenarios">
        <Scenario title="Scenario A"></Scenario>
        <Scenario title="Scenario B"></Scenario>
        <Scenario title="Scenario C"></Scenario>
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
#main-flexbox {
  display: flex;
}
main {
  height: 100%;
}
.results {
  flex-basis: 25%;
  /* background-color: #BCBCBC; */
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
}
.scenarios {
  display: flex;
  flex-basis: 75%;
}
</style>
