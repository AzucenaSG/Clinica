import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-tipo-analisis',
  templateUrl: './tipo-analisis.component.html',
  styleUrls: ['./tipo-analisis.component.scss'],
})
export class TipoAnalisisComponent  implements OnInit {
  categorias: Categoria[] = [];
pathCategoria= 'categorias/';
  constructor(private route: ActivatedRoute,
    public firestoreService: FirestoreService,
    private router: Router) { }

  ngOnInit() {
    this.getCategoria();
  }

  getCategoria(){
    this.firestoreService.getCollection<Categoria>(this.pathCategoria).subscribe(   res => {
      this.categorias = res;
      console.log('categorias', res);
    });
  }

  irAnalisis(id: string){
    console.log(id);
    this.router.navigate(['producto',{ id: [`${id}`]}]);
  }

}
