export interface Cliente {
    uid: string;
    nombre: string;
    email: string;
    password: string;
    genero: string;
    tel: number;
}
export interface Categoria {
    id: string;
    foto: string;
    nombre: string;   
}
export interface Precio{
    id: string;
    precios: number;
    nombre: string;
}
export interface Recomendaciones{
    id: string;
    recomendacion: string;
}
export interface Categoriasl{
    id: string;
    categoriali: string;
}
export interface Agendado{
    date:string;
    id:string;
    fecha: string;
    hora: string;
    asunto: string;
    nombre:string;
    tipoanalisis: string;
    backgroundColor: string;
    textColor: string;
    idusuario:string;
    File: string;
  
}