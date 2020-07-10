import { sleep } from "../utils/funciones";
import { ResponseServer } from "../utils/tipos";

export class Login {
  static async iniciarSesion(
    usuario: string,
    clave: string
  ): Promise<ResponseServer> {
    await sleep(2000);
    if (usuario !== "andre") {
      return {
        status: 400,
        message: "El usuario no existe"
      };
    }
    if (clave !== "andre") {
      return {
        status: 400,
        message: "La contraseña no es correcta"
      };
    }

    return {
      status: 200,
      message: ""
    };
  }
  static async reestablecerClave(usuario: string): Promise<ResponseServer> {
    await sleep(2000);
    if (usuario === "andre") {
      return {
        status: 200,
        message: "a*****@gmail.com"
      };
    }

    return {
      status: 404,
      message: "No existe el usuario"
    };
  }
  static async guardarNuevaContraseña(
    clave1: string,
    clave2: string
  ): Promise<ResponseServer> {
    await sleep(2000);
    if (clave1 === clave2) {
      return {
        status: 200,
        message: "Contraseña guardada"
      };
    }

    return {
      status: 400,
      message: "Las contraseñas no coinciden"
    };
  }
}
