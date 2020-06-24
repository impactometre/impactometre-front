<template>
  <div class="scenario-line-caption-tooltip">
    ? <span class="scenario-line-caption-tooltip-text"><slot></slot></span>
  </div>
</template>

<script>
export default {};
</script>

<style>
/* Tooltip container */
.scenario-line-caption-tooltip {
  position: relative;
  display: inline-block;
  background: #dcdcdc;
  text-align: center;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin-left: 10px;
  margin-right: 10px;
  color: #838383;
}

/* Tooltip text */
.scenario-line-caption-tooltip .scenario-line-caption-tooltip-text {
  visibility: hidden;
  width: 150px;
  background-color: #b1b1b1;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 140%;
  left: 50%;
  margin-left: -60px; /* Use half of the width (120/2 = 60), to center the tooltip */
}

/* Show the tooltip text when you mouse over the tooltip container */
.scenario-line-caption-tooltip:hover .scenario-line-caption-tooltip-text {
  visibility: visible;
}

/* Arrow */
.scenario-line-caption-tooltip .scenario-line-caption-tooltip-text::after {
  content: " ";
  position: absolute;
  top: 100%; /* At the bottom of the tooltip */
  left: 50%;
  margin-left: -20px;
  border-width: 5px;
  border-style: solid;
  border-color: #b1b1b1 transparent transparent transparent;
}

/* Animation */
.scenario-line-caption-tooltip .scenario-line-caption-tooltip-text {
  opacity: 0;
  transition: opacity 0.4s;
}

.scenario-line-caption-tooltip:hover .scenario-line-caption-tooltip-text {
  opacity: 1;
}
</style>
