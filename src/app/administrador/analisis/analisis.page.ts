import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Precio } from 'src/app/models';
import { FirestoreService } from '../../services/firestore.service';
import { ModalController, NavController } from '@ionic/angular';
import { Categoria } from '../../models';

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.page.html',
  styleUrls: ['./analisis.page.scss'],
})
export class AnalisisPage implements OnInit {
  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }
  isModalOpen = false;

  id!: Categoria;
  precio!: Precio;
  preciosres: Precio[]=[];

  constructor( private router: Router,
    private firestoreService: FirestoreService,
    private modalcontroller: ModalController,
    public activedroute: ActivatedRoute,
    private navcontroller: NavController) {

      this.activedroute.snapshot.params['id'];
      this.id = this.activedroute.snapshot.params['id']
     }

  ngOnInit() {
    this.initprecio();
    this.veranalisis();
  }
  initprecio(){
    this.precio ={
      id: this.firestoreService.getId (),
      nombre: '',
      precios: 0
    }
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    console.log('se abrio el modal')
  }
  closmodal(){
    this.isModalOpen = false;
    console.log('se cerro el modal')
  }
  redirigir(){
    this.navcontroller.pop();
  }
  guardar(){
    const pathprecio = 'categoria/'+ this.id + '/tipoanalisis';
    this.firestoreService.createDoc(this.precio, pathprecio, this.precio.id).then (() =>{
      console.log('se ha registrado', this.precio);
      this.isModalOpen = false;
      this.initprecio();
      this.modalcontroller.dismiss();

    });
  }
  veranalisis(){
    const pathprecio2 = 'categoria/'+ this.id + '/tipoanalisis';
    this.firestoreService.getCollection <Precio>(pathprecio2).subscribe (res =>{
      console.log(res);
      this.preciosres = res;
    });
  }
  ingresar(item : any){
    console.log('categoria id', this.id, 'id item', item.id)
    this.router.navigate(['analisisnuevo',{idcategoria:[`${this.id}`], iditem:[`${item.id}`]}])
    // this.router.navigate(['analisisnuevo',item])
  }

}
