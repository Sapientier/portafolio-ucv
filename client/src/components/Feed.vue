<template>
  <v-container grid-list-xl>
    <v-layout wrap>
      <v-flex xs12>
        <slot />

        <h1
          class="subheading text-uppercase font-weight-medium text-center mt-10"
        >
          Servicios Destacados
        </h1>
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
        <base-btn
          v-if="page !== 1"
          class="ml-0"
          title="Previous page"
          square
          @click="page--"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </base-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// Utilities
import { mapGetters } from "vuex";

export default {
  name: "Feed",
  components: {
    FeedCard: () => import("@/components/FeedCard"),
  },
  data: () => ({
    layout: [3, 3, 3],
    page: 1,
    newServices: []
  }),
  methods: {
    removeItemAll(arr) {
      if (!this.$store.state.isUserLoggedIn) {
        var i = 0;
        while (i < arr.length) {
          if (arr[i].approve === false) {
            arr.splice(i, 1);
          } else {
            ++i;
          }
        }
      }
      return arr;
    },
  },
  computed: {
    ...mapGetters(["services"]),
    pages() {
      return Math.ceil(this.services.length / 3);
    },
    paginatedArticles() {
      const start = (this.page - 1) * 3;
      const stop = this.page * 3;

      this.newServices = this.services.slice();
      this.newServices = this.removeItemAll(this.newServices);

      return this.newServices.slice(start, stop);
    },
  },
};
</script>
