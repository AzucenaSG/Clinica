export interface Cliente {
    uid: string;
    email: string;
    celular: string;
    sexo: string;
    nombre: string;
    edad: number;
    contrasena: string;
}

export interface Categoria {
    id: string;
    nombre: string;
    foto: string;
}

export interface Analisis {
    id: string;
    nombre: string;
    precio: number;
}

export interface Recomendacion {
    id: string;
    descripcion: string;
}

export interface Persona {
    id: string;
    celular: string;
    sexo: string;
    nombre: string;
    edad: number;
    analisis: string;
}

export interface Cita{
    id: string;
    paciente: string;
    tipo: string;
    fecha: string;
    fechasub: any;
    pago: string;
    analisis: string;
    hora: string;
    date: string;
    textColor: string;
    backgroundColor: string;
  }