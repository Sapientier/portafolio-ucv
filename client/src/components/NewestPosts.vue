<template>
  <v-container pa-0>
    <base-subheading>Servicios recientes</base-subheading>
    <v-layout
      v-for="(servicios, i) in servicios.slice(11, 14)"
      :key="i"
      align-center
      mb-2
    >
      <v-flex
        xs12
        d-flex
      >
        <v-img
          :src="require(`@/assets/articles/${servicios.hero}`)"
          class="mr-3"
          height="36"
          max-width="36"
        />
        <div>
          <div class="subheading" v-text="servicios.title">
          </div>
          <div class="caption">
            16/02/2020
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  // Utilities
  import {
    mapState
  } from 'vuex'

  export default {
    computed: {
      ...mapState(['servicios'])
    }
  }
</script>
