<template>
  <v-container fill-height>
    <v-row>

      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-row class="d-flex align-center">
              <v-col
                cols="4"
                sm="3"
                md="2"
              >
                <label class="primary--text">Consultar de:</label>
              </v-col>
              <v-col
                cols="8"
                sm="9"
                md="7"
              >
                <v-select
                  v-model="selectedCollections"
                  :items="collections"
                  label="Entidades"
                  multiple
                  return-object
                  chips
                  class="custom-class_wrap-chips-text"
                >
                  <template v-slot:prepend-item>
                    <v-list-item
                      ripple
                      @click="toggleSelection(collections, selectedCollections)"
                    >
                      <v-list-item-action>
                        <v-icon :color="selectAllIconColor(selectedCollections)">
                          {{ selectAllIcon(collections, selectedCollections) }}
                        </v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>
                          Seleccionar todo
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2" />
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-row class="d-flex align-center">
              <v-col
                cols="4"
                sm="3"
                md="2"
              >
                <label class="primary--text">Los campos:</label>
              </v-col>
              <v-col
                cols="8"
                sm="9"
                md="10"
              >
                <v-row>
                  <v-col
                    v-for="(collection, index) in selectedCollections"
                    :key="index"
                    cols="12"
                    sm="6"
                  >
                    <v-select
                      v-model="collection.selectedFields"
                      :items="collection.fields"
                      :label="collection.text"
                      multiple
                      return-object
                      chips
                      class="custom-class_wrap-chips-text"
                    >
                      <template v-slot:prepend-item>
                        <v-list-item
                          ripple
                          @click="toggleSelection(collection.fields, collection.selectedFields)"
                        >
                          <v-list-item-action>
                            <v-icon :color="selectAllIconColor(collection.selectedFields)">
                              {{ selectAllIcon(collection.fields, collection.selectedFields) }}
                            </v-icon>
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title>
                              Seleccionar todo
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider class="mt-2" />
                      </template>
                      <template v-slot:selection="{ item, index }">
                        <v-chip v-if="index<2">
                          <span>{{ item.text }}</span>
                        </v-chip>
                        <span
                          v-if="index === 2"
                          class="grey--text caption"
                        >
                          (y {{ collection.selectedFields.length-2 }} más)
                        </span>
                      </template>
                    </v-select>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-row class="d-flex align-center">
              <v-col
                cols="4"
                sm="3"
                md="2"
              >
                <label class="primary--text">Condiciones:</label>
              </v-col>
              <v-col
                cols="7"
                sm="7"
                md="10"
              >
                <v-row dense class="d-flex align-end">

                  <v-col
                    cols="12"
                    class="d-flex justify-center"
                  >
                    <v-btn
                      text
                      width="100%"
                      class="text-none text-body-2 grey--text text--darken-2"
                      @click.stop="showConstraintCreator()"
                    >
                      <v-icon class="mr-2">mdi-plus</v-icon>
                      Agregar condición
                    </v-btn>
                  </v-col>

                  <v-col
                    v-for="( c, index) in constraints"
                    :key="index"
                    cols="12"
                    class="d-flex py-0"
                  >
                    <v-row>
                      <v-col cols="12" class="d-flex py-0">
                        <v-row>
                          <v-col cols="4" class="py-1">
                            <span>{{ `${c.firstOperand.text} (${c.firstOperand.parentText})` }}</span>
                          </v-col>
                          <v-col cols="4" class="py-1">
                            <span>{{ c.operation.symbol ? c.operation.symbol : c.operation.text }}</span>
                          </v-col>
                          <v-col cols="4" class="py-1">
                            <span>
                              {{ c.secondOperandClass==='constant-value' ? c.secondOperand : `${c.secondOperand.text} (${c.secondOperand.parentText})` }}
                            </span>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-sheet
                      width="75px"
                      class="d-flex align-center justify-end"
                    >
                      <v-icon
                        size="18"
                        v-text="'mdi-pencil'"
                        @click="showConstraintCreator(c, index)"
                      />
                      <v-icon
                        size="18"
                        class="ml-2"
                        v-text="'mdi-delete'"
                      />
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-dialog v-model="dialog">
          <v-card class="px-4 pt-2">

            <v-card-text>

              <v-row no-gutters>
                <v-col
                  cols="12"
                  sm="6"
                  lg="4"
                  class="d-flex align-center"
                >
                  <label>Atributo</label>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  lg="8"
                >
                  <v-select
                    v-model="tempConstraint.firstOperand"
                    :items="selectedFields"
                    return-object
                    class="custom-class_wrap-chips-text"
                  >
                    <template v-slot:item="{ item }">
                      {{`${item.text} (${item.parentText})`}}
                    </template>
                    <template v-slot:selection="{ item }">
                      <v-chip>
                        <span>{{`${item.text} (${item.parentText})`}}</span>
                      </v-chip>
                    </template>
                  </v-select>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col
                  cols="12"
                  sm="6"
                  lg="4"
                  class="d-flex align-center"
                >
                  <label>Operación:</label>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  lg="8"
                >
                  <v-select
                    :items="admittedOperations"
                    v-model="tempConstraint.operation"
                    return-object
                  >
                    <template v-slot:item="{ item }">
                      {{ item.text + (item.symbol ? ` (${item.symbol})` : '') }}
                      <span
                        v-if="item.disabled"
                        class="font-italic"
                        v-html="'&nbsp;Incompatible'"
                      />
                    </template>
                  </v-select>
                </v-col>
              </v-row>
              
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  lg="4"
                  class="d-flex align-center"
                >
                  <v-menu v-if="attributeClassAccepted">
                    <template v-slot:activator="{ on, attrs }">
                      <v-sheet>
                        <label
                          v-bind="attrs"
                          v-on="on"
                        >
                          {{ operandClasses[tempConstraint.secondOperandClass] }}
                        </label>
                        <v-icon
                          v-bind="attrs"
                          v-on="on"
                          v-text="'$dropdown'"
                        />
                      </v-sheet>
                    </template>
                    <v-sheet>
                      <v-list>
                        <v-list-item-group
                          mandatory
                          color="primary"
                          v-model="tempConstraint.secondOperandClass"
                        >
                          <v-list-item
                            v-for="([classValue, classText], index) in Object.entries(operandClasses)"
                            :key="index"
                            :value="classValue"
                          >
                            <v-list-item-content>
                              <v-list-item-title v-text="classText" />
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </v-sheet>
                  </v-menu>
                  <label v-else>{{ operandClasses['constant-value'] }}</label>
                </v-col>

                <v-col
                  cols="12"
                  sm="6"
                  lg="8"
                >
                  <template v-if="tempConstraint.secondOperandClass==='constant-value'">
                    <v-date-picker
                      v-if="tempConstraint.firstOperand && tempConstraint.firstOperand.type==='Date'"
                      locale="es-ES"
                      v-model="tempConstraint.secondOperand"
                    />
                    <v-text-field
                      v-else
                      v-model="tempConstraint.secondOperand"
                    />
                  </template>
                  <v-select
                    v-else-if="tempConstraint.secondOperandClass==='attribute'"
                    :items="selectedFields"
                    return-object
                    v-model="tempConstraint.secondOperand"
                    class="custom-class_wrap-chips-text"
                  >
                    <template v-slot:item="{ item }">
                      {{`${item.text} (${item.parentText})`}}
                    </template>
                    <template v-slot:selection="{ item }">
                      <v-chip>
                        <span>{{`${item.text} (${item.parentText})`}}</span>
                      </v-chip>
                    </template>
                  </v-select>
                </v-col>
              </v-row>

            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                v-text="'Cancelar'"
                @click.stop="dialog=false"
              />
              <v-btn
                v-text="constraintCreator.acceptText"
                @click.stop="saveConstraint()"
              />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      constraints: [],
      selectedCollections: [],
      operandClasses: {
        'constant-value': 'Valor',
        'attribute': 'Atributo'
      },
      tempConstraint: {
        operation: null,
        firstOperand: null,
        secondOperand: null,
        secondOperandClass: 'constant-value'
      },
      constraintCreator: {
        acceptText: 'Crear',
        forEditing: false
      },
      operations: [
        { value: 'greater-than', text: 'Mayor que', symbol: '>', types: ['Date','Number'] },
        { value: 'equal', text: 'Igual a', symbol: '=', types: ['Date', 'Number', 'String'] },
        { value: 'regex', text: 'Expresión regular', types: ['String'], rejectsAttributeClass: true }
      ],
      collections: [
        { value: "notifications", text: "Notificaciones", selectedFields: [], fields: [
          { parentText: "Notificaciones", value: "notifications.dateNoti", text: 'Fecha', type: 'Date' },
          { parentText: "Notificaciones", value: "notifications.description", text: 'Descripción', type: 'String' },
          { parentText: "Notificaciones", value: "notifications.emailsToNoti", text: '_emailsToNoti', type: 'Array' },
          { parentText: "Notificaciones", value: "notifications.owner", text: 'Dueño', type: 'String' },
          { parentText: "Notificaciones", value: "notifications.title", text: 'Título', type: 'String' },
          { parentText: "Notificaciones", value: "notifications.typeNoti", text: 'Tipo', type: 'String' },
        ]},
        { value: "services", text: "Servicios", selectedFields: [], fields: [
          { parentText: "Servicios", value: "services.approve", text: 'Aprobado', type: 'Boolean' },
          { parentText: "Servicios", value: "services.autor", text: 'Autor', type: 'String' },
          { parentText: "Servicios", value: "services.category", text: 'Categoría', type: 'String' },
          { parentText: "Servicios", value: "services.date", text: 'Fecha', type: 'Date' },
          { parentText: "Servicios", value: "services.description", text: 'Descripción', type: 'String' },
          { parentText: "Servicios", value: "services.direction", text: 'Dirección', type: 'String' },
          { parentText: "Servicios", value: "services.imageService", text: 'Imagen', type: 'String' },
          { parentText: "Servicios", value: "services.institute", text: 'Instituto', type: 'String' },
          { parentText: "Servicios", value: "services.name", text: 'Nombre', type: 'String' },
          { parentText: "Servicios", value: "services.paramserv", text: 'Parametros', type: 'String' },
          { parentText: "Servicios", value: "services.request", text: 'Petición', type: 'String' },
          { parentText: "Servicios", value: "services.school", text: 'Escuela', type: 'String' },
          { parentText: "Servicios", value: "services.userspp", text: 'Usuarios', type: 'String' },
        ]},
        { value: "subscribers", text: "Suscriptores", selectedFields: [], fields: [
          { parentText: "Suscriptores", value: "subscribers.dateSub", text: 'Fecha', type: 'Date' },
          { parentText: "Suscriptores", value: "subscribers.email", text: 'Email', type: 'String' },
          { parentText: "Usuarios", value: "subscribers.typeSub", text: 'Tipo', type: 'String' },
        ]},
        { value: "users", text: "Usuarios", selectedFields: [], fields: [
          { parentText: "Usuarios", value: "users.dependencies", text: "Dependencias", type: 'String' },
          { parentText: "Usuarios", value: "users.email", text: "Email", type: 'String' },
          { parentText: "Usuarios", value: "users.imageUser", text: "Imagen de usuario", type: 'String' },
          { parentText: "Usuarios", value: "users.institute", text: "Instituto", type: 'String' },
          { parentText: "Usuarios", value: "users.isActive", text: "Activo", type: 'Boolean' },
          { parentText: "Usuarios", value: "users.isAdmin", text: "Usuario administrador", type: 'Boolean' },
          { parentText: "Usuarios", value: "users.lastname", text: "Apellido", type: 'String' },
          { parentText: "Usuarios", value: "users.name", text: "Nombre", type: 'String' },
          { parentText: "Usuarios", value: "users.numNoti", text: "Cantidad de notificaciones", type: 'Number' },
          { parentText: "Usuarios", value: "users.school", text: "Escuela", type: 'String' },
        ]}
      ]
    }),
    watch: {
      'tempConstraint.firstOperand': function(newOperand, oldOperand) {
        const { operation } = this.tempConstraint
        if  ( operation && !operation.types.includes(newOperand.type) ) {
          this.tempConstraint.operation = null
        }
        if ( oldOperand && newOperand && oldOperand.type!==newOperand.type ) {
          this.tempConstraint.secondOperand = null 
        }
      },
      'tempConstraint.operation': function(newOperation, oldOperation) {
        if  ( newOperation && newOperation.rejectsAttributeClass ) {
          this.tempConstraint.secondOperandClass = 'constant-value'
        }
      },
      'tempConstraint.secondOperandClass': function(newClass, oldClass) {
        this.tempConstraint.secondOperand = null
      }
    },
    computed: {
      selectedFields() {
        return this.selectedCollections.reduce( (fields, { selectedFields }) => fields.concat( selectedFields ), [] )
      },
      admittedOperations() {
        let admittedOperations = []
        if (this.tempConstraint.firstOperand) {
          admittedOperations = this.operations
            .reduce(
              ([passed, failed], operation) => {
                if ( operation.types.includes(this.tempConstraint.firstOperand.type) ) {
                  return [ [...passed, operation], failed ]
                } else {
                  return [ passed, [...failed, { ...operation, disabled: true }] ]
                }
              },
              [ [], [] ]
            )
            .flat()
        }
        return admittedOperations
      },
      attributeClassAccepted() {
        return !(this.tempConstraint.operation && this.tempConstraint.operation.rejectsAttributeClass)
      }
    },
    methods: {
      toggleSelection(items, selected) {
        selected.length===items.length ? selected.splice(0) : selected.splice(0, selected.length, ...items)
      },
      selectAllIcon(items, selected) {
        let icon = 'mdi-checkbox-blank-outline'
        if (selected.length===items.length) {
          icon = 'mdi-close-box'
        }
        else if (selected.length) {
          icon = 'mdi-minus-box'
        }
        return icon
      },
      selectAllIconColor(selected) {
        if (selected.length > 0) {
          return 'indigo darken-4'
        }
      },
      showConstraintCreator(constraint, index) {
        if ( constraint ) {
          this.constraintCreator.forEditing = true
          this.constraintCreator.acceptText = 'Editar'
          this.constraintCreator.index = index
          this.tempConstraint = { ...constraint }
        } else {
          this.constraintCreator.forEditing = false
          this.constraintCreator.acceptText = 'Crear'
        }
        this.dialog = true
      },
      saveConstraint() {
        if ( this.constraintCreator.forEditing ) {
          this.constraints.splice(this.constraintCreator.index, 1, this.tempConstraint)
        } else {
          this.constraints.push(this.tempConstraint)
        }
        console.log(this.constraints);
        this.tempConstraint = {
          operation: null,
          firstOperand: null,
          secondOperand: null,
          secondOperandClass: 'constant-value'
        }
        this.dialog = false
      }
    }
  }
</script>

<style>
  .custom-class_wrap-chips-text .v-chip__content {
    white-space: normal
  }
  .custom-class_inherit-font-color {
    color: inherit
  }
</style>