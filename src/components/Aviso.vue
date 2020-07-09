<template lang="pug">
  v-dialog(v-model="activo" max-width="768px")
    v-card
      v-card-title(primary-title) {{notificacion ? notificacion.titulo : ""}}
      v-card-text {{notificacion ? notificacion.contenido : ""}}
      v-card-actions
        v-spacer
        v-btn(text @click="cerrarDialog") Aceptar
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["notificacion", "activo"],
  data() {
    return {};
  },
  methods: {
    cerrarDialog() {
      this.$emit("cerrarDialog");
    }
  }
});
</script>
