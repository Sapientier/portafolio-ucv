<template>
  <v-col xs="12" :class="classes" cols="12">
    <v-hover v-slot:default="{ hover }">
      <base-card
        :height="350"
        color="grey lighten-1"
        dark
        :elevation="hover ? 16 : 2"
      >
        <v-img
          :src="`${value.imageService}`"
          height="100%"
          gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
        >
          <v-row class="ma-0 fill-height">
            <v-col xs="12" cols="12">
              <v-chip
                label
                class="mx-0 mb-2 text-uppercase"
                color="grey darken-3"
                text-color="white"
                small
                @click.stop
                >{{ value.category }}</v-chip
              >
              <h3 class="title font-weight-bold mb-2">{{ value.name }}</h3>
              <div class="caption">
                {{ value.autor }}
                <br />
                {{ formatDate(value.date) }}
              </div>
              <v-checkbox
                v-model="value.approve"
                disabled
                v-if="$store.state.isUserLoggedIn"
              ></v-checkbox>
            </v-col>
            <v-col class="d-flex justify-start" align-self="end">
              <v-chip
                class="text-uppercase ma-0"
                color="primary"
                label
                small
                @click="seeItem(value)"
                >Leer Más</v-chip
              >
            </v-col>
            <v-col
              align-self="end"
              class="d-flex justify-end"
              v-if="$store.state.isUserLoggedIn"
            >
              <v-btn
                color="green"
                class="ml-1"
                fab
                small
                dark
                @click="editItem(value)"
                v-if="
                  $store.state.user.schoolUser === value.school ||
                    $store.state.user.instituteUser === value.institute ||
                    $store.state.user.dependencies !== 'Profesor/Investigador'
                "
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                color="red"
                class="ml-1"
                fab
                dark
                small
                @click="deleteItem(value)"
                v-if="
                  $store.state.user.schoolUser === value.school ||
                    $store.state.user.instituteUser === value.institute ||
                    $store.state.user.dependencies !== 'Profesor/Investigador'
                "
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-img>
        <v-dialog v-model="dialog" persistent max-width="350px">
          <v-card>
            <v-card-title>
              <span class="headline">Atención</span>
            </v-card-title>
            <v-card-text
              >¿Esta seguro que desea eliminar este servicio?</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteval"
                >Aceptar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog2" persistent max-width="600px">
          <v-card>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-card-title>
                <span class="headline">Actualización de Servicio</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-container fluid>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Nombre*"
                        :rules="nameRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="editedItem.category"
                        :items="itemselCat"
                        label="Categoría*"
                        :rules="categoriaRules"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.autor"
                        label="Coordinador*"
                        :rules="autorRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="editedItem.school"
                        :items="itemselSchool"
                        :rules="schoolRules"
                        label="Escuela*"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="editedItem.institute"
                        :items="itemselInst"
                        :rules="instRules"
                        label="Instituto*"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="computedDateFormatted"
                            label="Fecha de Creación*"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.date"
                          no-title
                          scrollable
                          locale="es-es"
                          @input="menu = false"
                        >
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
                      <v-text-field
                        v-model="editedItem.userspp"
                        label="Usuarios Involucrados"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="editedItem.description"
                        label="Descripción"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.request"
                        label="Solicitud del Servicio"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.paramserv"
                        label="Parámetros del Servicio"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="editedItem.direction"
                        label="Dirección"
                        rows="3"
                      />
                    </v-col>
                  </v-row>
                </v-container>
                <small>*Indica que es un campo requerido</small>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions v-if="$store.state.isUserLoggedIn">
                <v-spacer></v-spacer>
                <v-switch
                  v-model="editedItem.approve"
                  label="Aprobado"
                  :disabled="
                    $store.state.user.dependencies === 'Profesor/Investigador'
                  "
                ></v-switch>
                <v-spacer></v-spacer>
                <v-btn text @click="close">Cerrar</v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="updateService"
                  :disabled="!valid"
                  >Guardar</v-btn
                >
                <v-overlay :value="overlay">
                  <v-progress-circular
                    indeterminate
                    size="64"
                  ></v-progress-circular>
                </v-overlay>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="dialog3"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="dialog3 = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title
                >{{ value.name }} ({{
                  value.school !== "N/A"
                    ? value.school
                    : value.institute !== "N/A"
                    ? value.institute
                    : ""
                }})</v-toolbar-title
              >
              <v-spacer></v-spacer>

              <v-dialog v-model="dialog4" persistent max-width="450px">
                <template v-slot:activator="{ on, attrs }">
                  <v-toolbar-items>
                    <v-btn
                      v-if="value.approve === true"
                      dark
                      text
                      v-bind="attrs"
                      v-on="on"
                      >Suscribirse</v-btn
                    >
                  </v-toolbar-items>
                </template>
                <v-card>
                  <v-card-title class="headline">Suscripción</v-card-title>
                  <v-card-text>
                    <v-form ref="form"
                      ><v-text-field
                        label="Correo"
                        prepend-icon="mdi-email"
                        v-model="emailSub"
                        type="email"
                        :rules="emailRules"
                      ></v-text-field></v-form
                  ></v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="close">
                      Cerrar
                    </v-btn>
                    <v-btn
                      color="primary darken-1"
                      text
                      @click="suscribeService"
                      >Aceptar</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
            <v-container grid-list-xl>
              <v-row>
                <v-col cols="12" sm="6">
                  <div class="title">
                    Usuarios del Servicio, Producto o Proceso:
                  </div>
                  <p class="body-1">{{ value.userspp }}</p>
                  <br />
                  <div class="title">Descripción:</div>
                  <p class="body-1">{{ value.description }}</p>
                  <br />
                  <div class="title">Solicitud del servicio:</div>
                  <p class="body-1">{{ value.request }}</p>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-img :src="`${value.imageService}`" height="100%"></v-img>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" sm="6">
                  <div class="title">Parámetros del servicio:</div>
                  <p class="body-1">{{ value.paramserv }}</p>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="title">Dirección:</div>
                  <p class="body-1">{{ value.direction }}</p>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>
        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
          {{ snackText }}
          <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="snack = false">Cerrar</v-btn>
          </template>
        </v-snackbar>
      </base-card>
    </v-hover>
  </v-col>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Services from "@/services/Services";
import NotificationService from "@/services/NotificationService";
import SuscribeService from "@/services/SuscribeService";

export default {
  data: () => ({
    defaultItem: {
      _id: "",
      name: "",
      category: "",
      autor: "",
      date: new Date().toISOString().substr(0, 10),
      imageService: "",
      school: "",
      institute: "",
      userspp: "",
      description: "",
      request: "",
      paramserv: "",
      direction: "",
      approve: false,
    },
    editedItem: {
      _id: "",
      name: "",
      category: "",
      autor: "",
      date: new Date().toISOString().substr(0, 10),
      imageService: "",
      school: "",
      institute: "",
      userspp: "",
      description: "",
      request: "",
      paramserv: "",
      direction: "",
      approve: false,
    },
    emailRules: [
      (v) => !!v || "El correo es requerido",
      (v) => /.+@.+\..+/.test(v) || "El correo debe ser valido",
    ],
    error: null,
    selectedFile: null,
    menu: false,
    snack: false,
    snackColor: "",
    snackText: "",
    emailSub: "",
    dialog: false,
    dialog2: false,
    dialog3: false,
    dialog4: false,
    overlay: false,
    valid: true,
    itemselCat: [
      "Ambiente",
      "Enseñanza de la Ciencia",
      "Extensión",
      "Geociencias",
      "Materiales y Energía",
      "Modelos y Teorías",
      "Salud",
      "Seguridad Alimentaria",
      "Tecnologías de la Información y Comunicación",
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
    rulesImg: [
      (value) =>
        !value ||
        value.size < 1000000 ||
        "¡El tamaño de la imagen debe ser inferior a 1 MB!",
    ],
    nameRules: [(v) => !!v || "Nombre de servicio es requerida"],
    categoriaRules: [(v) => !!v || "La categoría es requerida"],
    autorRules: [(v) => !!v || "El autor es requerido"],
    schoolRules: [(v) => v.length > 0 || "La escuela es requerida"],
    instRules: [(v) => v.length > 0 || "El instituto es requerido"],
  }),
  props: {
    size: {
      type: Number,
      required: true,
    },
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    ...mapActions(["removeServicios", "updateServicios"]),
    formatDate(date) {
      if (!date) return null;
      const [newdate, x] = date.split("T");
      const [year, month, day] = newdate.split("-");
      return `${day}/${month}/${[year]}`;
    },
    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog2 = true;
    },
    seeItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog3 = true;
    },
    async deleteval() {
      this.overlay = true;
      try {
        await Services.deleteservices({
          _id: this.editedItem._id,
          imageService: this.editedItem.imageService,
        }).then((response) => {
          this.delete();
          this.removeServicios(this.editedItem._id);
        });

        await NotificationService.insertnotifications({
          id: this.$store.state.user._id,
          name: this.editedItem.name,
          category: this.editedItem.category,
          approve: this.editedItem.approve,
          email: this.$store.state.user.email,
          isUpdate: 2,
          serviceId: this.editedItem._id,
          institute:
            this.editedItem.institute === "N/A"
              ? ""
              : this.editedItem.institute,
          school:
            this.editedItem.school === "N/A" ? "" : this.editedItem.school,
        });
      } catch (err) {
        this.snack = true;
        this.snackColor = "error";
        this.snackText = err.response.data.error;
      }
      this.close();
    },
    async updateService() {
      this.overlay = true;
      const fd = new FormData();

      if (this.selectedFile !== null && this.selectedFile !== undefined) {
        fd.append("image", this.selectedFile, this.selectedFile.name);
      }
      fd.append("_id", this.editedItem._id);
      fd.append("name", this.editedItem.name);
      fd.append("autor", this.editedItem.autor);
      fd.append("userspp", this.editedItem.userspp);
      fd.append("school", this.editedItem.school);
      fd.append("category", this.editedItem.category);
      fd.append("institute", this.editedItem.institute);
      fd.append("description", this.editedItem.description);
      fd.append("request", this.editedItem.request);
      fd.append("paramserv", this.editedItem.paramserv);
      fd.append("direction", this.editedItem.direction);
      fd.append("date", this.editedItem.date);
      fd.append("imageService", this.editedItem.imageService);
      fd.append("approve", this.editedItem.approve);

      try {
        await Services.updateservices(fd).then((response) => {
          this.update();
          this.updateServicios(response.data);
        });

        await NotificationService.insertnotifications({
          id: this.$store.state.user._id,
          name: this.editedItem.name,
          category: this.editedItem.category,
          approve: this.editedItem.approve,
          email: this.$store.state.user.email,
          isUpdate: 1,
          serviceId: this.editedItem._id,
          institute:
            this.editedItem.institute === "N/A"
              ? ""
              : this.editedItem.institute,
          school:
            this.editedItem.school === "N/A" ? "" : this.editedItem.school,
        });

        this.close();
      } catch (err) {
        this.overlay = false;
        this.snack = true;
        this.snackColor = "error";
        this.snackText = err.response.data.error;
      }
    },
    async suscribeService() {
      this.overlay = true;
      if (this.emailSub !== "") {
        await SuscribeService.suscribe({
          emailSub: this.emailSub,
          typeSub: "Unique",
          serviceName: this.value.name,
          serviceId: this.value._id,
        })
          .then((response) => this.subInline())
          .catch((err) => this.errorEmail(err.response.data.error));

        this.close();
      } else {
        this.errorEmail("Debe ingresar un correo electrónico");
      }
      this.overlay = false;
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    close() {
      this.overlay = false;
      this.dialog = false;
      this.dialog2 = false;
      this.dialog4 = false;
      this.emailSub = "";
      this.resetValidation();
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      }, 300);
    },
    delete() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Servicio eliminado";
    },
    update() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Servicio actualizado";
    },
    errorEmail(error) {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = error;
    },
    subInline() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Suscripción realizada con éxito";
    },
  },
  computed: {
    classes() {
      return {
        "col-md-6": this.size === 2,
        "col-md-4": this.size === 3,
      };
    },
    computedDateFormatted() {
      return this.formatDate(this.editedItem.date);
    },
  },
};
</script>

<style>
.v-image__image {
  transition: 0.3s linear;
}
</style>
