<template lang="pug">
  v-tab-item(id="escolar")
    v-card(outlined)
      v-card-text
        v-row
          v-col.md-grow-0(cols="12" md="6")
            h3 Situación actual:
            strong Créditos: 
            | {{creditosAprobados}} / {{creditosTotales}}
            br
            strong Situación académica: 
            | {{situacionActual}}
            br
            strong Promedio general: 
            | {{promedioGeneral}}
            br
            strong Periodo de ingreso: 
            | {{periodoIngreso}}
          v-col(cols="12" md="6")
            h3 Escuela de procedencia:
            strong Institución: 
            | {{institución}}
            br
            strong Unidad académica: 
            | {{unidadAca}}
            br
            strong Entidad: 
            | {{entidad}}
            br
            strong Promedio: 
            | {{promedioPrecedencia}}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class SituacionEscolarTab extends Vue {
  creditosAprobados = 200;
  creditosTotales = 250;
  situacionActual = "Inscrito";
  promedioGeneral = 8.0;
  periodoIngreso = "2016/1";
  institución = "IPN";
  unidadAca = "CECyT X";
  entidad = "Ciudad de México";
  promedioPrecedencia = 7.5;
}
</script>
