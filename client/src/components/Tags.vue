<template>
    <v-container pa-0 fluid>
        <base-subheading>Sitios Web Asociados</base-subheading>
        <v-list>
            <v-list-item-group v-model="model" color="indigo">
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    @click="navigateTo(item.link)"
                >
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title
                            v-text="item.text"
                        ></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        items: [
            {
                icon: "mdi-school",
                text: "Universidad Central de Venezuela ",
                link: "http://www.ucv.ve/",
            },
            {
                icon: "mdi-electron-framework",
                text: "Facultad de Ciencias",
                link: "http://www.ciens.ucv.ve/ciens/",
            },
            {
                icon: "mdi-calendar-multiple-check",
                text: "Gestión de Eventos",
                link: "",
            },
            {
                icon: "mdi-at",
                text: "Webmail",
                link: "https://correo.ciens.ucv.ve/mail/",
            },
        ],
        model: -1,
    }),
    methods: {
        navigateTo(route) {
            if (route === "") {
                this.$router.push({
                    name: "UnderMaint",
                });
            } else {
                window.open(route, "_blank");
            }
        },
    },
};
</script>
