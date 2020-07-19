<template lang="pug">
  v-container
    v-row
      v-col(md="6" offset-md="3")
        v-card
          v-card-title Reestablecer contraseña
          v-card-text(:class="{oculto: usuarioValido}")
            v-form(ref="formUsuario" v-show="!usuarioValido" v-model="valido" @submit.prevent="enviarCodigo()")
              v-text-field(
                label="Ingresa tu boleta/No. de empleado/P.P./P.E."
                v-model="usuario"
                :rules="[reglas.usuarioVacio]"
                required
              )
              .text-right
                v-btn(color="primary" type="submit" :loading="cargando") Siguiente
          v-card-text(v-show="usuarioValido") Las instrucciones de reestablecimiento se han enviado 
            | a la siguiente direccion de correo: 
            strong {{correoRecuperacion}}
            v-btn.mt-3(color="info" to="/iniciar" text block) Ir al inicio de sesión
    v-snackbar(v-model="usuarioNoExiste" centered timeout="3000") El usuario no existe
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { LoginAPI } from "@/services/LoginAPI";

@Component
export default class Reestablecer extends Vue {
  valido = false;
  usuario = "";
  correoRecuperacion = "";
  usuarioValido: boolean | null = null;
  usuarioNoExiste: boolean | null = null;
  cargando = false;
  reglas = {
    usuarioVacio(usuario: string): boolean | string {
      const blank = /\S+/;
      return blank.test(usuario) || "Usuario incorrecto";
    },
  };
  created(): void {
    if (this.$store.getters.sesionIniciada) {
      this.$router.replace("/");
      return;
    }
  }
  async enviarCodigo(): Promise<void> {
    (this.$refs.formUsuario as Vue & {
      validate: () => boolean;
    }).validate();

    if (!this.valido) {
      return;
    }

    this.cargando = true;
    const { status, message } = await LoginAPI.reestablecerClave(this.usuario.trim());
    this.cargando = false;

    if (status !== 200) {
      this.usuarioNoExiste = true;
    } else {
      this.usuarioValido = true;
      this.correoRecuperacion = message;
    }
  }
}
</script>

<style scoped>
.oculto {
  display: none;
}
</style>
