<script>
import { Doughnut } from "vue-chartjs";

export default {
  name: "DoughnutChart",
  extends: Doughnut,
  props: {
    chartdata: {
      type: Array | Object,
    },
    chartlabels: {
      type: Array,
    },
    chartcolors: {
      type: Object,
    },
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    const { borderColor, backgroundColor } = this.chartcolors;

    this.renderChart(
      {
        labels: this.chartlabels,
        datasets: [
          {
            label: this.label,
            borderColor: borderColor,
            backgroundColor: backgroundColor,
            borderWidth: 1,
            data: this.chartdata,
          },
        ],
      },
      this.options
    );
  },
};
</script>
