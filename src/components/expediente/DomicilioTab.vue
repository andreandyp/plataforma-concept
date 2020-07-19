<template lang="pug">
  v-tab-item(id="domicilio")
    v-card(outlined)
      v-card-text
        v-row
          v-col(cols="12" md="6")
            strong Calle: 
            | {{calle}}
            br
            strong No. exterior: 
            | {{nExterior}}
            br
            strong No. interior: 
            | {{nInterior}}
            br
            strong Entre calles: 
            | {{entreCalles}}
          v-col(cols="12" md="6")
            strong Colonia: 
            | {{colonia}}
            br
            strong Municipio: 
            | {{municipio}}
            br
            strong Entidad: 
            | {{entidad}}
            br
            strong Código postal: 
            | {{cp}}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class DomicilioTab extends Vue {
  calle = "Por ahí";
  nExterior = "123";
  nInterior = "456";
  entreCalles = "Esa y aquella";
  colonia = "La escondida";
  municipio = "Aquel";
  entidad = "Ciudad de México";
  cp = "00000";
}
</script>
