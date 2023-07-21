import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-tipo-persona',
  templateUrl: './tipo-persona.component.html',
  styleUrls: ['./tipo-persona.component.scss'],
})
export class TipoPersonaComponent  implements OnInit {

  constructor(public personaService: PersonaService) { }

  ngOnInit() {}

  crearPersonaYo(){
    this.personaService.editPersonaYo();
  }

}
