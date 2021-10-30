<template>
    <base-card dark>
        <v-parallax :src="require('@/assets/muralciencias.jpg')" height="400">
            <v-overlay :absolute="absolute" :opacity="opacity">
                <v-row align="center" justify="center">
                    <v-col class="text-center" cols="10">
                        <h1 class="display-3 font-weight-light">
                            Portafolio Ciencias UCV
                        </h1>
                        <h4 class="font-weight-light mt-3 mb-3">
                            ¡Bienvenidos! Para aquellos desafíos que requieren
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
    </base-card>
</template>

<script>
export default {
    data() {
        return {
            absolute: true,
            opacity: 0.65,
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
