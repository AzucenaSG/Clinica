import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AddcateComponent } from 'src/app/componentes/addcate/addcate.component';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent  implements OnInit {
ar = 'ar';
  constructor( public modalcontroller: ModalController,
               private navCtrl: NavController) { }

  ngOnInit() {}

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
