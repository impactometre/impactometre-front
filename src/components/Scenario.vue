<template>
  <div class="scenario-full">
    <div class="scenario-header">
      <h2>{{ title }}</h2>
    </div>
    <div class="scenario-body">
      <div class="scenario-section">
        <div class="scenario-section-header">Matériel {{ count }}</div>
        <div class="scenario-section-body">
          <div class="scenario-line">
            <span class="scenario-line-caption">
              <p>Nombre de choses</p>
              <Tooltip>Matériel dans une salle de réunion, exactement.</Tooltip>
            </span>
            <IncrementButton :value="count"/><br />
          </div>
          <div class="scenario-line">
            <span class="scenario-line-caption">
              <p>Nombre de choses</p>
              <Tooltip>Matériel dans une salle de réunion, exactement.</Tooltip>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IncrementButton from "./IncrementButton";
import Tooltip from "./Tooltip";

export default {
  name: "Scenario",
  props: ["title"],
  components: {
    IncrementButton,
    Tooltip,
  },
  data() {
    return {
      count: 25,
    };
  },
};
</script>

<style>
.scenarios {
  margin: 0 10px;
  flex-basis: 75%;
  display: flex;
  flex-shrink: auto;
}

/*
 *    SCENARIO-FULL
 */

.scenario-full {
  margin: 45px 10px;
  flex: 1 1 auto;
  border-radius: 15px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
}
.scenario-full .scenario-header {
  border-radius: 15px 15px 0 0;
  height: 60px;
  background-color: rgba(224, 58, 58, 0.5);
}

.scenario-full .scenario-header h2 {
  text-align: center;
  font-style: normal;
  font-size: 25px;
  line-height: 60px;
}

/*
 *    SCENARIO-SECTIONS AND SCENARIO-LINES
 */

.scenario-section-header {
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  margin: 10px;
}

.scenario-section-body {
}

.scenario-line {
  margin: 10px;
}

.scenario-line-caption p {
  display: inline;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #363636;
}

/*
 *    SCENARIO-EMPTY
 */

.scenario-empty {
  margin: 45px 10px;
  flex: 1 1 auto;
  border-radius: 15px;
  box-sizing: border-box;
  border: 1px dashed #000000;
}

.scenario-empty .scenario-body img {
  transition-timing-function: ease;
  width: 50px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
}
.scenario-empty .scenario-body img:hover {
  transition-timing-function: ease;

  transform: scale(1.02);
  cursor: pointer;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
}
</style>
