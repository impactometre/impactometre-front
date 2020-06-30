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
          <div class="scenario-section-body">
            <div class="scenario-line">
              <span class="scenario-line-caption">
                <p>Nombre de participants</p>
              </span>
              <IncrementButton
                v-model="scenario.numberOfParticipants"
                class="align-right"
              /><br />
            </div>
            <div class="scenario-line">
              <span class="scenario-line-caption">
                <p>Durée de la réunion (minutes)</p>
              </span>
              <IncrementButton
                v-model="scenario.meetingDuration"
                class="align-right"
              /><br />
            </div>
          </div>
        </div>
        <div class="scenario-section">
          <div class="scenario-section-header">Matériel</div>
          <div class="scenario-section-body">
            <div
              class="scenario-line"
              v-for="h in scenario.hardware"
              :key="h.name"
            >
              <span class="scenario-line-caption">
                <p>{{ h.french }}</p>
                <Tooltip v-if="h.helper">{{ h.helper }}</Tooltip>
              </span>
              <IncrementButton v-model="h.qty" class="align-right" /><br />
            </div>
          </div>
        </div>
        <br />
        <div class="scenario-section">
          <div class="scenario-section-header">Réseau</div>
          <div class="scenario-section-body">
            <div class="scenario-line">
              <span class="scenario-line-caption">
                <p>Logiciel utilisé</p>
                <select v-model="scenario.software.name" class="align-right">
                  <option disabled value="">Choisissez</option>
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
        <br />
        <div class="scenario-section journey">
          <div class="scenario-section-header">
            Trajets véhiculés
            <button
              class="add-journey-btn align-right"
              @click.prevent="addJourney"
            >
              +
            </button>
          </div>
          <div class="scenario-section-body">
            <div
              class="scenario-line"
              v-for="j in scenario.journey"
              :key="j.length"
            >
              <span class="scenario-line-caption">
                <IncrementButton
                  v-model="j.distance"
                  class="scenario-line-button-journey"
                />
                <p>km en</p>
                <select v-model="j.mean" class="select-journey">
                  <option disabled value="">Choisissez</option>
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
                <br />
              </span>
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
          @click.prevent="createScenario"
        />
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
      software_options: [
        {
          name: "RENAVISIO",
          french: "Renavisio",
        },
        {
          name: "SKYPE",
          french: "Skype",
        },
        {
          name: "JITSI",
          french: "Jitsi",
        },
        {
          name: "HANGOUTS",
          french: "Google Hangouts",
        },
        {
          name: "other",
          french: "Autre",
        },
      ],
      journey_options: [
        {
          name: "PLANE_INTERCONTINENTAL_ONE_PERSON_KM",
          french: "Avion intercontinental",
        },
        {
          name: "TRAIN_HIGH_SPEED_ONE_PERSON_KM",
          french: "TGV",
        },
      ],
      scenario: {
        meetingDuration: 0,
        numberOfParticipants: 0,
        hardware: [
          {
            name: "LAPTOP",
            french: "Ordinateurs portables",
            qty: 0,
          },
          {
            name: "DESKTOP",
            french: "Ordinateurs fixes",
            qty: 0,
          },
          {
            name: "LOGITECH_KIT",
            french: "Kits de vidéo-conférence",
            helper: "Un kit complet.",
            qty: 0,
          },
          {
            name: "COMPUTER_SCREEN_LCD",
            french: "Ecrans supplémentaires",
            qty: 0,
          },
          {
            name: "PROJECTOR",
            french: "Vidéo-projecteurs",
            qty: 0,
          },
        ],
        software: {
          name: "",
        },
        journey: [],
      },
    };
  },
  methods: {
    createScenario() {
      this.active = true;
    },
    deleteScenario() {
      this.active = false;
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
  },
  mounted() {
    this.$root.$on("getJSON", (data) => {
      //TODO: format data (remove useless fields)
      if (this.active) {
        data.push(JSON.stringify(this.scenario));
      }
    });
  },
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
  height: auto;
  min-height: 80%;
  margin: 30px 10px;
  flex: 1 1 auto;
  border-radius: 15px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
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

/*
 * CLOSE LINK
 */

.close-btn {
  display: inline;
  position: relative;
  float: right;
  top: -46px;
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
}
.close-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.delete-journey-btn {
  display: inline;
  position: relative;
  float: right;
  top: -46px;
  left: -12px;
  border: none;
  color: black;
  padding: 3px 12px;
  border-radius: 15px;
  background-color: transparent;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  left: -19.5px;
  top: 0px;
  font-weight: 400;
}

.delete-journey-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
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

.scenario-section.journey {
  padding-bottom: 20px;
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

.select-journey {
  margin-left: 10px;
  width: 120px !important;
}
/*
 *    BUTTONS
 */
.scenario-line-button-journey {
  margin-right: 10px;
}
.align-right {
  float: right;
  margin-right: 15px;
}
.scenario-line select {
  width: 150px;
  border-width: 1px;
  border-style: solid;
  border-color: #bcbcbc;
  border-radius: 6px;
  font-size: 14px;
  background: none;
  color: black;
  padding: 2px 2px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}
.add-journey-btn {
  border: none;
  background: #dcdcdc;
  border-radius: 15px;
  color: #676767;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
}
.add-journey-btn:hover {
  background: #b6b6b6;
}
/*
 *    SCENARIO-EMPTY
 */

.scenario-empty {
  /* height: 80%; */
  min-height: 80%;
  margin: 30px 10px;
  flex: 1 1 auto;
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
.scenario-empty .scenario-body img:hover {
  transition-timing-function: ease;

  transform: scale(1.05, 1.05);
  cursor: pointer;
}
</style>
