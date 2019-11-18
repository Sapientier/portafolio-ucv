<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md8
      >
        <v-card>
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    label="Dependencia"
                    disabled/>
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    class="purple-input"
                    label="Nombre de Usuario"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    :value="$store.state.user.email"
                    label="Correo Electrónico"/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    label="Nombre"/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    label="Apellido"/>
                </v-flex>
                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    label="Dirección"/>
                </v-flex>
                <v-flex
                  xs12
                  md4>
                  <v-text-field
                    label="Ciudad"/>
                </v-flex>
                <v-flex
                  xs12
                  md4>
                  <v-text-field
                    label="País"/>
                </v-flex>
                <v-flex
                  xs12
                  md4>
                  <v-text-field
                    label="Codigo Postal"
                    type="number"/>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    label="Acerca de mí"
                  />
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="primary"
                  >
                    Actualizar Perfil
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
      <v-flex
        xs12
        md4
      >
        <v-card>
          <v-avatar
            class="mx-auto d-block"
            size="130"
          >
            <img
              src="https://bookingagentinfo.com/wp-content/uploads/2014/12/Travis-Scott-Contact-Information.jpg"
            >
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-3">CEO / CO-FOUNDER - Astroworld</h6>
            <h4 class="card-title font-weight-light">Brian Torres</h4>
            <p class="card-description font-weight-light">Lorem Ipsum</p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  //
}
</script>