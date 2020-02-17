<template>
  <v-container
    id="subscribe"
    tag="section"
  >
    <base-card
      color="rgba(203, 170, 92, 0.51)"
      class="pa-3"
    >
      <v-container
        grid-list-xl
        pa-0
      >
        <v-layout wrap>
          <v-flex
            xs12
            md5
          >
            <base-subheading class="mb-3">
              Suscripción
            </base-subheading>
            <p>
              Ingrese su dirección de correo electrónico para suscribirse a este portafolio
              y recibir notificaciones de nuevas publicaciones de servicios por correo electrónico.
            </p>

            <v-layout
              wrap
              pa-2
            >
              <v-text-field
                solo
                hide-details
                style="max-width: 400px;"
              />
              <v-btn
                :block="$vuetify.breakpoint.xsOnly"
                class="ma-0"
                color="secondary"
                style="height: 48px"
              >
                Suscribir
              </v-btn>
            </v-layout>
          </v-flex>
          <v-flex
            xs12
            md6
            offset-md1
          >
            <base-subheading>Contacto</base-subheading>
            <v-list class="transparent">
              <v-list-item>
                <v-list-item-avatar
                  color="primary"
                >
                  <v-icon
                    class="elevation-4"
                    dark
                  >
                    mdi-email-outline
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-title>CORREO</v-list-item-title >
                <v-list-item-subtitle>
                  CIENCIAS@CIENCIAS.UCV.VE
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-avatar
                  color="primary"
                >
                  <v-icon
                    class="elevation-4"
                    dark
                  >
                    mdi-map-marker
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-title>DIRECCIÓN</v-list-item-title>
                <v-list-item-subtitle>
                  PASEO LOS ILUSTRES URB. VALLE ABAJO. CARACAS
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-avatar
                  color="primary"
                >
                  <v-icon
                    class="elevation-4"
                    dark
                  >
                    mdi-phone
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-title>PHONE</v-list-item-title>
                <v-list-item-subtitle>
                  212-789-1234
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-flex>
        </v-layout>
      </v-container>
    </base-card>
  </v-container>
</template>
