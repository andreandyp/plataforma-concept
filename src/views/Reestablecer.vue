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
import Vue from "vue";
import { Login } from "../services/Login";
export default Vue.extend({
  data() {
    return {
      valido: false,
      usuario: "",
      correoRecuperacion: "",
      usuarioValido: null,
      usuarioNoExiste: null,
      cargando: false,
      reglas: {
        usuarioVacio: (usuario: string): boolean | string => {
          const blank = /\S+/;
          return blank.test(usuario) || "Usuario incorrecto";
        }
      }
    };
  },
  created() {
    if (this.$store.getters.sesionIniciada) {
      return this.$router.replace("/");
    }
  },
  methods: {
    async enviarCodigo() {
      (this.$refs.formUsuario as Vue & {
        validate: () => boolean;
      }).validate();

      if (!this.$data.valido) {
        return;
      }

      this.$data.cargando = true;
      const { status, message } = await Login.reestablecerClave(this.$data.usuario.trim());
      this.$data.cargando = false;

      if (status !== 200) {
        this.$data.usuarioNoExiste = true;
      } else {
        this.$data.usuarioValido = true;
        this.$data.correoRecuperacion = message;
      }
    }
  }
});
</script>

<style scoped>
.oculto {
  display: none;
}
</style>
