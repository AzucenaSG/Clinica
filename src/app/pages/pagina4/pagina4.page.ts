import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Categoria, Precio } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-pagina4',
  templateUrl: './pagina4.page.html',
  styleUrls: ['./pagina4.page.scss'],
})
export class Pagina4Page implements OnInit {

  id!: string;
  precio!: Precio;
  preciosres: Precio[]=[];

  categoria: Categoria ={
    id: '',
    foto: '',
    nombre: ''
  }

  constructor( private router: Router,
    private firestoreService: FirestoreService,
    public activedroute: ActivatedRoute,
    public navcontroller: NavController ) { 

      this.activedroute.snapshot.params['id'];
      this.id = this.activedroute.snapshot.params['id']
     }

  ngOnInit() {
    this.initprecio();
    this.vertipoanalisis();
    this.getdocinfocategoria();
  }
  initprecio(){
    this.precio ={
      id: this.firestoreService.getId (),
      nombre: '',
      precios: 0
    }
  }
  // plaquetas(){
  //   this.router.navigateByUrl('/pagina5')
  // }
  redirigir(){
    this.navcontroller.pop();
  }
  vertipoanalisis(){
    const pathtipoanalisis = 'categoria/'+ this.id + '/tipoanalisis';
    this.firestoreService.getCollection <Precio>(pathtipoanalisis).subscribe (res =>{
      console.log(res);
      this.preciosres = res;
    });
  }
  getdocinfocategoria(){
    const pathcategoria = 'categoria';
    this.firestoreService.getDoc <Categoria>(pathcategoria, this.id).subscribe ( res =>{
      if( res !== undefined){
        this.categoria = res;
      }
    });
  }
  idpagina(item: any){
    // console.log('categoria', this.id, 'id', item.idanalisis)
    this.router.navigate(['pagina5',{id:[`${this.id}`], idanalisis:[`${item.id}`]}])
  }

}
