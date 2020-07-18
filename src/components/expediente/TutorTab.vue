<template lang="pug">
  v-tab-item(id="tutor")
    v-card(outlined)
      v-card-text
        v-row
          v-col(cols="12" md="6")
            strong Nombre(s): 
            | {{tutor.nombres}}
            br
            strong Apellido paterno: 
            | {{tutor.apellidoP}}
            br
            strong Apellido materno: 
            | {{tutor.apellidoM}}
            br
            strong Sexo: 
            | {{tutor.sexo}}
            br
            strong Parentesco: 
            | {{tutor.parentesco}}
            br
            strong Teléfono: 
            | {{tutor.telefono}}
            br
            strong Correo electrónico: 
            | {{tutor.correo}}
            br
            strong Notas: 
            | {{tutor.notas}}
          v-col(cols="12" md="6")
            strong Calle: 
            | {{tutor.domicilio.calle}}
            br
            strong No. exterior: 
            | {{tutor.domicilio.nExterior}}
            br
            strong No. interior: 
            | {{tutor.domicilio.nInterior}}
            br
            strong Entre calles: 
            | {{tutor.domicilio.entreCalles}}
            br
            strong Colonia: 
            | {{tutor.domicilio.colonia}}
            br
            strong Municipio: 
            | {{tutor.domicilio.municipio}}
            br
            strong Entidad: 
            | {{tutor.domicilio.entidad}}
            br
            strong Código postal: 
            | {{tutor.domicilio.cp}}
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      tutor: {
        nombres: "Fulano",
        apellidoP: "X",
        apellidoM: "X",
        sexo: "Masculino",
        parentesco: "Tal",
        telefono: "5500000000",
        correo: "correo@correo.com",
        notas: "Ninguna",
        domicilio: {
          calle: "Por ahí",
          nExterior: "123",
          nInterior: "456",
          entreCalles: "Esa y aquella",
          colonia: "La escondida",
          municipio: "Aquel",
          entidad: "Ciudad de México",
          cp: "00000"
        }
      }
    };
  }
});
</script>
