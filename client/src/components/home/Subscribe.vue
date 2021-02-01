<template>
  <v-container id="subscribe" tag="section" grid-list-xl>
    <base-card color="rgba(203, 170, 92, 0.51)" class="pa-6">
      <v-container fluid pa-0>
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
                  v-model="emailSub"
                  solo
                  class="mr-2"
                  style="max-width: 400px"
                  placeholder="Tu correo electrónico"
                  type="email"
                  :rules="emailRules"
                />
                <v-text-field v-show="false" />
                <v-btn
                  :disabled="!valid"
                  class="ma-0"
                  color="secondary"
                  style="height: 48px"
                  @click="showSubscribe()"
                  >Suscribirse</v-btn
                >
                <v-overlay :value="overlay">
                  <v-progress-circular
                    indeterminate
                    size="64"
                  ></v-progress-circular>
                </v-overlay>
                <v-dialog v-model="dialog" max-width="450" persistent>
                  <v-card>
                    <v-card-title class="headline">
                      Suscripción
                    </v-card-title>
                    <v-card-text>
                      <v-select
                        v-model="categories"
                        :items="itemselCat"
                        label="Categorías"
                        multiple
                        chips
                        hint="Seleccione las categorías a suscribir"
                        persistent-hint
                        :rules="categoriaRules"
                      >
                        <template v-slot:prepend-item>
                          <v-list-item ripple @click="toggle">
                            <v-list-item-action>
                              <v-icon
                                :color="
                                  categories.length > 0 ? 'indigo darken-4' : ''
                                "
                              >
                                {{ icon }}
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
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text @click="close()">Cerrar</v-btn>
                      <v-btn color="primary" text @click="suscribir()">
                        Aceptar
                      </v-btn>
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
    emailSub: "",
    valid: true,
    dialog: false,
    overlay: false,
    snack: false,
    snackColor: "",
    snackText: "",
    categories: [],
    emailRules: [
      (v) => !!v || "El correo es requerido",
      (v) => /.+@.+\..+/.test(v) || "El correo debe ser valido",
    ],
    categoriaRules: [(v) => v.length > 0 || "La categoría es requerida"],
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
  }),
  methods: {
    showSubscribe() {
      if (this.emailSub !== "") {
        this.dialog = true;
      } else {
        this.snackText = "Debe ingresar un correo electrónico";
        this.snackColor = "warning";
        this.errorEmail();
        this.valid = false;
      }
    },
    async suscribir() {
      this.overlay = true;
      if (this.categories.length > 0) {
        try {
          await SuscribeService.suscribe({
            emailSub: this.emailSub,
            typeSub: "Todo",
            catSub: this.categories,
          }).then(() => {
            this.subscribeSuccess();
          });
        } catch (error) {
          this.snackText = "Por favor ingrese otro correo electrónico";
          this.snackColor = "error";
          this.errorEmail();
        }
        this.close();
      }
      else {
          this.snackText = "Debe seleccionar una categoría";
          this.snackColor = "warning";
          this.errorEmail();
      }
    },
    toggle() {
      this.$nextTick(() => {
        if (this.likesAllCategories) {
          this.categories = [];
        } else {
          this.categories = this.itemselCat.slice();
        }
      });
    },
    close() {
      this.overlay = false;
      this.dialog = false;
      this.emailSub = "";
      this.categories = [];
      this.resetValidation();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    subscribeSuccess() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Suscripción exitosa";
    },
    errorEmail() {
      this.snack = true;
    },
  },
  computed: {
    likesAllCategories() {
      return this.categories.length === this.itemselCat.length;
    },
    likesSomeCategories() {
      return this.categories.length > 0 && !this.likesAllCategories;
    },
    icon() {
      if (this.likesAllCategories) return "mdi-close-box";
      if (this.likesSomeCategories) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
  },
};
</script>
