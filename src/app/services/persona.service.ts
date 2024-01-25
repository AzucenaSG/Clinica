import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  nombre!: string;
  tipoanalisis!: string;

  constructor() { }
}
