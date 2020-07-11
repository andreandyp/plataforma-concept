<template lang="pug">
  v-container
    v-row
      v-col(md="6" offset-md="2")
        v-card
          v-card-title Bienvenido
          v-card-text
            v-form(ref="formLogin" v-model="usuarioValido" @submit.prevent="iniciarSesion()")
              v-text-field(
                v-model="usuario"
                label="Boleta/Número de empleado/P.P./P.E."
                :rules="[reglas.usuarioVacio]"
                tabindex="1"
                clearable
              )
              v-text-field(
                v-model="clave"
                label="Contraseña"
                :rules="[reglas.claveVacia]"
                type="password"
                tabindex="2"
              )
              v-checkbox(v-model="recordar" label="Recuérdame")
              v-btn.primary(
                :loading="cargando"
                type="submit"
                tabindex="3"
                block
                rounded
              ) Iniciar sesión
              div.text-center.mt-4
                v-btn(text color="info" to="/reestablecer-clave") ¿Olvidaste tu contraseña?
      v-col(md=4)
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
          
      v-spacer
    aviso(:activo="dialogoActivo" :notificacion="notifDialog" @cerrarDialog="dialogoActivo = false")
    v-snackbar(v-model="errorServidor" top centered timeout="3000") {{errorMensaje}}
</template>

<script lang="ts">
import Vue from "vue";
import Aviso from "../components/Aviso.vue";
import { Notificacion, DatosSesion } from "../utils/tipos";
import { Login } from "../services/Login";
export default Vue.extend({
  data() {
    return {
      usuario: "",
      clave: "",
      recordar: false,
      usuarioValido: false,
      reglas: {
        usuarioVacio: (usuario: string) => {
          const blank = /\S+/;
          return blank.test(usuario) || "Usuario incorrecto";
        },
        claveVacia: (usuario: string) => {
          const blank = /\S+/;
          return blank.test(usuario) || "La clave no puede estar vacía";
        }
      },
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
          contenido: `¡Actualiza la plataforma a la versión 3.5.2 ya! Solo recarga la página y
            listo.`,
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
      notifDialog: null,
      cargando: false,
      errorServidor: null,
      errorMensaje: ""
    };
  },
  created() {
    if (this.$store.getters.sesionIniciada) {
      return this.$router.replace("/");
    }
  },
  methods: {
    abrirAviso(notificacion: Notificacion) {
      notificacion.vista = true;
      this.$data.notifDialog = notificacion;
      this.$data.dialogoActivo = true;
    },
    async iniciarSesion() {
      (this.$refs.formLogin as Vue & {
        validate: () => boolean;
      }).validate();

      if (!this.$data.usuarioValido) {
        return;
      }

      this.$data.cargando = true;
      const { usuario, clave } = this.$data;
      const respuesta = await Login.iniciarSesion(usuario.trim(), clave);
      const { status, message } = respuesta as DatosSesion;
      if (status !== 200) {
        this.$data.errorServidor = true;
        this.$data.errorMensaje = message;
      } else {
        this.$store.commit("iniciarSesion", message);
        if (message.tipo === "alumno") {
          this.$router.replace("/alumno");
        } else {
          this.$router.replace("/profesor");
        }
      }
      this.$data.cargando = false;
    }
  },
  components: {
    aviso: Aviso
  },
  filters: {
    formatearFecha(fecha: Date): string {
      return `Enviada el ${fecha.toLocaleDateString()} a las ${fecha.toLocaleTimeString()}`;
    }
  },
  computed: {
    notifsSinVer(): number {
      return this.$data.notificaciones.filter((notif: Notificacion) => !notif.vista).length;
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
