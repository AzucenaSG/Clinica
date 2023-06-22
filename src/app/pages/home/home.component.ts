import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  anuncios: Anuncio[] = [];
  pathAnuncios= 'Anuncios/';
  constructor(public firestoreService: FirestoreService,
    private navCtrl: NavController) {
    this.getAnuncios();
  }

  ngOnInit() {
  }

  getAnuncios(){
    console.log('anuncio');
    this.firestoreService.getCollection<Anuncio>(this.pathAnuncios).subscribe(   res => {
      this.anuncios = res;
      console.log('anuncio', res);
    });
  }

  onClick(){
  //   this.navCtrl.navigateForward(`persona`,
  // { queryParamsHandling: 'merge', animationDirection: page > this.currentPage ? 'forward' : 'back' });

  this.navCtrl.navigateForward(`persona`, { animated: true ,animationDirection: 'back' });

  }

  onClick2(){
    // this.navCtrl.pop();
    this.navCtrl.navigateForward(`persona`, { animated: false});
    }

}

interface Anuncio {
  uid: string;
  nombre: string;
  descripcion: string;
  ruta: string;
  foto: string;
}
