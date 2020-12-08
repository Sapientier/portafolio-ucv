<template>
  <v-container grid-list-xl>
    <v-row justify="center">
      <v-col xs="12" md="4" cols="12">
        <v-card>
          <v-avatar class="mx-auto d-block" size="130">
            <v-img
              :src="
                imageUser !== ''
                  ? `${imageUser}`
                  : require('@/assets/profile-avatar-icon.png')
              "
            ></v-img>
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h3 class="card-title">{{ names }} {{ lastnames }}</h3>
            <p
              class="card-description font-weight-light"
              v-if="$store.state.user.isAdmin"
            >
              Administrador
            </p>
            <p
              class="card-description font-weight-light"
              v-if="!$store.state.user.isAdmin"
            >
              Operador
            </p>
            <v-file-input
              v-model="selectedFile"
              :rules="rulesImg"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Seleccione una imagen"
              prepend-icon="mdi-camera"
              label="Avatar"
              @change="onFileChange"
            ></v-file-input>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col xs="12" md="8" cols="12">
        <v-card>
          <v-container fluid>
            <v-row>
              <v-col xs="12" md="6" cols="12">
                <v-text-field
                  label="Dependencia"
                  disabled
                  :value="$store.state.user.dependencies"
                />
              </v-col>
              <v-col xs="12" md="6" cols="12">
                <v-text-field
                  :value="$store.state.user.email"
                  label="Correo Electrónico"
                  disabled
                />
              </v-col>
              <v-col xs="12" md="6" cols="12">
                <v-select
                  v-model="escuelas"
                  :items="itemsel"
                  label="Escuela"
                ></v-select>
              </v-col>
              <v-col xs="12" md="6" cols="12">
                <v-select
                  v-model="institutos"
                  :items="itemsel2"
                  label="Instituto"
                ></v-select>
              </v-col>
              <v-col xs="12" md="6">
                <v-btn color="primary" @click="updateUser"
                  >Actualizar Perfil</v-btn
                >
              </v-col>
              <v-col xs="12" md="6">
                <v-dialog v-model="dialog" persistent max-width="400px">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on"
                      >Cambiar contraseña</v-btn
                    >
                  </template>
                  <v-card>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-card-title>
                        <span class="headline">Modificar Contraseña</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container fluid>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                label="Contraseña actual*"
                                v-model="actPass"
                                :counter="20"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show1 ? 'text' : 'password'"
                                @click:append="show1 = !show1"
                                :rules="passwordActRules"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                label="Contraseña nueva*"
                                v-model="newPass"
                                :counter="20"
                                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show2 ? 'text' : 'password'"
                                @click:append="show2 = !show2"
                                :rules="passwordNewRules"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                v-model="newPass2"
                                label="Confirmar contraseña nueva*"
                                :counter="20"
                                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show3 ? 'text' : 'password'"
                                @click:append="show3 = !show3"
                                :rules="passwordNew2Rules"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <small>*Indica los campos requeridos</small>
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
                          @click="checkPassword"
                          :disabled="!valid"
                          >Aceptar</v-btn
                        >
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
              </v-col>
              <v-overlay :value="overlay">
                <v-progress-circular
                  indeterminate
                  size="64"
                ></v-progress-circular>
              </v-overlay>
            </v-row>
          </v-container>
          <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <template v-slot:action="{ attrs }">
              <v-btn text v-bind="attrs" @click="snack = false">Cerrar</v-btn>
            </template>
          </v-snackbar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UsersService from "@/services/UsersService";

export default {
  data: () => ({
    dialog: false,
    valid: true,
    actPass: "",
    newPass: "",
    newPass2: "",
    escuelas: "",
    institutos: "",
    imageUser: "",
    snack: false,
    snackColor: "",
    snackText: "",
    UserList: [],
    error: null,
    alert: false,
    show1: false,
    show2: false,
    show3: false,
    overlay: false,
    rulesImg: [
      (value) =>
        !value ||
        value.size < 1000000 ||
        "¡El tamaño de la imagen debe ser inferior a 1 MB!",
    ],
    passwordActRules: [
      (v) => !!v || "Contraseña actual es requerida",
      (v) =>
        v.length <= 20 || "La contraseña actual debe ser menor a 20 caracteres",
    ],
    passwordNewRules: [
      (v) => !!v || "Contraseña nueva es requerida",
      (v) =>
        v.length <= 20 || "La contraseña nueva debe ser menor a 20 caracteres",
    ],
    passwordNew2Rules: [
      (v) => !!v || "Confirmar contraseña nueva es requerida",
      (v) =>
        v.length <= 20 ||
        "La contraseña a confirmar debe ser menor a 20 caracteres",
    ],
    itemsel: [
      "N/A",
      "Biología",
      "Computación",
      "Física",
      "Geoquímica",
      "Matemática",
      "Química",
    ],
    itemsel2: ["N/A", "IBE", "ICTA", "ICT"],
    selectedFile: null,
  }),
  created() {
    this.initialize();
  },
  methods: {
    onFileChange(e) {
      if (e) {
        this.imageUser = URL.createObjectURL(e);
      }
    },
    async initialize() {
      await UsersService.getuserper({
        _id: this.$store.state.user._id,
      })
        .then((response) => {
          this.escuelas = response.data.school;
          this.institutos = response.data.institute;
          this.imageUser = response.data.imageUser;
        })
        .catch((error) => console.log(error));
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    close() {
      this.actPass = "";
      this.newPass = "";
      this.newPass2 = "";
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
      this.dialog = false;
      this.alert = false;
      this.overlay = false;
      this.resetValidation();
    },
    async checkPassword() {
      if (this.$refs.form.validate()) {
        if (this.newPass !== this.newPass2) {
          this.alert = true;
          this.error = "Las nuevas contraseñas no coinciden";
        } else {
          try {
            const response = await UsersService.getuserpass({
              _id: this.$store.state.user._id,
              password: this.actPass,
            }).then((response) => this.modPassword(response.data._id));
          } catch (error) {
            this.alert = true;
            this.error = error.response.data.error;
          }
        }
      }
    },
    async modPassword(id) {
      this.overlay = true;
      try {
        const response = await UsersService.modpass({
          _id: id,
          password: this.newPass,
        }).then((response) => this.passwordInline());

        this.close();
      } catch (error) {
        this.alert = true;
        this.error = error.response.data.error;
      }
    },
    async updateUser() {
      this.overlay = true;
      const fd = new FormData();

      if (this.selectedFile !== null && this.selectedFile !== undefined) {
        fd.append("image", this.selectedFile, this.selectedFile.name);
      }
      fd.append("_id", this.$store.state.user._id);
      fd.append("school", this.escuelas);
      fd.append("institute", this.institutos);
      fd.append("imageUser", this.imageUser);

      await UsersService.updateuserper(fd)
        .then((response) => this.updateInline())
        .catch((err) => {
          this.snack = true;
          this.snackColor = "error";
          this.snackText = err.response.data.error;
        });
    },
    //toasts/snackbar messages for actions
    updateInline() {
      this.overlay = false;
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Datos actualizados";
    },
    passwordInline() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Contraseña actualizada";
    },
  },
};
</script>
