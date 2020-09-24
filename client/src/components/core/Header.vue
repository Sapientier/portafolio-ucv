<template>
  <div>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/services">
          <v-list-item-action>
            <v-icon>mdi-book-open</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Servicios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/credits">
          <v-list-item-action>
            <v-icon>mdi-newspaper-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Créditos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/reports" v-if="$store.state.isUserLoggedIn">
          <v-list-item-action>
            <v-icon>mdi-text-box-search</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Reportes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          to="/userstable"
          v-if="$store.state.isUserLoggedIn && $store.state.user.isAdmin"
        >
          <v-list-item-action>
            <v-icon>mdi-table-edit</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Tabla de Usuarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-bottom-navigation absolute color="indigo">
        <v-btn>
          <v-icon>mdi-twitter</v-icon>
        </v-btn>

        <v-btn>
          <v-icon>mdi-youtube</v-icon>
        </v-btn>

        <v-btn>
          <v-icon>mdi-facebook</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon large>
        <v-avatar size="32px" item>
          <v-img :src="require('@/assets/UCV.png')" alt="Vuetify" />
        </v-avatar>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" item>
          <v-img :src="require('@/assets/ciencia.png')" alt="Vuetify" />
        </v-avatar>
      </v-btn>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span
          class="hidden-sm-and-down home"
          @click="navigateTo({name: 'Home'})"
        >Portafolio Digital UCV</span>
      </v-toolbar-title>

      <v-spacer />

      <v-menu
        bottom
        left
        offset-y
        :close-on-content-click="false"
        max-width="400"
        max-height="600"
        origin="center center"
        transition="scale-transition"
        v-if="$store.state.isUserLoggedIn" 
      >
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip left>
            <template v-slot:activator="{ on: tooltip  }">
              <v-btn icon v-on="{ ...tooltip, ...menu }" v-bind="attrs" @click="updateNumNoti">
                <v-badge
                  overlap
                  :value="$store.state.user.numNoti"
                  :content="$store.state.user.numNoti"
                >
                  <v-icon>mdi-bell</v-icon>
                </v-badge>
              </v-btn>
            </template>
            <span>Notificaciones</span>
          </v-tooltip>
        </template>

        <v-list v-for="item in $store.state.notificaciones" :key="item._id">
            <v-card class="on-hover">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ formatDate(item.dateNoti) }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>{{ item.description }}</v-list-item-content>
              </v-list-item>
            </v-card>
        </v-list>
      </v-menu>

      <v-btn icon v-if="$store.state.isUserLoggedIn" :to="{name: 'UserProfile'}">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">mdi-account</v-icon>
          </template>
          <span>Perfil de Usuario</span>
        </v-tooltip>
      </v-btn>

      <v-btn icon @click="logout" v-if="$store.state.isUserLoggedIn">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">mdi-power</v-icon>
          </template>
          <span>Cerrar Sesión</span>
        </v-tooltip>
      </v-btn>

      <v-btn icon v-if="!$store.state.isUserLoggedIn" :to="{name: 'Login'}">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">mdi-login</v-icon>
          </template>
          <span>Iniciar Sesión</span>
        </v-tooltip>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UsersService from "@/services/UsersService";

export default {
  methods: {
    formatDate(date) {
      if (!date) return null;
      var aux = date.replace(/\T.+/, '');
      const [year, month, day] = aux.split("-");
      return `${day}/${month}/${year}`;
    },
    async updateNumNoti() {
      this.$store.dispatch("setUserNumNoti", 0);
      try {
        const response = await UsersService.updateusernoti({
          _id: this.$store.state.user._id,
          numnoti: 0,
        }).then(response);
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      // Redirigimos al Inicio
      this.$router
        .push({
          name: "Login",
        })
        .catch((err) => {});
    },
  },
  computed: {
    ...mapGetters(["notifications"]),
  },
  data: () => ({
    drawer: null,
  }),
};
</script>

<style scoped>
.on-hover:hover {
  background-color: rgba(0,0,0,0.05);
 }

.home {
  cursor: pointer;
}
</style>>