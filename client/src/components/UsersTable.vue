<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        md12
      >
          <v-card>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Buscar"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="UserList"
              :search="search"
              class="elevation-1"
            >
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>Administración de Usuarios</v-toolbar-title>
                        <v-divider
                        class="mx-4"
                        inset
                        vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark class="mb-2" v-on="on">Agregar</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                            <v-container>
                                <v-row>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field 
                                        v-model="editedItem.email" 
                                        label="Correo"
                                        type="email"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field 
                                        v-model="editedItem.password" 
                                        label="Contraseña"
                                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="show1 ? 'text' : 'password'"
                                        @click:append="show1 = !show1">
                                    </v-text-field>
                                </v-col>
                                </v-row>
                            </v-container>
                            </v-card-text>
                            <v-alert 
                                type="error" 
                                v-model="alert"
                                dismissible
                                transition="scale-transition"
                                >
                                <div v-html="error"></div>
                            </v-alert>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Aceptar</v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <!-- change table header background and text color(or other properties) -->
                <template
                    v-slot:item.action="{ item }">
                    <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                    >
                        mdi-pencil
                    </v-icon>
                    <v-icon
                        small
                        @click="deleteItem(item)"
                    >
                        mdi-delete
                    </v-icon>
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize">Reiniciar</v-btn>
                </template>
            </v-data-table>
            <v-snackbar
              v-model="snack"
              :timeout="3000"
              :color="snackColor">
              {{ snackText }}
              <v-btn
                text
                @click="snack = false">Cerrar</v-btn>
            </v-snackbar>
          </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import UsersService from '@/services/UsersService'
import AuthenticationService from '@/services/AuthenticationService'

export default {
    data: () => ({
        show1: false,
        error: null,
        alert: false,
        snack: false,
        snackColor: '',
        snackText: '',
        UserList: [],
        dialog: false,
        search: '',
        headers: [
            { text: 'Correo', value: 'email' },
            { text: 'Administrador', value: 'isAdmin' },
            { text: 'Bloqueado', value: 'isActive' },
            { text: 'Acciones', value: 'action', sortable: false }
        ],
        editedIndex: -1,
        editedItem: {
            password: '',
            email: '',
            isAdmin : true,
            isActive : true,
        },
        defaultItem: {
            password: '',
            email: '',
            isAdmin : true,
            isActive : true,
        },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
      },
    },
    watch: {
        dialog (val) {
            val || this.close()
        },
    },
    // called when page is created before dom
    created () {
        this.initialize()
    },
    methods: {
        async initialize () {
            const response = await UsersService.getusers()
            .then(response => {
                this.UserList = response.data
            })
            .catch(error => console.log(error))
        },
        // object.assign fills in the empty object with the properties of item
        editItem (item) {
            this.editedIndex = this.UserList.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem (item) {
            const index = this.UserList.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.UserList.splice(index, 1)
        },
        close () {
            this.dialog = false
            this.alert = false
            setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            }, 300)
        },
        async save () {
            if (this.editedIndex > -1) {
                Object.assign(this.UserList[this.editedIndex], this.editedItem)
            } else {
                this.UserList.push(this.editedItem)
                try {
                    const response = await AuthenticationService.register({
                        email: this.editedItem.email,
                        password: this.editedItem.password
                    }).then((response) => this.saveInline())
                    this.close()
                } catch (error) {
                    this.alert = true
                    this.error = error.response.data.error
                }
            }
        },
        //toasts/snackbar messages for actions
        saveInline () {
            this.snack = true
            this.snackColor = 'success'
            this.snackText = 'Datos guardados'
        },
        cancelInline () {
            this.snack = true
            this.snackColor = 'error'
            this.snackText = 'Canceled'
        },
        reset () {
            this.snack = true
            this.snackColor = 'success'
            this.snackText = 'Data reset to default'
        },
        openInline () {
            this.snack = true
            this.snackColor = 'info'
            this.snackText = 'Dialog opened'
        }
    }
}
</script>