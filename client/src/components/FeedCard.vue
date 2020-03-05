<template>
  <v-flex
    xs12
    :class="classes"
  >
    <base-card
      :height="350"
      color="grey lighten-1"
      dark
      href="#!"
    >
      <v-img
        :src="`${value.imageService}`"
        height="100%"
        gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
      >
        <v-layout
          fill-height
          wrap
          text-xs-right
          ma-0
        >
          <v-flex xs12>
            <v-chip
              label
              class="mx-0 mb-2 text-uppercase"
              color="grey darken-3"
              text-color="white"
              small
              @click.stop=""
            >
              {{ value.category }}
            </v-chip>
            <h3 class="title font-weight-bold mb-2">
              {{ value.name }}
            </h3>
            <div class="caption">
              {{ value.autor }}<br>{{ formatDate(value.date) }}
            </div>
          </v-flex>
          <v-flex d-flex justify-start align-self-end>
            <v-chip
              class="text-uppercase ma-0"
              color="primary"
              label
              small
              @click.stop=""
            >
              Leer Más
            </v-chip>
          </v-flex>
          <v-flex align-self-end d-flex justify-end v-if="$store.state.isUserLoggedIn">
            <v-btn color="primary" fab small dark>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-img>
    </base-card>
  </v-flex>
</template>

<script>
  export default {
    props: {
      size: {
        type: Number,
        required: true
      },
      value: {
        type: Object,
        default: () => ({})
      }
    },
    methods: {
      formatDate(date) {
        if (!date) return null;
        const [newdate, x] = date.split("T");
        const [year, month, day] = newdate.split("-");
        return `${day}/${month}/${[year]}`;
      }
    },
    computed: {
      classes () {
        return {
          'md6': this.size === 2,
          'md4': this.size === 3
        }
      }
    }
  }
</script>

<style>
.v-image__image {
  transition: .3s linear;
}
</style>
