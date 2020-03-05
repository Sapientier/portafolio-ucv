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
        v-for="(ServicesList, i) in paginatedArticles"
        :key="ServicesList.name"
        :size="layout[i]"
        :value="ServicesList"
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
  import Services from "@/services/Services";
  
  export default {
    name: 'Feed',
    created() {
      this.initialize();
    },
    components: {
      FeedCard: () => import('@/components/FeedCard')
    },

    data: () => ({
      layout: [2, 2, 3, 3, 3],
      page: 1,
      ServicesList: []
    }),
    methods: {
      async initialize() {
        const response = await Services.getservices()
          .then(response => {
            this.ServicesList = response.data;
          })
          .catch(error => console.log(error));
      }
    },
    computed: {
      pages () {
        return Math.ceil(this.ServicesList.length / 10)
      },
      paginatedArticles () {
        const start = (this.page - 1) * 10
        const stop = this.page * 10

        return this.ServicesList.slice(start, stop)
      }
    }
  }
</script>
