<template>
  <v-container
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex xs12>

        <slot />
        <v-row justify="center" no-gutters>
            <v-col cols="12" class="lighten-2 py-4 text-center">
                <h1 class="subheading text-uppercase font-weight-medium">Servicios Destacados</h1>
            </v-col>
            <v-col cols="12" md="2"></v-col>
        </v-row>
        <v-divider></v-divider>
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
import { mapState } from "vuex";

  export default {
    name: 'Feed',
    components: {
      FeedCard: () => import('@/components/FeedCard')
    },

    data: () => ({
      layout: [2, 2, 3, 3, 3],
      page: 1
    }),
    computed: {
      ...mapState(["servicios"]),
      pages () {
        return Math.ceil(this.servicios.length / 5)
      },
      paginatedArticles () {
        const start = (this.page - 1) * 5
        const stop = this.page * 5

        return this.servicios.slice(start, stop)
      }
    }
  }
</script>
