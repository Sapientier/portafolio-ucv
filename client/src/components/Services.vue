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
            @click="filterServicios('Investigación'); activefilter(1)"
          >
            <v-icon left>mdi-glasses</v-icon>Investigación
          </v-chip>

          <v-chip
            class="ma-2"
            color="primary"
            :input-value="active2"
            filter
            outlined
            @click="filterServicios('Tecnología'); activefilter(2)"
          >
            Tecnología
            <v-icon right>mdi-server</v-icon>
          </v-chip>

          <v-chip
            class="ma-2"
            color="deep-purple accent-4"
            :input-value="active3"
            filter
            outlined
            @click="filterServicios('Mercadeo'); activefilter(3)"
          >
            <v-icon left>mdi-currency-usd</v-icon>Mercadeo
          </v-chip>

          <v-chip
            class="ma-2"
            color="indigo darken-3"
            :input-value="active4"
            filter
            outlined
            @click="filterServicios('Medicina'); activefilter(4)"
          >
            <v-icon left>mdi-medical-bag</v-icon>Medicina
          </v-chip>

          <v-chip
            class="ma-2"
            color="red darken-3"
            :input-value="active5"
            filter
            outlined
            @click="filterServicios('Educación'); activefilter(5)"
          >
            <v-icon left>mdi-book</v-icon>Educación
          </v-chip>
        </div>
        <v-divider></v-divider>
      </v-flex>

      <feed-card
        v-for="(services, i) in paginatedServices"
        :key="services.name"
        :size="layout[i]"
        :value="services"
      />
    </v-layout>

    <v-layout align-center>
      <v-pagination v-model="page" :length="pages" :total-visible="7"></v-pagination>
    </v-layout>
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
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cerrar</v-btn>
            <v-btn color="blue darken-1" text @click="insertService" :disabled="!valid">Guardar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn text @click="snack = false">Cerrar</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
// Utilities
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Feed",

  components: {
    FeedCard: () => import("@/components/FeedCard")
  },

  data: () => ({
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
      "Investigación"
    ],
    itemselSchool: [
      "N/A",
      "Biología",
      "Computación",
      "Física",
      "Geoquímica",
      "Matemática",
      "Química"
    ],
    itemselInst: ["N/A", "IBE", "ICTA", "ICT"],
    dialog: false,
    rulesImg: [
      value =>
        !value ||
        value.size < 2000000 ||
        "¡El tamaño de la imagen debe ser inferior a 2 MB!"
    ],
    nameRules: [v => !!v || "Nombre de servicio es requerida"],
    categoriaRules: [v => !!v || "La categoría es requerida"],
    autorRules: [v => !!v || "El autor es requerido"]
  }),
  created() {
    this.getServicios();
  },
  methods: {
    ...mapActions(["getServicios", "setServicios", "filterServicios"]),
    async insertService() {
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
        const response = this.setServicios(fd).then(response =>
          this.insertInline()
        );
        this.close();
      } catch (error) {
        this.snack = true;
        this.snackColor = "error";
        this.snackText = error.response.data.error;
      }
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
    }
  },
  computed: {
    ...mapGetters(["services"]),
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    pages() {
      return Math.ceil(this.services.length / 8);
    },
    paginatedServices() {
      const start = (this.page - 1) * 8;
      const stop = this.page * 8;

      return this.services.slice(start, stop);
    }
  }
};
</script>
