<template>
  <div class="results-detailled-view">
    <div class="results-detailled-view-header">
      <h1>Titre : {{ selected_view }}</h1>
      <a href="#" class="close" @click.prevent="hideView"></a>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["selected_view"],
  methods: {
    hideView() {
      this.$root.$emit("hide_results_detailled_view")
    }
  }
}
</script>

<style>
.results-detailled-view-header {
  width: 100%;
}
.results-detailled-view-header .close {
  position: relative;
  padding-left: 60px;
}
</style>
