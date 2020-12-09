<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-form ref="form">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Inicio de Sesión</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                label="Correo"
                prepend-icon="mdi-email"
                v-model="email"
                type="email"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                label="Contraseña"
                v-model="password"
                :counter="20"
                prepend-icon="mdi-lock"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                :rules="passwordRules"
                @keyup.enter="login"
              ></v-text-field>
              <v-dialog v-model="dialog" persistent max-width="450px">
                <template v-slot:activator="{ on, attrs }">
                  <div class="text-center">
                    <v-btn text color="primary" v-bind="attrs" v-on="on"
                      >¿Se te olvidó tu contraseña?</v-btn
                    >
                  </div>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Recuperación de contraseña</span>
                  </v-card-title>
                  <v-card-text
                    ><v-text-field
                      label="Correo"
                      prepend-icon="mdi-email"
                      v-model="emailreset"
                      type="email"
                      :rules="emailRules"
                    ></v-text-field
                  ></v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="close">
                      Cerrar
                    </v-btn>
                    <v-btn color="primary darken-1" text @click="resetpassword"
                      >Aceptar</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
              <v-btn icon>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on">mdi-frequently-asked-questions</v-icon>
                  </template>
                  <span
                    >Las credenciales les serán enviadas por correo, por favor
                    contacte con el administrador.</span
                  >
                </v-tooltip>
              </v-btn>
              <v-spacer />

              <v-btn color="primary" @click="login">Ingresar</v-btn>
            </v-card-actions>
          </v-form>
          <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
          </v-overlay>
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
import AuthenticationService from "@/services/AuthenticationService";
import NotificationService from "@/services/NotificationService";

export default {
  data: () => ({
    email: "",
    password: "",
    show1: false,
    error: null,
    alert: false,
    dialog: false,
    snack: false,
    snackColor: "",
    snackText: "",
    emailreset: "",
    overlay: false,
    passwordRules: [
      (v) => !!v || "Contraseña es requerida",
      (v) => v.length <= 20 || "La contraseña debe ser menor a 20 caracteres",
    ],
    emailRules: [
      (v) => !!v || "El correo es requerido",
      (v) => /.+@.+\..+/.test(v) || "El correo debe ser valido",
    ],
  }),
  methods: {
    async login() {
      this.overlay = true;
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password,
        });

        const responsenoti = await NotificationService.getnotifications({
          email: this.email,
        });

        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$store.dispatch("setNoti", responsenoti.data);
        this.$router.push({
          name: "UserProfile",
        });
      } catch (error) {
        this.alert = true;
        this.error = error.response.data.error;
      }
      this.overlay = false;
    },
    async resetpassword() {
      this.overlay = true;
      if (this.emailreset !== "") {
        try {
          const response = await AuthenticationService.resetpass({
            email: this.emailreset,
          }).then((response) => this.emailInline());
        } catch (err) {
          this.errorEmail(err.response.data.error);
        }
        this.close();
      } else {
        this.errorEmail("Debe ingresar un correo electrónico");
      }
      this.overlay = false;
    },
    close() {
      this.dialog = false;
      this.emailreset = "";
      this.resetValidation();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    //toasts/snackbar messages for actions
    emailInline() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Contraseña reiniciada";
    },
    errorEmail(error) {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = error;
    },
  },
};
</script>
