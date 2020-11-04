<template>
  <v-container pa-0>
    <base-subheading>Servicios recientes</base-subheading>
    <v-layout
      v-for="(servicios, i) in servicios.slice(
        servicios.length - 3,
        servicios.length
      )"
      :key="i"
      align-center
      mb-2
    >
      <v-flex xs12 d-flex>
        <v-img
          :src="`${servicios.imageService}`"
          class="mr-3"
          height="36"
          max-width="36"
        />
        <div>
          <div class="subheading" v-text="servicios.name"></div>
          <div class="caption">{{ formatDate(servicios.date) }}</div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// Utilities
import { mapState } from "vuex";

export default {
  methods: {
    formatDate(date) {
      if (!date) return null;
      const [newdate, x] = date.split("T");
      const [year, month, day] = newdate.split("-");
      return `${day}/${month}/${[year]}`;
    },
  },
  computed: {
    ...mapState(["servicios"]),
  },
};
</script>
