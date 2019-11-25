<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md12
      >
        <v-card>
          <v-container fluid>
            <v-row dense>
              <v-col
                v-for="card in cards"
                :key="card.title"
                cols="12"
                sm="4"
                xs="12"
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
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn
          dark
          fab
          bottom
          right
          color="red"
          fixed
          v-if="$store.state.isUserLoggedIn"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Inserción de Servicio</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-combobox
                    v-model="categories"
                    :items="itemsel"
                    label="Categoría*"
                ></v-combobox>
              </v-col>
              <v-col cols="12" sm="6">
                <v-combobox
                    v-model="dependencies"
                    :items="itemsel2"
                    label="Denpendencias*"
                ></v-combobox>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Nombre*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="computedDateFormatted"
                      label="Fecha de Publicación *"
                      prepend-icon="mdi-calendar"
                      readonly
                      @blur="date = parseDate(dateFormatted)"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker 
                    v-model="date" 
                    no-title 
                    scrollable
                    locale="es-es">
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancelar</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">Aceptar</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-textarea
                    label="Descripción"
                  />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="autor"
                  label="Autor *"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-file-input label="Imagen"></v-file-input>
              </v-col>
            </v-row>
          </v-container>
          <small>*Indica que es un campo requerido</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Cerrar</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> 
  </v-container>
</template>

<script>
export default {
    data: () => ({
      cards: [
          { title: 'Medicina', subtitle: '1,000 miles of wonder',  src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', show: false },
          { title: 'Tecnología', subtitle: '5,000 miles of power', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', show: false },
          { title: 'Química', subtitle: '3,000 miles of wisdom', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', show: false },
          { title: 'Alimentos', subtitle: '1,000 miles of wonder',  src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', show: false },
          { title: 'Educación', subtitle: '5,000 miles of power', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', show: false },
          { title: 'Mercadeo', subtitle: '3,000 miles of wisdom', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', show: false }
      ],
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      autor: '',
      dependencies: '',
      categories: '',
      itemsel: [
        'Medicina',
        'Química',
        'Tecnología',
        'Alimentos',
        'Eduación',
        'Mercadeo'
      ],
      itemsel2: [
        'Coordinador General',
        'Coordinador de Extensión',
        'Coordinador de Investigación',
        'Profesor/Investigador'
      ],
      dialog: false
    }),
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },
    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      }
    }
}
</script>
