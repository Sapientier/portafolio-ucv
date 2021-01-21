<template>
  <v-container grid-list-xl>
    <v-row justify="center">
      <v-col xs="12">
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar usuarios"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :header-props="headerProps"
            :headers="headers"
            :items="UserList"
            :search="search"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            @page-count="pageCount = $event"
            :loading="loading"
            loading-text="Cargando... Por favor espere"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Administración de Usuarios</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog2" persistent max-width="350px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Atención</span>
                    </v-card-title>
                    <v-card-text
                      >¿Esta seguro que desea eliminar este
                      usuario?</v-card-text
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
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="mb-2" v-on="on"
                      >Agregar</v-btn
                    >
                  </template>
                  <v-card>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container fluid>
                          <v-row>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                v-model="editedItem.email"
                                label="Correo"
                                type="email"
                                :rules="emailRules"
                              ></v-text-field>
                            </v-col>
                            <v-col col="12" sm="6" md="6">
                              <v-select
                                v-model="editedItem.dependencies"
                                :items="itemsel"
                                label="Dependencias"
                                :rules="depenRules"
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-switch
                                v-model="editedItem.isAdmin"
                                label="Administrador"
                              ></v-switch>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-switch
                                v-model="editedItem.isActive"
                                label="Bloqueado"
                              ></v-switch>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="6"
                              class="ml-auto mr-auto"
                              v-if="editedIndex > -1"
                            >
                              <v-btn color="primary" @click="reset"
                                >Reiniciar Contraseña</v-btn
                              >
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-alert
                        type="error"
                        v-model="alert"
                        dismissible
                        transition="scale-transition"
                      >
                        <div v-html="error"></div>
                      </v-alert>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="close">Cerrar</v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="save"
                          :disabled="!valid"
                          >Aceptar</v-btn
                        >
                      </v-card-actions>
                      <v-overlay :value="overlay">
                        <v-progress-circular
                          indeterminate
                          size="64"
                        ></v-progress-circular>
                      </v-overlay>
                    </v-form>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <!-- change table header background and text color(or other properties) -->
            <template v-slot:[`item.action`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)"
                >mdi-pencil</v-icon
              >
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:[`item.isAdmin`]="{ item }">
              <v-checkbox v-model="item.isAdmin" disabled></v-checkbox>
            </template>
            <template v-slot:[`item.isActive`]="{ item }">
              <v-checkbox v-model="item.isActive" disabled></v-checkbox>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">Reiniciar</v-btn>
            </template>
          </v-data-table>
        </v-card>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
          {{ snackText }}
          <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="snack = false">Cerrar</v-btn>
          </template>
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UsersService from "@/services/UsersService";
import AuthenticationService from "@/services/AuthenticationService";

export default {
  data: () => ({
    emailRules: [
      (v) => !!v || "El correo es requerido",
      (v) => /.+@.+\..+/.test(v) || "El correo debe ser valido",
    ],
    depenRules: [(v) => v.length > 0 || "La dependencia es requerida"],
    valid: true,
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    show1: false,
    error: null,
    alert: false,
    snack: false,
    snackColor: "",
    snackText: "",
    UserList: [],
    dialog: false,
    dialog2: false,
    overlay: false,
    loading: false,
    itemsel: [
      "Coordinador General",
      "Coordinador de Extensión",
      "Coordinador de Investigación",
      "Profesor/Investigador",
    ],
    search: "",
    headerProps: {
      sortByText: "Ordenar por",
    },
    headers: [
      { text: "Correo", value: "email" },
      { text: "Administrador", value: "isAdmin" },
      { text: "Bloqueado", value: "isActive" },
      { text: "Dependencias", value: "dependencies" },
      { text: "Acciones", value: "action", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      _id: "",
      password: "",
      email: "",
      isAdmin: false,
      isActive: false,
      dependencies: "",
    },
    defaultItem: {
      _id: "",
      password: "",
      email: "",
      isAdmin: false,
      isActive: false,
      dependencies: "",
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Usuario" : "Editar Usuario";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialog2(val) {
      val || this.close();
    },
  },
  // called when page is created before dom
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      this.loading = true;
      const response = await UsersService.getusers()
        .then((response) => {
          this.UserList = response.data;
        })
        .catch((error) => console.log(error));
      this.loading = false;
    },
    // object.assign fills in the empty object with the properties of item
    editItem(item) {
      this.editedIndex = this.UserList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.UserList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog2 = true;
    },
    async deleteval() {
      this.overlay = true;
      try {
        const response = await UsersService.deleteusers({
          _id: this.editedItem._id,
        }).then((response) => this.delete());
        this.UserList.splice(this.editedIndex, 1);
      } catch (error) {
        this.errordelete(error.response.data.error);
      }
      this.close();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    close() {
      this.dialog = false;
      this.dialog2 = false;
      this.alert = false;
      this.overlay = false;
      this.resetValidation();
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    async save() {
      this.overlay = true;
      if (this.editedIndex > -1) {
        try {
          const response = await UsersService.updateusers({
            _id: this.editedItem._id,
            email: this.editedItem.email,
            isAdmin: this.editedItem.isAdmin,
            isActive: this.editedItem.isActive,
            dependencies: this.editedItem.dependencies,
          }).then((response) => this.updateInline());
          Object.assign(this.UserList[this.editedIndex], this.editedItem);
          this.close();
        } catch (error) {
          this.alert = true;
          this.error = error.response.data.error;
        }
      } else {
        try {
          const response = await UsersService.insertusers({
            email: this.editedItem.email,
            isAdmin: this.editedItem.isAdmin,
            isActive: this.editedItem.isActive,
            dependencies: this.editedItem.dependencies,
          }).then((response) => this.saveInline());
          this.UserList.push(this.editedItem);
          this.close();
        } catch (error) {
          this.alert = true;
          this.error = error.response.data.error;
        }
      }
      this.overlay = false;
    },
    async reset() {
      this.overlay = true;
      try {
        const response = await UsersService.resetpass({
          _id: this.editedItem._id,
          email: this.editedItem.email,
        }).then((response) => this.emailInline());
      } catch (error) {
        this.error = error.response.data.error;
      }
      this.overlay = false;
    },
    //toasts/snackbar messages for actions
    emailInline() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Contraseña reiniciada";
    },
    updateInline() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Datos actualizados";
    },
    saveInline() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Datos guardados";
    },
    delete() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Datos eliminados";
    },
    errordelete(error) {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = error;
    },
  },
};
</script>
