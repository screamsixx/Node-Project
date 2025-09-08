import { ObjectId } from "mongodb";

export interface Telefono {
  tipo: string;
  numero: string;
}

export interface  Usuario {
  _id?: ObjectId;
  nombre_usuario: string;
  email: string;
  contraseña: string;
  rol: string;
  estado?: boolean;
  estatus?: boolean;
  telefonos: Telefono[];
  ultimos_inicios_sesion?: Date[];
  fecha_registro?: Date;
   // 👇 Esto permite valores extra desconocidos
  [key: string]: any;

}
