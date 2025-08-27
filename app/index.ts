// types.ts
export interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono: string;
  tipoUsuario: 'conductor' | 'pasajero';
  avatar?: string;
  // Campos específicos para conductores
  vehiculo?: {
    marca: string;
    modelo: string;
    placa: string;
    color: string;
    capacidad: number;
  };
  licencia?: string;
  // Campos específicos para pasajeros
  ubicacionFavorita?: string;
}

export interface Viaje {
  id: string;
  conductorId: string;
  origen: string;
  destino: string;
  fechaHora: string;
  espaciosDisponibles: number;
  precio: number;
  estado: 'disponible' | 'en_curso' | 'completado' | 'cancelado';
  pasajeros: string[];
}