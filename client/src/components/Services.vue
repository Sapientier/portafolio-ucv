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
                    label="Dependencias*"
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
      page: 1,
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
    
    methods: {
      formatDate (date) {
        if (!date) return null
        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
        }
    },
    computed: {
      ...mapState(['servicios']),
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
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
