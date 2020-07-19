<template lang="pug">
  v-container
    v-row
      v-col(md="6" offset-md="3")
        v-card
          v-card-title Reestablecer contraseña
          v-card-text
            v-form(ref="formNuevaClave" v-model="valido" @submit.prevent="guardarClave()")
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
      | Contraseña cambiada, redirigiendo a inicio de sesión en {{segundos/1000}} segundos.
    v-snackbar(v-model="errorServidor" centered timeout="3000") {{errorMensaje}}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { LoginAPI } from "@/services/LoginAPI";

@Component
export default class NuevaClave extends Vue {
  valido = false;
  clave1 = "";
  clave2 = "";
  claveDiferente: boolean | null = null;
  cargando = false;
  reglas = {
    vacio(clave: string): boolean | string {
      const blank = /\S+/;
      return blank.test(clave) || "La clave no puede estar vacía";
    },
    longitud(clave: string): boolean | string {
      return (
        (clave.length > 8 && clave.length < 32) ||
        "La clave debe ser mayor a 8 caracteres y menos a 32"
      );
    },
  };
  errorServidor: boolean | null = null;
  errorMensaje = "";
  contraseñasCambiadas: boolean | null = null;
  segundos = 5000;

  created(): void {
    if (this.$store.getters.sesionIniciada) {
      this.$router.replace("/");
      return;
    }
  }

  async guardarClave(): Promise<void> {
    (this.$refs.formNuevaClave as Vue & {
      validate: () => boolean;
    }).validate();

    if (!this.valido) {
      return;
    }

    if (this.clave1 !== this.clave2) {
      this.claveDiferente = true;
    } else {
      this.cargando = true;
      const { status, message } = await LoginAPI.guardarNuevaContraseña(this.clave1, this.clave2);
      this.cargando = false;
      if (status === 200) {
        this.contraseñasCambiadas = true;
        setTimeout(() => this.$router.replace("/iniciar"), this.segundos);
      } else {
        this.errorServidor = true;
        this.errorMensaje = message;
      }
    }
  }
}
</script>
