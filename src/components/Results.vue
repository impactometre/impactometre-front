<template>
  <div class="results">
      <div class="results-header">
          Résultats
          <button class="results-header-btn-reload" @click.prevent="updateResults">Actualiser</button>
          <button class="results-header-btn-export">Exporter</button>
      </div>
      <div class="results-content">
        <div class="results-section" @click="display_results_detailled_view('sante_humaine')">
          <h3>Santé Humaine</h3>
          <p>Texte</p>
        </div>
        <div class="results-section" @click="display_results_detailled_view('qualite_ecosysteme')">
          <h3>Qualité de l'écosystème</h3>
          <p>Texte</p>
        </div>
        <div class="results-section" @click="display_results_detailled_view('changement_climatique')">
          <h3>Changement climatique</h3>
          <p>Texte</p>
        </div>
        <div class="results-section" @click="display_results_detailled_view('ressources')">
          <h3>Ressources</h3>
          <p>Texte</p>
        </div>
      </div>
      <div class="results-detailled">
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scenarios_json: []
    }
  },
  methods : {
    updateResults() {
      this.scenarios_json = []
      this.$root.$emit("getJSON", this.scenarios_json);
    },
    display_results_detailled_view(choice) {
      this.$root.$emit("display_results_detailled_view", choice);
    }
  }
}
</script>

<style>

.results {
  background-color: #F1F1F1;
  height: auto;
}

/*
 * HEADER
 */

.results-header {
  font-weight: bold;
  font-size: 30px;
  line-height: 35px;
  color: #3B3B3B;
  padding-top: 55px;
  padding-left: 40px;
  /* ! This padding-right should be removed */
  padding-right: 160px;
}
.results-header button {
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

/*
 * RESULTS
 */
.results-content {
  padding-top: 20px;
}
.results-section {
  border-top-style: solid;
  border-color: #BCBCBC;
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
  color: #3B3B3B;
}

</style>
