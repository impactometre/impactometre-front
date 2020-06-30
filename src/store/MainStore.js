import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let labels = ["A", "B", "C"];
let labels_detailled = ["Scenario A", "Scenario B", "Scenario C"];
let backgroundColor = ["#e97272", "#e7dc73", "#83bdec"];
let hoverBackgroundColor = ["rgba(0,0,0,0.8)", "rgba(0,0,0,0.6)", "rgba(0,0,0,0.3)"];

const state = {
  scenarios_json: [],
  impact_on_spheres: {
    sante_humaine: {
      labels,
      datasets: [
        {
          backgroundColor,
          data: [38, 39, 25],
        },
      ],
    },
    qualite_ecosysteme: {
      labels,
      datasets: [
        {
          backgroundColor,
          data: [10, 40, 32],
        },
      ],
    },
    changement_climatique: {
      labels,
      datasets: [
        {
          backgroundColor,
          data: [11, 35, 28],
        },
      ],
    },
    ressources: {
      labels,
      datasets: [
        {
          backgroundColor,
          data: [20, 28, 25],
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
          data: [67.8, 20, 30],
          backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor[0],
        },
        {
          label: "Réseau",
          data: [12, 25, 12],
          backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor[1],
        },
        {
          label: "Trajets",
          data: [8, 20, 23],
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
          data: [50, 10, 50],
          backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor[0],
        },
        {
          label: "Réseau",
          data: [35, 15, 10],
          backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor[1],
        },
        {
          label: "Trajets",
          data: [20, 12, 21],
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
          data: [40, 25, 10],
          backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor[0],
        },
        {
          label: "Réseau",
          data: [25, 36, 30],
          backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor[1],
        },
        {
          label: "Trajets",
          data: [21, 32, 42],
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
          data: [15, 22, 36],
          backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor[0],
        },
        {
          label: "Réseau",
          data: [16, 12, 20],
          backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor[1],
        },
        {
          label: "Trajets",
          data: [23, 13, 21],
          backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor[2],
        },
      ],
    },
  }
};

let store = new Vuex.Store({
  state,
  mutations: {
    updateScenarios(state, scenarios) {
      state.scenarios_json = scenarios;
    },
  },
});

// Variable globale pour les tests
global.store = store;

export default store;
