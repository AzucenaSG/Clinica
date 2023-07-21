import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Analisis, Categoria } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-product-analis',
  templateUrl: './product-analis.component.html',
  styleUrls: ['./product-analis.component.scss'],
})
export class ProductAnalisComponent  implements OnInit {
  id!: any;
  analisis: Analisis[] = [];
  pathAnalisis= '';

  categoria: Categoria = {
    id: '',
    nombre: '',
    foto: '',
  };
  constructor(private route: ActivatedRoute,
    public firestoreService: FirestoreService,
    private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.getAll('id').toString();
    console.log('id',this.id);
    this.pathAnalisis = 'categorias/' + this.id + '/analisis/';
    this.getAnalisis();
    this.getDocCate();
  }

  getDocCate(){
    const path = 'categorias/';
    this.firestoreService.getDoc<Categoria>(path, this.id ).subscribe( res => {
      if (res !== undefined) {
        this.categoria = res;
      }
    });
  }

  getAnalisis(){
    this.firestoreService.getCollection<Analisis>(this.pathAnalisis).subscribe(   res => {
      this.analisis = res;
      console.log('analisis', res);
    });
  }

  irRecomendaciones(id: string){
    console.log(id);
    this.router.navigate(['recomendaciones',{ id: [`${id}`], path: [`${this.pathAnalisis}`]}]);
  }

}
