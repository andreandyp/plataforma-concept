<template lang="pug">
  v-dialog(v-model="abierto" max-width="768px")
    v-card
      v-card-title(primary-title) {{notificacion ? notificacion.titulo : ""}}
      v-card-text {{notificacion ? notificacion.contenido : ""}}
      v-card-actions
        v-spacer
        v-btn(text @click="cerrarDialog") Aceptar
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Notificacion } from "@/utils/tipos";

@Component
export default class AvisoDialog extends Vue {
  @Prop() readonly notificacion: Notificacion | null = null;
  @Prop(Boolean) readonly abierto = false;
  cerrarDialog(): void {
    this.$emit("cerrarDialog");
  }
}
</script>
