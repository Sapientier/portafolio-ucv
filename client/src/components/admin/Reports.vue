<template>
  <v-container grid-list-xl>
    <v-row>
      <v-col cols="12" md="4" sm="12">
        <v-card class="mt-4 mx-auto">
          <h2 class="text-center">Usuarios</h2>
          <doughnut-chart
            v-if="loaded1"
            :chartdata="usersChartData"
            :chartlabels="usersLabels"
            :chartcolors="usersChartColors"
            class="chartsReports"
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
            class="chartsReports"
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
            class="chartsReports"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12">
        <v-card>
          <v-container fluid>
            <v-row justify="center">
              <v-col xs="12" md="6">
                <v-select
                  v-model="selectedCollections"
                  :items="collections"
                  label="Entidades"
                  multiple
                  chips
                  return-object
                >
                  <template v-slot:prepend-item>
                    <v-list-item
                      ripple
                      @click="toggleSelection(collections, selectedCollections)"
                    >
                      <v-list-item-action>
                        <v-icon
                          :color="selectAllIconColor(selectedCollections)"
                        >
                          {{ selectAllIcon(collections, selectedCollections) }}
                        </v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>
                          Seleccionar todo
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                  </template>
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                v-for="(collection, index) in selectedCollections"
                :key="index"
                cols="12"
                xs="12"
                md="3"
              >
                <v-select
                  v-model="collection.selectedFields"
                  :items="collection.fields"
                  :label="collection.text"
                  multiple
                  chips
                  return-object
                >
                  <template v-slot:prepend-item>
                    <v-list-item
                      ripple
                      @click="
                        toggleSelection(
                          collection.fields,
                          collection.selectedFields
                        )
                      "
                    >
                      <v-list-item-action>
                        <v-icon
                          :color="selectAllIconColor(collection.selectedFields)"
                        >
                          {{
                            selectAllIcon(
                              collection.fields,
                              collection.selectedFields
                            )
                          }}
                        </v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>
                          Seleccionar todo
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2" />
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col xs="12">
        <v-data-table
          :header-props="headerProps"
          :headers="headers"
          :items="ReportList"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
          class="elevation-1"
        >
          <template v-slot:no-data>
            Datos no disponibles
          </template>
        </v-data-table>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Services from "@/services/Services";
import UsersService from "@/services/UsersService";
import SuscribeService from "@/services/SuscribeService";
import NotificationService from "@/services/NotificationService";

export default {
  data: () => ({
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    headerProps: {
      sortByText: "Ordenar por",
    },
    headers: [],
    ReportList: [],
    selectedCollections: [],
    collections: [
      {
        value: "notifications",
        text: "Notificaciones",
        selectedFields: [],
        fields: [
          {
            parentText: "Notificaciones",
            value: "notifications.dateNoti",
            text: "Fecha",
            type: "Date",
          },
          {
            parentText: "Notificaciones",
            value: "notifications.description",
            text: "Descripción",
            type: "String",
          },
          {
            parentText: "Notificaciones",
            value: "notifications.owner",
            text: "Dueño",
            type: "String",
          },
          {
            parentText: "Notificaciones",
            value: "notifications.title",
            text: "Título",
            type: "String",
          },
        ],
      },
      {
        value: "services",
        text: "Servicios",
        selectedFields: [],
        fields: [
          {
            parentText: "Servicios",
            value: "services.approve",
            text: "Aprobado",
            type: "Boolean",
          },
          {
            parentText: "Servicios",
            value: "services.autor",
            text: "Autor",
            type: "String",
          },
          {
            parentText: "Servicios",
            value: "services.category",
            text: "Categoría",
            type: "String",
          },
          {
            parentText: "Servicios",
            value: "services.date",
            text: "Fecha",
            type: "Date",
          },
          {
            parentText: "Servicios",
            value: "services.description",
            text: "Descripción",
            type: "String",
          },
          {
            parentText: "Servicios",
            value: "services.institute",
            text: "Instituto",
            type: "String",
          },
          {
            parentText: "Servicios",
            value: "services.name",
            text: "Nombre",
            type: "String",
          },
          {
            parentText: "Servicios",
            value: "services.school",
            text: "Escuela",
            type: "String",
          },
        ],
      },
      {
        value: "subscribers",
        text: "Suscriptores",
        selectedFields: [],
        fields: [
          {
            parentText: "Suscriptores",
            value: "subscribers.dateSub",
            text: "Fecha",
            type: "Date",
          },
          {
            parentText: "Suscriptores",
            value: "subscribers.email",
            text: "Email",
            type: "String",
          },
        ],
      },
      {
        value: "users",
        text: "Usuarios",
        selectedFields: [],
        fields: [
          {
            parentText: "Usuarios",
            value: "users.dependencies",
            text: "Dependencias",
            type: "String",
          },
          {
            parentText: "Usuarios",
            value: "users.email",
            text: "Email",
            type: "String",
          },
          {
            parentText: "Usuarios",
            value: "users.institute",
            text: "Instituto",
            type: "String",
          },
          {
            parentText: "Usuarios",
            value: "users.isActive",
            text: "Activo",
            type: "Boolean",
          },
          {
            parentText: "Usuarios",
            value: "users.isAdmin",
            text: "Usuario administrador",
            type: "Boolean",
          },
          {
            parentText: "Usuarios",
            value: "users.lastname",
            text: "Apellido",
            type: "String",
          },
          {
            parentText: "Usuarios",
            value: "users.name",
            text: "Nombre",
            type: "String",
          },
          {
            parentText: "Usuarios",
            value: "users.school",
            text: "Escuela",
            type: "String",
          },
        ],
      },
    ],
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
    toggleSelection(items, selected) {
      selected.length === items.length
        ? selected.splice(0)
        : selected.splice(0, selected.length, ...items);
    },
    selectAllIcon(items, selected) {
      let icon = "mdi-checkbox-blank-outline";
      if (selected.length === items.length) {
        icon = "mdi-close-box";
      } else if (selected.length) {
        icon = "mdi-minus-box";
      }
      return icon;
    },
    selectAllIconColor(selected) {
      if (selected.length > 0) {
        return "indigo darken-4";
      }
    },
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

<style>
.chartsReports {
  height: 300px;
}
</style>
