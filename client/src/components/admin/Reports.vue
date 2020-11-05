<template>
  <v-container fill-height fluid>
    <v-layout justify-center wrap>
      <v-flex xs12 md12>
        <v-container>
          <v-row>
            <v-col cols="12" md="4" sm="12">
              <v-card class="mt-4 mx-auto">
                <h2 class="text-center">Usuarios</h2>
                <doughnut-chart
                  v-if="loaded1"
                  :chartdata="usersChartData"
                  :chartlabels="usersLabels"
                  :chartcolors="usersChartColors"
                />
              </v-card>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-card class="mt-4 mx-auto">
                <h2 class="text-center">Servicios</h2>
                <bar-chart
                  v-if="loaded2"
                  :chartdata="servicesChartData"
                  :chartlabels="servicesLabels"
                  :chartcolors="servicesChartColors"
                />
              </v-card>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-card class="mt-4 mx-auto">
                <h2 class="text-center">Suscripciones</h2>
                <line-chart
                  v-if="loaded3"
                  :chartdata="suscribeChartData"
                  :chartlabels="suscribeLabels"
                  :chartcolors="suscribeChartColors"
                />
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Services from "@/services/Services";
import UsersService from "@/services/UsersService";
import SuscribeService from "@/services/SuscribeService";

export default {
  data: () => ({
    usersChartColors: {
      borderColor: "white",
      backgroundColor: [
        "rgba(0, 188, 212, 1)",
        "rgba(255, 193, 7, 1)",
        "rgba(96, 125, 139, 1)",
        "rgba(0, 150, 136, 1)",
      ],
    },
    usersChartData: [],
    usersLabels: [],
    servicesChartColors: {
      borderColor: [
        "rgba(242, 5, 116, 1)",
        "rgba(33, 150, 243, 1)",
        "rgba(156, 39, 176, 1)",
        "rgba(121, 85, 72, 1)",
        "rgba(205, 220, 57, 1)",
      ],
      backgroundColor: [
        "rgba(242, 5, 116, 0.2)",
        "rgba(33, 150, 243, 0.2)",
        "rgba(156, 39, 176, 0.2)",
        "rgba(121, 85, 72, 0.2)",
        "rgba(205, 220, 57, 0.2)",
      ],
    },
    servicesChartData: [],
    servicesLabels: [],
    suscribeChartColors: {
      borderColor: "rgba(242, 90, 56, 1)",
      backgroundColor: "rgba(242, 90, 56, 0.2)",
    },
    suscribeChartData: [],
    suscribeLabels: [],
    loaded1: false,
    loaded2: false,
    loaded3: false,
    months: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    contmonths: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  }),
  methods: {
    formatDate(date) {
      if (!date) return null;
      var aux = date.replace(/\T.+/, "");
      const [year, month, day] = aux.split("-");
      const fecha = [year, month, day];
      return fecha;
    },
  },
  async mounted() {
    this.loaded1 = false;
    this.loaded2 = false;
    this.loaded3 = false;

    await UsersService.getusers()
      .then((response) => {
        const data = response.data;
        var gennum = 0,
          extnum = 0,
          invnum = 0,
          pronum = 0;
        data.forEach((d) => {
          switch (d.dependencies) {
            case "Coordinador General":
              gennum++;
              break;
            case "Coordinador de Extensión":
              extnum++;
              break;
            case "Coordinador de Investigación":
              invnum++;
              break;
            case "Profesor/Investigador":
              pronum++;
              break;
          }
        });
        this.usersChartData = [gennum, extnum, invnum, pronum];
        this.usersLabels = [
          "Coordinador General",
          "Coordinador de Extensión",
          "Coordinador de Investigación",
          "Profesor/Investigador",
        ];
        this.loaded1 = true;
      })
      .catch((err) => console.log(err.response.data.error));

    await Services.getservices()
      .then((response) => {
        const data = response.data;
        var invnum = 0,
          tecnum = 0,
          mernum = 0,
          mednum = 0,
          deunum = 0;
        data.forEach((d) => {
          switch (d.category) {
            case "Investigación":
              invnum++;
              break;
            case "Tecnología":
              tecnum++;
              break;
            case "Mercadeo":
              mernum++;
              break;
            case "Medicina":
              mednum++;
              break;
            case "Educación":
              deunum++;
              break;
          }
        });
        this.servicesChartData = [invnum, tecnum, mernum, mednum, deunum];
        this.servicesLabels = [
          "Investigación",
          "Tecnología",
          "Mercadeo",
          "Medicina",
          "Educación",
        ];
        this.loaded2 = true;
      })
      .catch((err) => console.log(err.response.data.error));

    await SuscribeService.getsuscribers()
      .then((response) => {
        const data = response.data;

        var d = new Date();
        var ano = d.getFullYear().toString();

        data.forEach((d) => {
          var fecha = this.formatDate(d.dateSub);

          if (fecha[0] === ano) {
            switch (fecha[1]) {
              case "01":
                this.contmonths[0]++;
                break;
              case "02":
                this.contmonths[1]++;
                break;
              case "03":
                this.contmonths[2]++;
                break;
              case "04":
                this.contmonths[3]++;
                break;
              case "05":
                this.contmonths[4]++;
                break;
              case "06":
                this.contmonths[5]++;
                break;
              case "07":
                this.contmonths[6]++;
                break;
              case "08":
                this.contmonths[7]++;
                break;
              case "09":
                this.contmonths[8]++;
                break;
              case "10":
                this.contmonths[9]++;
                break;
              case "11":
                this.contmonths[10]++;
                break;
              case "12":
                this.contmonths[11]++;
                break;
            }
          }
        });
        
        this.suscribeChartData = this.contmonths;
        this.suscribeLabels = this.months;
        this.loaded3 = true;
      })
      .catch((err) => console.log(err.response.data.error));
  },
};
</script>
