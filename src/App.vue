<template>
  <div id="app">
    <div class="scenarios">
      <Scenario title="Scenario A"></Scenario>
      <Scenario title="Scenario B"></Scenario>
      <Scenario title="Scenario C"></Scenario>
    </div>
  </div>
</template>

<script>
import Scenario from "./components/Scenario.vue";

export default {
  name: "App",
  components: {
    Scenario,
  },
};
</script>

<style></style>
