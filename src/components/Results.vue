<template>
  <div class="results">
      <div class="results-header">
          Résultats
          <button class="results-header-btn-reload" @click.prevent="updateResults">Actualiser</button>
          <button class="results-header-btn-export">Exporter</button>
      </div>
      <div class="results-content">
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
    }
  }
}
</script>

<style>
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
.export-btn {
  border: none;
  color: black;
  background: rgba(58, 104, 224, 0.5);
  border-radius: 6px;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}
.export-btn:hover {
  background: rgba(0, 71, 255, 0.58);
}
</style>
