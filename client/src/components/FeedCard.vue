<template>
  <v-flex xs12 :class="classes">
    <base-card :height="350" color="grey lighten-1" dark href="#!">
      <v-img
        :src="`${value.imageService}`"
        height="100%"
        gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
      >
        <v-layout fill-height wrap text-xs-right ma-0>
          <v-flex xs12>
            <v-chip
              label
              class="mx-0 mb-2 text-uppercase"
              color="grey darken-3"
              text-color="white"
              small
              @click.stop
            >{{ value.category }}</v-chip>
            <h3 class="title font-weight-bold mb-2">{{ value.name }}</h3>
            <div class="caption">
              {{ value.autor }}
              <br />
              {{ formatDate(value.date) }}
            </div>
          </v-flex>
          <v-flex d-flex justify-start align-self-end>
            <v-chip class="text-uppercase ma-0" color="primary" label small>Leer Más</v-chip>
          </v-flex>
          <v-flex align-self-end d-flex justify-end v-if="$store.state.isUserLoggedIn">
            <v-btn color="green" class="ml-1" fab small dark @click="editItem(value)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn color="red" class="ml-1" fab dark small @click="deleteItem(value)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-img>
      <v-dialog v-model="dialog" persistent max-width="350px">
        <v-card>
          <v-card-title>
            <span class="headline">Atención</span>
          </v-card-title>
          <v-card-text>¿Esta seguro que desea eliminar este servicio?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="deleteval">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
        {{ snackText }}
        <v-btn text @click="snack = false">Cerrar</v-btn>
      </v-snackbar>
    </base-card>
  </v-flex>
</template>

<script>
import Services from "@/services/Services";

export default {
  data: () => ({
    defaultItem: {
      _id: "",
      name: "",
      category: "",
      autor: "",
      date: "",
      imageService: "",
      school: "",
      institute: "",
      userspp: "",
      description: "",
      request: "",
      paramserv: "",
      direction: ""
    },
    editedItem: {
      _id: "",
      name: "",
      category: "",
      autor: "",
      date: "",
      imageService: "",
      school: "",
      institute: "",
      userspp: "",
      description: "",
      request: "",
      paramserv: "",
      direction: ""
    },
    snack: false,
    snackColor: "",
    snackText: "",
    dialog: false,
  }),
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
    },
    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    async deleteval() {
      try {
        const response = await Services.deleteservices({
          _id: this.editedItem._id,
          imageService: this.editedItem.imageService
        }).then(response => this.delete());

        this.close();
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      }, 300);
    },
    delete() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Datos eliminados";
    }
  },
  computed: {
    classes() {
      return {
        md6: this.size === 2,
        md4: this.size === 3
      };
    }
  }
};
</script>

<style>
.v-image__image {
  transition: 0.3s linear;
}
</style>
