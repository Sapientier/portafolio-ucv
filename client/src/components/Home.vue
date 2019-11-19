<template>
  <v-container>
    <v-layout
      wrap
    >
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
        ></v-carousel-item>
      </v-carousel>
      <v-card>
          <v-container fluid>
            <v-row dense>
              <v-col
                v-for="card in cards"
                :key="card.title"
                :cols="card.flex"
              >
                <v-card>
                  <v-img
                    :src="card.src"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                  >
                  </v-img>

                  <v-card-title v-text="card.title">
                  </v-card-title>

                  <v-card-subtitle v-text="card.subtitle"> 
                  </v-card-subtitle>

                  <v-card-actions>
                  <v-btn text>Compartir</v-btn>

                  <v-btn
                      color="purple"
                      text
                  >
                      Explorar
                  </v-btn>

                  <v-spacer></v-spacer>

                  <v-btn
                      icon
                      @click="show = !show"
                  >
                      <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                  </v-card-actions>

                  <v-expand-transition>
                  <div v-show="show">
                      <v-divider></v-divider>

                      <v-card-text>
                      I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                      </v-card-text>
                  </div>
                  </v-expand-transition>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      show: false,
        cards: [
            { title: 'Pre-fab homes', subtitle: '1,000 miles of wonder',  src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
            { title: 'Favorite road trips', subtitle: '5,000 miles of power', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
            { title: 'Best airlines', subtitle: '3,000 miles of wisdom', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        ],
      items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
      ]
    }
  }
}
</script>
