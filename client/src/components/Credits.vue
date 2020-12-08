<template>
  <v-container fluid mt-5>
    <v-row justify="center">
      <v-icon x-large>mdi-account-box-multiple</v-icon>
    </v-row>
    <v-row>
      <v-col xs="12" md="6" cols="12">
        <v-card class="mx-auto elevation-6" max-width="600" outlined>
          <v-list-item>
            <v-list-item-content>
              <div class="overline mb-4">CRÉDITOS</div>
              Esta aplicación web fue desarrollada por los estudiantes de
              computación Brian Torres y Jorge Ramirez como Trabajo Especial de
              Grado para optar el título de Licenciado en Computacion de la
              Universidad Central de Venezuela, bajo la tutoría de la profesora
              Yosly Hernández.
              <div class="mb-4"></div>
              Este proyecto de “Portafolio Digital Ciencias UCV” tiene como
              propósito el refrescamiento y relanzamiento de la imagen
              corporativa y la visualización de los diferentes servicios que
              ofrece la Facultad de Ciencias en sus distintas áreas de
              funcionamiento.
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col xs="12" md="6" cols="12">
        <v-card class="mx-auto elevation-6" max-width="600" outlined>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Tutora:</v-list-item-title>
              <v-list-item-subtitle
                >Profa. Yosly Hernández</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                >Conceptualización, diagramación y contenido:</v-list-item-title
              >
              <v-list-item-subtitle
                >Profa. Yosly Hernández</v-list-item-subtitle
              >
              <v-list-item-subtitle>Prof. Antonio Machado</v-list-item-subtitle>
              <v-list-item-subtitle
                >Prof. Ernesto Fuenmayor</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                >Diseño Gráfico y Desarrollo:</v-list-item-title
              >
              <v-list-item-subtitle>Brian Torres</v-list-item-subtitle>
              <v-list-item-subtitle>Jorge Ramirez</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-chip
        class="ma-2"
        color="indigo"
        text-color="white"
        @click="
          navigateTo('https://www.linkedin.com/in/brian-torres-ba2a1b164')
        "
      >
        <v-avatar left>
          <v-icon>mdi-linkedin</v-icon>
        </v-avatar>
        Brian Torres
      </v-chip>

      <!-- <v-chip
          class="ma-2"
          color="indigo"
          text-color="white"
          @click="
            navigateTo('')
          "
        >
          <v-avatar left>
            <v-icon>mdi-linkedin</v-icon>
          </v-avatar>
          Jorge Ramirez
        </v-chip> -->
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    model: -1,
  }),
  methods: {
    navigateTo(route) {
      window.open(route, "_blank");
    },
  },
};
</script>
