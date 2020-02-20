<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md4>
        <v-card>
          <v-avatar class="mx-auto d-block" size="130">
            <img
              src="https://c8d8q6i8.stackpathcdn.com/wp-content/uploads/2014/01/James-Franco-Contact-Information.jpg"
            />
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h3 class="card-title font-weight-light">Brian Torres</h3>
            <p class="card-description font-weight-light">Administrador</p>
            <v-file-input
              show-size
              :rules="rules"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Seleccione una imagen"
              prepend-icon="mdi-camera"
              label="Avatar"
            ></v-file-input>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md8>
        <v-card>
          <v-form>
            <v-container>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field
                    label="Dependencia"
                    disabled
                    :value="$store.state.user.Dependencies"
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field :value="$store.state.user.email" label="Correo Electrónico" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Nombre" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Apellido" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-combobox :items="itemsel" label="Escuelas"></v-combobox>
                </v-flex>
                <v-flex xs12 md6>
                  <v-combobox :items="itemsel2" label="Institutos"></v-combobox>
                </v-flex>
                <v-flex md8>
                  <v-dialog v-model="dialog" persistent max-width="400px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="primary" dark v-on="on">Cambiar contraseña</v-btn>
                    </template>
                    <v-card>
                      <v-form ref="form" v-model="valid" lazy-validation>
                        <v-card-title>
                          <span class="headline">Modificar Contraseña</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
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
                                  :rules="passwordNewRules"
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
                          <v-btn color="blue darken-1" text @click="close">Cerrar</v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="checkPassword"
                            :disabled="!valid"
                          >Aceptar</v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card>
                  </v-dialog>
                </v-flex>
                <v-flex md4>
                  <v-btn color="primary">Actualizar Perfil</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
          <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <v-btn text @click="snack = false">Cerrar</v-btn>
          </v-snackbar>
        </v-card>
      </v-flex>
    </v-layout>
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
    error: null,
    alert: false,
    show1: false,
    show2: false,
    show3: false,
    rules: [
      value =>
        !value ||
        value.size < 2000000 ||
        "¡El tamaño de la imagen debe ser inferior a 2 MB!"
    ],
    passwordActRules: [
      v => !!v || "Contraseña actual es requerida",
      v => v.length <= 20 || "La contraseña debe ser menor a 20 caracteres"
    ],
    passwordNewRules: [
      v => !!v || "Contraseña nueva es requerida",
      v => v.length <= 20 || "La contraseña debe ser menor a 20 caracteres"
    ],
    passwordNew2Rules: [
      v => !!v || "Confirmar contraseña nueva es requerida",
      v => v.length <= 20 || "La contraseña debe ser menor a 20 caracteres"
    ],
    itemsel: [
      "Biología",
      "Computación",
      "Física",
      "Geoquímica",
      "Matemática",
      "Química"
    ],
    itemsel2: ["IBE", "ICTA", "ICT"]
  }),
  methods: {
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    close() {
      this.resetValidation();
      this.actPass = "";
      this.newPass = "";
      this.newPass2 = "";
      this.dialog = false;
      this.alert = false;
    },
    async checkPassword() {
      try {
        const response = await UsersService.getuserpass({
          email: this.$store.state.user.email,
          password: this.actPass
        }).then(response => this.modPassword(response.data._id));

        this.close();
      } catch (error) {
        this.alert = true;
        this.error = error.response.data.error;
      }
    },
    async modPassword(id) {
      if (this.newPass != this.newPass2) {
        this.alert = true;
        this.error = 'Las nuevas contraseñas no coinciden';
      } else {
        try {
          const response = await UsersService.modpass({
            _id: id,
            password: this.newPass
          }).then(response => this.passwordInline());

          this.close();
        } catch (error) {
          this.alert = true;
          this.error = error.response.data.error;
        }
      }
    },
    //toasts/snackbar messages for actions
    passwordInline() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Contraseña actualizada";
    }
  }
};
</script>