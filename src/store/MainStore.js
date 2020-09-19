import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let labels = ["A", "B", "C"];
let labels_detailled = ["Scenario A", "Scenario B", "Scenario C"];
let backgroundColor = ["#e97272", "#e7dc73", "#83bdec"];
let hoverBackgroundColor = [
  "rgba(0,0,0,0.8)",
  "rgba(0,0,0,0.6)",
  "rgba(0,0,0,0.3)",
];

const state = {
  scenarios_json: [],
  equivalents: {},
  impact_on_spheres: {
    HUMAN_HEALTH: {
      labels,
      datasets: [
        {
          backgroundColor,
          data: [0, 0, 0],
        },
      ],
    },
    ECOSYSTEM_QUALITY: {
      labels,
      datasets: [
        {
          backgroundColor,
          data: [0, 0, 0],
        },
      ],
    },
    CLIMATE_CHANGE: {
      labels,
      datasets: [
        {
          backgroundColor,
          data: [0, 0, 0],
        },
      ],
    },
    RESOURCES: {
      labels,
      datasets: [
        {
          backgroundColor,
          data: [0, 0, 0],
        },
      ],
    },
  },
  impact_on_spheres_detailled: {
    HUMAN_HEALTH: {
      labels: labels_detailled,
      datasets: [
        {
          label: "Matériel",
          data: [0, 0, 0],
          backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor[0],
        },
        {
          label: "Réseau",
          data: [0, 0, 0],
          backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor[1],
        },
        {
          label: "Trajets",
          data: [0, 0, 0],
          backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor[2],
        },
      ],
    },
    ECOSYSTEM_QUALITY: {
      labels: labels_detailled,
      datasets: [
        {
          label: "Matériel",
          data: [0, 0, 0],
          backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor[0],
        },
        {
          label: "Réseau",
          data: [0, 0, 0],
          backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor[1],
        },
        {
          label: "Trajets",
          data: [0, 0, 0],
          backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor[2],
        },
      ],
    },
    CLIMATE_CHANGE: {
      labels: labels_detailled,
      datasets: [
        {
          label: "Matériel",
          data: [0, 0, 0],
          backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor[0],
        },
        {
          label: "Réseau",
          data: [0, 0, 0],
          backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor[1],
        },
        {
          label: "Trajets",
          data: [0, 0, 0],
          backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor[2],
        },
      ],
    },
    RESOURCES: {
      labels: labels_detailled,
      datasets: [
        {
          label: "Matériel",
          data: [0, 0, 0],
          backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor[0],
        },
        {
          label: "Réseau",
          data: [0, 0, 0],
          backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor[1],
        },
        {
          label: "Trajets",
          data: [0, 0, 0],
          backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor[2],
        },
      ],
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
    }
  },
  actions: {
    async callAPI(context) {
      if (state.scenarios_json.length) {
        return Vue.http.post("meeting", state.scenarios_json).then(
          (response) => {
            context.dispatch("processComparisonResponse", {
              comparison: response.body.comparison,
            });
            context.dispatch("processEquivalentResponse", {
              equivalents: response.body.equivalents,
            });
          }
        );
      }
    },
    processComparisonResponse: function (context, { comparison }) {
      for (const sphereName in comparison) {
        // Aggregated value, Hardware, Software, Journey
        const values = [0, 0, 0];
        const hardware = [0, 0, 0];
        const software = [0, 0, 0];
        const journey = [0, 0, 0];

        if (comparison[sphereName]["Scenario A"]) {
          const scenario_a = comparison[sphereName]["Scenario A"];
          values[0] = scenario_a.value;
          hardware[0] = scenario_a.hardware;
          software[0] = scenario_a.software;
          journey[0] = scenario_a.journey;
        }
        if (comparison[sphereName]["Scenario B"]) {
          const scenario_b = comparison[sphereName]["Scenario B"];
          values[1] = scenario_b.value;
          hardware[1] = scenario_b.hardware;
          software[1] = scenario_b.software;
          journey[1] = scenario_b.journey;
        }
        if (comparison[sphereName]["Scenario C"]) {
          const scenario_c = comparison[sphereName]["Scenario C"];
          values[2] = scenario_c.value;
          hardware[2] = scenario_c.hardware;
          software[2] = scenario_c.software;
          journey[2] = scenario_c.journey;
        }

        let sphere;
        switch (sphereName) {
          case "HUMAN_HEALTH":
            sphere = "HUMAN_HEALTH";
            break;
          case "ECOSYSTEM_QUALITY":
            sphere = "ECOSYSTEM_QUALITY";
            break;
          case "CLIMATE_CHANGE":
            sphere = "CLIMATE_CHANGE";
            break;
          case "RESOURCES":
            sphere = "RESOURCES";
            break;
          default:
            throw Error(
              "Received values for unknown impact sphere : " + sphereName
            );
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
    processEquivalentResponse: function(context, { equivalents }) {
      store.commit("updateEquivalents", {
        equivalents
      });
    },
  },
});

// Variable globale pour les tests
global.store = store;

export default store;
