<template>
  <span class="scenario-line-button increment-button">
    <button
      type="button"
      class="increment-button-minus"
      name="increment-button-minus"
      v-on:click="minus()"
    >
      -
    </button>
    <input
      type="text" name="increment-button-value"
      v-model="newValue"
    >
    <button
      type="button"
      class="increment-button-plus"
      name="increment-button-plus"
      v-on:click="plus()"
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
      type: Number
    },
    min: {
      default: 0,
      type: Number
    },
    max: {
      default: undefined,
      type: Number
    }
  },

  data () {
    return {
      newValue: 0
    }
  },

  methods: {
    plus: function () {
      if (this.max === undefined || (this.newValue < this.max)) {
        this.newValue++
        this.$emit('input', this.newValue)
      }
    },
    minus: function () {
      if ((this.newValue) > this.min) {
        this.newValue--
        this.$emit('input', this.newValue)
      }
    }
  },
  watch: {
    newValue: {
      handler: function (newVal) {
        this.value = newVal
      }
    }
  },
  created: function () {
    this.newValue = this.value
  }
}
</script>




<style>
.scenario-line-button .increment-button {
  display: inline;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
}

.increment-button input {
  width: 20px;
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
