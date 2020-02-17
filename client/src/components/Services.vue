<template>
  <v-container
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex xs12>
        <div class="text-center">
          <v-chip
            class="ma-2"
            color="success"
            outlined
          >
            <v-icon left>mdi-server-plus</v-icon>
            Investigación
          </v-chip>

          <v-chip
            class="ma-2"
            color="primary"
            outlined
            pill
          >
            Desarrollo
            <v-icon right>mdi-account-outline</v-icon>
          </v-chip>

          <v-chip
            class="ma-2"
            color="deep-purple accent-4"
            outlined
          >
            <v-icon left>mdi-wrench</v-icon>
            Mercadeo
          </v-chip>

          <v-chip
            class="ma-2"
            color="indigo darken-3"
            outlined
          >
            <v-icon left>mdi-fire</v-icon>
            Medicina
          </v-chip>
        </div>
        <v-divider></v-divider>
      </v-flex>

      <feed-card
        v-for="(article, i) in paginatedServices"
        :key="article.title"
        :size="layout[i]"
        :value="article"
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

      <v-flex
        xs6
        text-xs-center
        subheading
      >
        PÁGINA {{ page }} DE {{ pages }}
      </v-flex>

      <v-flex
        xs3
        text-xs-right
      >
        <base-btn
          v-if="pages > 1 && page < pages"
          class="mr-0"
          title="Siguiente página"
          square
          @click="page++"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </base-btn>
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
    name: 'Feed',

    components: {
      FeedCard: () => import('@/components/FeedCard')
    },

    data: () => ({
      layout: [2, 2, 1, 2, 2, 3, 3, 3, 3, 3, 3],
      page: 1
    }),

    computed: {
      ...mapState(['servicios']),
      pages () {
        return Math.ceil(this.servicios.length / 11)
      },
      paginatedServices () {
        const start = (this.page - 1) * 11
        const stop = this.page * 11

        return this.servicios.slice(start, stop)
      }
    },

    watch: {
      page () {
        window.scrollTo(0, 0)
      }
    }
  }
</script>
