<template>
  <base-card dark>
    <v-parallax
      :src="require('@/assets/muralciencias.jpg')"
      height="400"
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col class="text-center" cols="12">
          <h1 class="display-3 font-weight-light">
              Servicios Ciencias
            </h1>
          <h4 class="font-weight-light">Información organizativa, funcional e histórica de la Facultad</h4>
          <v-btn
              color="primary"
              depressed
              rounded
            >
              Suscribirse
            </v-btn>
        </v-col>
      </v-row>
    </v-parallax>
    <v-layout class="grey lighten-5">
        <v-flex xs12 >
            <v-carousel
            cycle
            height="400"
            hide-delimiter-background
            show-arrows-on-hover
            >
            <v-carousel-item
              v-for="(item,i) in items"
              :key="i"
              :src="item.src"
            >
              <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                >
                  <div class="display-3">{{ item.slide }}</div>
                </v-row>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
    </v-layout>
  </base-card>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            slide: 'Noticia 1',
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            slide: 'Noticia 2',
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            slide: 'Noticia 3',
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            slide: 'Noticia 4',
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
        slides: [
          'Noticia 1',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
      }
    },
  }
</script>
