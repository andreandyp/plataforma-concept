<template lang="pug">
  div
    v-expansion-panels(accordion)
      v-expansion-panel
        v-expansion-panel-header
          strong Anuncios
          v-badge(:content="notifsSinVer" v-show="notifsSinVer > 0" inline)
        v-expansion-panel-content
          v-list
            div(v-for="notifs in notificaciones" :key="notifs._id")
              v-list-item(
                  @click="abrirAviso(notifs)"
                  :input-value="!notifs.vista"
                  color="primary"
                  two-line
                )
                v-list-item-content
                  v-list-item-title {{notifs.titulo}}
                  v-list-item-subtitle {{notifs.fechaEnvio | formatearFecha}}
                v-badge.align-end(v-show="!notifs.vista" inline)
    aviso-dialog(
      :abierto="dialogoAbierto"
      :notificacion="notifDialog"
      @cerrarDialog="dialogoAbierto = false")
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Notificacion } from "@/utils/tipos";
import AvisoDialog from "./AvisoDialog.vue";

@Component({
  components: {
    "aviso-dialog": AvisoDialog,
  },
  filters: {
    formatearFecha(fecha: Date): string {
      return `Enviada el ${fecha.toLocaleDateString()} a las ${fecha.toLocaleTimeString()}`;
    },
  },
})
export default class AvisoPanel extends Vue {
  notificaciones: Array<Notificacion> = [
    {
      _id: 123456543223,
      titulo: "Ventana de mantenimiento - 30/02/2020",
      fechaEnvio: new Date(2020, 1, 14, 0, 0, 0, 0),
      contenido: `El día 30/02/2020 habrá mantenimiento programado.
            No entrar entre las 00:00 y las 04:00`,
      vista: false,
    },
    {
      _id: 123456543224,
      titulo: "¡Nueva versión! 3.5.2",
      fechaEnvio: new Date(2020, 0, 30, 0, 0, 0, 0),
      contenido: `¡Actualiza la plataforma a la versión 3.5.2 ya! Solo recarga la página y
            listo.`,
      vista: false,
    },
    {
      _id: 123456543225,
      titulo: "Horarios del semestre 2020/1 ya disponibles",
      fechaEnvio: new Date(2020, 0, 15, 0, 0, 0, 0),
      contenido: `Los nuevos horarios ya están disponibles en todas las carreras`,
      vista: true,
    },
  ];
  notifDialog: Notificacion | null = null;
  dialogoAbierto = false;

  get notifsSinVer(): number {
    return this.notificaciones.filter((notif: Notificacion) => !notif.vista).length;
  }

  abrirAviso(notificacion: Notificacion): void {
    notificacion.vista = true;
    this.notifDialog = notificacion;
    this.dialogoAbierto = true;
  }
}
</script>

<style scoped>
div.v-expansion-panel-content__wrap {
  padding: 0px;
}
.v-list {
  height: 210px;
  overflow-y: auto;
}
.v-expansion-panel {
  width: 100vw;
}
</style>
