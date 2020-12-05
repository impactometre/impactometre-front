import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let labels = ["A", "B", "C"];
let labels_detailled = ["Scenario A", "Scenario B", "Scenario C"];
let backgroundColor = ["#e97272", "#e7dc73", "#83bdec"];

var datasets = function () {
  return [
    {
      backgroundColor,
      data: [0, 0, 0],
    },
  ];
};

var datasets_detailled = function () {
  return [
    {
      label: "Matériel",
      data: [0, 0, 0],
      backgroundColor,
    },
    {
      label: "Réseau",
      data: [0, 0, 0],
      backgroundColor,
    },
    {
      label: "Trajets",
      data: [0, 0, 0],
      backgroundColor,
    },
  ];
};

const state = {
  scenarios_json: [],
  equivalents: {},
  impact_on_spheres: {
    HUMAN_HEALTH: {
      labels,
      datasets: datasets(),
    },
    ECOSYSTEM_QUALITY: {
      labels,
      datasets: datasets(),
    },
    CLIMATE_CHANGE: {
      labels,
      datasets: datasets(),
    },
    RESOURCES: {
      labels,
      datasets: datasets(),
    },
  },
  impact_on_spheres_detailled: {
    HUMAN_HEALTH: {
      labels: labels_detailled,
      datasets: datasets_detailled(),
    },
    ECOSYSTEM_QUALITY: {
      labels: labels_detailled,
      datasets: datasets_detailled(),
    },
    CLIMATE_CHANGE: {
      labels: labels_detailled,
      datasets: datasets_detailled(),
    },
    RESOURCES: {
      labels: labels_detailled,
      datasets: datasets_detailled(),
    },
  },
};

let store = new Vuex.Store({
  state,
  mutations: {
    updateScenarios(state, scenarios) {
      state.scenarios_json = scenarios;
    },
    async updateImpact(state, { sphere, values }) {
      state.impact_on_spheres[sphere].datasets[0].data = values;
    },
    async updateDetailledImpacts(
      state,
      { sphere, hardware, software, journey }
    ) {
      state.impact_on_spheres_detailled[sphere].datasets[0].data = hardware;
      state.impact_on_spheres_detailled[sphere].datasets[1].data = software;
      state.impact_on_spheres_detailled[sphere].datasets[2].data = journey;
    },
    async updateEquivalents(state, { equivalents }) {
      state.equivalents = equivalents;
    },
  },
  actions: {
    async callAPI(context) {
      if (state.scenarios_json.length) {
        return Vue.http
          .post("meeting", state.scenarios_json)
          .then((response) => {
            context.dispatch("processComparisonResponse", {
              comparison: response.body.comparison,
            });
            context.dispatch("processEquivalentResponse", {
              equivalents: response.body.equivalents,
            });
          });
      }
    },
    processComparisonResponse: function (context, { comparison }) {
      for (const sphere in comparison) {
        // Aggregated value, Hardware, Software, Journey
        const values = [0, 0, 0];
        const hardware = [0, 0, 0];
        const software = [0, 0, 0];
        const journey = [0, 0, 0];

        for (const [scenario_name, value] of Object.entries(
          comparison[sphere]
        )) {
          var idx = ["Scenario A", "Scenario B", "Scenario C"].indexOf(
            scenario_name
          );
          const scenario = comparison[sphere][scenario_name];
          values[idx] = scenario.value;
          hardware[idx] = scenario.hardware;
          software[idx] = scenario.software;
          journey[idx] = scenario.journey;
        }

        store.commit("updateImpact", { sphere, values });
        store.commit("updateDetailledImpacts", {
          sphere,
          hardware,
          software,
          journey,
        });
      }
    },
    processEquivalentResponse: function (context, { equivalents }) {
      store.commit("updateEquivalents", {
        equivalents,
      });
    },
  },
});

export default store;
