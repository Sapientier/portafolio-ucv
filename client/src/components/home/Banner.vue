<template>
    <base-card dark>
        <v-parallax :src="require('@/assets/muralciencias.jpg')" height="400">
            <v-overlay :absolute="absolute" :opacity="opacity">
                <v-row align="center" justify="center">
                    <v-col class="text-center" cols="10">
                        <h1 class="display-3 font-weight-light">
                            Portafolio Ciencias
                        </h1>
                        <h4 class="font-weight-light mt-3 mb-3">
                            ¡Bienvenidos! Para aquellos problemas que requieren
                            modernas soluciones de alta tecnología, la Facultad
                            de Ciencias de la Universidad Central de Venezuela
                            pone a disposición la aplicación de su conocimiento
                            científico adquirido y perfeccionado en sus
                            {{ facultyAge }} años de recorrido
                        </h4>
                    </v-col>
                </v-row>
            </v-overlay>
        </v-parallax>

        <!-- <v-row class="white">
            <v-col xs="12">
                <v-carousel
                    cycle
                    height="400"
                    hide-delimiter-background
                    show-arrows-on-hover
                >
                    <v-carousel-item
                        v-for="(item, i) in items"
                        :key="i"
                        :src="item.src"
                    >
                        <v-overlay :absolute="absolute" :opacity="opacity">
                            <v-row
                                class="fill-height"
                                align="center"
                                justify="center"
                            >
                                <div class="display-1 text-center">
                                    <v-col xs="12">{{ item.slide }}</v-col>
                                </div>
                            </v-row>
                        </v-overlay>
                    </v-carousel-item>
                </v-carousel>
            </v-col>
        </v-row> -->
    </base-card>
</template>

<script>
export default {
    data() {
        return {
            absolute: true,
            opacity: 0.65,
            // items: [
            //     {
            //         slide: "Proceso de inscripcion I-2020",
            //         src:
            //             "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
            //     },
            //     {
            //         slide: "II Congreso de Transformación Digital",
            //         src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
            //     },
            //     {
            //         slide: "Reincorporaciones 1-2019",
            //         src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
            //     },
            //     {
            //         slide: "Cronograma de ingreso por Mérito Académico",
            //         src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
            //     },
            // ],
            // slides: ["Noticia 1", "Second", "Third", "Fourth", "Fifth"],
        };
    },
    computed: {
        facultyAge() {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            let facultyAge = year - 1958;
            if (month < 2 || (month === 2 && day < 3)) {
                facultyAge--;
            }
            return facultyAge;
        },
    },
};
</script>
