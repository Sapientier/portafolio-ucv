<script>
import { Line } from "vue-chartjs";

export default {
    name: "LineChart",
    extends: Line,
    props: {
        chartdata: {
            type: Array | Object,
        },
        chartdata2: {
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
                        label: "Suscriptores",
                        borderColor: borderColor,
                        backgroundColor: backgroundColor,
                        borderWidth: 1,
                        data: this.chartdata,
                    },
                    {
                        label: "Solicitantes",
                        borderColor: "rgba(50, 153, 255, 1)",
                        backgroundColor: "rgba(50, 153, 255, 0.2)",
                        borderWidth: 1,
                        data: this.chartdata2,
                    }
                ],
            },
            this.options
        );
    },
};
</script>
