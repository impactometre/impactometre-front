<template>
  <span class="increment-button">
    <button
      type="button"
      class="increment-button-minus"
      name="increment-button-minus"
      @click="minus"
      @mousedown="longMinus"
      @mouseleave="stopLongClick"
      @mouseup="stopLongClick"
    >
      -
    </button>
    <input
      type="text"
      name="increment-button-value"
      v-bind:value="value"
      @input="input"
    />
    <button
      type="button"
      class="increment-button-plus"
      name="increment-button-plus"
      @click="plus"
      @mousedown="longPlus"
      @mouseleave="stopLongClick"
      @mouseup="stopLongClick"
    >
      +
    </button>
  </span>
</template>

<script>
export default {
  props: {
    value: {
      default: 0,
      type: Number,
    },
    min: {
      default: 0,
      type: Number,
    },
    max: {
      default: undefined,
      type: Number,
    },
  },

  data() {
    return {
      interval: false,
      newValue: 0,
    };
  },

  methods: {
    plus: function () {
      if (this.max === undefined || this.newValue < this.max) {
        this.newValue++;
        this.$emit("input", this.newValue);
      }
    },
    minus: function () {
      if (this.newValue > this.min) {
        this.newValue--;
        this.$emit("input", this.newValue);
      }
    },
    longPlus: function () {
      if (!this.interval) {
        this.interval = setInterval(() => this.plus(), 100);
      }
    },
    longMinus: function () {
      if (!this.interval) {
        this.interval = setInterval(() => this.minus(), 100);
      }
    },
    stopLongClick: function () {
      clearInterval(this.interval);
      this.interval = false;
    },
    input: function (event) {
      if (parseInt(event.target.value) > this.min) {
        this.$emit("input", parseInt(event.target.value));
      } else {
        this.$emit("input", this.min);
        event.target.value = this.min;
      }
      if (parseInt(event.target.value) < this.max) {
        this.$emit("input", parseInt(event.target.value));
      } else {
        this.$emit("input", this.max);
        event.target.value = this.max;
      }
    },
  },
  created: function () {
    this.newValue = this.parsedValue;
  },
  computed: {
    parsedValue: function () {
      return parseInt(this.value, 10);
    },
  },
};
</script>

<style>
.increment-button input {
  width: 30px;
  text-align: center;
  border-width: 1px 0;
  border-style: solid;
  border-color: #bcbcbc;
}

.increment-button button {
  width: 14px;
  background-color: white;
  color: black;
  border: 1px solid #bcbcbc;
}

.increment-button button:hover {
  background-color: #bcbcbc;
  color: white;
  cursor: pointer;
}

.increment-button-minus {
  border-radius: 3px 0 0 3px;
}

.increment-button-plus {
  border-radius: 0 3px 3px 0;
}
</style>
