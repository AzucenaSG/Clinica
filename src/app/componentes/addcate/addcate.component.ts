import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-addcate',
  templateUrl: './addcate.component.html',
  styleUrls: ['./addcate.component.scss'],
})
export class AddcateComponent  implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  closeModal(){
    this.modalController.dismiss();
    
  }

}
