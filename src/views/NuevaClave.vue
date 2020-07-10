<template lang="pug">
  v-container
    v-row
      v-col(md="6" offset-md="3")
        v-card
          v-card-title Reestablecer contraseña
          v-card-text
            v-form(ref="formNuevaClave" @submit.prevent="guardarClave()")
              v-text-field(
                label="Escribe tu nueva contraseña"
                v-model="clave1"
                type="password"
                :rules="[reglas.vacio, reglas.longitud]"
                counter="32"
                required
              )
              v-text-field(
                label="Repite la nueva contraseña"
                v-model="clave2"
                type="password"
                :rules="[reglas.vacio, reglas.longitud]"
                counter="32"
                required
              )
              .text-right
                v-btn.mt-3(color="primary" type="submit" :loading="cargando") Guardar contraseña
    v-snackbar(v-model="claveDiferente" centered timeout="3000") Las contraseñas no coinciden
    v-snackbar(v-model="contraseñasCambiadas" centered timeout="5000")
      | Contraseña cambiada, redirigiendo a inicio de sesión.
    v-snackbar(v-model="errorServidor" centered timeout="3000") {{errorMensaje}}
</template>

<script lang="ts">
import Vue from "vue";
import { Login } from "../services/Login";
export default Vue.extend({
  data() {
    return {
      clave1: "",
      clave2: "",
      claveDiferente: null,
      cargando: false,
      reglas: {
        vacio: (clave: string) => {
          const blank = /\S+/;
          return blank.test(clave) || "La clave no puede estar vacía";
        },
        longitud: (clave: string) => {
          return (
            (clave.length > 8 && clave.length < 32) ||
            "La clave debe ser mayor a 8 caracteres y menos a 32"
          );
        }
      },
      errorServidor: null,
      errorMensaje: "",
      contraseñasCambiadas: null
    };
  },
  computed: {
    idReestablecer(): string {
      return this.$route.params.id;
    }
  },
  methods: {
    async guardarClave() {
      (this.$refs.formNuevaClave as Vue & {
        validate: () => boolean;
      }).validate();
      const { clave1, clave2 } = this.$data;
      if (clave1 !== clave2) {
        this.$data.claveDiferente = true;
      } else {
        this.$data.cargando = true;
        const { status, message } = await Login.guardarNuevaContraseña(
          clave1,
          clave2
        );
        this.$data.cargando = false;
        if (status === 200) {
          this.$data.contraseñasCambiadas = true;
          setTimeout(() => this.$router.replace("/iniciar"), 5000);
        } else {
          this.$data.errorServidor = true;
          this.$data.errorMensaje = message;
        }
      }
    }
  }
});
</script>
