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
                  v-if="loaded2"
                  :chartdata="servicesChartData"
                  :chartlabels="servicesLabels"
                  :chartcolors="servicesChartColors"
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

export default {
  data: () => ({
    usersChartColors: {
      borderColor: "white",
      backgroundColor: [
        "rgba(0, 188, 212, 1)",
        "rgba(255, 193, 7, 1)",
        'rgba(96, 125, 139, 1)',
        "rgba(0, 150, 136, 1)",
      ],
    },
    usersChartData: [],
    usersLabels: [],
    servicesChartColors: {
      borderColor: [
        "rgba(244, 67, 54, 1)",
        "rgba(33, 150, 243, 1)",
        "rgba(156, 39, 176, 1)",
        "rgba(121, 85, 72, 1)",
        "rgba(205, 220, 57, 1)",
      ],
      backgroundColor: [
        "rgba(244, 67, 54, 0.2)",
        "rgba(33, 150, 243, 0.2)",
        "rgba(156, 39, 176, 0.2)",
        "rgba(121, 85, 72, 0.2)",
        "rgba(205, 220, 57, 0.2)",
      ],
    },
    servicesChartData: [],
    servicesLabels: [],
    loaded1: false,
    loaded2: false,
  }),
  async mounted() {
    this.loaded1 = false;
    this.loaded2 = false;

    await UsersService.getusers()
      .then((response) => {
        const data = response.data;
        var invnum = 0,
          tecnum = 0,
          mernum = 0,
          mednum = 0;
        data.forEach((d) => {
          switch (d.dependencies) {
            case "Coordinador General":
              invnum++;
              break;
            case "Coordinador de Extensión":
              tecnum++;
              break;
            case "Coordinador de Investigación":
              mernum++;
              break;
            case "Profesor/Investigador":
              mednum++;
              break;
          }
        });
        this.usersChartData = [invnum, tecnum, mernum, mednum];
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
  },
};
</script>
