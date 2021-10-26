<template>
    <div>
        <v-navigation-drawer
            v-model="drawer"
            :clipped="$vuetify.breakpoint.lgAndUp"
            app
        >
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
                <v-list-item
                    link
                    to="/reports"
                    v-if="$store.state.isUserLoggedIn"
                >
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
                    v-if="
                        $store.state.isUserLoggedIn && $store.state.user.isAdmin
                    "
                >
                    <v-list-item-action>
                        <v-icon>mdi-table-edit</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title
                            >Administración de Usuarios</v-list-item-title
                        >
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
            </v-list>
            <v-bottom-navigation absolute color="indigo">
                <v-btn
                    @click="
                        navigateToExt('https://www.twitter.com/Noticienciasucv')
                    "
                >
                    <v-icon>mdi-twitter</v-icon>
                </v-btn>

                <v-btn
                    @click="
                        navigateToExt(
                            'https://www.instagram.com/noticienciasucv'
                        )
                    "
                >
                    <v-icon>mdi-instagram</v-icon>
                </v-btn>

                <v-btn
                    @click="
                        navigateToExt(
                            'https://www.facebook.com/coordinaciondeextension.ucv'
                        )
                    "
                >
                    <v-icon>mdi-facebook</v-icon>
                </v-btn>
            </v-bottom-navigation>
        </v-navigation-drawer>
        <v-app-bar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            app
            color="indigo"
            dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-btn icon large>
                <v-avatar size="32px" item>
                    <v-img
                        :src="require('@/assets/UCV.png')"
                        alt="Vuetify"
                        @click="navigateTo({ name: 'Home' })"
                    />
                </v-avatar>
            </v-btn>
            <v-btn icon large>
                <v-avatar size="32px" item>
                    <v-img
                        :src="require('@/assets/ciencia.png')"
                        @click="navigateTo({ name: 'Home' })"
                        alt="Vuetify"
                    />
                </v-avatar>
            </v-btn>
            <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
                <span
                    class="hidden-sm-and-down home"
                    @click="navigateTo({ name: 'Home' })"
                    >Portafolio Digital Ciencias UCV</span
                >
            </v-toolbar-title>
            <v-spacer />
            <v-menu
                v-model="shown"
                bottom
                left
                offset-y
                :close-on-content-click="false"
                max-width="500"
                origin="center center"
                transition="scale-transition"
                v-if="$store.state.isUserLoggedIn"
                class="hideover"
            >
                <template v-slot:activator="{ on: menu, attrs }">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-btn
                                icon
                                v-on="{ ...tooltip, ...menu }"
                                v-bind="attrs"
                                @click="updateNumNoti"
                                :disabled="
                                    $store.state.notificaciones.length === 0
                                "
                            >
                                <v-badge
                                    overlap
                                    :value="$store.state.numNoti"
                                    :content="
                                        $store.state.numNoti > 9
                                            ? '9+'
                                            : $store.state.numNoti
                                    "
                                >
                                    <v-icon>mdi-bell</v-icon>
                                </v-badge>
                            </v-btn>
                        </template>
                        <span>Notificaciones</span>
                    </v-tooltip>
                </template>
                <v-toolbar dark color="indigo lighten-1">
                    <v-toolbar-title>Notificaciones</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                icon
                                v-bind="attrs"
                                v-on="on"
                                @click="cleanNoti"
                            >
                                <v-icon>mdi-checkbox-marked-circle</v-icon>
                            </v-btn>
                        </template>
                        <span>Limpiar</span>
                    </v-tooltip>
                </v-toolbar>
                <v-card
                    class="mx-auto showover"
                    max-height="500"
                    overflow="auto"
                >
                    <v-list three-line>
                        <v-list-item-group multiple>
                            <template
                                v-for="(item, index) in $store.state
                                    .notificaciones"
                            >
                                <v-list-item :key="item._id">
                                    <v-list-item-content>
                                        <v-list-item-title
                                            v-text="item.owner"
                                        ></v-list-item-title>

                                        <v-list-item-subtitle
                                            class="text--primary"
                                            v-text="item.title"
                                        ></v-list-item-subtitle>

                                        <v-list-item-subtitle
                                            v-text="item.descriptionNoti"
                                        ></v-list-item-subtitle>
                                    </v-list-item-content>

                                    <v-list-item-action>
                                        <v-list-item-action-text
                                            v-text="formatDate(item.dateNoti)"
                                        ></v-list-item-action-text>
                                    </v-list-item-action>
                                </v-list-item>

                                <v-divider
                                    v-if="
                                        index <
                                            $store.state.notificaciones.length -
                                                1
                                    "
                                    :key="index"
                                ></v-divider>
                            </template>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </v-menu>
            <v-btn
                icon
                v-if="$store.state.isUserLoggedIn"
                :to="{ name: 'UserProfile' }"
            >
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
            <v-btn
                icon
                v-if="!$store.state.isUserLoggedIn"
                :to="{ name: 'Login' }"
            >
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
import { mapGetters } from "vuex";
import UsersService from "@/services/UsersService";
import NotificationService from "@/services/NotificationService";

export default {
    methods: {
        formatDate(date) {
            if (!date) return null;
            var aux = date.replace(/\T.+/, "");
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
        async cleanNoti() {
            this.$store.dispatch("cleanNoti");
            try {
                const response = await NotificationService.deletenotifications({
                    email: this.$store.state.user.email,
                }).then(response);
                this.shown = false;
            } catch (error) {
                console.log(error.response.data.error);
            }
        },
        navigateTo(route) {
            this.$router.push(route);
        },
        navigateToExt(route) {
            window.open(route, "_blank");
        },
        logout() {
            this.$store.dispatch("setToken", null);
            this.$store.dispatch("setUser", null);
            this.$store.dispatch("cleanNoti");
            // Redirigimos al Login
            this.$router
                .push({
                    name: "Login",
                })
                .catch((err) => {});
        },
        checkNoti() {
            setInterval(async () => {
                if (this.$store.state.isUserLoggedIn) {
                    const responsenoti = await NotificationService.getnotifications(
                        this.$store.state.user.email
                    );

                    const response = await NotificationService.getNotiNumbyUser(
                        this.$store.state.user.email
                    );

                    this.$store.dispatch(
                        "setUserNumNoti",
                        response.data.numNoti
                    );
                    this.$store.dispatch("setNoti", responsenoti.data);
                }
            }, 60000);
        },
    },
    computed: {
        ...mapGetters(["notifications"]),
    },
    created() {
        this.checkNoti();
    },
    data: () => ({
        drawer: null,
        shown: false,
    }),
};
</script>

<style scoped>
.hideover {
    overflow: hidden;
}

.showover {
    overflow: auto;
}

.list-noti {
    padding: 0;
}

.list-cont {
    padding: 0;
}

.on-hover:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.home {
    cursor: pointer;
}</style
>>
