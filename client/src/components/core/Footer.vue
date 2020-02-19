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
    data: () => ({
      items: [
        {
          href: '#!',
          icon: 'mdi-twitter'
        },
        {
          href: '#!',
          icon: 'mdi-instagram'
        },
        {
          href: '#!',
          icon: 'mdi-facebook'
        },
        {
          href: '#!',
          icon: 'mdi-google-plus'
        },
        {
          href: '#!',
          icon: 'mdi-reddit'
        },
        {
          href: '#!',
          icon: 'mdi-discord'
        },
        {
          href: '#!',
          icon: 'mdi-pinterest'
        }
      ]
    })
  }
</script>