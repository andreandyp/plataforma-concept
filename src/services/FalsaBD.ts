import { UsuarioDB } from "../utils/tipos";

const db: Array<UsuarioDB> = [
  {
    usuario: "andre",
    contraseña: "andre",
    email: "andre@gmail.com",
    nombre: "André M.",
    estado: "Inscrito",
    tipo: "alumno"
  },
  {
    usuario: "andy",
    contraseña: "andy",
    email: "andy@hotmail.com",
    nombre: "Andy P.",
    estado: null,
    tipo: "profesor"
  }
];

export { db };
