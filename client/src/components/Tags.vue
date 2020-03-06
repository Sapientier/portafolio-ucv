<template>
  <v-container pa-0>
    <base-subheading>Categorías</base-subheading>
    <v-chip
      v-for="(category, i) in categories"
      :key="i"
      tag
      label
      small
      color="secondary"
      text-color="white"
      class="ma-1"
    >
      {{ category.text }}
    </v-chip>
  </v-container>
</template>

<script>
  // Utilities
  import {
    mapGetters
  } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['categories'])
    }
  }
</script>
