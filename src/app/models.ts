export interface Cliente {
    uid: string;
    email: string;
    celular: string;
    sexo: string;
    nombre: string;
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