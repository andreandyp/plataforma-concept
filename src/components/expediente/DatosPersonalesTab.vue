<template lang="pug">
  v-tab-item(id="datos")
    v-card(outlined)
      v-card-text
        v-row
          v-col.md-grow-0(cols="12" md="4" align-self="center")
            v-img(
              alt="Foto de la credencial"
              src="https://randomuser.me/api/portraits/lego/5.jpg"
              width="150"
              height="125"
            )
            strong {{boleta}}
          v-col(cols="12" md="4")
            strong Nombre(s): 
            | {{nombres}}
            br
            strong Apellido paterno: 
            | {{apellidoP}}
            br
            strong Apellido materno: 
            | {{apellidoM}}
            br
            strong Sexo: 
            | {{sexo}}
            br
            strong Fecha de nacimiento: 
            | {{fechaNacimiento}}
            br
            strong CURP: 
            | {{curp}}
          v-col(cols="12" md="4")
            strong RFC: 
            | {{rfc}}
            br
            strong Teléfono: 
            | {{telefono}}
            br
            strong Correo electrónico: 
            | {{correo}}
            br
            strong País de nacimiento: 
            | {{pais}}
            br
            strong Entidad federativa: 
            | {{entidad}}
            br
            strong Nacionalidad: 
            | {{nacionalidad}}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class DatosPersonalesTab extends Vue {
  boleta = "2020000000";
  nombres = "Andre M.";
  apellidoP = "P";
  apellidoM = "N";
  sexo = "Masculino";
  fechaNacimiento = "01/01/1997";
  curp = "ABCD000000HDFXX00";
  rfc = "ABCD000000XX0";
  telefono = "5500000000";
  correo = "andreandyp@outlook.com";
  pais = "México";
  entidad = "CDMX";
  nacionalidad = "Mexicana";
}
</script>
