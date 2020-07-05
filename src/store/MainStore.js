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
  impact_on_spheres: {
    sante_humaine: {
      labels,
      datasets: [
        {
          backgroundColor,
          data: [0, 0, 0],
        },
      ],
    },
    qualite_ecosysteme: {
      labels,
      datasets: [
        {
          backgroundColor,
          data: [0, 0, 0],
        },
      ],
    },
    changement_climatique: {
      labels,
      datasets: [
        {
          backgroundColor,
          data: [0, 0, 0],
        },
      ],
    },
    ressources: {
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
    sante_humaine: {
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
    qualite_ecosysteme: {
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
    changement_climatique: {
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
    ressources: {
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
    updateImpacts(state, impacts) {
      state.impact_on_spheres = impacts;
    },
    async updateImpact(state, { sphere, data }) {
      state.impact_on_spheres[sphere].datasets[0].data = data;
    },
    updateDetailledImpacts(state, impacts) {
      state.impact_on_spheres_detailled = impacts;
    },
    updateDetailledImpact(state, { sphere, data }) {
      // TODO update detailed impact data
    },
  },
  actions: {
    async callAPI(context) {
      if (state.scenarios_json.length) {
        return Vue.http.post("meeting", state.scenarios_json).then(
          (response) => context.dispatch("processComparisonResponse", { comparison: response.body.comparison }),
          (response) => context.dispatch("processEquivalentResponse", { comparison: response.body.equivalents }),
          (error) => console.log(error)
        );
      }
    },
    processComparisonResponse: function(context, { comparison }) {
      for (const sphereName in comparison) {
        const a = comparison[sphereName]["Scenario A"] ? comparison[sphereName]["Scenario A"].value : 0;
        const b = comparison[sphereName]["Scenario B"] ? comparison[sphereName]["Scenario B"].value : 0;
        const c = comparison[sphereName]["Scenario C"] ? comparison[sphereName]["Scenario C"].value : 0;
        const data = [a, b, c];

        let sphere;
        switch(sphereName) {
          case "HUMAN_HEALTH":
            sphere = "sante_humaine";
            break;
          case "ECOSYSTEM_QUALITY":
            sphere = "qualite_ecosysteme";
            break;
          case "CLIMATE_CHANGE":
            sphere = "changement_climatique";
            break;
          case "RESOURCES":
            sphere = "ressources";
            break;
          default:
            throw Error("Received values for unknown impact sphere : " + sphereName);
        }

        store.commit("updateImpact", { sphere, data });
      }
    },
    processEquivalentResponse(response) {
      console.log("todo process equivalent response");
      console.log(response);
    }
  },
});

// Variable globale pour les tests
global.store = store;

export default store;
