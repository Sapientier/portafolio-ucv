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
            <v-card-actions>
              <v-spacer />
              <v-btn 
                color="primary" 
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
    }
  },
  methods: {
    
  },
}
</script>
