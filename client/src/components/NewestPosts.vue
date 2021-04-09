<template>
    <v-container pa-0 fluid>
        <base-subheading>Servicios recientes</base-subheading>
        <v-row
            v-for="(services, i) in paginatedServices"
            :key="i"
            align="center"
            class="mb-2"
        >
            <v-col xs="12" class="d-flex">
                <v-img
                    :src="`${services.imageService}`"
                    class="mr-3"
                    height="36"
                    max-width="36"
                />
                <div>
                    <div class="subheading" v-text="services.name"></div>
                    <div class="caption">{{ formatDate(services.date) }}</div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
// Utilities
import { mapGetters } from "vuex";

export default {
    methods: {
        formatDate(date) {
            if (!date) return null;
            const [newdate, x] = date.split("T");
            const [year, month, day] = newdate.split("-");
            return `${day}/${month}/${[year]}`;
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
        paginatedServices() {
            var newServices = [];
            newServices = this.services.slice();
            newServices = this.removeItemAll(newServices);

            return newServices.slice(
                newServices.length - 3,
                newServices.length
            );
        },
    },
};
</script>
