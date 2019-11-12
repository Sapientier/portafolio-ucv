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
              <v-toolbar-title>Registro</v-toolbar-title>
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
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-alert type="error">
              <div v-html="error"></div>
            </v-alert>
            <v-card-actions>
              <v-spacer />
              <v-btn 
                @click="register" 
                color="primary" 
              >Registrar</v-btn>
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
      error: null
    }
  },
  methods: {
    async register () {
      try {
        await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
}
</script>
