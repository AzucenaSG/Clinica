import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { AddcateComponent } from 'src/app/componentes/addcate/addcate.component';
import { Categoria } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent  implements OnInit {
ar = 'ar';
categorias: Categoria[] = [];
pathCategoria= 'categorias/';
  constructor( public modalcontroller: ModalController,
               private navCtrl: NavController,
               public firestoreService: FirestoreService,
               private router: Router) { }

  ngOnInit() {
    this.getCategoria();
  }

  getCategoria(){
    this.firestoreService.getCollection<Categoria>(this.pathCategoria).subscribe(   res => {
      this.categorias = res;
      console.log('categorias', res);
    });
  }

  irAnalisis(id: string){
    console.log(id);
    this.router.navigate(['analisis',{ id: [`${id}`]}]);
  }

  async openmodal(){
    const modal = await this.modalcontroller.create({
      component: AddcateComponent,
      componentProps:  {id: ''}
    });
    return await modal.present();
   }

   async openmodal2(id: any){
    const modal = await this.modalcontroller.create({
      component: AddcateComponent,
      componentProps: {id}
    });
    return await modal.present();
   }

}
