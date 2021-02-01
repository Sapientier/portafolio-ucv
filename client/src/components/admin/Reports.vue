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
            :chartlabels="itemselCat"
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
              <v-col xs="12" md="4">
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
                  <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index < 2">
                      <span>{{ item.text }}</span>
                    </v-chip>
                    <span v-if="index === 2" class="grey--text caption">
                      (y {{ selectedCollections.length - 2 }} más)
                    </span>
                  </template>
                </v-select>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row justify="center">
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
                  <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index < 2">
                      <span>{{ item.text }}</span>
                    </v-chip>
                    <span v-if="index === 2" class="grey--text caption">
                      (y {{ collection.selectedFields.length - 2 }} más)
                    </span>
                  </template>
                </v-select>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row justify="center">
              <v-col
                cols="12"
                xs="12"
                md="3"
                :key="index"
                v-for="(item, index) in selectedFields()"
              >
                <v-text-field
                  v-if="
                    item.type !== 'Date' &&
                      item.type !== 'Boolean' &&
                      item.text !== 'Categoría' &&
                      item.text !== 'Escuela' &&
                      item.text !== 'Instituto' &&
                      item.text !== 'Dependencias'
                  "
                  v-model="selectedFieldVals[index]"
                  :label="item.text + ' (' + item.parentText + ')'"
                  placeholder="(Todos)"
                ></v-text-field>
                <v-select
                  v-if="item.text === 'Dependencias'"
                  v-model="selectedFieldVals[index]"
                  :label="item.text + ' (' + item.parentText + ')'"
                  :items="usersLabels"
                  placeholder="(Todos)"
                ></v-select>
                <v-select
                  v-if="item.text === 'Categoría'"
                  v-model="selectedFieldVals[index]"
                  :label="item.text + ' (' + item.parentText + ')'"
                  :items="itemselCat"
                  placeholder="(Todos)"
                ></v-select>
                <v-select
                  v-if="item.text === 'Instituto'"
                  v-model="selectedFieldVals[index]"
                  :label="item.text + ' (' + item.parentText + ')'"
                  :items="itemselInst"
                  placeholder="(Todos)"
                ></v-select>
                <v-select
                  v-if="item.text === 'Escuela'"
                  v-model="selectedFieldVals[index]"
                  :label="item.text + ' (' + item.parentText + ')'"
                  :items="itemselSchool"
                  placeholder="(Todos)"
                ></v-select>
                <v-switch
                  v-if="item.type === 'Boolean'"
                  v-model="selectedFieldVals[index]"
                  :label="item.text + ' (' + item.parentText + ')'"
                ></v-switch>
                <v-menu
                  v-model="menu[index]"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                  v-if="item.type === 'Date'"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="selectedFieldVals[index]"
                      :label="item.text + ' (' + item.parentText + ')'"
                      readonly
                      placeholder="(Todos)"
                      v-on="on"
                      v-bind="attrs"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    no-title
                    scrollable
                    locale="es-es"
                    @change="computedDateFormatted(index)"
                    @input="menu[index] = false"
                  >
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" xs="12" class="text-center">
                <v-btn
                  v-if="selectedFields().length > 0"
                  color="primary"
                  @click="queryreports()"
                  >Consultar</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col xs="12">
        <v-card>
          <v-card-title v-if="isQuery" style="justify-content: center">
            Resultados
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  @click="convertPDF()"
                  v-on="on"
                >
                  <v-icon>mdi-download</v-icon>
                </v-btn>
              </template>
              <span>Descargar PDF</span>
            </v-tooltip>
          </v-card-title>
          <v-data-table
            :header-props="headerProps"
            :headers="headers"
            :items="ReportList"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            @page-count="pageCount = $event"
            :loading="loading"
            loading-text="Cargando... Por favor espere"
          >
            <template v-slot:[`item.dateNoti`]="{ item }">
              {{ formatDate2(item.dateNoti) }}
            </template>
            <template v-slot:[`item.date`]="{ item }">
              {{ formatDate2(item.date) }}
            </template>
            <template v-slot:[`item.dateSub`]="{ item }">
              {{ formatDate2(item.dateSub) }}
            </template>
            <template v-slot:[`item.approve`]="{ item }">
              <v-checkbox v-model="item.approve" disabled></v-checkbox>
            </template>
            <template v-slot:[`item.isActive`]="{ item }">
              <v-checkbox v-model="item.isActive" disabled></v-checkbox>
            </template>
            <template v-slot:[`item.isAdmin`]="{ item }">
              <v-checkbox v-model="item.isAdmin" disabled></v-checkbox>
            </template>
            <template v-slot:no-data>
              Datos no disponibles
            </template>
          </v-data-table>
        </v-card>
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
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  data: () => ({
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    menu: [false, false, false],
    loading: false,
    isQuery: false,
    date: new Date().toISOString().substr(0, 10),
    headerProps: {
      sortByText: "Ordenar por",
    },
    headers: [],
    ReportList: [],
    ReportListAux: [],
    itemselCat: [
      "Ambiente",
      "Enseñanza de Ciencia",
      "Extensión",
      "Geociencias",
      "Materiales y Energía",
      "Modelos y Teorías",
      "Salud",
      "Seguridad Alimentaria",
      "TIC",
    ],
    itemselSchool: [
      "N/A",
      "Biología",
      "Computación",
      "Física",
      "Geoquímica",
      "Matemática",
      "Química",
    ],
    itemselInst: ["N/A", "IBE", "ICTA", "ICT"],
    selectedFieldVals: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    selectedCollections: [],
    collections: [
      {
        value: "notifications",
        text: "Notificaciones",
        selectedFields: [],
        fields: [
          {
            parentText: "Notificaciones",
            value: "title",
            text: "Título",
            type: "String",
          },
          {
            parentText: "Notificaciones",
            value: "dateNoti",
            text: "Fecha",
            type: "Date",
          },
          {
            parentText: "Notificaciones",
            value: "owner",
            text: "Dueño",
            type: "String",
          },
          {
            parentText: "Notificaciones",
            value: "descriptionNoti",
            text: "Descripción",
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
            value: "name",
            text: "Nombre",
            type: "String",
          },
          {
            parentText: "Servicios",
            value: "date",
            text: "Fecha",
            type: "Date",
          },
          {
            parentText: "Servicios",
            value: "autor",
            text: "Coordinador",
            type: "String",
          },
          {
            parentText: "Servicios",
            value: "category",
            text: "Categoría",
            type: "String",
          },
          {
            parentText: "Servicios",
            value: "institute",
            text: "Instituto",
            type: "String",
          },
          {
            parentText: "Servicios",
            value: "school",
            text: "Escuela",
            type: "String",
          },
          {
            parentText: "Servicios",
            value: "approve",
            text: "Aprobado",
            type: "Boolean",
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
            value: "emailSub",
            text: "Email",
            type: "String",
          },
          {
            parentText: "Suscriptores",
            value: "dateSub",
            text: "Fecha",
            type: "Date",
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
            value: "dependencies",
            text: "Dependencias",
            type: "String",
          },
          {
            parentText: "Usuarios",
            value: "email",
            text: "Email",
            type: "String",
          },
          {
            parentText: "Usuarios",
            value: "instituteUser",
            text: "Instituto",
            type: "String",
          },
          {
            parentText: "Usuarios",
            value: "schoolUser",
            text: "Escuela",
            type: "String",
          },
          {
            parentText: "Usuarios",
            value: "isActive",
            text: "Activo",
            type: "Boolean",
          },
          {
            parentText: "Usuarios",
            value: "isAdmin",
            text: "Administrador",
            type: "Boolean",
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
    usersLabels: [
      "Coordinador General",
      "Coordinador de Extensión",
      "Coordinador de Investigación",
      "Profesor/Investigador",
    ],
    servicesChartColors: {
      borderColor: [
        "rgba(242, 5, 116, 1)",
        "rgba(33, 150, 243, 1)",
        "rgba(156, 39, 176, 1)",
        "rgba(121, 85, 72, 1)",
        "rgba(205, 220, 57, 1)",
        "rgba(90, 100, 223, 1)",
        "rgba(132, 93, 167, 1)",
        "rgba(102, 150, 27, 1)",
        "rgba(250, 202, 75, 1)",
      ],
      backgroundColor: [
        "rgba(242, 5, 116, 0.2)",
        "rgba(33, 150, 243, 0.2)",
        "rgba(156, 39, 176, 0.2)",
        "rgba(121, 85, 72, 0.2)",
        "rgba(205, 220, 57, 0.2)",
        "rgba(90, 100, 223, 0.2)",
        "rgba(132, 93, 167, 0.2)",
        "rgba(102, 150, 27, 0.2)",
        "rgba(250, 202, 75, 0.2)",
      ],
    },
    servicesChartData: [],
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
    buildTableBody(data, columns, headers) {
      var body = [];
      body.push(headers);

      data.forEach((row) => {
        var dataRow = [];

        columns.forEach((column) => {
          if (row[column] === undefined) {
            dataRow.push("");
          } else {
            if (
              column === "date" ||
              column === "dateSub" ||
              column === "dateNoti"
            ) {
              dataRow.push(this.formatDate2(row[column]).toString());
            } else if (
              column === "approve" ||
              column === "isActive" ||
              column === "isAdmin"
            ) {
              if (row[column] === true) {
                dataRow.push("Si");
              } else {
                dataRow.push("No");
              }
            } else {
              dataRow.push(row[column].toString());
            }
          }
        });

        body.push(dataRow);
      });

      return body;
    },
    table(data, columns, headers) {
      return {
        table: {
          headerRows: 1,
          body: this.buildTableBody(data, columns, headers),
        },
      };
    },
    convertPDF() {
      var headervaluesPDF = [];
      var headertextPDF = [];
      this.headers.forEach((d) => {
        headervaluesPDF.push(d.value);
        headertextPDF.push({
          text: d.text,
          fillColor: "blue",
          color: "white",
          alignment: "center",
          alignmentChild: "left",
        });
      });
      var dd = {
        pageOrientation: "landscape",
        pageMargins: [20, 20, 20, 20],
        pageSize: "A4",
        defaultStyle: {
          fontSize: 10,
        },
        content: [this.table(this.ReportList, headervaluesPDF, headertextPDF)],
      };
      pdfMake.createPdf(dd).download("Reporte-" + Date.now());
    },
    async queryreports() {
      this.isQuery = true;
      this.loading = true;
      this.headers = [];
      this.ReportList = [];
      const params = this.selectedFields();
      const values = this.selectedFieldVals;
      const notificaciones = {};
      const servicios = {};
      const suscriptores = {};
      const usuarios = {};
      var index = 0;

      params.forEach((d) => {
        switch (d.parentText) {
          case "Notificaciones":
            this.headers.push({
              text: d.text + " (" + d.parentText + ")",
              value: d.value,
            });
            notificaciones[d.value] = values[index];
            index++;
            break;
          case "Servicios":
            this.headers.push({
              text: d.text + " (" + d.parentText + ")",
              value: d.value,
            });
            servicios[d.value] = values[index];
            index++;
            break;
          case "Suscriptores":
            this.headers.push({
              text: d.text + " (" + d.parentText + ")",
              value: d.value,
            });
            suscriptores[d.value] = values[index];
            index++;
            break;
          case "Usuarios":
            this.headers.push({
              text: d.text + " (" + d.parentText + ")",
              value: d.value,
            });
            usuarios[d.value] = values[index];
            index++;
            break;
        }
      });

      if (Object.keys(notificaciones).length !== 0) {
        await NotificationService.getreportsnoti(notificaciones)
          .then((response) => {
            response.data.forEach((d) => {
              this.ReportList.push(d);
            });
          })
          .catch((err) => console.log(err.response.data.error));
      }
      if (Object.keys(servicios).length !== 0) {
        await Services.getreportserv(servicios)
          .then((response) => {
            response.data.forEach((d) => {
              this.ReportList.push(d);
            });
          })
          .catch((err) => console.log(err.response.data.error));
      }
      if (Object.keys(suscriptores).length !== 0) {
        await SuscribeService.getreportsusc(suscriptores)
          .then((response) => {
            response.data.forEach((d) => {
              this.ReportList.push(d);
            });
          })
          .catch((err) => console.log(err.response.data.error));
      }
      if (Object.keys(usuarios).length !== 0) {
        await UsersService.getreportsuser(usuarios)
          .then((response) => {
            response.data.forEach((d) => {
              this.ReportList.push(d);
            });
          })
          .catch((err) => console.log(err.response.data.error));
      }
      this.loading = false;
    },
    selectedFields() {
      return this.selectedCollections.reduce(
        (fields, { selectedFields }) => fields.concat(selectedFields),
        []
      );
    },
    toggleSelection(items, selected) {
      this.selectedFieldVals = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ];
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
    formatDate2(date) {
      if (!date) return null;
      const [newdate, x] = date.split("T");
      const [year, month, day] = newdate.split("-");
      return `${day}/${month}/${year}`;
    },
    computedDateFormatted(index) {
      this.selectedFieldVals[index] = this.formatDate2(this.date);
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
          deunum = 0,
          modnum = 0,
          salnum = 0,
          segnum = 0,
          tecnonum = 0;
        data.forEach((d) => {
          switch (d.category) {
            case "Ambiente":
              invnum++;
              break;
            case "Enseñanza de la Ciencia":
              tecnum++;
              break;
            case "Extensión":
              mernum++;
              break;
            case "Geociencias":
              mednum++;
              break;
            case "Materiales y Energía":
              deunum++;
              break;
            case "Modelos y Teorías":
              modnum++;
              break;
            case "Salud":
              salnum++;
              break;
            case "Seguridad Alimentaria":
              segnum++;
              break;
            case "Tecnologías de la Información y Comunicación":
              tecnonum++;
              break;
          }
        });
        this.servicesChartData = [invnum, tecnum, mernum, mednum, deunum, modnum, salnum, segnum, tecnonum];
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
