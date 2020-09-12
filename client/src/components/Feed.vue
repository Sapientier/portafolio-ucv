<template>
  <v-container grid-list-xl>
    <v-layout wrap>
      <v-flex xs12>
        <slot />

        <h1
          class="subheading text-uppercase font-weight-medium text-center mt-10"
        >Servicios Destacados</h1>
      </v-flex>

      <feed-card
        v-for="(servicios, i) in paginatedArticles"
        :key="servicios.name"
        :size="layout[i]"
        :value="servicios"
      />
    </v-layout>

    <v-layout align-center>
      <v-flex xs3>
        <base-btn v-if="page !== 1" class="ml-0" title="Previous page" square @click="page--">
          <v-icon>mdi-chevron-left</v-icon>
        </base-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// Utilities
import { mapState } from "vuex";

export default {
  name: "Feed",
  components: {
    FeedCard: () => import("@/components/FeedCard"),
  },

  data: () => ({
    layout: [3, 3, 3],
    page: 1,
  }),
  computed: {
    ...mapState(["servicios"]),
    pages() {
      return Math.ceil(this.servicios.length / 3);
    },
    paginatedArticles() {
      const start = (this.page - 1) * 3;
      const stop = this.page * 3;

      return this.servicios.slice(start, stop);
    },
  },
};
</script>
