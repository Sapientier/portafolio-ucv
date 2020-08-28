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
          title="Pagina de Inicio"
        >Portafolio Digital UCV</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Buscar"
        class="hidden-sm-and-down"
      />
      <v-spacer />

      <v-btn icon v-if="$store.state.isUserLoggedIn">
        <v-badge overlap>
          <template v-slot:badge>0</template>
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>

      <v-btn icon v-if="$store.state.isUserLoggedIn" @click="navigateTo({name: 'UserProfile'})">
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

      <v-btn icon v-if="!$store.state.isUserLoggedIn" @click="navigateTo({name: 'Login'})">
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
export default {
  methods: {
    navigateTo(route) {
      this.$router.push(route).catch((err) => {});
    },
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      // Redirigimos al Inicio
      this.$router
        .push({
          name: "Home",
        })
        .catch((err) => {});
    },
  },
  data: () => ({
    drawer: null,
  }),
};
</script>

<style scoped>
.home {
  cursor: pointer;
}
</style>>