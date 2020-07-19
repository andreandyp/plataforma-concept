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
        aviso-panel
      v-spacer
    v-snackbar(v-model="errorServidor" top centered timeout="3000") {{errorMensaje}}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import AvisoPanel from "@/components/AvisoPanel.vue";
import { Notificacion, DatosSesion, Sesion } from "@/utils/tipos";
import { LoginAPI } from "@/services/LoginAPI";

@Component({
  components: {
    "aviso-panel": AvisoPanel,
  },
})
export default class Iniciar extends Vue {
  usuario = "";
  clave = "";
  recordar = false;
  usuarioValido = false;
  reglas = {
    usuarioVacio(usuario: string): boolean | string {
      const blank = /\S+/;
      return blank.test(usuario) || "Usuario incorrecto";
    },
    claveVacia(usuario: string): boolean | string {
      const blank = /\S+/;
      return blank.test(usuario) || "La clave no puede estar vacía";
    },
  };
  dialogoActivo = false;
  notifDialog: Notificacion | null = null;
  cargando = false;
  errorServidor: boolean | null = null;
  errorMensaje: Sesion | null = null;

  created(): void {
    if (this.$store.getters.sesionIniciada) {
      this.$router.replace("/");
    }
  }

  async iniciarSesion(): Promise<void> {
    (this.$refs.formLogin as Vue & {
      validate: () => boolean;
    }).validate();

    if (!this.usuarioValido) {
      return;
    }

    this.cargando = true;
    const { usuario, clave } = this.$data;
    const respuesta = await LoginAPI.iniciarSesion(usuario.trim(), clave);
    const { status, message } = respuesta as DatosSesion;
    if (status !== 200) {
      this.errorServidor = true;
      this.errorMensaje = message;
    } else {
      this.$store.commit("iniciarSesion", message);
      if (message.tipo === "alumno") {
        this.$router.replace("/alumno");
      } else {
        this.$router.replace("/profesor");
      }
    }
    this.cargando = false;
  }
}
</script>
