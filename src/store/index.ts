import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sesion: {
      usuario: "",
      nombre: "",
      estado: "",
      tipo: ""
    },
    cargando: false
  },
  mutations: {
    iniciarSesion(state, sesion) {
      state.sesion = sesion;
    },
    cerrarSesion(state) {
      state.sesion = {
        usuario: "",
        nombre: "",
        estado: "",
        tipo: ""
      };
    }
  },
  getters: {
    sesionIniciada(state): boolean {
      return state.sesion.usuario !== "";
    },
    tipoUsuario(state): string {
      return state.sesion.tipo;
    }
  },
  actions: {},
  modules: {}
});
