<template>
    <v-container
      class="fill-height"
      fluid
      >
      <v-row
        align="center"
        justify="center"
      >   
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar
              color="primary"
              dark
              flat
            >
              <v-toolbar-title>Inicio de Sesión</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Correo"
                  prepend-icon="mdi-email"
                  v-model="email"
                  type="email"
                ></v-text-field>
                <v-text-field 
                  label="Contraseña" 
                  v-model="password"
                  prepend-icon="mdi-lock"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-form>
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
              <v-spacer />
              <v-btn 
                color="primary"
                @click="login" 
              >Ingresar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data() {
    return {
      email: '',
      password: '',
      show1: false,
      error: null,
      alert: false
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'Home'
        })
      } catch (error) {
          this.alert = true
          this.error = error.response.data.error
      }
    }
  },
}
</script>
