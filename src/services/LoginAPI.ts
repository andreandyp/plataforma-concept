import { sleep } from "@/utils/funciones";
import { ResponseServer, DatosSesion, Sesion, UsuarioDB } from "@/utils/tipos";
import { usuarios } from "@/db/UsuariosDB";

export class LoginAPI {
  static async sesionIniciada(): Promise<ResponseServer | DatosSesion> {
    const usuario = localStorage.getItem("sesion");
    if (usuario === null) {
      return {
        status: 401,
        message: "No ha iniciado sesión"
      };
    }

    return {
      status: 200,
      message: JSON.parse(usuario)
    };
  }
  static async iniciarSesion(
    usuario: string,
    clave: string
  ): Promise<ResponseServer | DatosSesion> {
    await sleep(1500);
    const user = usuarios.find((elem: UsuarioDB) => elem.usuario === usuario);
    if (!user) {
      return {
        status: 400,
        message: "El usuario no existe"
      };
    }
    if (user.contraseña !== clave) {
      return {
        status: 400,
        message: "La contraseña no es correcta"
      };
    }

    const sesion: Sesion = {
      usuario: user.usuario,
      nombre: user.nombre,
      estado: user.estado,
      tipo: user.tipo
    };
    localStorage.setItem("sesion", JSON.stringify(sesion));

    return {
      status: 200,
      message: sesion
    };
  }

  static async reestablecerClave(usuario: string): Promise<ResponseServer> {
    await sleep(1500);
    const user = usuarios.find((elem: UsuarioDB) => elem.usuario === usuario);
    if (user) {
      const parteCensurada = user.email.slice(1, user.email.indexOf("@"));
      const patron = new RegExp(parteCensurada);
      return {
        status: 200,
        message: user.email.replace(patron, "*".repeat(parteCensurada.length))
      };
    }

    return {
      status: 404,
      message: "No existe el usuario"
    };
  }

  static async guardarNuevaContraseña(clave1: string, clave2: string): Promise<ResponseServer> {
    await sleep(1500);
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

  static async cerrarSesion() {
    localStorage.removeItem("sesion");
  }
}
