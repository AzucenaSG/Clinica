import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Precio, Recomendaciones } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-analisisnuevo',
  templateUrl: './analisisnuevo.page.html',
  styleUrls: ['./analisisnuevo.page.scss'],
})
export class AnalisisnuevoPage implements OnInit {

 
  id!: string;
  analisis: Precio = {
    id: '',
    nombre: '',
    precios: 0
  }

  idcategoria: any;
  iditem: any;

  recomendaciones: Recomendaciones = {
    id: '',
    recomendacion: ''
  };

  recomendacioneslist: Recomendaciones []=[];


  constructor(private router: Router,
    public activedroute: ActivatedRoute,
    public firestoreservice: FirestoreService,
    public navcontroller: NavController,
    public route: ActivatedRoute) {

      this.idcategoria = this.route.snapshot.paramMap.getAll('idcategoria').toString();
      console.log(this.idcategoria);

      this.iditem = this.route.snapshot.paramMap.getAll('iditem').toString();
      console.log(this.iditem);


      this.getanalisis();

     }

  ngOnInit() {
    this.initrecomendaciones();
    this.getrecomendaciones();
  }
  initrecomendaciones(){
    this.recomendaciones = {
      id: this.firestoreservice.getId(),
      recomendacion: ''
    }
  }
  redirigir(){
    this.navcontroller.pop();
  }
  guardar(){
    const pathprecio = 'categoria/'+ this.idcategoria + '/tipoanalisis';
    this.firestoreservice.createDoc(this.analisis, pathprecio, this.iditem).then (() =>{
      console.log('se ha registrado', this.analisis);
    });
  }
  getanalisis(){
    const pathprecio = 'categoria/'+ this.idcategoria + '/tipoanalisis';
    this.firestoreservice.getDoc<Precio>(pathprecio, this.iditem).subscribe (res =>{
      console.log(res)
      if( res){
        this.analisis = res;
        console.log(this.analisis)
      }
    });
  }

  // /categoria/FleqCJtmkUXvFLCGlyzF/tipoanalisis/cXu6dtSYrqbQ2arwFv5B
  guardarrecomendaciones(){
    const pathrecomendaciones = 'categoria/' + this.idcategoria +'/tipoanalisis/' + this.iditem + '/recomendaciones';
    console.log(pathrecomendaciones);
    this.firestoreservice.createDoc(this.recomendaciones, pathrecomendaciones, this.recomendaciones.id).then (() =>{
      console.log('se agrego con exito');
      this.initrecomendaciones();

     });
  }
  getrecomendaciones(){
    const pathrecomendaciones = 'categoria/' + this.idcategoria +'/tipoanalisis/' + this.iditem + '/recomendaciones';
    this.firestoreservice.getCollection<Recomendaciones>(pathrecomendaciones). subscribe (res =>{
        this.recomendacioneslist = res;
          console.log(this.recomendacioneslist);

    });
  }
  borrar(){
    const pathprecio = 'categoria/'+ this.idcategoria + '/tipoanalisis';
    this.firestoreservice.deleteDoc(pathprecio, this.iditem).then (() =>{
      console.log('se a eliminado')
      this.navcontroller.pop();
    });
  }

}
