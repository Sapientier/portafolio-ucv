<template>
  <v-footer
    dark
    padless
  >
    <v-container>
      <v-layout wrap>
      <v-row
        justify="center"
        no-gutters
      >
      <v-col
        class="lighten-2 py-4 text-center white--text"
        cols="12"
      >
        &copy; {{ new Date().getFullYear() }} — Universidad Central de Venezuela <strong>(UCV)</strong>. Facultad de Ciencias.
      </v-col>
         </v-row>
        
        <base-btn
          square
          title="Ir al tope"
          @click="$vuetify.goTo(0)"
        >
          <v-icon>mdi-chevron-up</v-icon>
        </base-btn>
      </v-layout>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    //
  }
</script>