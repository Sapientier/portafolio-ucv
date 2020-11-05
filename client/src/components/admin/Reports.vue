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
  }),
  methods: {
    formatDate(date) {
      if (!date) return null;
      var aux = date.replace(/\T.+/, "");
      const [year, month, day] = aux.split("-");

      return month - 0;
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
        var month = new Array();
        month[0] = "Enero";
        month[1] = "Febrero";
        month[2] = "Marzo";
        month[3] = "Abril";
        month[4] = "Mayo";
        month[5] = "Junio";
        month[6] = "Julio";
        month[7] = "Agosto";
        month[8] = "Septiembre";
        month[9] = "Octubre";
        month[10] = "Noviembre";
        month[11] = "Diciembre";

        var d = new Date();
        const mes3l = d.getMonth() + 1,
          mes2l = d.getMonth(),
          mes1l = d.getMonth() - 1;

        var mes1 = 0,
          mes2 = 0,
          mes3 = 0;

        data.forEach((d) => {
          var fecha = this.formatDate(d.dateSub);
          switch (fecha) {
            case mes1l:
              mes1++;
              break;
            case mes2l:
              mes2++;
              break;
            case mes3l:
              mes3++;
              break;
          }
        });
        this.suscribeChartData = [mes1, mes2, mes3];
        this.suscribeLabels = [
          month[d.getMonth() - 2],
          month[d.getMonth() - 1],
          month[d.getMonth()],
        ];
        this.loaded3 = true;
      })
      .catch((err) => console.log(err.response.data.error));
  },
};
</script>
