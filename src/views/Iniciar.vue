<template lang="pug">
  v-container
    v-row
      v-col(md=6 offset-md=2)
        v-card
          v-card-title Bienvenido
          v-card-text
            v-form(@submit.prevent="iniciarSesion()")
              v-text-field(v-model="usuario" label="Boleta/Número de empleado/P.P./P.E." tabindex="1" clearable)
              v-text-field(v-model="clave" label="Contraseña" type="password" tabindex="2")
              v-checkbox(v-model="recordar" label="Recuérdame")
              v-btn.primary(type="submit" tabindex="3" block rounded) Iniciar sesión
              div.text-center.mt-4
                v-btn(text color="info" link) ¿Olvidaste tu contraseña?
      v-col(md=4)
        v-expansion-panels(accordion)
          v-expansion-panel
            v-expansion-panel-header
              strong Anuncios
              v-badge(:content="notifsSinVer" v-show="notifsSinVer > 0" inline)
            v-expansion-panel-content
              v-list
                div(v-for="notifs in notificaciones" :key="notifs._id")
                  v-list-item(@click="abrirAviso(notifs)" two-line :input-value="!notifs.vista" color="primary")
                    v-list-item-content
                      v-list-item-title {{notifs.titulo}}
                      v-list-item-subtitle {{notifs.fechaEnvio | formatearFecha}}
                    v-badge.align-end(v-show="!notifs.vista" inline)
          
      v-spacer
    aviso(:activo="dialogoActivo" :notificacion="notifDialog" @cerrarDialog="dialogoActivo = false")
</template>

<script lang="ts">
import Vue from "vue";
import Aviso from "../components/Aviso.vue";
import { Notificacion } from "../dto/dto";
export default Vue.extend({
  data() {
    return {
      usuario: "",
      clave: "",
      recordar: false,
      notificaciones: [
        {
          _id: 123456543223,
          titulo: "Ventana de mantenimiento - 30/02/2020",
          fechaEnvio: new Date(2020, 1, 14, 0, 0, 0, 0),
          contenido: `El día 30/02/2020 habrá mantenimiento programado.
            No entrar entre las 00:00 y las 04:00`,
          vista: false
        },
        {
          _id: 123456543224,
          titulo: "¡Nueva versión! 3.5.2",
          fechaEnvio: new Date(2020, 0, 30, 0, 0, 0, 0),
          contenido: `¡Actualiza la plataforma a la versión 3.5.2 ya! Solo recarga la página y listo.`,
          vista: false
        },
        {
          _id: 123456543225,
          titulo: "Horarios del semestre 2020/1 ya disponibles",
          fechaEnvio: new Date(2020, 0, 15, 0, 0, 0, 0),
          contenido: `Los nuevos horarios ya están disponibles en todas las carreras`,
          vista: true
        }
      ],
      dialogoActivo: false,
      notifDialog: null
    };
  },
  methods: {
    abrirAviso(notificacion: Notificacion) {
      notificacion.vista = true;
      this.$data.notifDialog = notificacion;
      this.$data.dialogoActivo = true;
    },
    iniciarSesion() {
      alert(
        "Esto es un demo. No te preocupes si ingresaste datos reales, no irán a ningún lado"
      );
    }
  },
  components: {
    aviso: Aviso
  },
  filters: {
    formatearFecha(fecha: Date) {
      return `Enviada el ${fecha.toLocaleDateString()} a las ${fecha.toLocaleTimeString()}`;
    }
  },
  computed: {
    notifsSinVer() {
      return this.$data.notificaciones.filter(
        (notif: Notificacion) => !notif.vista
      ).length;
    }
  }
});
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
