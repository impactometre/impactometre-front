<template>
  <div class="scenario">
    <div v-if="active" class="scenario-full">
      <div class="scenario-header">
          <h2>{{ title }}</h2>
          <a href="#" class="close" @click.prevent="deleteScenario"></a>
      </div>
      <div class="scenario-body">
        <div class="scenario-section">
          <div class="scenario-section-header">Matériel</div>
          <div class="scenario-section-body">
            <div class="scenario-line">
              <span class="scenario-line-caption">
                <p>Nombre de choses  ({{ materiel_no_test }})</p>
                <Tooltip>Matériel dans une salle de réunion</Tooltip>
              </span>
              <IncrementButton :value="materiel_no_test"/><br />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="scenario-empty">
        <div class="scenario-header">
        </div>
        <div class="scenario-body">
            <img src="../assets/img/add_scenario_button.svg" @click.prevent="createScenario">
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
      active: false,
      materiel_no_test: 25,
    };
  },
  methods: {
    createScenario() {
      this.active = true;
    },
    deleteScenario() {
      this.active = false;
    }
  }
};
</script>

<style>
.scenarios {
  display: flex;
}

.scenario {
  margin: 0 10px;
  flex-basis: 75%;
  flex-shrink: auto;
}

/*
 *    SCENARIO-FULL
 */

.scenario-full {
  height:600px;
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
 * CLOSE LINK
 */

.scenario-full .scenario-header .close {
  opacity: 0.3;
  display: inline-block;
  position:relative;
  float:right;
  left:-50px;
  top:-40px;
}
.scenario-full .scenario-header .close:hover {
  opacity: 1;
}
.scenario-full .scenario-header .close:before, .close:after {
  position: absolute;
  left: 15px;
  content: ' ';
  height: 25px;
  width: 2px;
  background-color: #333;
}
.scenario-full .scenario-header .close:before {
  transform: rotate(45deg);
}
.scenario-full .scenario-header .close:after {
  transform: rotate(-45deg);
}
/*
 *    SCENARIO-SECTIONS AND SCENARIO-LINES
 */

.scenario-section-header {
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  margin: 15px;
  margin-left: 20px;
}

.scenario-section-body {
}

.scenario-line {
  margin: 10px;
  margin-left: 25px;
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
  height:600px;
  margin: 45px 10px;
  flex: 1 1 auto;
  border-radius: 15px;
  box-sizing: border-box;
  border: 1px dashed #000000;
}

.scenario-empty .scenario-body img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top:60%;
  transition-timing-function: ease;
  width: 50px;
}
.scenario-empty .scenario-body img:hover {
  transition-timing-function: ease;

  transform: scale(1.05,1.05);
  cursor: pointer;
}
</style>
