import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Analisis, Categoria, Recomendacion } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PersonaService } from '../../services/persona.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.scss'],
})
export class RecomendacionesComponent  implements OnInit {
  id!: any;
  path!: any;

  recomendaciones: Recomendacion[] = [];
  pathRecomendacion= '';

  analisis: Analisis = {
    id: '',
    nombre: '',
    precio: 0,
  };
  constructor(private route: ActivatedRoute,
    public firestoreService: FirestoreService,
    public personaService: PersonaService,
    private navController: NavController) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.getAll('id').toString();
    console.log('id',this.id);
    this.path = this.route.snapshot.paramMap.getAll('path').toString();
    console.log('path',this.path);
    this.pathRecomendacion = this.path + this.id + '/recomendaciones/';
    console.log('pathRecomendacion',this.pathRecomendacion);
    this.getRecomendaciones();
    this.getDocAnalisis();
  }

  getRecomendaciones(){
    this.firestoreService.getCollection<Recomendacion>(this.pathRecomendacion).subscribe(   res => {
      this.recomendaciones = res;
      console.log('recomendaciones', res);
    });
  }

  getDocAnalisis(){
    this.firestoreService.getDoc<Analisis>(this.path, this.id ).subscribe( res => {
      if (res !== undefined) {
        this.analisis = res;
        console.log('analisis', this.analisis);
      }
    });
  }
  
  pagar(){
    this.personaService.persona.analisis = this.analisis.nombre;
    this.navController.navigateForward('/checkout');
  }

}
