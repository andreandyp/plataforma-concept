type Notificacion = {
  _id: number;
  titulo: string;
  fechaEnvio: Date;
  contenido: string;
  vista: boolean;
};

type ResponseServer = {
  status: number;
  message: string;
};

type Sesion = {
  usuario: string;
  nombre: string;
  estado: string | null;
  tipo: string;
};

type DatosSesion = {
  status: number;
  message: Sesion;
};

type UsuarioDB = {
  usuario: string;
  contraseña: string;
  email: string;
  nombre: string;
  estado: string | null;
  tipo: string;
};

export { Notificacion, ResponseServer, DatosSesion, UsuarioDB, Sesion };
