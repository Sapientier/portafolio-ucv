<template>
  <v-container grid-list-xl>
    <v-row>
      <v-col xs="12" cols="12">
        <slot />

        <h1
          class="subheading text-uppercase font-weight-medium text-center mt-5"
        >
          Servicios Destacados
        </h1>
      </v-col>

      <feed-card
        v-for="(servicios, i) in paginatedArticles"
        :key="servicios.name"
        :size="layout[i]"
        :value="servicios"
      />
    </v-row>
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
