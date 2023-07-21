import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-persona-ext',
  templateUrl: './persona-ext.component.html',
  styleUrls: ['./persona-ext.component.scss'],
})
export class PersonaExtComponent  implements OnInit {
nombre = '';
sexo = '';
edad = 0;
  constructor(public personaService: PersonaService,
              private navController: NavController,
              public toastController: ToastController) { }

  ngOnInit() {}

  crearPersona(){
    if(this.nombre && this.edad){
      this.personaService.editPersona(this.nombre,this.edad,this.sexo);
      this.navController.navigateForward('/tipoAnalisis');
    }else{
      console.log('no hay datos');
      this.presentToast('Faltan agregar datos','danger','close-outline');
    }
  }

  async presentToast(txto: any, color: any, icono: any) {
    const toast = await this.toastController.create({
      message: txto,
      mode: 'ios',
      duration: 2000,
      color: color,
      position : 'middle',
      buttons: [
        {
          icon: icono,
          role: 'info',
        }
      ],
    });
    toast.present();
  }

}
