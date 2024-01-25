import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria, Categoriasl } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-pagina3',
  templateUrl: './pagina3.page.html',
  styleUrls: ['./pagina3.page.scss'],
})
export class Pagina3Page implements OnInit {

  categoria!: Categoria;

  categoriasl: Categoria = {
    id: '',
    nombre: '',
    foto: ''
  }

  categoriares: Categoria[]=[];

  constructor( private router: Router,
    private fireservice: FirestoreService,
    private personalservice: PersonaService ) { }

  ngOnInit() {
    this.getrecolecciones();
    this.initcategoria();
  }
  initcategoria(){
    this.categoria ={
      id: this.fireservice.getId (),
      nombre: '',
      foto: ''
    }
  }
  requisitos(){
    this.router.navigateByUrl('/pagina5')
  }
  redirigir(){
    this.router.navigateByUrl('/pagina1')
  }
  getrecolecciones(){
    const pathcategoria = 'categoria';
    this.fireservice.getCollection<Categoria>(pathcategoria). subscribe (res =>{
      this.categoriares = res;
      console.log(this.categoriares);
    });
  }
  idanalisis(item: any){
    this.router.navigate(['pagina4', item])
    this.personalservice.tipoanalisis = item.nombre;
    console.log(item)
  }


}
