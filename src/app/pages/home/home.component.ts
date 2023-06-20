import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  anuncios: Anuncio[] = [];
  pathAnuncios= 'Anuncios/';
  constructor(public firestoreService: FirestoreService) { }

  ngOnInit() {
    this.getAnuncios();
  }

  getAnuncios(){
    console.log('anuncio');
    this.firestoreService.getCollection<Anuncio>(this.pathAnuncios).subscribe(   res => {
      this.anuncios = res;
      console.log('anuncio', res);
    });
  }

}

interface Anuncio {
  uid: string;
  nombre: string;
  descripcion: string;
  ruta: string;
  foto: string;
}
