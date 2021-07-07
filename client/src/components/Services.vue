<template>
    <v-container grid-list-xl>
        <v-row>
            <v-col xs="12" cols="12">
                <div class="text-center">
                    <v-chip
                        class="ma-2"
                        outlined
                        :input-value="active0"
                        filter
                        @click="
                            getServices();
                            activefilter(0);
                        "
                    >
                        <v-icon left>mdi-star</v-icon>Todos
                    </v-chip>

                    <v-chip
                        class="ma-2"
                        color="green darken-3"
                        :input-value="active1"
                        filter
                        outlined
                        @click="
                            filterServiciosbyCat('Ambiente');
                            activefilter(1);
                        "
                    >
                        <v-icon left>mdi-nature</v-icon>Ambiente
                    </v-chip>

                    <v-chip
                        class="ma-2"
                        color="primary"
                        :input-value="active2"
                        filter
                        outlined
                        @click="
                            filterServiciosbyCat('Enseñanza de la Ciencia');
                            activefilter(2);
                        "
                    >
                        <v-icon left>mdi-glasses</v-icon>Enseñanza de la Ciencia
                    </v-chip>

                    <v-chip
                        class="ma-2"
                        color="deep-purple"
                        :input-value="active3"
                        filter
                        outlined
                        @click="
                            filterServiciosbyCat('Extensión');
                            activefilter(3);
                        "
                    >
                        <v-icon left>mdi-graph</v-icon>Extensión
                    </v-chip>

                    <v-chip
                        class="ma-2"
                        color="brown"
                        :input-value="active4"
                        filter
                        outlined
                        @click="
                            filterServiciosbyCat('Geociencias');
                            activefilter(4);
                        "
                    >
                        <v-icon left>mdi-earth</v-icon>Geociencias
                    </v-chip>

                    <v-chip
                        class="ma-2"
                        color="yellow darken-3"
                        :input-value="active5"
                        filter
                        outlined
                        @click="
                            filterServiciosbyCat('Materiales y Energía');
                            activefilter(5);
                        "
                    >
                        <v-icon left>mdi-solar-power</v-icon>Materiales y
                        Energía
                    </v-chip>

                    <v-chip
                        class="ma-2"
                        color="cyan darken-3"
                        :input-value="active6"
                        filter
                        outlined
                        @click="
                            filterServiciosbyCat('Modelos y Teorías');
                            activefilter(6);
                        "
                    >
                        <v-icon left>mdi-globe-model</v-icon>Modelos y Teorías
                    </v-chip>

                    <v-chip
                        class="ma-2"
                        color="red darken-3"
                        :input-value="active7"
                        filter
                        outlined
                        @click="
                            filterServiciosbyCat('Salud');
                            activefilter(7);
                        "
                    >
                        <v-icon left>mdi-medical-bag</v-icon>Salud
                    </v-chip>

                    <v-chip
                        class="ma-2"
                        color="indigo darken-3"
                        :input-value="active8"
                        filter
                        outlined
                        @click="
                            filterServiciosbyCat('Seguridad Alimentaria');
                            activefilter(8);
                        "
                    >
                        <v-icon left>mdi-food-fork-drink</v-icon>Seguridad
                        Alimentaria
                    </v-chip>

                    <v-chip
                        class="ma-2"
                        color="orange darken-3"
                        :input-value="active9"
                        filter
                        outlined
                        @click="
                            filterServiciosbyCat(
                                'Tecnologías de la Información y Comunicación'
                            );
                            activefilter(9);
                        "
                    >
                        <v-icon left>mdi-laptop</v-icon>Tecnologías de la
                        Información y Comunicación
                    </v-chip>

                    <v-chip
                        v-if="$store.state.isUserLoggedIn"
                        class="ma-2"
                        color="success"
                        outlined
                        :input-value="active10"
                        filter
                        @click="
                            filterServiciosbyApproved(true);
                            activefilter(10);
                        "
                    >
                        <v-icon left>mdi-account-check</v-icon>Aprobados
                    </v-chip>

                    <v-chip
                        v-if="$store.state.isUserLoggedIn"
                        class="ma-2"
                        color="error"
                        outlined
                        :input-value="active11"
                        filter
                        @click="
                            filterServiciosbyApproved(false);
                            activefilter(11);
                        "
                    >
                        <v-icon left>mdi-account-cancel</v-icon>No Aprobados
                    </v-chip>
                </div>

                <v-autocomplete
                    v-model="select"
                    :loading="loading"
                    :items="items"
                    :search-input.sync="search"
                    cache-items
                    class="mx-4"
                    flat
                    hide-no-data
                    hide-details
                    label="Buscar servicios"
                    solo-inverted
                    prepend-inner-icon="mdi-magnify"
                ></v-autocomplete>
            </v-col>

            <feed-card
                v-for="(services, i) in paginatedServices"
                :key="services.name"
                :size="layout[i]"
                :value="services"
            />
        </v-row>

        <div class="text-center">
            <v-pagination
                v-model="page"
                :length="pages"
                :total-visible="7"
            ></v-pagination>
        </div>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
                <v-btn
                    dark
                    fab
                    bottom
                    right
                    fixed
                    color="indigo"
                    v-if="$store.state.isUserLoggedIn"
                    v-on="on"
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card-title>
                        <span class="headline">Inserción de Servicio</span>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-container fluid>
                            <v-row>
                                <v-col cols="12" sm="12">
                                    <v-text-field
                                        v-model="name"
                                        label="Nombre *"
                                        :rules="nameRules"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        v-model="categories"
                                        :items="itemselCat"
                                        label="Categoría *"
                                        :rules="categoriaRules"
                                        required
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        v-model="autor"
                                        label="Coordinador *"
                                        :rules="autorRules"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        v-model="schools"
                                        :items="itemselSchool"
                                        :rules="schoolRules"
                                        label="Escuela *"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        v-model="institutes"
                                        :items="itemselInst"
                                        :rules="instRules"
                                        label="Instituto *"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-menu
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                    >
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <v-text-field
                                                v-model="computedDateFormatted"
                                                label="Fecha de Creación *"
                                                prepend-icon="mdi-calendar"
                                                readonly
                                                v-on="on"
                                                v-bind="attrs"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="date"
                                            no-title
                                            scrollable
                                            locale="es-es"
                                            @input="menu = false"
                                        >
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-file-input
                                        v-model="selectedFile"
                                        :rules="rulesImg"
                                        accept="image/png, image/jpeg, image/bmp"
                                        placeholder="Imagen"
                                        prepend-icon="mdi-camera"
                                    ></v-file-input>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="usuariospp"
                                        label="Usuarios Involucrados"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea
                                        v-model="descripcion"
                                        label="Descripción"
                                    />
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="solicitud"
                                        label="Solicitud del Servicio"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="params"
                                        label="Parámetros del Servicio"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea
                                        v-model="direccion"
                                        label="Dirección"
                                        rows="3"
                                    />
                                </v-col>
                            </v-row>
                        </v-container>
                        <small>
                            * Indica que es un campo requerido
                        </small>
                        <v-spacer></v-spacer>
                        <small>
                            Los servicios deben ser aprobados por los
                            coordinadores para su visualización al público
                            general
                        </small>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions v-if="$store.state.isUserLoggedIn">
                        <v-spacer></v-spacer>
                        <v-switch
                            v-model="approve"
                            label="Aprobado"
                            :disabled="
                                $store.state.user.dependencies ===
                                    'Profesor/Investigador'
                            "
                        ></v-switch>
                        <v-spacer></v-spacer>
                        <v-btn text @click="close">Cerrar</v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="insertService"
                            :disabled="!valid"
                            >Guardar</v-btn
                        >
                        <v-overlay :value="overlay">
                            <v-progress-circular
                                indeterminate
                                size="64"
                            ></v-progress-circular>
                        </v-overlay>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <template v-slot:action="{ attrs }">
                <v-btn text v-bind="attrs" @click="snack = false">Cerrar</v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>

<script>
// Utilities
import { mapGetters, mapActions } from "vuex";
import Services from "@/services/Services";
import NotificationService from "@/services/NotificationService";

export default {
    name: "Feed",

    components: {
        FeedCard: () => import("@/components/FeedCard"),
    },

    data: () => ({
        loading: false,
        items: [],
        servicesnames: [],
        newServices: [],
        search: null,
        select: null,
        selectedFile: null,
        layout: [2, 2, 1, 2, 2, 3, 3, 3],
        page: 1,
        valid: true,
        active: false,
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        snack: false,
        snackColor: "",
        snackText: "",
        name: "",
        autor: "",
        usuariospp: "",
        schools: "",
        categories: "",
        institutes: "",
        descripcion: "",
        solicitud: "",
        params: "",
        direccion: "",
        approve: false,
        active0: true,
        active1: false,
        active2: false,
        active3: false,
        active4: false,
        active5: false,
        active6: false,
        active7: false,
        active8: false,
        active9: false,
        active10: false,
        active11: false,
        itemselCat: [
            "Ambiente",
            "Enseñanza de la Ciencia",
            "Extensión",
            "Geociencias",
            "Materiales y Energía",
            "Modelos y Teorías",
            "Salud",
            "Seguridad Alimentaria",
            "Tecnologías de la Información y Comunicación",
        ],
        itemselSchool: [
            "N/A",
            "Biología",
            "Computación",
            "Física",
            "Geoquímica",
            "Matemática",
            "Química",
        ],
        itemselInst: ["N/A", "IBE", "ICTA", "ICT", "IZET"],
        dialog: false,
        overlay: false,
        rulesImg: [
            (value) =>
                !value ||
                value.size < 1000000 ||
                "¡El tamaño de la imagen debe ser inferior a 1 MB!",
        ],
        nameRules: [(v) => !!v || "Nombre de servicio es requerida"],
        categoriaRules: [(v) => !!v || "La categoría es requerida"],
        autorRules: [(v) => !!v || "El coordinador es requerido"],
        schoolRules: [(v) => !!v || "La escuela es requerida"],
        instRules: [(v) => !!v || "El instituto es requerido"],
    }),
    created() {
        this.getServices();
    },
    watch: {
        search(val) {
            val && val !== this.select && this.querySelections(val);
            if (val !== null) {
                this.activefilter(-1);
                this.filterServiciosbyName(this.search);
            }
        },
    },
    methods: {
        ...mapActions(["setServiciosAll", "setServicios"]),
        querySelections(v) {
            this.loading = true;
            // Simulated ajax query
            setTimeout(() => {
                this.items = this.servicesnames.filter((e) => {
                    return (
                        (e || "")
                            .toLowerCase()
                            .indexOf((v || "").toLowerCase()) > -1
                    );
                });
                this.loading = false;
            }, 500);
        },
        async filterServiciosbyCat(value) {
            await Services.getuniservicebycat(value)
                .then((response) => {
                    this.setServiciosAll(response.data);
                })
                .catch((err) => console.log(err.response.data.error));
        },
        async filterServiciosbyApproved(value) {
            await Services.getuniservicebyapproved(value)
                .then((response) => {
                    this.setServiciosAll(response.data);
                })
                .catch((err) => console.log(err.response.data.error));
        },
        async filterServiciosbyName(value) {
            await Services.getuniservicebyname(value)
                .then((response) => {
                    this.setServiciosAll(response.data);
                })
                .catch((err) => console.log(err.response.data.error));
        },
        async getServices() {
            await Services.getservices()
                .then((response) => {
                    for (const servicio of response.data) {
                        if (!servicio.name && !servicio.autor) continue;

                        if (!this.$store.state.isUserLoggedIn) {
                            if (servicio.approve !== false) {
                                this.servicesnames.push(servicio.name);
                                this.servicesnames.push(servicio.autor);
                            }
                        } else {
                            this.servicesnames.push(servicio.name);
                            this.servicesnames.push(servicio.autor);
                        }
                    }

                    this.servicesnames.sort();
                    this.setServiciosAll(response.data);
                })
                .catch((err) => console.log(err.response.data.error));
        },
        async insertService() {
            this.overlay = true;
            const fd = new FormData();

            if (this.selectedFile !== null && this.selectedFile !== undefined) {
                fd.append("image", this.selectedFile, this.selectedFile.name);
            }
            fd.append("name", this.name);
            fd.append("autor", this.autor);
            fd.append("autorMail", this.$store.state.user.email);
            fd.append("userspp", this.usuariospp);
            fd.append("school", this.schools);
            fd.append("category", this.categories);
            fd.append("institute", this.institutes);
            fd.append("description", this.descripcion);
            fd.append("request", this.solicitud);
            fd.append("paramserv", this.params);
            fd.append("direction", this.direccion);
            fd.append("date", this.date);
            fd.append("approve", this.approve);

            try {
                await Services.insertservices(fd).then((response) => {
                    this.insertInline();
                    this.setServicios(response.data);
                });

                await NotificationService.insertnotifications({
                    id: this.$store.state.user._id,
                    name: this.name,
                    category: this.categories,
                    approve: this.approve,
                    email: this.$store.state.user.email,
                    isUpdate: 0,
                    institute: this.institutes === "N/A" ? "" : this.institutes,
                    school: this.schools === "N/A" ? "" : this.schools,
                });

                this.close();
            } catch (err) {
                this.overlay = false;
                this.snack = true;
                this.snackColor = "error";
                this.snackText = err.response.data.error;
            }
        },
        resetValidation() {
            this.$refs.form.resetValidation();
        },
        close() {
            this.date = new Date().toISOString().substr(0, 10);
            this.autor = "";
            this.usuariospp = "";
            this.schools = "";
            this.categories = "";
            this.institutes = "";
            this.descripcion = "";
            this.solicitud = "";
            this.params = "";
            this.name = "";
            this.direccion = "";
            this.overlay = false;
            this.selectedFile = null;
            this.dialog = false;
            this.approve = false;
            this.resetValidation();
        },
        activefilter(num) {
            this.page = 1;
            this.active0 = false;
            this.active1 = false;
            this.active2 = false;
            this.active3 = false;
            this.active4 = false;
            this.active5 = false;
            this.active6 = false;
            this.active7 = false;
            this.active8 = false;
            this.active9 = false;
            this.active10 = false;
            this.active11 = false;
            switch (num) {
                case 0:
                    this.active0 = true;
                    break;
                case 1:
                    this.active1 = true;
                    break;
                case 2:
                    this.active2 = true;
                    break;
                case 3:
                    this.active3 = true;
                    break;
                case 4:
                    this.active4 = true;
                    break;
                case 5:
                    this.active5 = true;
                    break;
                case 6:
                    this.active6 = true;
                    break;
                case 7:
                    this.active7 = true;
                    break;
                case 8:
                    this.active8 = true;
                    break;
                case 9:
                    this.active9 = true;
                    break;
                case 10:
                    this.active10 = true;
                    break;
                case 11:
                    this.active11 = true;
                    break;
            }
        },
        formatDate(date) {
            if (!date) return null;
            const [year, month, day] = date.split("-");
            return `${day}/${month}/${year}`;
        },
        //toasts/snackbar messages for actions
        insertInline() {
            this.snack = true;
            this.snackColor = "success";
            this.snackText = "Servicio creado";
        },
        removeItemAll(arr) {
            if (!this.$store.state.isUserLoggedIn) {
                var i = 0;
                while (i < arr.length) {
                    if (arr[i].approve === false) {
                        arr.splice(i, 1);
                    } else {
                        ++i;
                    }
                }
            }
            return arr;
        },
    },
    computed: {
        ...mapGetters(["services"]),
        computedDateFormatted() {
            return this.formatDate(this.date);
        },
        pages() {
            return Math.ceil(this.newServices.length / 8);
        },
        paginatedServices() {
            const start = (this.page - 1) * 8;
            const stop = this.page * 8;

            this.newServices = this.services.slice();
            this.newServices = this.removeItemAll(this.newServices);

            return this.newServices.slice(start, stop);
        },
    },
};
</script>
