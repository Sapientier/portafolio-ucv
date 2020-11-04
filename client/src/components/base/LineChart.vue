<script>
import { Line } from "vue-chartjs";

export default {
  name: "LineChart",
  extends: Line,
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
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
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