import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent  implements OnInit {

  constructor( public modalcontroller: ModalController,
               private navCtrl: NavController) { }

  ngOnInit() {}

  // async openmodal(){
  //   const ar = 'hola';
  //   const modal = await this.modalcontroller.create({
  //     component: AddCaPage,
  //     componentProps: {clave : 'qww'}
  //   });
  //   return await modal.present();
  //  }

}
