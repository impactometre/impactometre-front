import { HorizontalBar, mixins } from "vue-chartjs";

export default {
  extends: HorizontalBar,
  mixins: [mixins.reactiveProp],
  props: ["options", "chart-data"],
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options);
  },
};
