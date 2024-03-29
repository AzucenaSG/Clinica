import { Component } from '@angular/core';
import { FirebaseauthService } from './services/firebaseauth.service';
import { NavController } from '@ionic/angular';

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
              private navController: NavController) {
    this.getUid();
  }

  getUid() {
    //cambio
    this.firebaseauthService.stateAuth().subscribe( res => {
          if (res !== null) {
            this.idUsuario = res.uid;
              if (this.idUsuario === 'g3gkGXGlAeTVwC6FQVyanU4VRrJ2')  {
                  this.admin = true;
                  this.usuario = false;
                  this.navController.navigateForward('/agenda-admin');
              }else{
                this.admin = false;
                this.usuario = true;
                this.navController.navigateForward('/menu');
              }

          } else {
            this.admin = false;
            this.usuario = false;
            this.navController.navigateForward('/login');
          }
    });
}
}
