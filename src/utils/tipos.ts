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

export { Notificacion, ResponseServer };
