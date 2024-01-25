import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.page.html',
  styleUrls: ['./pagina2.page.scss'],
})
export class Pagina2Page implements OnInit {

  usuario = {
    text: '',
    text1: ''

  }
  constructor( private router: Router,
    private personalservice: PersonaService ) { }

  ngOnInit() {
  }
  siguiente(){
    this.router.navigateByUrl('/pagina3')
    this.personalservice.nombre = this.usuario.text;
  }
  redirigir(){
    this.router.navigateByUrl('/pagina1')
  }


}
