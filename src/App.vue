<template>
  <div id="app">
    <div class="scenarios">
      <Scenario title="Scenario A"></Scenario>
      <Scenario title="Scenario B"></Scenario>
      <Scenario title="Scenario C"></Scenario>
      <Results/>
    </div>
  </div>
</template>

<script>
import Scenario from "./components/Scenario.vue";
import Results from "./components/Results.vue";

export default {
  name: "App",
  components: {
    Scenario,
    Results
  },
};
</script>

<style>
.scenarios {
  display: flex;
  flex: 1 1 auto;
}
</style>
