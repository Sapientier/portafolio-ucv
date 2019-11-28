<template>
    <v-container
        fill-height
        fluid
    >
        <v-layout
        justify-center
        wrap
        >
            <v-flex
                xs12
                md12
            >
                <v-container>
                    <v-row>
                        <v-col
                            cols="12"
                            md="6"
                            sm="12"
                        >
                            <v-card
                                class="mt-4 mx-auto"
                            >
                                <v-sheet
                                class="v-sheet--offset mx-auto"
                                color="cyan"
                                elevation="12"
                                max-width="calc(100% - 32px)"
                                >
                                <v-sparkline
                                    :labels="labels"
                                    :value="value"
                                    color="white"
                                    line-width="2"
                                    padding="16"
                                ></v-sparkline>
                                </v-sheet>

                                <v-card-text class="pt-0">
                                <div class="title font-weight-light mb-2">Suscripciones</div>
                                <div class="subheading font-weight-light grey--text">Last Campaign Performance</div>
                                <v-divider class="my-2"></v-divider>
                                <v-icon
                                    class="mr-2"
                                    small
                                >
                                    mdi-clock
                                </v-icon>
                                <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
                                </v-card-text>

                                <v-divider></v-divider>

                                <v-card-actions class="justify-center">
                                    <v-btn block text color="green">Ir al Reporte</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                        <v-col cols="12"
                            md="6"
                            sm="12">
                            <v-card
                                class="mt-4 mx-auto"
                            >
                                <v-sheet
                                class="v-sheet--offset mx-auto"
                                color="red"
                                elevation="12"
                                max-width="calc(100% - 32px)"
                                >
                                <v-sparkline
                                    :labels="labels"
                                    :value="value"
                                    color="white"
                                    type="bar"
                                    line-width="2"
                                    padding="16"
                                ></v-sparkline>
                                </v-sheet>

                                <v-card-text class="pt-0">
                                    <div class="title font-weight-light mb-2">Registro de servicios</div>
                                    <div class="subheading font-weight-light grey--text">Last Campaign Performance</div>
                                    <v-divider class="my-2"></v-divider>
                                    <v-icon
                                        class="mr-2"
                                        small
                                    >
                                        mdi-clock
                                    </v-icon>
                                    <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
                                </v-card-text>

                                <v-divider></v-divider>

                                <v-card-actions class="justify-center">
                                    <v-btn block text color="green">Ir al Reporte</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card>
                    <v-tabs
                        v-model="tabs"
                        background-color="deep-purple accent-4"
                        class="elevation-2"
                        dark
                        grow
                    >
                        <v-tab
                            v-for="item in items"
                            :key="item"
                        >
                            {{ item }}
                        </v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="tabs">
                        <v-tab-item>
                            <v-card flat>
                                <v-card-title class="headline">Reporte de Usuarios</v-card-title>
                                <v-card-text>
                                    <p>
                                    Duis lobortis massa imperdiet quam. Donec vitae orci sed dolor rutrum auctor. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Praesent congue erat at massa.
                                    </p>

                                    <p>
                                    Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Pellentesque egestas, neque sit amet convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo non est. Etiam sit amet orci eget eros faucibus tincidunt. Donec sodales sagittis magna.
                                    </p>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat>
                                <v-card-text>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat>
                            <v-card-title class="headline">An awesome title</v-card-title>
                            <v-card-text>
                                <p>
                                Duis lobortis massa imperdiet quam. Donec vitae orci sed dolor rutrum auctor. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Praesent congue erat at massa.
                                </p>

                                <p>
                                Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Pellentesque egestas, neque sit amet convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo non est. Etiam sit amet orci eget eros faucibus tincidunt. Donec sodales sagittis magna.
                                </p>

                                <p class="mb-0">
                                Ut leo. Suspendisse potenti. Duis vel nibh at velit scelerisque suscipit. Fusce pharetra convallis urna.
                                </p>
                            </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat>
                            <v-card-title class="headline">An even better title</v-card-title>
                            <v-card-text>
                                <p>
                                Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Sed hendrerit. Maecenas malesuada. Vestibulum ullamcorper mauris at ligula. Proin faucibus arcu quis ante.
                                </p>

                                <p class="mb-0">
                                Etiam vitae tortor. Curabitur ullamcorper ultricies nisi. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. Aliquam lobortis. Suspendisse potenti.
                                </p>
                            </v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    data: () => ({
        labels: [
            '12am',
            '3am',
            '6am',
            '9am',
            '12pm',
            '3pm',
            '6pm',
            '9pm',
        ],
        value: [
            423,
            446,
            675,
            510,
            590,
            610,
            760
        ],
        tabs: null,
        items: [
          'Usuarios', 'Servicios', 'Suscriptores', 'Notificaciones',
        ]
    })
  }
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>