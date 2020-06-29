<template>
  <div class="results">
    <div class="results-header">
      Résultats
      <div class="results-header-btn-actions">
        <button
          class="results-header-btn-reload"
          @click.prevent="updateResults"
        >
          Actualiser
        </button>
        <button class="results-header-btn-export">Exporter</button>
      </div>
      <div class="results-header-btn-displayed-view">
        <input
          type="button"
          value="Comparatif"
          id="btn-comparatif"
          @click.prevent="change_displayed_view('comparatif')"
          :class="{ active: displayed_view == 'comparatif' }"
        />
        <input
          type="button"
          value="Equivalents"
          id="btn-equivalents"
          @click.prevent="change_displayed_view('equivalents')"
          :class="{ active: displayed_view == 'equivalents' }"
        />
      </div>
    </div>
    <div class="results-content" v-show="displayed_view == 'comparatif'">
      <div
        class="results-section"
        @click="display_results_detailled_view('sante_humaine')"
      >
        <h3>Santé Humaine</h3>
        <p>Texte</p>
      </div>
      <div
        class="results-section"
        @click="display_results_detailled_view('qualite_ecosysteme')"
      >
        <h3>Qualité de l'écosystème</h3>
        <p>Texte</p>
      </div>
      <div
        class="results-section"
        @click="display_results_detailled_view('changement_climatique')"
      >
        <h3>Changement climatique</h3>
        <p>Texte</p>
      </div>
      <div
        class="results-section"
        @click="display_results_detailled_view('ressources')"
      >
        <h3>Ressources</h3>
        <p>Texte</p>
      </div>
    </div>
    <div class="results-content" v-show="displayed_view == 'equivalents'">
      <div
        class="results-section"
        @click="display_results_detailled_view('douches')"
      >
        <h3>Douches</h3>
        <p>Texte</p>
      </div>
      <div
        class="results-section"
        @click="display_results_detailled_view('chauffage')"
      >
        <h3>Chauffage d'une maison</h3>
        <p>Texte</p>
      </div>
      <div
        class="results-section"
        @click="display_results_detailled_view('trajets_voiture')"
      >
        <h3>Trajets en voiture</h3>
        <p>Texte</p>
      </div>
    </div>
    <div class="results-detailled"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scenarios_json: [],
      displayed_view: "comparatif",
    };
  },
  methods: {
    updateResults() {
      this.scenarios_json = [];
      this.$root.$emit("getJSON", this.scenarios_json);
    },
    display_results_detailled_view(choice) {
      this.$root.$emit("display_results_detailled_view", choice);
    },
    change_displayed_view(choice) {
      this.displayed_view = choice;
    },
  },
};
</script>

<style>
.results {
  background-color: #f1f1f1;
  height: auto;
}

/*
 * HEADER
 */

.results-header {
  font-weight: bold;
  font-size: 30px;
  line-height: 35px;
  color: #3b3b3b;
  padding-top: 55px;
  padding-left: 40px;
  /* ! This padding-right should be removed */
  padding-right: 160px;
}
.results-header-btn-actions button {
  border: none;
  color: black;
  border-radius: 6px;
  padding: 2px 8px;
  margin-left: 5px;
  position: relative;
  top: -5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}
.results-header button:hover {
  cursor: pointer;
}

.results-header-btn-export {
  background: rgba(58, 104, 224, 0.5);
}
.results-header-btn-export:hover {
  background: rgba(0, 71, 255, 0.58);
}
.results-header-btn-reload {
  background: rgba(85, 235, 52, 0.5);
}
.results-header-btn-reload:hover {
  background: rgba(85, 235, 52, 0.8);
}

.results-header-btn-displayed-view input {
  background-color: #3b3b3b;
  border: none;
  color: white;
  padding: 5px 15px;
  float: left;
  cursor: pointer;
}

.results-header-btn-displayed-view .active {
  background-color: rgba(59, 59, 59, 0.5);
  color: white;
  font-weight: bold;
  padding: 5px 15px;
  float: left;
}

#btn-equivalents {
  border-radius: 0 6px 6px 0;
}
#btn-comparatif {
  border-radius: 6px 0 0 6px;
}
/*
 * RESULTS
 */
.results-content {
  padding-top: 40px;
}
.results-section {
  border-top-style: solid;
  border-color: #bcbcbc;
  border-width: 3px;
  padding-bottom: 10px;
  padding-top: 10px;
  padding-left: 40px;
}

.results-section:hover {
  background: rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.results-section h3 {
  color: #3b3b3b;
}
</style>
