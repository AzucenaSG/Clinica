import { Component } from '@angular/core';
import { FirebaseauthService } from './services/firebaseauth.service';
import { NavController } from '@ionic/angular';
import { PersonaService } from './services/persona.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  admin = false;
  usuario = false;
  idUsuario = '';
  constructor(private firebaseauthService: FirebaseauthService,
              private navController: NavController,
              private personaService: PersonaService) {
    this.getUid();
  }

  getUid() {
    //cambio
    this.firebaseauthService.stateAuth().subscribe( res => {
          if (res !== null) {
            this.idUsuario = res.uid;
              if (this.idUsuario === '0p97jkz59RPRM4Ok8hvGu2d1NN22')  {
                  this.admin = true;
                  this.usuario = false;
                  this.navController.navigateForward('/menuAdmin');
              }else{
                this.admin = false;
                this.usuario = true;
                this.navController.navigateForward('/inicio');
              }

          } else {
            this.admin = false;
            this.usuario = true;
            this.navController.navigateForward('/login');
          }
    });
}
}
