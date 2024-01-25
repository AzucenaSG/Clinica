import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { IonRouterOutlet, Platform } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

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
    this.router.navigateByUrl('/login')
  }
   agendar(){
   this.router.navigateByUrl('/pagina1')
   }
   resultados(){
     this.router.navigateByUrl('/resultados')
   }
   perfil(){
    this.router.navigateByUrl('/perfil')
  }


}
