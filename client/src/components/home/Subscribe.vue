<template>
  <v-container id="subscribe" tag="section">
    <base-card color="rgba(203, 170, 92, 0.51)" class="pa-6">
      <v-container grid-list-xl pa-0>
        <v-row>
          <v-col xs="12" md="5">
            <base-subheading class="mb-3">Suscripción</base-subheading>
            <p>
              Ingrese su dirección de correo electrónico para suscribirse a este
              portafolio y recibir notificaciones de nuevas publicaciones de
              servicios por correo electrónico.
            </p>
            <v-form ref="form" lazy-validation v-model="valid">
              <v-row class="pa-2">
                <v-text-field
                  v-model="email"
                  solo
                  class="mr-2"
                  style="max-width: 400px"
                  placeholder="Tu correo electrónico"
                  type="email"
                  :rules="emailRules"
                />
                <v-text-field v-show="false" />
                <v-btn
                  :disabled="dialog || !valid"
                  :loading="dialog"
                  class="ma-0"
                  color="secondary"
                  style="height: 48px"
                  @click="suscribir"
                  >Suscribirse</v-btn
                >
                <v-dialog v-model="dialog" hide-overlay persistent width="300">
                  <v-card color="primary" dark>
                    <v-card-text>
                      Por favor espere...
                      <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                      ></v-progress-linear>
                    </v-card-text>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog2" max-width="350">
                  <v-card>
                    <v-card-title class="headline">{{
                      dialogTitle
                    }}</v-card-title>
                    <v-card-text>{{ dialogText }}</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn :color="buttonColor" text @click="dialog2 = false"
                        >Aceptar</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-form>
          </v-col>
          <v-col xs="12" md="6" offset-md="1">
            <base-subheading>Contacto</base-subheading>
            <v-list class="transparent">
              <v-list-item>
                <v-list-item-avatar color="primary">
                  <v-icon class="elevation-4" dark>mdi-email-outline</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>CORREO</v-list-item-title>
                  <v-list-item-subtitle
                    >CIENCIAS@CIENCIAS.UCV.VE</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-avatar color="primary">
                  <v-icon class="elevation-4" dark>mdi-map-marker</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>DIRECCIÓN</v-list-item-title>
                  <v-list-item-subtitle
                    >PASEO LOS ILUSTRES URB. VALLE ABAJO.
                    CARACAS</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-avatar color="primary">
                  <v-icon class="elevation-4" dark>mdi-phone</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>TELÉFONO</v-list-item-title>
                  <v-list-item-subtitle>212-789-1234</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </base-card>
    <v-snackbar v-model="snack" :color="snackColor">
      {{ snackText }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snack = false">Cerrar</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import SuscribeService from "@/services/SuscribeService";

export default {
  data: () => ({
    email: "",
    valid: true,
    dialog: false,
    dialog2: false,
    snack: false,
    snackColor: "",
    snackText: "",
    buttonColor: "",
    errorIndex: -1,
    emailRules: [
      (v) => !!v || "El correo es requerido",
      (v) => /.+@.+\..+/.test(v) || "El correo debe ser valido",
    ],
  }),
  methods: {
    async suscribir() {
      if (this.email !== "") {
        try {
          this.dialog = true;
          const response = await SuscribeService.suscribe({
            email: this.email,
            typeSub: "Todo",
          }).then((response) => {
            this.buttonColor = "green darken-1";
            this.errorIndex = -1;
          });
        } catch (error) {
          this.buttonColor = "red darken-1";
          this.errorIndex = 0;
        }
      } else {
        this.errorEmail();
        this.valid = false;
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    errorEmail() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Debe ingresar un correo electrónico";
    },
  },
  computed: {
    dialogTitle() {
      return this.errorIndex === -1
        ? "Suscripción exitosa"
        : "Error: usted ya esta suscrito";
    },
    dialogText() {
      return this.errorIndex === -1
        ? "Se le envio un correo electrónico de verificación"
        : "Por favor ingrese otro correo electrónico";
    },
  },
  watch: {
    dialog(val) {
      if (!val) return;

      setTimeout(() => {
        this.resetValidation();
        this.email = "";
        this.dialog = false;
        this.dialog2 = true;
      }, 5000);
    },
  },
};
</script>
