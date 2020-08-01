<template lang="pug">
  v-container
    v-row.text-center
      v-col
        h2.d-flex.justify-space-between Calificaciones finales
          div
            v-tooltip(bottom)
              template(v-slot:activator="{ on, attrs }")
                v-btn(v-bind="attrs" v-on="on" @click="" icon)
                  v-icon mdi-printer
              span Imprimir calificaciones
            v-tooltip(bottom)
              template(v-slot:activator="{ on, attrs }")
                v-btn(v-bind="attrs" v-on="on" @click="" icon)
                  v-icon mdi-share
              span Compartir...
            v-tooltip(bottom)
              template(v-slot:activator="{ on, attrs }")
                v-btn(
                  v-bind="attrs"
                  v-on="on"
                  @click="actualizarCalifFinales()"
                  :loading="cargandoCalifs"
                  icon
                )
                  v-icon mdi-sync
              span Actualizar
        v-skeleton-loader(v-if="cargandoCalifs" type="table-tbody" max-height="150")
        v-simple-table(v-else :class="{cargando: cargandoCalifs}" fixed-header dense)
          thead
            tr
              th.text-center(v-for="header in califHeaders") {{header}}
          tbody
            tr(v-for="calif in califFinales")
              td {{calif.materia}}
              td {{calif.ordinario}}
              td {{calif.extra}}
              td {{calif.ets}}
              td {{calif.final}}
      v-col
        h2.d-flex.justify-space-between Calificaciones de ETS
          v-btn(@click="actualizarETS()" :loading="cargandoETS" icon)
            v-icon mdi-sync
        v-skeleton-loader(v-if="cargandoETS" type="table-tbody" max-height="100")
        v-simple-table(v-else :class="{cargando: cargandoETS}" fixed-header dense)
          thead
            tr
              th.text-center(v-for="header in etsHeaders") {{header}}
          tbody
            tr(v-for="ets in examenesETS")
              td {{ets.periodo}}
              td {{ets.tipo}}
              td {{ets.materia}}
              td {{ets.turno}}
              td {{ets.calificacion}}
    v-row
      v-col
        h2 Kardex
        v-skeleton-loader(v-if="cargandoKardex" type="table" max-height="400")
        v-row(v-else)
          v-col(v-for="(nivel, index) in kardex" :key="index" md="6")
            v-simple-table.kardex(
              :class="{cargando: cargandoKardex}"
              fixed-header
              dense
              )
              caption
                strong {{`Nivel ${index + 1}`}}
              thead
                tr
                  th(v-for="header in kardexHeaders") {{header}}
              tbody
                tr(v-for="materia in nivel")
                  td {{materia.codigo}}
                  td {{materia.materia}}
                  td {{materia.periodo}}
                  td {{materia.forma}}
                  td {{materia.calificacion}}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { CalificacionesAPI } from "@/services/CalificacionesAPI";
import { ETSDB, CalifFinalesDB, KardexDB } from "@/utils/tipos";

@Component
export default class Calificaciones extends Vue {
  cargandoCalifs = false;
  cargandoETS = false;
  cargandoKardex = false;
  etsHeaders: Array<string> = ["Periodo", "Tipo", "Materia", "Turno", "Calificación"];
  examenesETS: Array<ETSDB> = [];
  califHeaders: Array<string> = ["Materia", "Ordinario", "Extra", "ETS", "Final"];
  califFinales: Array<CalifFinalesDB> = [];
  kardexHeaders: Array<string> = [
    "Código",
    "Materia",
    "Periodo",
    "Aprobada en",
    "Calificación final",
  ];
  kardex: Array<Array<KardexDB>> = [];

  mounted(): void {
    this.actualizarCalifFinales();
    this.actualizarETS();
    this.actualizarKardex();
  }

  async actualizarETS(): Promise<void> {
    this.cargandoETS = true;
    const { message } = await CalificacionesAPI.obtenerETS();
    this.examenesETS = message;
    this.cargandoETS = false;
  }
  async actualizarCalifFinales(): Promise<void> {
    this.cargandoCalifs = true;
    const { message } = await CalificacionesAPI.obtenerCalificacionesFinales();
    this.califFinales = message;
    this.cargandoCalifs = false;
  }
  async actualizarKardex(): Promise<void> {
    this.cargandoKardex = true;
    const { message } = await CalificacionesAPI.obtenerKardex();
    this.kardex = message;
    this.cargandoKardex = false;
  }
}
</script>

<style scoped>
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-size: 0.95rem;
}
th {
  font-weight: bolder;
}
.cargando {
  filter: blur(2px);
  pointer-events: none;
}
</style>
