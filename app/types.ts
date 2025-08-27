export interface User {
  id: string;
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  telefono: string;
  programa: string;
  semestre: number;
  avatar?: string;
  fechaRegistro: string;
  activo: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginErrors {
  email: string;
  password: string;
}