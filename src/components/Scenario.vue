<template>
  <div class="scenario">
    <div v-if="active" class="scenario-full">
      <div class="scenario-header" :id="title.replace(/\s/g, '')">
        <h2>{{ title }}</h2>
        <button class="close-btn" @click.prevent="deleteScenario">
          &#10006;
        </button>
      </div>
      <div class="scenario-body">
        <div class="scenario-section">
          <div class="scenario-section-header"></div>
          <div class="scenario-section-body">
            <div class="scenario-line">
              <span class="scenario-line-caption">
                <p>👤 Participants</p>
              </span>
              <IncrementButton
                v-model="scenario.numberOfParticipants"
                :max="30"
                :min="1"
                class="align-right"
              /><br />
            </div>
            <div class="scenario-line">
              <span class="scenario-line-caption">
                <p>⏳ Durée (min)</p>
              </span>
              <IncrementButton
                  v-model="scenario.meetingDuration"
                  :max="999"
                  :min="1"
                  class="align-right"
              /><br />
            </div>
            <div class="scenario-line">
              <span class="scenario-line-caption">
                <p>🌐 Visio</p>
                <select v-model="scenario.software.name" class="align-right select-software">
                  <option value="">Aucune</option>
                  <option
                      v-for="software_option in software_options"
                      :key="software_option.name"
                      :value="software_option.name"
                  >
                    {{ software_option.french }}
                  </option>
                </select>
              </span>
            </div>
          </div>
        </div>
        <div class="scenario-section">
          <div class="scenario-section-header">Équipement</div>
          <div class="scenario-section-body">
            <div
              class="scenario-line"
              v-for="h in scenario.hardware"
              :key="h.name"
            >
              <span class="scenario-line-caption">
                <p>
                  {{ h.french }}
                </p>
              </span>
              <IncrementButton
                v-model="h.qty"
                :max="99"
                class="align-right"
              /><br />
            </div>
          </div>
        </div>
        <div class="scenario-section journey">
          <div class="scenario-section-header">
            Trajets véhiculés
            <button class="add-journey-btn" @click.prevent="addJourney">
              +
            </button>
          </div>
          <div class="scenario-section-body">
            <div
              class="scenario-line journey"
              v-for="j in scenario.journey"
              :key="j.length"
            >
              <IncrementButton v-model="j.distance" :max="9999" />
              <p>km en</p>
              <select v-model="j.mean" class="select-journey">
                <option disabled value="">...</option>
                <option
                  v-for="journey_option in journey_options"
                  :key="journey_option.name"
                  :value="journey_option.name"
                >
                  {{ journey_option.french }}
                </option>
              </select>
              <button
                class="delete-journey-btn"
                @click.prevent="deleteJourney(j)"
              >
                -
              </button>
              <!-- <hr /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="scenario-empty">
      <div class="scenario-header"></div>
      <div class="scenario-body">
        <img
          src="../assets/img/add_scenario_button.svg"
          @click.prevent="createScenario(-1)"
        />
        <div :key="componentKey">
          <img
            v-if="activeScenarios[0]"
            src="../assets/img/add_scenario_rouge.svg"
            @click.prevent="createScenario(0)"
          />
          <img
            v-if="activeScenarios[1]"
            src="../assets/img/add_scenario_jaune.svg"
            @click.prevent="createScenario(1)"
          />
          <img
            v-if="activeScenarios[2]"
            src="../assets/img/add_scenario_bleu.svg"
            @click.prevent="createScenario(2)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IncrementButton from "./IncrementButton";
import Tooltip from "./Tooltip";

import { software_options, journey_options } from "../options/options.js";

function initialScenario() {
  return {
    meetingDuration: 1,
    numberOfParticipants: 1,
    hardware: [
      {
        name: "LAPTOP",
        french: "💻 PC Portables",
        qty: 0,
      },
      {
        name: "DESKTOP",
        french: "🖥 PC Fixes",
        qty: 0,
      },
      {
        name: "LOGITECH_KIT",
        french: "📞 Kits visio",
        qty: 0,
      },
      {
        name: "COMPUTER_SCREEN_LCD",
        french: "🖥 Moniteurs",
        qty: 0,
      },
      {
        name: "PROJECTOR",
        french: "📽 Projecteur",
        qty: 0,
      },
    ],
    software: {
      name: "",
    },
    journey: [],
  };
}

export default {
  name: "Scenario",
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  components: {
    IncrementButton,
    Tooltip,
  },
  data() {
    return {
      active: false,
      software_options,
      journey_options,
      scenario: {},
      activeScenarios: [false, false, false],
      componentKey: 0,
    };
  },
  computed: {
    getScenarioData: function () {
      return this.scenario;
    },
  },
  methods: {
    createScenario(id) {
      let newScenario;
      if (id >= 0) {
        const new_scenarios = [];
        this.$root.$emit("retrieveScenariosInOrder", new_scenarios);
        newScenario = JSON.parse(JSON.stringify(new_scenarios[id]));
        this.scenario = newScenario;
        this.scenario.meetingScenario = this.title;
        this.active = true;
        this.$root.$emit("scenario-status-update", [this.id, true]);
      } else {
        newScenario = initialScenario();
        this.scenario = newScenario;
        this.scenario.meetingScenario = this.title;
        this.active = true;
        this.$root.$emit("scenario-status-update", [this.id, true]);
      }
    },
    deleteScenario() {
      this.scenario = initialScenario();
      this.scenario.meetingScenario = this.title;
      this.active = false;
      this.$root.$emit("scenario-status-update", [this.id, false]);
      this.componentKey += 1;
    },
    updateActiveScenarios(updatedActiveScenarios) {
      this.activeScenarios = updatedActiveScenarios;
    },
    emitUpdate(active) {
      this.$root.$emit("scenario-status-update", [this.id, active]);
    },
    addJourney() {
      //TODO: Add a journey only if last if not empty
      this.scenario.journey.push({
        distance: 0,
        mean: "",
      });
    },
    deleteJourney(journey) {
      this.scenario.journey = this.scenario.journey.filter((j) => j != journey);
    },
    reRenderCopyButtons() {
      this.componentKey += 1;
    },
  },
  mounted() {
    var cookie = JSON.parse(localStorage.getItem(this.title));
    if (cookie) {
      this.active = cookie[0];
      this.scenario = cookie[1];
      this.$nextTick(function () {
        this.$root.$emit("scenario-status-update", [this.id, this.active]);
      });
    }
    this.$root.$on("retrieveScenarios", (data) => {
      if (this.active) {
        data.push(this.scenario);
      }
    });
    this.$root.$on("retrieveScenariosInOrder", (data) => {
      if (this.active) {
        data[this.id] = this.scenario;
      }
    });
  },
  updated() {
    localStorage.setItem(
      this.title,
      JSON.stringify([this.active, this.scenario])
    );
  },
};
</script>

<style>

/*
 *    SCENARIO-FULL
 */

.scenario {
  margin: 0 20px 0 0;
}
.scenario:first-child {
  margin: 0 20px;
}

.scenario-full {
  height: auto;
  min-width: 241px;
  min-height: 90%;
  margin: 30px 0;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
  /* padding-bottom:25px; */
}

.scenario-full .scenario-header {
  border-radius: 15px 15px 0 0;
  height: 60px;
}
#ScenarioA {
  background-color: #e97272;
}
#ScenarioB {
  background-color: #e7dc73;
}
#ScenarioC {
  background-color: #83bdec;
}
.scenario-full .scenario-header h2 {
  text-align: center;
  font-style: normal;
  font-size: 25px;
  line-height: 60px;
}
.scenario-full hr {
  margin-top: 10px;
  border: 2px dashed #e3e3e3;
  border-style: none none dashed;
  width: 100%;
}
/*
 * CLOSE LINK BUTTONS
 */

.close-btn {
  display: inline-block;
  position: relative;
  float: right;
  top: -41px;
  left: -12px;
  border: none;
  color: black;
  padding: 5px 8px;
  border-radius: 7px;
  background-color: transparent;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  line-height: 10px;
}
.close-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.delete-journey-btn {
  height: 20px;
  border: none;
  color: gray;
  background-color: transparent;
  text-align: center;
  text-decoration: none;
  font-size: 20px;
  font-weight: 800;
}

.delete-journey-btn:hover {
  color: black;
  cursor: pointer;
}

/*
 *    SCENARIO-SECTIONS AND SCENARIO-LINES
 */

.scenario-body {
  margin-top: 20px;
}

.scenario-section-header {
  margin: 10px;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  margin: 15px 15px 20px 20px;
}

.scenario-section.journey {
  padding-bottom: 20px;
}

.scenario-line {
  padding-left: 20px;
  padding-right: 10px;
  padding-bottom: 10px;
}

.scenario-line-caption p {
  overflow: hidden;
  white-space: nowrap;
  display: -webkit-box;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 50%;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #363636;
}
.scenario-section.journey p {
  font-size: 14px;
  height: 20px;
  width: 40px;
  position: relative;
  top: 2px;
}

.scenario-line.journey {
  display: grid;
  grid-template-columns: 2fr 1fr 2.5fr 1fr;
  grid-gap: 10px;
  margin-top: 12px;
}

.scenario-line-caption .helper {
}
.select-journey {
  height: 20px;
  font-size: 14px;
}
/*
 *    BUTTONS
 */
.align-right {
  float: right;
  margin-right: 10px;
}
.align-right:first-child {
  float: right;
  margin-right: 50px;
}
select.scenario-line {
  border-width: 1px;
  border-style: solid;
  border-color: #bcbcbc;
  border-radius: 8px;
  font-size: 14px;
  background: none;
  color: black;
  text-align: center;
  text-decoration: none;
}
select.select-software {
  width: 80px;
  height: 20px;
}
select.select-journey {
  width: 6vw;
}
.add-journey-btn {
  display: inline-block;
  position: relative;
  top: -2px;
  border: none;
  background: #dcdcdc;
  border-radius: 15px;
  color: #676767;
  padding: 5px 9px;
  margin-left: 2px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
}
.add-journey-btn:hover {
  background: #b6b6b6;
}
/*
 *    SCENARIO-EMPTY
 */

.scenario-empty {
  min-width: 241px;
  min-height: 90%;
  margin: 30px 0;
  border-radius: 15px;
  box-sizing: border-box;
  border: 1px dashed #000000;
}

.scenario-empty .scenario-body img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 60%;
  transition-timing-function: ease;
  width: 50px;
}

.scenario-empty .scenario-body div img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  transition-timing-function: ease;
  width: 50px;
}
.scenario-empty .scenario-body img:hover {
  transition-timing-function: ease;

  transform: scale(1.05, 1.05);
  cursor: pointer;
}
</style>
