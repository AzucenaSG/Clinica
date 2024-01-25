import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { IonRouterOutlet, Platform } from '@ionic/angular';

@Component({
  selector: 'app-agenda-admin',
  templateUrl: './agenda-admin.page.html',
  styleUrls: ['./agenda-admin.page.scss'],
})
export class AgendaAdminPage implements OnInit {

  constructor( private router: Router,
    public platform: Platform,
    public routerOutlet: IonRouterOutlet) {

      this.platform.backButton.subscribeWithPriority(-1, () => { // func para android sirve para salir de la app
        if (!this.routerOutlet.canGoBack()) {
          App.exitApp();
        }
      });
     }

  ngOnInit() {
  }
  redirigir(){
    this.router.navigateByUrl('/ajustes')
  }
  redirigir1(){
    this.router.navigateByUrl('/agendar')
  }
  redirigir2(){
    this.router.navigateByUrl('/pacientes')
  }
  redirigir3(){
    this.router.navigateByUrl('/perfil')
  }

}
