<template>
  <v-container grid-list-xl>
    <v-layout wrap>
      <v-flex xs12>
        <div class="text-center">
          <v-chip
            class="ma-2"
            outlined
            :input-value="active0"
            filter
            @click="getServicios(); activefilter(0)"
          >
            <v-icon left>mdi-star</v-icon>Todos
          </v-chip>

          <v-chip
            class="ma-2"
            color="success"
            :input-value="active1"
            filter
            outlined
            @click="filterServiciosbyCat('Investigación'); activefilter(1)"
          >
            <v-icon left>mdi-glasses</v-icon>Investigación
          </v-chip>

          <v-chip
            class="ma-2"
            color="primary"
            :input-value="active2"
            filter
            outlined
            @click="filterServiciosbyCat('Tecnología'); activefilter(2)"
          >
            <v-icon left>mdi-server</v-icon>Tecnología
          </v-chip>

          <v-chip
            class="ma-2"
            color="deep-purple accent-4"
            :input-value="active3"
            filter
            outlined
            @click="filterServiciosbyCat('Mercadeo'); activefilter(3)"
          >
            <v-icon left>mdi-currency-usd</v-icon>Mercadeo
          </v-chip>

          <v-chip
            class="ma-2"
            color="indigo darken-3"
            :input-value="active4"
            filter
            outlined
            @click="filterServiciosbyCat('Medicina'); activefilter(4)"
          >
            <v-icon left>mdi-medical-bag</v-icon>Medicina
          </v-chip>

          <v-chip
            class="ma-2"
            color="red darken-3"
            :input-value="active5"
            filter
            outlined
            @click="filterServiciosbyCat('Educación'); activefilter(5)"
          >
            <v-icon left>mdi-book</v-icon>Educación
          </v-chip>
        </div>

        <v-autocomplete
          v-model="select"
          :loading="loading"
          :items="items"
          :search-input.sync="search"
          cache-items
          class="mx-4"
          flat
          hide-no-data
          hide-details
          label="Buscar servicios"
          solo-inverted
          prepend-inner-icon="mdi-magnify"
        ></v-autocomplete>
      </v-flex>

      <feed-card
        v-for="(services, i) in paginatedServices"
        :key="services.name"
        :size="layout[i]"
        :value="services"
      />
    </v-layout>

    <div class="text-center">
      <v-pagination v-model="page" :length="pages" :total-visible="7"></v-pagination>
    </div>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn
          dark
          fab
          bottom
          right
          fixed
          color="indigo"
          v-if="$store.state.isUserLoggedIn"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-title>
            <span class="headline">Inserción de Servicio</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field v-model="name" label="Nombre*" :rules="nameRules" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-combobox
                    v-model="categories"
                    :items="itemselCat"
                    label="Categoría*"
                    :rules="categoriaRules"
                    required
                  ></v-combobox>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="autor" label="Autor*" :rules="autorRules" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-combobox v-model="schools" :items="itemselSchool" label="Escuela"></v-combobox>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-combobox v-model="institutes" :items="itemselInst" label="Instituto"></v-combobox>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="computedDateFormatted"
                        label="Fecha de Creación*"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable locale="es-es">
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">Cancelar</v-btn>
                      <v-btn text color="primary" @click="$refs.menu.save(date)">Aceptar</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-file-input
                    v-model="selectedFile"
                    :rules="rulesImg"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Imagen"
                    prepend-icon="mdi-camera"
                  ></v-file-input>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="usuariospp" label="Usuarios Involucrados"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="descripcion" label="Descripción" />
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="solicitud" label="Solicitud del Servicio"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="params" label="Parámetros del Servicio"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="direccion" label="Dirección" rows="3" />
                </v-col>
              </v-row>
            </v-container>
            <small>*Indica que es un campo requerido</small>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions v-if="$store.state.isUserLoggedIn">
            <v-spacer></v-spacer>
            <v-switch
              v-model="approve"
              label="Aprobado"
              :disabled="$store.state.user.dependencies == 'Profesor/Investigador'"
            ></v-switch>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cerrar</v-btn>
            <v-btn color="blue darken-1" text @click="insertService" :disabled="!valid">Guardar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snack = false">Cerrar</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
// Utilities
import { mapGetters, mapActions } from "vuex";
import Services from "@/services/Services";

export default {
  name: "Feed",

  components: {
    FeedCard: () => import("@/components/FeedCard"),
  },

  data: () => ({
    loading: false,
    items: [],
    servicesnames: [],
    newServices: [],
    search: null,
    select: null,
    selectedFile: null,
    layout: [2, 2, 1, 2, 2, 3, 3, 3],
    page: 1,
    valid: true,
    active: false,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    snack: false,
    snackColor: "",
    snackText: "",
    name: "",
    autor: "",
    usuariospp: "",
    schools: "",
    categories: "",
    institutes: "",
    descripcion: "",
    solicitud: "",
    params: "",
    direccion: "",
    approve: false,
    active0: true,
    active1: false,
    active2: false,
    active3: false,
    active4: false,
    active5: false,
    itemselCat: [
      "Medicina",
      "Tecnología",
      "Educación",
      "Mercadeo",
      "Investigación",
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
    dialog: false,
    rulesImg: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "¡El tamaño de la imagen debe ser inferior a 2 MB!",
    ],
    nameRules: [(v) => !!v || "Nombre de servicio es requerida"],
    categoriaRules: [(v) => !!v || "La categoría es requerida"],
    autorRules: [(v) => !!v || "El autor es requerido"],
  }),
  created() {
    this.getServicios();
    this.getServiciosNames();
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
      if (val != null) {
        this.activefilter(-1);
        this.filterServiciosbyName(this.search);
      }
    },
  },
  methods: {
    ...mapActions([
      "getServicios",
      "setServicios",
      "filterServiciosbyCat",
      "filterServiciosbyName",
    ]),
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.servicesnames.filter((e) => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
    insertService() {
      try {
        const fd = new FormData();
        if (this.selectedFile != null) {
          fd.append("image", this.selectedFile, this.selectedFile.name);
        }
        fd.append("name", this.name);
        fd.append("autor", this.autor);
        fd.append("userspp", this.usuariospp);
        fd.append("school", this.schools);
        fd.append("category", this.categories);
        fd.append("institute", this.institutes);
        fd.append("description", this.descripcion);
        fd.append("request", this.solicitud);
        fd.append("paramserv", this.params);
        fd.append("direction", this.direccion);
        fd.append("date", this.date);
        fd.append("approve", this.approve);
        const response = this.setServicios(fd).then((response) =>
          this.insertInline()
        );
        this.close();
      } catch (error) {
        this.snack = true;
        this.snackColor = "error";
        this.snackText = error.response.data.error;
      }
    },
    async getServiciosNames() {
      await Services.getservices()
        .then((response) => {
          const servicios = response.data;

          for (const servicio of servicios) {
            if (
              !servicio.name ||
              this.servicesnames.find((name) => name.text === servicio.name)
            )
              continue;

            this.servicesnames.push(servicio.name);
          }

          this.servicesnames.sort();
        })
        .catch((error) => console.log(error));
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    close() {
      this.date = new Date().toISOString().substr(0, 10);
      this.autor = "";
      this.usuariospp = "";
      this.schools = "";
      this.categories = "";
      this.institutes = "";
      this.descripcion = "";
      this.solicitud = "";
      this.params = "";
      this.name = "";
      this.direccion = "";
      this.selectedFile = null;
      this.dialog = false;
      this.resetValidation();
    },
    activefilter(num) {
      this.active0 = false;
      this.active1 = false;
      this.active2 = false;
      this.active3 = false;
      this.active4 = false;
      this.active5 = false;
      switch (num) {
        case 0:
          this.active0 = true;
          break;
        case 1:
          this.active1 = true;
          break;
        case 2:
          this.active2 = true;
          break;
        case 3:
          this.active3 = true;
          break;
        case 4:
          this.active4 = true;
          break;
        case 5:
          this.active5 = true;
          break;
      }
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    //toasts/snackbar messages for actions
    insertInline() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Servicio creado";
    },
    removeItemAll(arr) {
      if(!this.$store.state.isUserLoggedIn){
        var i = 0;
        while (i < arr.length) {
          if (arr[i].approve === false) {
            arr.splice(i, 1);
          } else {
            ++i;
          }
        }
      }
      return arr;
    },
  },
  computed: {
    ...mapGetters(["services"]),
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    pages() {
      return Math.ceil(this.newServices.length / 8);
    },
    paginatedServices() {
      const start = (this.page - 1) * 8;
      const stop = this.page * 8;

      this.newServices = this.services.slice();
      this.newServices = this.removeItemAll(this.newServices);

      return this.newServices.slice(start, stop);
    },
  },
};
</script>
